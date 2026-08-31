# Cambios requeridos en la política de privacidad de la app Bokatas

Pendiente de aprobación y publicación por Asociación Bokatas. No sustituye asesoramiento legal.

La política de `bokatas.org` debe identificar expresamente esta app móvil y describir:

| Dato | Finalidad / servicio | Conservación / eliminación |
| --- | --- | --- |
| Email, Firebase UID, proveedor de acceso y nombre de colaborador | Cuenta de colaborador, autenticación y propiedad de aportaciones | Hasta eliminación de cuenta; pendiente definir anonimización de recursos ya publicados |
| Recursos propuestos y moderación | Revisión, publicación y trazabilidad del directorio | Pendientes/rechazados se eliminan al borrar cuenta; recursos publicados requieren política aprobada de desvinculación o conservación |
| Cuentas de voluntariado provisionadas | Operativa interna de rutas, compras y moderación | Gestionadas por Bokatas; no hay registro público ni eliminación autoservicio |
| Ubicación | Orden local y temporal de recursos cercanos, solo bajo acción explícita | No se envía ni persiste en Firebase |
| Google Maps | Mostrar mapa y direcciones | Consultar la política de Google; no se usa para analítica propia |
| Firebase Auth, Firestore y Functions | Autenticación, datos y lógica segura | Según la configuración y política de eliminación aprobada |

No se ha detectado inicialización de Google/Firebase Analytics, Meta Pixel, publicidad ni tracking SDK. Deben actualizarse Apple App Privacy y Google Play Data Safety si se añade cualquiera de ellos.

## Cuenta autogestionada y cuenta gestionada

- **Colaborador externo:** cuenta autogestionada, con eliminación iniciable en app y mediante URL externa de Play.
- **Voluntario Bokatas:** cuenta operativa provisionada por la organización; alta, desactivación, cambio de ruta y baja se gestionan administrativamente. La app no ofrece su eliminación autoservicio.

Antes de publicar, Bokatas debe aprobar el tratamiento de recursos publicados después de que su proponente elimine su cuenta y facilitar URL pública de solicitud de eliminación.
