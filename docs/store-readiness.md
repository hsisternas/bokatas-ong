# Store readiness — Bokatas

Consulta realizada el **30 de agosto de 2026**. Este documento prepara la decisión de publicar; no supone que exista todavía una app nativa ni cuentas de tienda.

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
| Email, identificador Firebase y proveedor de acceso de colaborador | Cuenta, sesión y propiedad de recursos | Firebase Authentication / Firestore | Falta definir eliminación integral de cuenta y datos asociados |
| Nombre básico de colaborador si está disponible | Identificar la aportación a moderadores | Firestore | Pendiente de política operativa de eliminación |
| Recursos propuestos, estado y trazabilidad | Moderación y directorio público | Firestore / Cloud Functions de Firebase | Conservación operativa; falta política explícita de borrado o anonimización |
| Credenciales y datos operativos de voluntariado | Rutas, compra y gestión interna | Firebase Authentication / Firestore | Fuera del flujo público; falta inventario formal de retención |
| Ubicación aproximada, solo bajo acción explícita | Ordenar recursos por proximidad | Solo memoria del navegador; no se persiste ni se envía al backend | Se pierde al recargar/cerrar |
| Dirección, teléfono y otros datos de recursos | Directorio público | Firestore | Debe conservarse mientras el recurso esté publicado y vigente |

No se ha encontrado instrumentación de analítica, publicidad ni SDK de tracking inicializada en el código. Firebase y Google Maps deben declararse de acuerdo con la configuración y el comportamiento final de cada SDK antes de publicar.

## Apple App Store

| Requisito | Estado | Acción necesaria | Prioridad |
| --- | --- | --- | --- |
| Cuenta de organización / App Store Connect | MISSING | Alta en Apple Developer Program como organización y verificación correspondiente | Bloqueante de publicación |
| Política de privacidad accesible | READY | Usar URL oficial y revisar que cubra exactamente la app/Firebase | Bloqueante de publicación |
| Etiquetas App Privacy | MISSING | Completar a partir del inventario y configuraciones finales de Firebase/Maps | Bloqueante de publicación |
| Eliminación de cuenta | MISSING | Añadir flujo in-app que elimine la cuenta del colaborador y trate sus recursos publicados con una decisión aprobada por Bokatas | Bloqueante de publicación |
| Sign in with Apple | NEEDS DECISION | Si la app iOS mantiene Google Sign-In para colaboradores, añadir Sign in with Apple o documentar una excepción aplicable; la opción email/contraseña actual no sustituye automáticamente la alternativa privada de Apple | Bloqueante antes de iOS |
| UGC / recursos enviados | MISSING | La moderación previa ayuda, pero Apple exige filtrado, reporte, bloqueo de usuarios y contacto publicado cuando aplica UGC. Validar el alcance con revisión legal/App Review y añadir los controles necesarios | Bloqueante antes de iOS |
| Contacto de soporte | READY | `info@bokatas.org` existe; crear URL/página de soporte específica de la app | Muy recomendable |
| Revisión | MISSING | Proporcionar cuenta demo o instrucciones/credenciales de revisión para el área interna | Bloqueante de envío |
| Valor de app instalada | NEEDS DECISION | Mantener experiencia útil instalada: compartir, mapas/enlaces, uso con mala conexión y navegación directa; evitar un simple contenedor web | Muy recomendable |

Fuentes: [App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/) (UGC 1.2 y acceso durante revisión), [account deletion](https://developer.apple.com/support/offering-account-deletion-in-your-app/), [App Privacy](https://developer.apple.com/app-store/app-privacy-details/), [Sign in with Apple guideline 4.8](https://developer.apple.com/app-store/review/guidelines/).

## Google Play

| Requisito | Estado | Acción necesaria | Prioridad |
| --- | --- | --- | --- |
| Cuenta Play Console de organización | MISSING | Crear cuenta, verificación de organización y perfil de desarrollador | Bloqueante de publicación |
| Data Safety | MISSING | Declarar datos, finalidad, compartición, cifrado y eliminación desde la configuración final | Bloqueante de publicación |
| Eliminación de cuenta | MISSING | Ofrecer eliminación dentro de la app y enlace web de solicitud/explicación conforme a Play | Bloqueante de publicación |
| UGC / recursos enviados | MISSING | Confirmar que la moderación previa es suficiente y añadir report/block/contacto si aplica al flujo publicado | Bloqueante antes de publicación |
| Política de privacidad | READY | URL oficial existente; comprobar cobertura específica de la app | Bloqueante de publicación |
| Permisos | READY | No pedir permisos nativos al empaquetar salvo ubicación bajo acción, que debe justificarse en la ficha | Muy recomendable |
| Testing | MISSING | Ejecutar testing interno/cerrado con dispositivos reales antes de producción | Bloqueante de lanzamiento |

Fuentes: [Data deletion requirements](https://support.google.com/googleplay/android-developer/answer/13327111?hl=en), [UGC policy](https://support.google.com/googleplay/android-developer/answer/9876937?hl=en), [Data safety](https://support.google.com/googleplay/android-developer/answer/10787469?hl=en).

## Formulario «Hazte voluntario»

La página oficial describe el recorrido (datos, sede, zona y contacto), pero su HTML público actual renderiza una plantilla Elementor sin campos de formulario, acción HTTP, endpoint REST documentado ni política CORS que esta SPA pueda reutilizar de forma segura. No se utiliza ni se imita un nonce/CSRF de WordPress.

La aplicación contiene el formulario y validación de esos datos mínimos, pero su transporte queda explícitamente desacoplado y **no envía datos ni muestra éxito falso**. Para conectarlo habrá que recibir de Bokatas una de estas opciones: endpoint propio documentado con protección servidor-a-servidor, o una decisión de destino/operativa para gestionar solicitudes. La política oficial reconoce el tratamiento de datos de personas interesadas en voluntariado para contacto inicial y organización de actividades.

## Offline y deep links

- No hay service worker ni caché de catálogo en este repositorio. El 80/20 recomendado es cachear el último catálogo publicado, fichas abiertas y datos de contacto/dirección; no un mapa offline completo.
- La nueva ruta pública estable `/hazte-voluntario` funciona con el rewrite de Hosting. Las rutas de categoría/recurso siguen siendo estado interno de la SPA: antes de Capacitor conviene darles URLs públicas estables sin romper los enlaces existentes.

## Siguiente fase móvil, no iniciada

Capacitor sigue siendo la primera opción para empaquetar la SPA sin reescritura. Firebase web/Firestore y el compartir de archivos encajan conceptualmente; Google Sign-In, deep links, status bars/safe areas y permisos necesitarán configuración nativa. No se ha instalado Capacitor ni creado proyecto iOS/Android en esta iteración.

## Cuentas y costes oficiales

- Apple Developer Program: 99 USD/año; existen [exenciones para organizaciones elegibles](https://developer.apple.com/help/account/membership/fee-waivers/). Fuente: [Apple Developer Program](https://developer.apple.com/programs/whats-included/).
- Google Play Console para distribución completa: pago único de 25 USD. Fuente: [Google Play Console](https://support.google.com/android-developer-console/answer/16640817?hl=en).
