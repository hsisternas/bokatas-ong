# Enlaces profundos de Bokatas

La app comparte las rutas públicas de la web para que un enlace siga teniendo
sentido tanto dentro como fuera de la aplicación:

- `https://bokatas.web.app/categoria/:categoryId`
- `https://bokatas.web.app/recurso/:resourceId`
- `bokatas://categoria/:categoryId`
- `bokatas://recurso/:resourceId`

La capa React normaliza esos destinos y el plugin `@capacitor/app` entrega los
enlaces entrantes a la misma navegación. Android declara tanto el esquema
`bokatas` como App Links para las dos rutas. iOS declara el esquema y el
entitlement `applinks:bokatas.web.app`.

## Pendiente antes de distribución

Los enlaces HTTPS solo se verifican al publicar archivos del dominio con los
identificadores finales de firma. No deben publicarse valores provisionales.

1. Elegir el `applicationId` Android y el bundle identifier iOS definitivos.
2. Generar un build Android firmado y publicar en
   `https://bokatas.web.app/.well-known/assetlinks.json`:

   ```json
   [{
     "relation": ["delegate_permission/common.handle_all_urls"],
     "target": {
       "namespace": "android_app",
       "package_name": "FINAL_ANDROID_APPLICATION_ID",
       "sha256_cert_fingerprints": ["FINAL_RELEASE_CERT_SHA256"]
     }
   }]
   ```

3. Con el Apple Team ID definitivo, publicar
   `https://bokatas.web.app/.well-known/apple-app-site-association`:

   ```json
   {
     "applinks": {
       "details": [{
         "appIDs": ["FINAL_APPLE_TEAM_ID.FINAL_IOS_BUNDLE_ID"],
         "components": [
           { "/": "/categoria/*" },
           { "/": "/recurso/*" }
         ]
       }]
     }
   }
   ```

4. Confirmar que Hosting sirve ambos ficheros sin redirección y con
   `application/json`, y probar los enlaces en una instalación firmada real.

El esquema propio funciona durante el desarrollo; los App Links y Universal
Links no pueden validarse por completo antes de disponer de esas identidades.
