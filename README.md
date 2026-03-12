<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Bokatas ONG (Firebase migration)

Aplicacion React para consultar recursos sociales con despliegue en Firebase.

## Arquitectura segura

- Frontend: Vite + React (Hosting).
- Backend IA: Cloud Function `assistant` (no se llama Gemini desde el navegador).
- Secretos: `GEMINI_API_KEY` en Secret Manager de Firebase Functions.
- Endpoint frontend: `/api/assistant` (rewrite de Hosting a Function).

## Requisitos

- Node.js 22
- Firebase CLI (`npm i -g firebase-tools`)

## Configuracion inicial de Firebase

1. Login en Firebase:
   `firebase login`
2. Selecciona tu proyecto:
   `firebase use --add`
3. Actualiza `.firebaserc` con tu `projectId`.
4. Configura el secreto (NO en GitHub):
   `firebase functions:secrets:set GEMINI_API_KEY`
5. Instala dependencias:
   `npm install`
   `npm install --prefix functions`

## Configuracion de acceso voluntarios (sin registro)

1. En Firebase Console abre `Authentication` y habilita proveedor `Email/Password`.
2. Crea manualmente usuarios del tipo:
   - `ruta-1@voluntarios.bokatas.local`
   - ...
   - `ruta-10@voluntarios.bokatas.local`
3. Asigna una contrasena sencilla a cada responsable de ruta.
4. En `.env.local` configura:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_APP_ID`
   - `VITE_VOLUNTEER_EMAIL_DOMAIN=voluntarios.bokatas.local`

## Recursos creados por voluntarios (Firestore)

1. Crea Firestore Database en modo Native (si aun no existe).
2. Despliega reglas e indices:
   - `firebase deploy --only firestore:rules,firestore:indexes`
3. Las reglas permiten:
   - Lectura publica de recursos.
   - Escritura solo a usuarios autenticados `ruta-1` ... `ruta-10`.

## Desarrollo local

- Frontend:
  `npm run dev`
- Para habilitar mapa, crea `.env.local` con:
  `VITE_GOOGLE_MAPS_API_KEY=<TU_BROWSER_KEY_RESTRINGIDA>`
- Si quieres probar el asistente en local contra backend desplegado:
  añade tambien en `.env.local`:
  `VITE_ASSISTANT_API_URL=https://europe-west1-<tu-project-id>.cloudfunctions.net/assistant`

## Seguridad de Google Maps

La clave de Google Maps JavaScript API vive en el cliente y sera visible en el navegador. Para que sea segura:

1. Restriccion de aplicacion: `HTTP referrers (web sites)` con tus dominios:
   - `https://bokatas-ong.web.app/*`
   - `https://bokatas-ong.firebaseapp.com/*`
   - tu dominio custom si aplica
2. Restriccion de API: solo `Maps JavaScript API` (y solo APIs extra si realmente las usas).
3. No reutilizar esa key para backend ni para Gemini.

## Build

`npm run build`

## Despliegue

`firebase deploy`
