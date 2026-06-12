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
   - `ruta-9@voluntarios.bokatas.local`
3. Asigna una contrasena sencilla a cada responsable de ruta.
4. En `.env.local` configura:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_APP_ID`

El dominio de los usuarios voluntarios queda fijado en `voluntarios.bokatas.local` para que el frontend coincida con las reglas de Firestore. Si necesitas otro dominio, hay que cambiar cliente y reglas a la vez.

## Recursos creados por voluntarios (Firestore)

1. Crea Firestore Database en modo Native (si aun no existe).
2. Despliega reglas e indices:
   - `firebase deploy --only firestore:rules,firestore:indexes`
3. Las reglas permiten:
   - Lectura publica de recursos.
   - Escritura solo a usuarios autenticados `ruta-1` ... `ruta-9`.

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

## Validacion de regresiones

Con la app levantada en local, hay varios checks automatizados con Playwright:

Usa preferiblemente `http://localhost:3000`. La clave actual de Google Maps no autoriza `http://127.0.0.1:4173`, y en ese host el mapa quedara gris con `RefererNotAllowedMapError`.

- `npm run test:auth-race`
  valida que el acceso de voluntarios no entre con una ruta equivocada durante el login.
- `npm run test:map-xss`
  valida que el popup del mapa no ejecute HTML inyectado y que siga navegando al detalle.
- `npm run test:list-map`
  valida que el mapa aparezca por defecto en los listados tanto en desktop como en movil.
- `npm run test:volunteer-dropdowns`
  valida cierres al tocar fuera y cambios de modulo/categoria en el area de voluntariado.

### Smoke real con Firebase

Para la comprobacion end-to-end contra Firebase/Firestore:

1. Levanta la app local.
2. Exporta credenciales reales de una ruta:
   - `export TEST_VOLUNTEER_USERNAME=ruta-5`
   - `export TEST_VOLUNTEER_PASSWORD='...'`
3. Ejecuta:
   - `npm run test:smoke-real`

Ese smoke comprueba login real, guardado/reversion de suministros y carga del modulo de edicion tanto en desktop como en movil.

## Modulo de Suministros (Area voluntarios)

Nueva funcionalidad para gestionar suministros semanales por ruta ISO.

### Pantallas

- `Mi ruta`: base semanal, ajustes (+/-), final calculado y guardado.
- `Resumen global`: tabla por suministros x rutas con totales.
- `Lista de compra`: agregados calculados y vista imprimible (`window.print()`).

### Colecciones Firestore

- `routesConfig/{routeId}`:
  - `routeId`, `displayName`, `active`
  - `baseWeekly` con campos: `tortilla, pavo, zumos, gazpacho, caldo, fruta, cafeConLeche, cafeSolo`
  - `updatedAt`, `updatedBy`
- `routeSupplyWeeks/{routeId_YYYY-Www}`:
  - `routeId`, `weekKey`
  - `base`, `adjustments`, `final`
  - `updatedBy`, `updatedAt`, `createdAt`
- `supplyRules/global`:
  - `breadSandwichesPerBar`
  - `breadBarsPerPack`
  - `omeletteSandwichesPerUnit`
  - `turkeySlicesPerSandwich`
  - `juiceUnitsPerBrick`
  - `milkUnitsPerBrick`
  - `brothUnitsPerBrick`

### Formula base

- `final = max(0, base + adjustment)`

### Calculo de compra

- `total_bocadillos = total_tortilla + total_pavo`
- `barras_necesarias = ceil(total_bocadillos / breadSandwichesPerBar)`
- `packs_pan = ceil(barras_necesarias / breadBarsPerPack)`
- `tortillas_necesarias = ceil(total_tortilla / omeletteSandwichesPerUnit)`
- `lonchas_pavo = total_pavo * turkeySlicesPerSandwich`
- `briks_zumo = ceil(total_zumos / juiceUnitsPerBrick)`
- `briks_caldo = ceil(total_caldo / brothUnitsPerBrick)`
- `briks_leche = ceil(total_cafe_con_leche / milkUnitsPerBrick)`
- `briks_gazpacho = total_gazpacho`
- `fruta_total = total_fruta`

### Servicios desacoplados

- `services/supplyCalculations.ts`: formulas, agregados, lista de compra.
- `services/supplyRules.ts`: carga de reglas parametrizables.
- `services/supplyService.ts`: persistencia semanal por ruta.

### Permisos (Firestore rules)

- Cada usuario `ruta-1 ... ruta-9` solo escribe su propia ruta.
- Lectura global de `routeSupplyWeeks` para resumen/lista agregada.
- `routesConfig` solo lectura/escritura de la propia ruta.
- `supplyRules/global` solo lectura para usuarios autenticados de ruta.

## Despliegue

`firebase deploy`
