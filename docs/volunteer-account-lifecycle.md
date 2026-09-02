# Cuentas internas de voluntariado

Las cuentas de voluntariado no son cuentas públicas ni autogestionadas: Bokatas
las provisiona para responsables de ruta y personal autorizado. El frontend,
las Rules y las Cloud Functions identifican ese rol mediante el correo interno
`ruta-N@voluntarios.bokatas.local`; las mutaciones sensibles vuelven a
validarlo en servidor.

## Operativa v1

1. **Alta:** una persona autorizada crea la cuenta en Firebase Authentication
   con el identificador de ruta aprobado y entrega la contraseña de forma
   segura. No crearla desde el registro de colaboradores.
2. **Cambio de responsable o ruta:** desactivar primero el acceso anterior en
   Firebase Authentication; crear o actualizar únicamente la cuenta interna
   autorizada. Las referencias históricas de aprobaciones y validaciones usan
   UID/correo guardados en el evento, por lo que no dependen de que el usuario
   pueda seguir iniciando sesión.
3. **Baja:** deshabilitar la cuenta (`disabled: true`) como operación normal.
   Eliminar definitivamente la identidad solo tras revisar qué obligaciones de
   retención operativa/privacidad aplican.

La app no muestra «Eliminar cuenta» para voluntariado. Este tratamiento está
separado de los colaboradores externos, que sí son cuentas autogestionadas con
solicitud de eliminación in-app y en `/eliminar-cuenta`.

## Antes de una distribución pública

- Mantener una persona administradora de Firebase distinta de los responsables
  de ruta.
- Crear una cuenta de demostración de voluntariado limitada para App Review,
  fuera del repositorio (`REVIEWER_VOLUNTEER_ACCOUNT_REQUIRED`).
- Documentar internamente quién está autorizado a provisionar, desactivar y
  revisar avisos de recursos.
