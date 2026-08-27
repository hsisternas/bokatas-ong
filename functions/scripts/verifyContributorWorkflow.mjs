#!/usr/bin/env node
/* Production-safe smoke: creates a disposable collaborator/resource and removes both in finally. */
import { getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

const apiKey = process.env.FIREBASE_WEB_API_KEY;
const volunteerPassword = process.env.TEST_VOLUNTEER_PASSWORD;
if (!apiKey || !volunteerPassword) throw new Error('Set FIREBASE_WEB_API_KEY and TEST_VOLUNTEER_PASSWORD.');
const app = getApps().length ? getApps()[0] : initializeApp({ projectId: 'bokatas' });
const db = getFirestore(app); const adminAuth = getAuth(app);
const testEmail = `qa-contributor-${Date.now()}@example.invalid`;
let uid = ''; let resourceId = '';
const endpoint = (name) => `https://europe-west1-bokatas.cloudfunctions.net/${name}`;
const request = async (url, body, token = '') => {
  const response = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json', ...(token ? { authorization: `Bearer ${token}` } : {}) }, body: JSON.stringify(body) });
  const payload = await response.json(); if (!response.ok || payload.error) throw new Error(payload.error?.message || `HTTP ${response.status}`); return payload;
};
const call = (name, data, token) => request(endpoint(name), { data }, token).then((result) => result.result);

try {
  const contributor = await request(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, { email: testEmail, password: 'Temporary-QA-42!', returnSecureToken: true, displayName: 'QA Bokatas' });
  uid = contributor.localId;
  const resource = { categoryId: 'primeros-pasos', name: 'QA temporal — eliminar', description: 'Recurso temporal creado exclusivamente para verificar el flujo de moderación.', address: 'Plaça de l’Ajuntament, València', phone: '', email: '', website: '', scheduleRaw: '', latitude: 39.4699, longitude: -0.3763 };
  resourceId = (await call('saveContributorResource', { resource }, contributor.idToken)).id;
  const pending = await db.doc(`resources/${resourceId}`).get(); if (pending.data()?.status !== 'pending_review') throw new Error('Contributor resource was not pending.');
  let denied = false; try { await call('reviewResource', { resourceId, action: 'approve' }, contributor.idToken); } catch { denied = true; }
  if (!denied) throw new Error('Contributor was incorrectly allowed to approve.');
  const volunteer = await request(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, { email: 'ruta-1@voluntarios.bokatas.local', password: volunteerPassword, returnSecureToken: true });
  await call('reviewResource', { resourceId, action: 'approve' }, volunteer.idToken);
  if ((await db.doc(`resources/${resourceId}`).get()).data()?.status !== 'published') throw new Error('Volunteer approval did not publish.');
  await call('requestResourceWithdrawal', { resourceId }, contributor.idToken);
  await call('reviewResource', { resourceId, action: 'archive' }, volunteer.idToken);
  if ((await db.doc(`resources/${resourceId}`).get()).data()?.status !== 'archived') throw new Error('Withdrawal review did not archive.');
  console.log('Contributor workflow smoke passed: pending → published → withdrawal_requested → archived, with contributor moderation denied.');
} finally {
  if (resourceId) { const events = await db.collection(`resources/${resourceId}/events`).get(); const batch = db.batch(); events.docs.forEach((event) => batch.delete(event.ref)); batch.delete(db.doc(`resources/${resourceId}`)); await batch.commit(); }
  if (uid) { await db.doc(`userProfiles/${uid}`).delete().catch(() => undefined); await adminAuth.deleteUser(uid).catch(() => undefined); }
}
