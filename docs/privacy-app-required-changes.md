# Cambios requeridos en la política de privacidad de la app Bokatas

Pendiente de aprobación y publicación por Asociación Bokatas. No sustituye asesoramiento legal.

La política de `bokatas.org` debe identificar expresamente esta app móvil y describir:

| Dato | Finalidad / servicio | Conservación / eliminación |
| --- | --- | --- |
| Email, Firebase UID, proveedor de acceso y nombre de colaborador | Cuenta de colaborador, autenticación y propiedad de aportaciones | Hasta eliminación de cuenta; la eliminación se bloquea de forma segura si existen recursos publicados hasta que Bokatas apruebe una política compatible |
| Recursos propuestos y moderación | Revisión, publicación y trazabilidad del directorio | Pendientes/rechazados/retirados se eliminan al borrar cuenta; Apple incluye el UGC publicado en la expectativa de eliminación salvo obligación legal, por lo que no se anonimiza automáticamente sin decisión institucional |
| Cuentas de voluntariado provisionadas | Operativa interna de rutas, compras y moderación | Gestionadas por Bokatas; no hay registro público ni eliminación autoservicio |
| Ubicación | Orden local y temporal de recursos cercanos, solo bajo acción explícita | No se envía ni persiste en Firebase |
| Google Maps | Mostrar mapa y direcciones | Consultar la política de Google; no se usa para analítica propia |
| Firebase Auth, Firestore y Functions | Autenticación, datos y lógica segura | Según la configuración y política de eliminación aprobada |

No se ha detectado inicialización de Google/Firebase Analytics, Meta Pixel, publicidad ni tracking SDK. Deben actualizarse Apple App Privacy y Google Play Data Safety si se añade cualquiera de ellos.

## Cuenta autogestionada y cuenta gestionada

- **Colaborador externo:** cuenta autogestionada, con eliminación iniciable en app y mediante la ruta pública `/eliminar-cuenta` para Play. La confirmación exige reautenticación reciente y la operación ocurre en Cloud Functions, no desde el cliente.
- **Voluntario Bokatas:** cuenta operativa provisionada por la organización; alta, desactivación, cambio de ruta y baja se gestionan administrativamente. La app no ofrece su eliminación autoservicio.

Antes de publicar, Bokatas debe aprobar el tratamiento de recursos publicados después de que su proponente elimine su cuenta. La guía de Apple indica que el contenido generado y compartido debe eliminarse junto con la cuenta, salvo datos que sea obligatorio conservar por ley; la política debe explicar cualquier retención legítima. Fuentes: [Apple — eliminación de cuenta](https://developer.apple.com/support/offering-account-deletion-in-your-app/), [Google Play — eliminación de cuenta](https://support.google.com/googleplay/android-developer/answer/13327111?hl=en).
