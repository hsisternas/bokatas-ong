# Store readiness — Bokatas

Consulta actualizada el **2 de septiembre de 2026**. Hay proyectos nativos Capacitor compilables; no existen todavía cuentas ni credenciales de distribución.

## Datos institucionales localizados

| Dato | Valor | Fuente oficial |
| --- | --- | --- |
| Titular | Asociación Bokatas | [Aviso legal](https://bokatas.org/aviso-legal/) |
| CIF | G86039021 | [Aviso legal](https://bokatas.org/aviso-legal/) |
| Domicilio publicado | C/ Marqués de Monteagudo, 22, Madrid | [Aviso legal](https://bokatas.org/aviso-legal/) |
| Contacto general | info@bokatas.org | [Aviso legal](https://bokatas.org/aviso-legal/) |
| Contacto de protección de datos | datos@bokatas.org | [Política de privacidad](https://bokatas.org/politica-de-privacidad/) |
| Naturaleza / registro | Entidad sin ánimo de lucro, de iniciativa social e independiente, de utilidad pública; Registro Nacional de Asociaciones 606997 | [Bokatas](https://bokatas.org/como-ayudar/hazte-voluntario/) |
| Privacidad / aviso legal | Ya publicados | [Privacidad](https://bokatas.org/politica-de-privacidad/), [aviso legal](https://bokatas.org/aviso-legal/) |
| Canal de denuncias | Existe canal oficial con comunicación anónima | [Canal de denuncias](https://bokatas.org/como-ayudar/canal-de-denuncias/) |

## Inventario preliminar de datos de la aplicación

| Dato | Finalidad | Almacenamiento / destinatarios | Retención / eliminación |
| --- | --- | --- | --- |
| Email, identificador Firebase y proveedor de acceso de colaborador | Cuenta, sesión y propiedad de recursos | Firebase Authentication / Firestore | Eliminación autoservicio por Cloud Function con reautenticación; los recursos no publicados se eliminan. Los publicados detienen la operación hasta política institucional aprobada. |
| Nombre básico de colaborador si está disponible | Identificar la aportación a moderadores | Firestore | Se elimina con el perfil de colaborador |
| Recursos propuestos, estado y trazabilidad | Moderación y directorio público | Firestore / Cloud Functions de Firebase | Los no publicados se eliminan con la cuenta; recursos publicados bloquean la eliminación hasta decisión institucional compatible con Apple/GDPR |
| Credenciales y datos operativos de voluntariado | Rutas, compra y gestión interna | Firebase Authentication / Firestore | Cuenta gestionada por Bokatas, sin registro público ni borrado autoservicio; el acceso se desactiva administrativamente conservando las referencias operativas necesarias. |
| Avisos sobre recursos publicados | Corregir, retirar o verificar un recurso | Firestore (`resourceReports`) / Cloud Functions | Solo voluntariado autorizado puede consultar y cerrar la cola; no se expone identidad de informantes al público. |
| Ubicación aproximada, solo bajo acción explícita | Ordenar recursos por proximidad | Solo memoria del navegador; no se persiste ni se envía al backend | Se pierde al recargar/cerrar |
| Dirección, teléfono y otros datos de recursos | Directorio público | Firestore | Debe conservarse mientras el recurso esté publicado y vigente |

No se ha encontrado instrumentación de analítica, publicidad ni SDK de tracking inicializada en el código. Firebase y Google Maps deben declararse de acuerdo con la configuración y el comportamiento final de cada SDK antes de publicar.

## Apple App Store

| Requisito | Estado | Acción necesaria | Prioridad |
| --- | --- | --- | --- |
| Cuenta de organización / App Store Connect | MISSING | Alta en Apple Developer Program como organización y verificación correspondiente | Bloqueante de publicación |
| Política de privacidad accesible | READY | Usar URL oficial y revisar que cubra exactamente la app/Firebase | Bloqueante de publicación |
| Etiquetas App Privacy | MISSING | Completar a partir del inventario y configuraciones finales de Firebase/Maps | Bloqueante de publicación |
| Eliminación de cuenta | PREPARED | Ruta in-app y `/eliminar-cuenta`, reautenticación y Cloud Function implementadas para cuentas sin recursos publicados; falta política/implementación institucional para UGC publicado | Bloqueante de publicación |
| Sign in with Apple | EXTERNAL | La guideline 4.8 aplica si Google continúa siendo login de terceros para colaboradores. La arquitectura oculta Google en WebView nativa hasta configurar OAuth; faltan Team ID, App/Service ID, key y provider Firebase para añadir Apple correctamente | Bloqueante antes de iOS |
| UGC / recursos enviados | PREPARED | Moderación humana previa, aceptación de normas y aviso de problema implementados; falta política operativa de respuesta y suspensión de colaboradores abusivos | Bloqueante antes de iOS |
| Contacto de soporte | READY | `info@bokatas.org` existe; crear URL/página de soporte específica de la app | Muy recomendable |
| Revisión | MISSING | Proporcionar cuenta demo o instrucciones/credenciales de revisión para el área interna | Bloqueante de envío |
| Valor de app instalada | PREPARED | Catálogo público, ubicación contextual, mapas/direcciones, exportación PNG con share sheet, áreas operativas y enlaces directos; falta QA física y caché offline mínima | Muy recomendable |

Fuentes: [App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/) (UGC 1.2 y acceso durante revisión), [account deletion](https://developer.apple.com/support/offering-account-deletion-in-your-app/), [App Privacy](https://developer.apple.com/app-store/app-privacy-details/), [Sign in with Apple guideline 4.8](https://developer.apple.com/app-store/review/guidelines/).

## Google Play

| Requisito | Estado | Acción necesaria | Prioridad |
| --- | --- | --- | --- |
| Cuenta Play Console de organización | MISSING | Crear cuenta, verificación de organización y perfil de desarrollador | Bloqueante de publicación |
| Data Safety | MISSING | Declarar datos, finalidad, compartición, cifrado y eliminación desde la configuración final | Bloqueante de publicación |
| Eliminación de cuenta | PREPARED | Ruta in-app y externa implementadas; publicar/declarar URL y resolver tratamiento de recursos publicados | Bloqueante de publicación |
| UGC / recursos enviados | PREPARED | Moderación previa, normas y reporte en ficha implementados; falta proceso de respuesta/suspensión documentado | Bloqueante antes de publicación |
| Política de privacidad | READY | URL oficial existente; comprobar cobertura específica de la app | Bloqueante de publicación |
| Permisos | READY | No pedir permisos nativos al empaquetar salvo ubicación bajo acción, que debe justificarse en la ficha | Muy recomendable |
| Testing | MISSING | Ejecutar testing interno/cerrado con dispositivos reales antes de producción. Las cuentas personales creadas después del 13/11/2023 tienen además el requisito de testing cerrado indicado por Google | Bloqueante de lanzamiento |

Fuentes: [Data deletion requirements](https://support.google.com/googleplay/android-developer/answer/13327111?hl=en), [UGC policy](https://support.google.com/googleplay/android-developer/answer/9876937?hl=en), [Data safety](https://support.google.com/googleplay/android-developer/answer/10787469?hl=en).

## Formulario «Hazte voluntario»

La página oficial describe el recorrido (datos, sede, zona y contacto), pero su HTML público actual renderiza una plantilla Elementor sin campos de formulario, acción HTTP, endpoint REST documentado ni política CORS que esta SPA pueda reutilizar de forma segura. No se utiliza ni se imita un nonce/CSRF de WordPress.

La aplicación contiene el formulario y validación de esos datos mínimos, pero su transporte queda explícitamente desacoplado y **no envía datos ni muestra éxito falso**. Para conectarlo habrá que recibir de Bokatas una de estas opciones: endpoint propio documentado con protección servidor-a-servidor, o una decisión de destino/operativa para gestionar solicitudes. La política oficial reconoce el tratamiento de datos de personas interesadas en voluntariado para contacto inicial y organización de actividades.

## Offline y deep links

- No hay service worker ni caché de catálogo en este repositorio. El 80/20 recomendado es cachear el último catálogo publicado, fichas abiertas y datos de contacto/dirección; no un mapa offline completo.
- Las rutas públicas `/categoria/:id` y `/recurso/:id` se normalizan en la SPA y la app nativa escucha `appUrlOpen`. Android declara esquema propio y App Links; iOS declara esquema y Associated Domains. Publicar/validar `assetlinks.json` y `apple-app-site-association` depende de los IDs y firmas finales; ver [deep-links.md](./deep-links.md).

## Siguiente fase móvil, no iniciada

Capacitor v8 es la opción elegida para empaquetar la SPA sin reescritura. En la rama `feat/mobile-app` existen los proyectos iOS y Android desde `bokatas-web-v1-final`, con identificador **temporal de desarrollo** `org.bokatas.mobile.dev`, `webDir: dist`, plugins App, Filesystem, Geolocation, Share y Status Bar. No representa un identificador definitivo ni se ha registrado en una tienda.

- La ubicación sigue siendo contextual: el permiso nativo solo se solicita desde «Ver cerca de mí». iOS incluye la descripción de uso y Android declara permisos fino/grueso.
- El tema de Bokatas sincroniza la barra de estado nativa; el Web SDK de Firebase, Firestore y Functions se mantienen por ahora.
- `npm run mobile:sync` es correcto. Android produce APK debug firmado y AAB release sin firmar con JDK 21; iOS compila para Simulator con Xcode 26.6 y se instala en iPhone 17 Pro Simulator. Falta QA en dispositivo físico y signing de distribución.
- Google Sign-In no se ejecuta con `signInWithPopup` dentro de WebView nativa: se mantiene en web y se oculta en native hasta configurar OAuth nativo. Sign in with Apple requiere App ID/Service ID, callbacks, key y provider Firebase del titular; no se han creado credenciales ni configurado secretos.
- Los enlaces directos de categoría/recurso aún necesitan URLs canónicas antes de activar App links/Universal Links. La ruta pública `/hazte-voluntario` ya es estable.

### Bloqueantes que requieren decisión institucional

1. **Eliminación de cuenta.** Apple y Google exigen la iniciación de borrado desde la app; Google además exige URL pública. Está implementada para cuentas sin recursos publicados. Apple indica que el UGC compartido debe eliminarse junto con la cuenta salvo obligación legal; Bokatas debe aprobar por escrito la política y el comportamiento final para publicados.
2. **UGC.** La moderación previa, aceptación de normas y mecanismo de reporte ya están implementados. Bokatas debe definir respuesta a avisos y suspensión de colaboradores abusivos; no se ha creado un sistema social innecesario.
3. **Sign in with Apple.** La guideline 4.8 de Apple debe resolverse si se conserva Google como login social principal en iOS. Requiere cuenta Apple Developer de Bokatas y configuración Firebase, no solo código.

Fuentes verificadas el 31 de agosto de 2026: [Apple App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/), [Apple account deletion](https://developer.apple.com/support/offering-account-deletion-in-your-app/), [Google account deletion](https://support.google.com/googleplay/android-developer/answer/13327111?hl=en), [Google UGC](https://support.google.com/googleplay/android-developer/answer/9876937?hl=en), [Google testing personal accounts](https://support.google.com/googleplay/android-developer/answer/14151465?hl=en), [Capacitor](https://capacitorjs.com/docs/getting-started).

## Cuentas y costes oficiales

- Apple Developer Program: 99 USD/año; existen [exenciones para organizaciones elegibles](https://developer.apple.com/help/account/membership/fee-waivers/). Fuente: [Apple Developer Program](https://developer.apple.com/programs/whats-included/).
- Google Play Console para distribución completa: pago único de 25 USD. Fuente: [Google Play Console](https://support.google.com/android-developer-console/answer/16640817?hl=en).
