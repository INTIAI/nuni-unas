# Agent.md — Nuni Uñas

Documentación de trabajo para agentes y personas que mantengan esta landing.

## 1. Resumen

Landing estática de **Nuni Uñas**, manicura semipermanente en Colón, Entre Ríos, Argentina.

- **Stack:** HTML + CSS + JavaScript sin build, sin backend, sin base de datos y sin PHP.
- **Objetivo:** presentar servicios, precios, galería y abrir WhatsApp con un mensaje de reserva prearmado.
- **Preview local:** `http://127.0.0.1:8000/`
- **WhatsApp:** `5493447412855` (`+54 9 3447 412855`).
- **Producción:** cualquier hosting estático con HTTPS (Netlify, Cloudflare Pages, Vercel, GitHub Pages o similar).

No hay proceso de compilación: se editan los archivos y se publican tal cual.

## 2. Estructura

```text
.
├── index.html                  # Estructura, metadatos, CSP, JSON-LD y contenido
├── styles.css                  # Diseño, responsive, fondos y animaciones
├── script.js                   # Navegación, reveal, reserva, validación, WhatsApp y lightbox
├── fonts.css                   # @font-face autohospedado
├── README.md                   # Presentación del proyecto y caso de estudio
├── SECURITY.md                 # Política de seguridad y reporte
├── .gitignore                  # Archivos locales que no se publican
├── .gitattributes              # Fin de línea y archivos binarios
├── .github/
│   └── workflows/
│       └── quality.yml         # Auditoría en cada push/PR
├── assets/
│   └── fonts/
│       ├── fraunces-normal.woff2
│       ├── fraunces-italic.woff2
│       └── manrope-normal.woff2
├── imagenes/
│   ├── originales/
│   │   └── ritual-pies.png     # Fuente de la foto de "Belleza de pies" (no se sirve en la web)
│   └── optimized/
│       ├── hero-manicura.avif|webp|jpg
│       ├── manicura-fucsia.avif|webp|jpg
│       ├── manicura-rosa-negra.avif|webp|jpg
│       ├── manos-lima.avif|webp|jpg
│       ├── manicura-menta.avif|webp|jpg
│       ├── manicura-celeste.avif|webp|jpg
│       └── ritual-pies.avif|webp|jpg
├── docs/
│   ├── preview.jpg             # Imagen social del repositorio
│   ├── caso-de-estudio.md      # Problema, decisiones, neuroventas y métricas
│   └── publicacion-github.md   # Paso a paso de publicación
└── agent/
    ├── audit.mjs               # Auditoría estática sin dependencias
    └── Agent.md                # Este documento
```

Los PNG originales antiguos ya no están en el proyecto. La única fuente conservada es
`imagenes/originales/ritual-pies.png`, porque es la foto nueva de “Belleza de pies”.

## 3. Cómo funciona la página

1. `index.html` carga `fonts.css`, `styles.css` y `script.js`.
2. El script agrega la clase `js` al documento y activa:
   - header con sombra al hacer scroll;
   - menú móvil;
   - animaciones `[data-reveal]` con `IntersectionObserver`;
   - modal de reserva con focus trap y restauración de foco;
   - validación del formulario;
   - apertura de WhatsApp en pestaña nueva;
   - lightbox de la galería con focus trap, `Escape` y restauración de foco.
3. El formulario **no envía datos a un servidor**. Arma un texto y lo abre en WhatsApp:

   ```text
   Hola Nuni! Quiero reservar un turno.
   Nombre: ...
   Servicio: ...
   Fecha: dd/mm/aaaa
   Franja: ...
   Mi WhatsApp: ...
   Color de referencia: ...
   Nota: ...            # solo si se completó
   Urgente: Sí ...      # solo si se marcó
   ¿Me confirmás disponibilidad? Gracias!
   ```

## 4. Comandos útiles

Ejecutar desde la raíz del proyecto:

```powershell
# Servidor local
python -m http.server 8000 --bind 0.0.0.0

# Sintaxis del JavaScript
node --check script.js

# Auditoría propia: referencias, formatos, CSP, accesibilidad básica y pesos
node agent/audit.mjs

# Validación HTML
npx --yes html-validate index.html
```

Al probar cambios que puedan estar cacheados, abrir con un parámetro de versión, por ejemplo
`http://127.0.0.1:8000/?v=20`.

## 5. Convenciones de edición

- Mantener el español rioplatense y el tono actual.
- **No cambiar** el texto manual “Belleza de pies.” ni el contenido editado a mano sin pedido explícito.
- No agregar PHP, backend, base de datos ni frameworks sin una decisión explícita.
- Las imágenes que usa la web deben estar en `imagenes/optimized/`; no referenciar PNG originales desde HTML o CSS.
- Usar `<picture>` con este orden:
  1. AVIF
  2. WebP
  3. JPG de respaldo
- Toda `<img>` debe tener `alt`, `width`, `height`, `loading` y `decoding`.
- Los enlaces externos que abren pestaña nueva deben llevar `target="_blank"` y
  `rel="noopener noreferrer"`.
- No quitar `novalidate` del formulario: la validación en español se hace en `script.js`.
- Mantener el consentimiento obligatorio, la validación de nombre, WhatsApp, selects, fecha y urgencia.
- Reutilizar las variables CSS de `:root` antes de agregar colores sueltos.
- Respetar `prefers-reduced-motion` y los focus visibles.

## 6. Seguridad

### Estado actual

- Sitio 100 % estático: no hay endpoints, sesiones, cookies propias ni almacenamiento de datos.
- El formulario no persiste información; solo prepara el mensaje y lo entrega a WhatsApp.
- La CSP está declarada por `<meta>` en `index.html`:

  ```text
  default-src 'self'; base-uri 'self'; object-src 'none';
  img-src 'self' data:; font-src 'self'; style-src 'self';
  script-src 'self' 'sha256-WZRJfWvsnNCPcxzZwvyhovnZGqhZaC+8gPGPRbx6wTk='
  'sha256-Lmz4b8uSySDWQgwEkXhYMD8DfERudFelFd9VQ1G1ZQs=';
  form-action 'self'
  ```

- Los dos hashes corresponden a:
  - el script inline que agrega `js` al documento;
  - el bloque JSON-LD de Schema.org.
- Se usa `referrer` con `strict-origin-when-cross-origin`.
- `window.open` se llama con `noopener,noreferrer` y además se limpia `win.opener`.
- No hay secretos, tokens ni claves en el repositorio.

### Reglas al modificar scripts inline

Si se cambia cualquier script inline, hay que recalcular su hash y actualizar la CSP. Por ejemplo:

```powershell
node -e "const fs=require('fs'),c=require('crypto');const h=fs.readFileSync('index.html','utf8');for(const m of h.matchAll(/<script(?![^>]*\\bsrc=)[^>]*>([\\s\\S]*?)<\\/script>/g))console.log('sha256-'+c.createHash('sha256').update(m[1]).digest('base64'))"
```

`node agent/audit.mjs` falla si un hash quedó desactualizado.

### Si se agrega un backend

- Validar y sanear **en el servidor**, no solo en el navegador.
- Usar HTTPS, rate limiting, protección CSRF y políticas de retención.
- No guardar datos de contacto sin consentimiento explícito.
- Agregar los dominios necesarios a `connect-src`/`img-src` en la CSP.
- En producción conviene enviar la CSP como cabecera HTTP, además de la meta.
- Cabeceras recomendadas: `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`,
  `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`.

## 7. Pipeline de imágenes

### Foto actual de “Belleza de pies”

- Fuente: `imagenes/originales/ritual-pies.png`
- Dimensiones: `1448 × 1086` (4:3)
- Peso: `3.000.672` bytes
- Formato real: **PNG** (aunque en algún momento se copió con extensión `.jpg`)
- Salidas web en `imagenes/optimized/`, todas de `1200 × 900`:
  - `ritual-pies.avif` — 108.045 bytes (105,5 KB)
  - `ritual-pies.webp` — 164.828 bytes (161,0 KB)
  - `ritual-pies.jpg` — 173.753 bytes (169,7 KB)

El HTML usa `ritual-pies.avif` como primera opción y `width="1200" height="900"`.
El navegador confirma `currentSrc = .../ritual-pies.avif`, `naturalWidth = 1200`,
`naturalHeight = 900`.

### Regenerar las variantes

Se usó `sharp` con estos criterios:

```js
const sharp = require("sharp");

const base = () =>
  sharp("imagenes/originales/ritual-pies.png")
    .rotate()
    .resize({ width: 1200, withoutEnlargement: true })
    .flatten({ background: "#ffffff" });

await base().avif({ quality: 55, effort: 6 }).toFile("imagenes/optimized/ritual-pies.avif");
await base().webp({ quality: 80, effort: 5 }).toFile("imagenes/optimized/ritual-pies.webp");
await base().jpeg({ quality: 82, mozjpeg: true, progressive: true })
  .toFile("imagenes/optimized/ritual-pies.jpg");
```

`sharp` no forma parte del runtime de la web. Si se necesita regenerar, instalarlo de forma
temporal (`npm install --no-save sharp`) y ejecutar el script; no hace falta agregar un build.

### Reglas para nuevas fotos

1. Guardar la fuente en `imagenes/originales/` con un nombre claro.
2. No confiar en la extensión: verificar el formato real antes de convertir.
3. Generar AVIF, WebP y JPG con el mismo encuadre y dimensiones.
4. Actualizar `width` y `height` del `<img>` con las dimensiones reales del archivo.
5. Mantener `loading="lazy"` y `decoding="async"` salvo que sea una imagen above-the-fold crítica.
6. Ejecutar `node agent/audit.mjs`: ahora valida las firmas reales de AVIF, WebP y JPEG.
7. No subir imágenes de varios MB a `optimized/`; esa carpeta es solo para variantes finales.

### Estado de pesos

- 21 variantes en `imagenes/optimized/` (7 imágenes × 3 formatos).
- Total AVIF: **184 KB** aproximadamente.
- El AVIF más pesado es `ritual-pies.avif` (105,5 KB), por ser una foto nueva más grande.
- Los PNG originales ya no están en el proyecto; la auditoría lo contempla y no falla por su ausencia.

## 8. Accesibilidad y UX

- Enlace “Saltar al contenido”.
- Diálogos con `role="dialog"`, `aria-modal`, `aria-labelledby` y `hidden`.
- Focus trap en reserva y lightbox; `Escape` cierra y devuelve el foco al disparador.
- Mensaje de éxito con `role="status"` y `aria-live="polite"`.
- Etiquetas asociadas a todos los campos.
- Errores de validación en español mediante `setCustomValidity`.
- Respeto por `prefers-reduced-motion`.
- Imágenes con texto alternativo descriptivo.
- Contraste de texto secundario corregido: `--muted` pasó de `#8c857c` a `#6f685f`.
- Nombres accesibles de la marca y del botón flotante alineados con el texto visible.
- Lighthouse local: Accesibilidad **1.00**, Best Practices **1.00**, SEO **1.00**.

Checklist manual:

- Navegar con `Tab` sin quedar atrapado fuera de un modal abierto.
- Abrir y cerrar reserva y lightbox con teclado.
- Probar el formulario con datos inválidos y válidos.
- Verificar que WhatsApp se abra en pestaña nueva.
- Revisar 360, 390, 768 y 1200 px de ancho.
- Comprobar que no haya scroll horizontal.

## 9. Rendimiento

- Fuentes autohospedadas con `font-display: swap` y `preload` de los tres WOFF2.
- Imágenes en AVIF/WebP con JPG de respaldo.
- `loading="lazy"` y `decoding="async"` en imágenes que no son críticas.
- El hero usa `image-set()` en CSS; se quitó el `preload` del hero porque Chrome lo reportaba
  como recurso precargado no utilizado.
- La página no usa librerías externas ni JavaScript de terceros.
- Para producción:
  - HTML con caché corta o `no-cache`;
  - CSS/JS con caché moderada y versión por query o hash;
  - imágenes de `optimized/` con caché larga e `immutable`;
  - compresión Brotli/Gzip en el hosting;
  - CDN si la galería crece.

## 10. Escalabilidad

### Fase 1 — Mantener la landing estática

- Agregar más fotos con el mismo pipeline.
- Incorporar `srcset` con varios anchos (400/800/1200) si la galería crece.
- Mover imágenes a un CDN y actualizar `img-src` en la CSP.
- Agregar un verificador de enlaces y Lighthouse al flujo de revisión.

### Fase 2 — Reservas reales

- Reemplazar o complementar WhatsApp con un backend/serverless y base de datos.
- Validar en servidor, aplicar rate limiting y protección CSRF.
- Definir política de privacidad y retención de datos.
- Mantener WhatsApp como fallback si el backend falla.
- Agregar confirmaciones por email/WhatsApp y calendario de disponibilidad.

### Fase 3 — Contenido y operación

- CMS para servicios, precios y galería.
- Entorno de staging y despliegue con previews.
- Analítica respetuosa de la privacidad y monitoreo de errores.
- Si se migra a un framework, conservar metadatos SEO, JSON-LD, accesibilidad y la CSP.

## 11. Checklist antes de publicar

```powershell
node --check script.js
node agent/audit.mjs
npx --yes html-validate index.html
```

Además:

- [ ] La consola del navegador no muestra errores.
- [ ] `ritual-pies.avif` es un AVIF real y se ve la foto nueva de pies.
- [ ] El formulario inválido bloquea el envío y muestra mensajes claros.
- [ ] El formulario válido abre WhatsApp en pestaña nueva con el mensaje correcto.
- [ ] El lightbox abre, cierra con `Escape` y devuelve el foco.
- [ ] No hay referencias a PNG originales en HTML/CSS.
- [ ] No se agregaron secretos, PHP ni dependencias innecesarias.
- [ ] Se probó en móvil y escritorio.

## 12. Estado de la última revisión

- Foto de “Belleza de pies” actualizada a la imagen nueva.
- `ritual-pies.avif` generado como AVIF real, `1200 × 900`.
- HTML actualizado a `width="1200" height="900"`.
- `agent/audit.mjs` ampliado para validar firmas de AVIF/WebP/JPEG.
- Auditoría: **11 comprobaciones, 0 errores, 0 avisos**.
- `html-validate`: sin errores.
- `node --check script.js`: sin errores.
- Consola del navegador: sin errores ni avisos después de quitar el preload del hero.
- Formulario inválido/válido y lightbox probados en navegador.
