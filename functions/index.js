import { GoogleGenAI } from '@google/genai';
import * as logger from 'firebase-functions/logger';
import { onRequest } from 'firebase-functions/v2/https';
import { defineSecret } from 'firebase-functions/params';

const geminiApiKey = defineSecret('GEMINI_API_KEY');
const model = 'gemini-2.5-flash';

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
