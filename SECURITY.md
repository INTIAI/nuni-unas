# Política de seguridad

## Alcance

Este repositorio contiene una **landing estática** para Nuni Uñas. No tiene backend, base de
datos, autenticación, pagos, sesiones, cookies propias ni almacenamiento de datos personales.

El formulario de reserva funciona en el navegador: valida los campos, arma un mensaje y abre
WhatsApp en una pestaña nueva. La confirmación del turno es humana.

## Cómo reportar una vulnerabilidad

Usar **GitHub Security Advisories** en la pestaña **Security** del repositorio:

1. Ir a **Security** → **Advisories** → **Report a vulnerability**.
2. Describir el problema, el impacto y los pasos para reproducirlo.
3. No abrir un issue público con detalles explotables.

No se publica un correo personal en este documento para evitar exponer datos de contacto.

## Controles implementados

- **CSP por hash** para los dos scripts inline de `index.html`.
- **Sin JavaScript de terceros** ni librerías de runtime.
- **Sin `innerHTML`, `outerHTML`, `insertAdjacentHTML`, `eval` ni `new Function`** en el código.
- Los datos del formulario se insertan en la URL de WhatsApp con `encodeURIComponent`.
- Los datos de éxito se muestran con `textContent`, no como HTML.
- Enlaces externos con `target="_blank"` y `rel="noopener noreferrer"`.
- `window.open` con `noopener,noreferrer` y limpieza de `win.opener`.
- Metadato `referrer` con `strict-origin-when-cross-origin`.
- `base-uri 'self'`, `object-src 'none'` y `form-action 'self'` en la CSP.
- Imágenes optimizadas sin EXIF, XMP, IPTC ni comentarios.
- Auditoría de firmas reales de AVIF, WebP y JPEG en `agent/audit.mjs`.
- `.gitignore` para `.env`, logs, dependencias y temporales.
- Sin credenciales, tokens, claves privadas ni secretos en archivos versionados.

## Revisión de inyección

La superficie de inyección es mínima porque:

- el sitio es estático;
- no hay plantillas del lado del servidor;
- no se construye HTML con datos del usuario;
- el formulario solo produce una URL de WhatsApp codificada;
- el JSON-LD es contenido fijo;
- la CSP impide scripts inline no autorizados.

Si en el futuro se agrega contenido dinámico:

- usar `textContent` o `createTextNode`;
- evitar `innerHTML` con datos externos;
- sanitizar HTML con una librería mantenida si fuera imprescindible;
- validar y escapar del lado del servidor;
- no confiar en la validación del navegador.

## Credenciales y repositorio público

Antes de publicar:

- No subir `.env`, `.env.local`, claves, tokens, cookies, capturas de sesión ni archivos de
  configuración privados.
- Usar el correo **noreply** de GitHub en los commits para no exponer el email personal.
- Revisar `git status` y `git diff --cached` antes de cada commit.
- Activar **Secret scanning** y **Push protection** en GitHub si el plan lo permite.
- No publicar datos de clientas, conversaciones privadas ni información médica.
- El teléfono de WhatsApp del sitio es un dato comercial público de Nuni Uñas, no un secreto.

## Si se agrega backend

Como mínimo:

- validar y sanear en servidor;
- usar consultas parametrizadas;
- implementar autenticación y autorización por rol;
- proteger CSRF;
- aplicar rate limiting;
- registrar errores sin datos personales;
- mantener dependencias actualizadas;
- definir retención y borrado de datos;
- publicar una política de privacidad.

## Cabeceras de producción (Cloudflare Pages)

El archivo [`_headers`](_headers) aplica estas cabeceras en Cloudflare Pages:

```text
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Content-Security-Policy: ...; frame-ancestors 'none'; upgrade-insecure-requests
```

`frame-ancestors` y `upgrade-insecure-requests` no se aplican desde el `meta` CSP: van en la cabecera HTTP. El `meta` CSP queda como respaldo para GitHub Pages y para el preview local con `http://127.0.0.1:8000`.

### Sincronización de hashes CSP

La CSP autoriza dos scripts inline de `index.html` por hash SHA-256. Si cambiás el script de la clase `js` o el bloque JSON-LD:

1. Calculá el hash nuevo del contenido exacto entre `<script>` y `</script>`.
2. Actualizalo en el `meta http-equiv="Content-Security-Policy"` de `index.html`.
3. Actualizalo también en `_headers`.
4. Verificá en la consola del navegador que no aparezcan errores de CSP.

## Migración de dominio

Mientras no haya un dominio propio registrado, la URL gratuita con marca es `https://nuniunas.pages.dev/`. Se obtiene creando un proyecto de Cloudflare Pages llamado `nuniunas` y conectándolo al mismo repositorio.

Para pasar a un dominio propio de pago:

1. Registrar el dominio (por ejemplo `nuniunas.com` o `nuniunas.com.ar`). Los dominios no admiten comillas, espacios ni la letra `ñ` en su forma literal; si se usa `ñ`, el sistema la convierte a punycode (`xn--...`). Para SEO y para compartir por WhatsApp conviene la versión sin `ñ`.
2. En Cloudflare: **Workers & Pages → nuni-unas-landing → Custom domains → Set up a custom domain**.
3. Cloudflare crea el registro DNS y emite el certificado SSL automáticamente.
4. Actualizar `canonical`, `og:url`, `og:image`, `twitter:image`, `robots.txt` y `sitemap.xml` con el dominio final.
5. Redirigir el dominio `pages.dev` al dominio propio con una **Redirect Rule** o **Bulk Redirect** en Cloudflare (Cloudflare Pages sirve ambos dominios por defecto).
6. Verificar en Search Console y volver a compartir el enlace para actualizar la vista previa de WhatsApp.

## Versiones

Este proyecto no publica versiones con soporte de seguridad separadas. La rama `main` es la
versión mantenida.
