# Evaluación de empaquetado móvil

Fecha: 2026-08-30. Esta evaluación no crea cuentas de tienda, certificados ni
builds nativos.

## Estado actual

Bokatas es una SPA React/Vite alojada en Firebase Hosting. Usa Firebase Auth,
Firestore, Functions y Security Rules mediante el SDK web. Tiene manifest y
`viewport-fit=cover`; no incorpora un service worker, por lo que actualmente
no ofrece funcionamiento offline completo.

La cabecera usa `env(safe-area-inset-top)` y el documento actualiza
`theme-color` al alternar el tema. En una PWA instalada iOS se usa
`black-translucent` para que la cabecera segura cubra la zona del sistema. iOS
no garantiza que Safari/PWA aplique dinámicamente cada cambio de color de la
barra de estado desde JavaScript: la comprobación final debe hacerse en un
iPhone real, tanto en Safari como instalada.

## Opciones

### A. PWA solamente — recomendada mientras se valida el uso

- Esfuerzo: bajo.
- Ventajas: no duplica la aplicación, entrega inmediata por Hosting y conserva
  el flujo actual de Firebase y Google Sign-In web.
- Límites: instalación menos visible en iOS, sin presencia en tiendas y sin
  push nativo completo. Para offline real habría que añadir un service worker
  y definir una política de caché.

### B. Capacitor para iOS y Android — recomendada para una futura publicación

- Esfuerzo: medio y contenido; mantiene React/Vite como única interfaz.
- Añadir Capacitor después de decidir los identificadores definitivos de iOS y
  Android. Se generarán los proyectos nativos y se probarán en dispositivos,
  sin sustituir la web.
- Email/contraseña Firebase puede conservarse. El flujo Google web basado en
  popup/redirección no debe darse por compatible con WKWebView: deberá usarse
  un bridge de autenticación nativa compatible con Firebase o un flujo OAuth
  con URL schemes/deep links probado.
- Configuración pendiente: bundle ID/Android package, ficheros Firebase nativos
  (`GoogleService-Info.plist` y `google-services.json`), clientes OAuth,
  URL schemes/authorized domains, SHA de firma Android y pruebas de callbacks.
- Firestore, Functions y Rules se mantienen; la app sigue usando los mismos
  backends y permisos. Se debe validar el origen `capacitor://localhost` y los
  dominios autorizados de Firebase Auth antes de publicar.
- `window.print()` requiere prueba en cada plataforma; si el webview no expone
  una hoja de impresión satisfactoria, el siguiente paso será compartir HTML/PDF
  con una integración nativa pequeña, no otra implementación de la lista.

### C. Reescritura nativa — no recomendada

- Esfuerzo y mantenimiento: altos.
- Duplicaría formularios, autenticación, traducciones y la lógica del
  directorio sin aportar una ventaja proporcional para Bokatas.

## Valor nativo mínimo para tiendas

Un contenedor que solo replique el sitio tiene riesgo de revisión. La primera
versión Capacitor debería aportar al menos acciones propias del teléfono:
compartir un recurso, abrir una dirección en mapas, y notificaciones push para
revisiones/estado semanal. El caché de lectura de los recursos también mejora
el valor fuera de línea.

## Próxima fase propuesta

1. Confirmar bundle IDs y cuentas de Apple/Google sin publicarlas.
2. Añadir Capacitor y proyectos iOS/Android en una rama dedicada.
3. Configurar Firebase/Auth y probar Google, email/password, deep links y
   logout en hardware.
4. Incorporar compartir y apertura de mapas; evaluar push.
5. Probar impresión/compartir en iPhone y Android, accesibilidad, offline y
   regresiones de reglas antes de generar builds de distribución.
