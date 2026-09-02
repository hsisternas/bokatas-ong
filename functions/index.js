import { GoogleGenAI } from '@google/genai';
import { getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import * as logger from 'firebase-functions/logger';
import { HttpsError, onCall, onRequest } from 'firebase-functions/v2/https';
import { defineSecret } from 'firebase-functions/params';

const geminiApiKey = defineSecret('GEMINI_API_KEY');
const model = 'gemini-3.6-flash';
const db = getApps().length ? getFirestore() : (initializeApp(), getFirestore());
const adminAuth = getAuth();
const CATEGORY_IDS = new Set(['primeros-pasos', 'albergues', 'comida', 'higiene', 'salud', 'ropa', 'empleo', 'juridico', 'clases', 'mujer', 'orientacion', 'calle', 'otros']);
const VOLUNTEER_EMAIL = /^ruta-([1-9])@voluntarios\.bokatas\.local$/;
const MAX_TEXT = 4000;

const requireAuth = (request) => {
  if (!request.auth) throw new HttpsError('unauthenticated', 'Authentication is required.');
  return request.auth;
};

const requireVolunteer = (request) => {
  const auth = requireAuth(request);
  if (!VOLUNTEER_EMAIL.test(auth.token.email || '')) {
    throw new HttpsError('permission-denied', 'Volunteer access is required.');
  }
  return auth;
};

const cleanText = (value, { required = false, max = MAX_TEXT } = {}) => {
  const text = typeof value === 'string' ? value.trim() : '';
  if (required && !text) throw new HttpsError('invalid-argument', 'A required field is missing.');
  if (text.length > max) throw new HttpsError('invalid-argument', 'A field is too long.');
  return text;
};

const validateResourceInput = (value) => {
  const categoryId = cleanText(value?.categoryId, { required: true, max: 80 });
  if (!CATEGORY_IDS.has(categoryId)) throw new HttpsError('invalid-argument', 'Unknown resource category.');
  const latitude = value?.latitude === null ? null : Number(value?.latitude);
  const longitude = value?.longitude === null ? null : Number(value?.longitude);
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) throw new HttpsError('invalid-argument', 'A valid location is required.');
  // Valencia and its metropolitan area, intentionally generous around the urban area.
  if (latitude < 39.28 || latitude > 39.68 || longitude < -0.62 || longitude > -0.12) {
    throw new HttpsError('invalid-argument', 'The resource must be in Valencia metropolitan area.');
  }
  return {
    categoryId,
    name: cleanText(value?.name, { required: true, max: 180 }),
    description: cleanText(value?.description, { required: true }),
    address: cleanText(value?.address, { required: true, max: 500 }),
    phone: cleanText(value?.phone, { max: 120 }),
    email: cleanText(value?.email, { max: 320 }),
    website: cleanText(value?.website, { max: 500 }),
    scheduleRaw: cleanText(value?.scheduleRaw, { max: 1000 }),
    latitude,
    longitude,
  };
};

const addEvent = (transaction, resourceRef, event) => {
  transaction.set(resourceRef.collection('events').doc(), { ...event, createdAt: new Date().toISOString() });
};

export const saveContributorResource = onCall({ region: 'europe-west1' }, async (request) => {
  const auth = requireAuth(request);
  if (VOLUNTEER_EMAIL.test(auth.token.email || '')) throw new HttpsError('permission-denied', 'Use the volunteer resource workflow.');
  if (request.data?.contentPolicyAccepted !== true) throw new HttpsError('failed-precondition', 'Content policy acceptance is required.');
  const input = validateResourceInput(request.data?.resource);
  const resourceId = cleanText(request.data?.resourceId, { max: 200 });
  const now = new Date().toISOString();
  const profileRef = db.collection('userProfiles').doc(auth.uid);
  const profile = await profileRef.get();
  const displayName = cleanText(profile.data()?.displayName || auth.token.name || '', { max: 120 });

  return db.runTransaction(async (transaction) => {
    if (!resourceId) {
      const resourceRef = db.collection('resources').doc();
      const record = {
        ...input, status: 'pending_review', provenance: 'collaborator', ownerUid: auth.uid,
        ownerDisplayName: displayName || 'Colaborador', createdAt: now, updatedAt: now, submittedAt: now,
        reviewedAt: null, reviewedBy: null, reviewComment: '', withdrawalRequestedAt: null, archivedAt: null,
        translations: {}, schemaVersion: 2,
      };
      transaction.create(resourceRef, record);
      addEvent(transaction, resourceRef, { type: 'submitted', actorUid: auth.uid, actorEmail: auth.token.email || '', actorRole: 'collaborator' });
      return { id: resourceRef.id };
    }
    const resourceRef = db.collection('resources').doc(resourceId);
    const existing = await transaction.get(resourceRef);
    if (!existing.exists) throw new HttpsError('not-found', 'Resource not found.');
    const current = existing.data();
    if (current.ownerUid !== auth.uid || !['pending_review', 'rejected'].includes(current.status)) {
      throw new HttpsError('permission-denied', 'This resource cannot be edited.');
    }
    transaction.update(resourceRef, { ...input, status: 'pending_review', updatedAt: now, submittedAt: now, reviewedAt: null, reviewedBy: null, reviewComment: '' });
    addEvent(transaction, resourceRef, { type: 'edited', actorUid: auth.uid, actorEmail: auth.token.email || '', actorRole: 'collaborator' });
    addEvent(transaction, resourceRef, { type: 'submitted', actorUid: auth.uid, actorEmail: auth.token.email || '', actorRole: 'collaborator' });
    return { id: resourceId };
  });
});

export const requestResourceWithdrawal = onCall({ region: 'europe-west1' }, async (request) => {
  const auth = requireAuth(request);
  const resourceId = cleanText(request.data?.resourceId, { required: true, max: 200 });
  const resourceRef = db.collection('resources').doc(resourceId);
  const now = new Date().toISOString();
  await db.runTransaction(async (transaction) => {
    const resource = await transaction.get(resourceRef);
    if (!resource.exists || resource.data().ownerUid !== auth.uid || resource.data().status !== 'published') throw new HttpsError('permission-denied', 'This resource cannot be withdrawn.');
    transaction.update(resourceRef, { status: 'withdrawal_requested', withdrawalRequestedAt: now, updatedAt: now });
    addEvent(transaction, resourceRef, { type: 'withdrawal_requested', actorUid: auth.uid, actorEmail: auth.token.email || '', actorRole: 'collaborator' });
  });
  return { id: resourceId };
});

/**
 * Self-service deletion is deliberately separate from the client Auth API:
 * the server removes associated contributor data and makes approved catalogue
 * entries anonymous before deleting the Firebase Auth identity. Volunteer
 * accounts are organisation-managed and are rejected here.
 */
export const deleteContributorAccount = onCall({ region: 'europe-west1' }, async (request) => {
  const auth = requireAuth(request);
  if (VOLUNTEER_EMAIL.test(auth.token.email || '')) throw new HttpsError('permission-denied', 'Volunteer accounts are organisation-managed.');
  const authTime = Number(auth.token.auth_time || 0);
  if (!authTime || (Date.now() / 1000) - authTime > 300) {
    throw new HttpsError('failed-precondition', 'Recent authentication is required.');
  }

  const profile = await db.collection('userProfiles').doc(auth.uid).get();
  if (profile.exists && profile.data().accountLifecycle && profile.data().accountLifecycle !== 'self-managed') {
    throw new HttpsError('permission-denied', 'This account is not self-managed.');
  }
  const owned = await db.collection('resources').where('ownerUid', '==', auth.uid).get();
  const published = owned.docs.filter((resource) => resource.data().status === 'published');
  const removable = owned.docs.filter((resource) => resource.data().status !== 'published');
  // Apple explicitly includes user-generated content shared with others in the
  // deletion expectation. Until Bokatas approves a lawful retention policy for
  // moderated public records, fail before changing any data rather than silently
  // retaining content after claiming full account deletion.
  if (published.length) throw new HttpsError('failed-precondition', 'published-resources-require-policy');

  // Pending, rejected, withdrawn and archived proposals are no longer useful
  // catalogue records once their owner disappears; recursive deletion also
  // removes their private event trails.
  for (const resource of removable) await db.recursiveDelete(resource.ref);
  await db.collection('userProfiles').doc(auth.uid).delete();
  await adminAuth.deleteUser(auth.uid);

  logger.info('Contributor account deleted', { deletedPrivateResourceCount: removable.length });
  return { deleted: true };
});

/** A lightweight public safety/reporting channel for catalogue entries. */
export const reportResourceProblem = onCall({ region: 'europe-west1' }, async (request) => {
  const resourceId = cleanText(request.data?.resourceId, { required: true, max: 200 });
  const resourceName = cleanText(request.data?.resourceName, { required: true, max: 180 });
  const reason = cleanText(request.data?.reason, { required: true, max: 120 });
  const details = cleanText(request.data?.details, { max: 1200 });
  const allowedReasons = new Set(['incorrect', 'closed', 'safety', 'other']);
  if (!allowedReasons.has(reason)) throw new HttpsError('invalid-argument', 'Unknown report reason.');
  await db.collection('resourceReports').add({
    resourceId, resourceName, reason, details, status: 'pending', createdAt: new Date().toISOString(),
    reporterUid: request.auth?.uid || null,
  });
  return { received: true };
});

/** Closes a report after a volunteer has checked the catalogue entry. */
export const resolveResourceReport = onCall({ region: 'europe-west1' }, async (request) => {
  const auth = requireVolunteer(request);
  const reportId = cleanText(request.data?.reportId, { required: true, max: 200 });
  const reportRef = db.collection('resourceReports').doc(reportId);
  const report = await reportRef.get();
  if (!report.exists) throw new HttpsError('not-found', 'Report not found.');
  await reportRef.update({ status: 'resolved', resolvedAt: new Date().toISOString(), resolvedBy: auth.uid });
  return { resolved: true };
});

// This keeps the established volunteer experience while putting additions and
// editions behind the same validation and server-side authorization boundary.
export const saveVolunteerResource = onCall({ region: 'europe-west1' }, async (request) => {
  const auth = requireVolunteer(request);
  const input = validateResourceInput(request.data?.resource);
  const resourceId = cleanText(request.data?.resourceId, { max: 200 });
  const now = new Date().toISOString();
  return db.runTransaction(async (transaction) => {
    if (!resourceId) {
      const resourceRef = db.collection('resources').doc();
      transaction.create(resourceRef, {
        ...input, status: 'published', provenance: 'volunteer', ownerUid: null,
        ownerDisplayName: auth.token.email || 'Voluntario Bokatas', createdAt: now, updatedAt: now,
        submittedAt: now, publishedAt: now, reviewedAt: now, reviewedBy: auth.uid, reviewComment: '',
        withdrawalRequestedAt: null, archivedAt: null, translations: {}, schemaVersion: 2,
      });
      addEvent(transaction, resourceRef, { type: 'created_by_volunteer', actorUid: auth.uid, actorEmail: auth.token.email || '', actorRole: 'volunteer' });
      return { id: resourceRef.id };
    }
    const resourceRef = db.collection('resources').doc(resourceId);
    const existing = await transaction.get(resourceRef);
    if (!existing.exists()) throw new HttpsError('not-found', 'Resource not found.');
    if (existing.data().status !== 'published') throw new HttpsError('failed-precondition', 'Only published resources can be edited here.');
    transaction.update(resourceRef, { ...input, updatedAt: now });
    addEvent(transaction, resourceRef, { type: 'edited_by_volunteer', actorUid: auth.uid, actorEmail: auth.token.email || '', actorRole: 'volunteer' });
    return { id: resourceId };
  });
});

export const reviewResource = onCall({ region: 'europe-west1' }, async (request) => {
  const auth = requireVolunteer(request);
  const resourceId = cleanText(request.data?.resourceId, { required: true, max: 200 });
  const action = cleanText(request.data?.action, { required: true, max: 40 });
  const comment = cleanText(request.data?.comment, { max: 1200 });
  if (!['approve', 'reject', 'archive'].includes(action)) throw new HttpsError('invalid-argument', 'Unknown review action.');
  const resourceRef = db.collection('resources').doc(resourceId);
  const now = new Date().toISOString();
  await db.runTransaction(async (transaction) => {
    const resource = await transaction.get(resourceRef);
    if (!resource.exists) throw new HttpsError('not-found', 'Resource not found.');
    const current = resource.data();
    const nextStatus = action === 'approve' ? 'published' : action === 'reject' ? 'rejected' : 'archived';
    if ((action === 'archive' && current.status !== 'withdrawal_requested') || (action !== 'archive' && current.status !== 'pending_review')) {
      throw new HttpsError('failed-precondition', 'This resource is no longer awaiting this review.');
    }
    transaction.update(resourceRef, {
      status: nextStatus, updatedAt: now, reviewedAt: now, reviewedBy: auth.uid, reviewComment: comment,
      ...(nextStatus === 'published' ? { publishedAt: now } : {}),
      ...(nextStatus === 'archived' ? { archivedAt: now } : {}),
    });
    addEvent(transaction, resourceRef, { type: action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : 'archived', actorUid: auth.uid, actorEmail: auth.token.email || '', actorRole: 'volunteer', comment });
  });
  return { id: resourceId };
});

const systemInstructions = {
  es: `Eres un asistente compasivo y servicial para personas que se encuentran en situacion de calle o vulnerabilidad.
Tu proposito es ofrecer apoyo, informacion clara y animo.
Cuando un usuario te describa su situacion, responde con empatia y sugiere de forma general que tipo de recursos (como 'Albergues', 'Comida', 'Salud' o 'Empleo') podrian serle mas utiles.
No inventes nombres de lugares especificos ni direcciones. Limitate a guiar al usuario hacia las categorias de ayuda correctas que existen en la app.
Manten tus respuestas breves, claras y faciles de entender. Responde en espanol.`,
  en: `You are a compassionate and helpful assistant for people experiencing homelessness or vulnerability.
Your purpose is to offer support, clear information, and encouragement.
When a user describes their situation, respond with empathy and suggest what types of resources (like 'Shelters', 'Food', 'Health', or 'Employment') might be most helpful.
Do not invent specific place names or addresses. Just guide the user to the correct help categories available in the app.
Keep your answers brief, clear, and easy to understand. Respond in English.`,
  it: `Sei un assistente compassionevole e disponibile per persone che si trovano in situazione di senza fissa dimora o vulnerabilita.
Il tuo scopo e offrire supporto, informazioni chiare e incoraggiamento.
Quando un utente descrive la sua situazione, rispondi con empatia e suggerisci in modo generale quali tipi di risorse (come 'Rifugi', 'Cibo', 'Salute' o 'Lavoro') potrebbero essere piu utili.
Non inventare nomi di luoghi specifici o indirizzi. Limitati a guidare l'utente verso le corrette categorie di aiuto disponibili nell'app.
Mantieni le tue risposte brevi, chiare e facili da capire. Rispondi in italiano.`,
  ar: `انت مساعد عطوف ومفيد للاشخاص الذين يعانون من التشرد او الضعف.
هدفك هو تقديم الدعم والمعلومات الواضحة والتشجيع.
عندما يصف المستخدم حالته، استجب بتعاطف واقترح بشكل عام انواع الموارد (مثل "الملاجئ" او "الطعام" او "الصحة" او "العمل") التي قد تكون مفيدة له.
لا تخترع اسماء اماكن او عناوين محددة. قم فقط بتوجيه المستخدم الى فئات المساعدة الصحيحة المتوفرة في التطبيق.
اجعل اجاباتك قصيرة وواضحة وسهلة الفهم. اجب باللغة العربية.`,
  fr: `Vous etes un assistant compatissant et serviable pour les personnes en situation d'itinerance ou de vulnerabilite.
Votre objectif est d'offrir du soutien, des informations claires et des encouragements.
Lorsqu'un utilisateur decrit sa situation, repondez avec empathie et suggerez quels types de ressources (comme 'Hebergements', 'Nourriture', 'Sante' ou 'Emploi') pourraient etre les plus utiles.
N'inventez pas de noms de lieux ou d'adresses specifiques. Contentez-vous de guider l'utilisateur vers les bonnes categories d'aide disponibles dans l'application.
Gardez vos reponses breves, claires et faciles a comprendre. Repondez en francais.`,
};

export const assistant = onRequest(
  {
    region: 'europe-west1',
    secrets: [geminiApiKey],
    cors: true,
  },
  async (req, res) => {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    const message = typeof req.body?.message === 'string' ? req.body.message.trim() : '';
    const locale = typeof req.body?.locale === 'string' ? req.body.locale : 'es';

    if (!message) {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    const instruction = systemInstructions[locale] || systemInstructions.es;

    try {
      const ai = new GoogleGenAI({ apiKey: geminiApiKey.value() });
      const response = await ai.models.generateContent({
        model,
        contents: message,
        config: {
          systemInstruction: instruction,
          temperature: 0.7,
        },
      });

      res.status(200).json({
        text: response.text || '',
      });
    } catch (error) {
      logger.error('Assistant generation failed', error);
      res.status(500).json({ error: 'Assistant generation failed' });
    }
  }
);
