#!/usr/bin/env node
/* Safe, idempotent static-directory migration. Run from repository root. */
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import vm from 'node:vm';
import { getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const runId = `legacy-catalog-v1-${new Date().toISOString().slice(0, 10).replaceAll('-', '')}`;
const mode = process.argv[2] || '--dry-run';
const rollbackRunId = mode === '--rollback' ? process.argv[3] : '';
const root = resolve(dirname(new URL(import.meta.url).pathname), '../..');
const reportDir = resolve(root, 'migration-reports');
const now = new Date().toISOString();
const db = getApps().length ? getFirestore() : (initializeApp({ projectId: process.env.GCLOUD_PROJECT || 'bokatas' }), getFirestore());

const readLegacyResources = async () => {
  const source = await readFile(resolve(root, 'services/resourceService.ts'), 'utf8');
  const executable = source
    .replace(/import[\s\S]*?from '\.\.\/components\/icons\/CategoryIcons';/, '')
    .replace(/const categories[\s\S]*?const resources/, 'const resources')
    .replace(/(const\s+\w+)\s*:\s*[^=]+=/g, '$1 =')
    .replace(/export const getCategories[\s\S]*/, 'globalThis.__resources = resources;');
  const context = { globalThis: {} }; vm.createContext(context); vm.runInContext(executable, context, { timeout: 1_000 });
  return context.globalThis.__resources;
};
const isUrl = (value) => /^https?:\/\//i.test(value.trim());
const parseLegacyDate = (value) => { const match = /^(\d{2})\.(\d{2})\.(\d{2,4})$/.exec(value || ''); if (!match) return null; const year = match[3].length === 2 ? `20${match[3]}` : match[3]; const result = new Date(`${year}-${match[2]}-${match[1]}T12:00:00.000Z`); return Number.isNaN(result.getTime()) ? null : result.toISOString(); };
const normalize = (legacy) => {
  const flags = []; let address = String(legacy.address || '').trim(); let email = String(legacy.email || '').trim(); let website = '';
  if (isUrl(address)) { website = address; address = ''; flags.push('address_was_url'); }
  if (isUrl(email)) { website ||= email; email = ''; flags.push('email_was_url'); }
  const lat = Number(legacy.coordinates?.lat); const lng = Number(legacy.coordinates?.lng); const missingCoordinates = !Number.isFinite(lat) || !Number.isFinite(lng) || (lat === 0 && lng === 0);
  if (missingCoordinates) flags.push('coordinates_missing'); const description = String(legacy.description?.es || '').trim(); if (!description) flags.push('description_missing');
  const parsedUpdated = parseLegacyDate(String(legacy.updated || '')); if (!parsedUpdated && legacy.updated) flags.push('updated_unparseable'); if (String(legacy.hours || '').trim()) flags.push('schedule_raw_preserved');
  return { categoryId: String(legacy.categoryId || 'otros'), name: String(legacy.name?.es || '').trim(), description, address, phone: String(legacy.phone || '').trim(), email, website, scheduleRaw: String(legacy.hours || '').trim(), latitude: missingCoordinates ? null : lat, longitude: missingCoordinates ? null : lng, status: 'published', provenance: 'legacy', ownerUid: null, ownerDisplayName: '', createdAt: parsedUpdated || now, updatedAt: parsedUpdated || now, submittedAt: parsedUpdated || now, publishedAt: parsedUpdated || now, reviewedAt: null, reviewedBy: null, reviewComment: '', withdrawalRequestedAt: null, archivedAt: null, schemaVersion: 2, translations: Object.fromEntries(Object.entries(legacy.name || {}).filter(([locale, value]) => locale !== 'es' && typeof value === 'string' && value).map(([locale, value]) => [locale, { name: value, description: legacy.description?.[locale] || '', generatedAt: null, source: 'legacy' }])), legacy: { sourceId: legacy.id, original: legacy, migrationRunId: runId, normalizationFlags: flags } };
};
const writeReport = async (report) => { await mkdir(reportDir, { recursive: true }); const path = resolve(reportDir, `${report.runId}-${report.mode.replaceAll('--', '')}.json`); await writeFile(path, `${JSON.stringify(report, null, 2)}\n`); console.log(`Report: ${path}`); };
const migrate = async () => {
  const legacy = await readLegacyResources(); const normalized = legacy.map(normalize); const flagCounts = normalized.flatMap((item) => item.legacy.normalizationFlags).reduce((all, flag) => ({ ...all, [flag]: (all[flag] || 0) + 1 }), {}); const report = { runId, mode, generatedAt: now, sourceCount: legacy.length, normalizedCount: normalized.length, flagCounts, flaggedResources: normalized.filter((item) => item.legacy.normalizationFlags.length).map((item) => ({ id: item.legacy.sourceId, flags: item.legacy.normalizationFlags })) };
  if (mode === '--dry-run') { await writeReport(report); return; } if (mode !== '--apply') throw new Error('Use --dry-run, --apply, or --rollback <migrationRunId>.');
  const runRef = db.doc(`migrationRuns/${runId}`); const priorRun = await runRef.get();
  if (priorRun.exists && priorRun.data().appliedAt) { await writeReport({ ...report, alreadyApplied: true }); console.log(`Run ${runId} was already applied; no data changed.`); return; }
  const backup = await db.collection('resources').get(); const config = await db.doc('catalogConfig/resources').get(); const batch = db.batch();
  batch.set(runRef, { ...report, appliedAt: now, backupDocumentCount: backup.size, previousCatalogConfig: config.exists ? config.data() : null }); backup.docs.forEach((item) => batch.set(runRef.collection('resourcesBefore').doc(item.id), item.data())); normalized.forEach((item) => batch.set(db.doc(`resources/${item.legacy.sourceId}`), item)); batch.set(db.doc('catalogConfig/resources'), { legacyMigrationComplete: true, migrationRunId: runId, migratedAt: now, sourceCount: legacy.length }); await batch.commit(); await writeReport({ ...report, appliedAt: now, backupDocumentCount: backup.size }); console.log(`Applied ${normalized.length} canonical resources with run ${runId}.`);
};
const rollback = async () => {
  if (!rollbackRunId) throw new Error('A migrationRunId is required for rollback.'); const runRef = db.doc(`migrationRuns/${rollbackRunId}`); const run = await runRef.get(); if (!run.exists) throw new Error(`Migration run ${rollbackRunId} was not found.`); const created = await db.collection('resources').where('legacy.migrationRunId', '==', rollbackRunId).get(); const backup = await runRef.collection('resourcesBefore').get(); const batch = db.batch(); created.docs.forEach((item) => batch.delete(item.ref)); backup.docs.forEach((item) => batch.set(db.doc(`resources/${item.id}`), item.data())); const previous = run.data().previousCatalogConfig; if (previous) batch.set(db.doc('catalogConfig/resources'), previous); else batch.delete(db.doc('catalogConfig/resources')); batch.update(runRef, { rolledBackAt: now }); await batch.commit(); console.log(`Rolled back ${rollbackRunId}; restored ${backup.size} previous resources.`);
};
if (mode === '--rollback') await rollback(); else await migrate();
