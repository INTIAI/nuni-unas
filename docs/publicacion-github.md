# Publicar el proyecto en GitHub — paso a paso

Guía para crear el repositorio, subir la landing y dejarla presentable para reclutadores IT y especialistas en neuroventas.

## 0. Antes de empezar

Verificar que estén instalados Git y Python:

```powershell
git --version
python --version
```

No hace falta `gh` (GitHub CLI): el repositorio se puede crear desde la web y subir con Git.

Datos sugeridos del repositorio:

| Campo | Valor sugerido |
|---|---|
| Nombre | `nuni-unas-landing` |
| Visibilidad | Público |
| Descripción | Landing de conversión para Nuni Uñas: reservas por WhatsApp, UX mobile-first, accesibilidad, performance y caso de estudio de neuroventas. |
| Sitio | La URL de GitHub Pages o el dominio final, cuando esté publicado |
| Topics | `html`, `css`, `javascript`, `landing-page`, `conversion-optimization`, `whatsapp`, `accessibility`, `performance`, `neurosales`, `small-business`, `argentina`, `frontend`, `portfolio`, `ux` |

## 1. Crear el repositorio en GitHub

1. Entrar a <https://github.com> e iniciar sesión.
2. Tocar el botón **+** arriba a la derecha → **New repository**.
3. Completar:
   - **Repository name:** `nuni-unas-landing`
   - **Description:** la descripción sugerida de la tabla.
   - **Visibility:** **Public**.
   - **Initialize this repository with:** dejar **sin** README, sin `.gitignore` y sin licencia.
     El proyecto ya trae `README.md`, `.gitignore` y documentación.
4. Tocar **Create repository**.

GitHub mostrará una pantalla con comandos. No hace falta copiarlos todavía; los siguientes pasos ya los adaptan.

## 2. Preparar el repositorio local

Abrir PowerShell en la carpeta del proyecto:

```powershell
cd "D:\0- Usuario\Desktop\Trabajo INTIAI(test)\web uñas test"
```

Si es la primera vez que se usa Git en esta computadora, configurar identidad:

```powershell
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

> **Privacidad en repos públicos:** el nombre y el email del autor quedan visibles en el
> historial de commits. Si no querés exponer tu email personal, activá “Keep my email
> addresses private” en GitHub y usá el correo noreply que GitHub te indique:
>
> ```powershell
> git config user.email "TU-ID+TU-USUARIO@users.noreply.github.com"
> git commit --amend --reset-author --no-edit
> git log -1 --format="%an <%ae>"
> ```
>
> Hacelo **antes** del primer push. Si ya hiciste push, hay que reescribir el historial y
> forzar el update remoto; eso requiere cuidado y coordinación.

Inicializar el repositorio:

```powershell
git init
git branch -M main
```

Revisar qué se va a subir:

```powershell
git status
```

Comprobar que no aparezcan `.env`, `node_modules`, archivos temporales ni secretos.

Agregar y confirmar:

```powershell
git add .
git status
git commit -m "feat: landing de conversión para Nuni Uñas"
```

## 3. Conectar con GitHub y subir

Copiar la URL del repositorio desde GitHub. Debe verse así:

```text
https://github.com/TU-USUARIO/nuni-unas-landing.git
```

Conectar el remoto y subir:

```powershell
git remote add origin https://github.com/TU-USUARIO/nuni-unas-landing.git
git push -u origin main
```

Si el remoto ya existía:

```powershell
git remote set-url origin https://github.com/TU-USUARIO/nuni-unas-landing.git
git push -u origin main
```

### Si el repositorio se creó con README

Si en el paso 1 se marcó “Add a README file”, GitHub tendrá un commit inicial. Antes de subir:

```powershell
git pull --rebase origin main
git push -u origin main
```

Evitar `--force` salvo que se sepa exactamente qué se está sobrescribiendo.

## 4. Completar la presentación en GitHub

En la página del repositorio:

1. Tocar el engranaje de **About**.
2. Pegar la descripción.
3. Agregar la URL del sitio cuando esté publicado.
4. Agregar los topics sugeridos.
5. Guardar.

Los topics ayudan a que el repositorio aparezca en búsquedas de portfolio, frontend, accesibilidad o conversión.

### Activar protecciones de seguridad

En **Settings → Code security and analysis**:

- Activar **Secret scanning**.
- Activar **Push protection** si está disponible en el plan.
- Activar **Dependabot alerts** (aunque hoy no hay dependencias de runtime).
- Revisar que `SECURITY.md` aparezca en la pestaña **Security**.

### Integración continua

El repositorio incluye `.github/workflows/quality.yml`. En cada push a `main` o pull request:

- verifica la sintaxis de `script.js`;
- ejecuta `node agent/audit.mjs`;
- valida `index.html`, `terminos.html` y `privacidad.html` con `html-validate`.

El workflow usa `permissions: contents: read` para que el token de GitHub Actions no tenga
permisos de escritura.

## 5. Configurar la imagen social

1. Ir a **Settings** → **General**.
2. Bajar hasta **Social preview**.
3. Subir `docs/preview.jpg`.
4. Guardar.

Esa imagen es la que se verá cuando se comparta el repositorio en LinkedIn, X, WhatsApp o Slack.

## 6. Publicar una demo con GitHub Pages

1. Ir a **Settings** → **Pages**.
2. En **Build and deployment**, elegir **Deploy from a branch**.
3. Branch: **main**.
4. Folder: **/ (root)**.
5. Guardar.
6. Esperar unos minutos.

La URL quedará con este formato:

```text
https://TU-USUARIO.github.io/nuni-unas-landing/
```

La landing usa rutas relativas (`imagenes/...`, `assets/...`), así que funciona en Pages sin cambios.

Verificar en la URL publicada:

- que carguen las fuentes;
- que se vea la foto nueva de “Belleza de pies”;
- que el formulario abra WhatsApp;
- que el lightbox funcione;
- que no haya errores en la consola.

## 7. Crear el release `v1.0.0`

1. Ir a **Releases** → **Draft a new release**.
2. Tag: `v1.0.0`.
3. Título: `Nuni Uñas — landing para captar y ordenar consultas`.
4. Notas sugeridas:

```markdown
## v1.0.0 — MVP

- Landing mobile-first para Nuni Uñas.
- Servicios, precios, garantía y galería.
- Formulario de consulta con validación y mensaje estructurado para WhatsApp.
- Términos y condiciones y política de privacidad enlazados.
- Modal y lightbox accesibles con focus trap.
- Imágenes AVIF/WebP/JPEG y pipeline de optimización.
- CSP por hash, `noopener,noreferrer` y metadatos SEO.
- Auditoría propia: 12 comprobaciones, 0 errores.
```

5. Publicar el release.

## 8. Checklist antes de cada push

> **Regla de trabajo:** no hacer commit ni push hasta que la clienta revise y autorice la publicación.

```powershell
node --check script.js
node agent/audit.mjs
npx --yes html-validate index.html terminos.html privacidad.html
```

Además:

- [ ] La clienta revisó y autorizó la publicación.
- [ ] `git status` muestra solo los archivos esperados.
- [ ] No hay `.env`, tokens, claves ni datos privados.
- [ ] El autor del commit usa un email noreply, no el personal.
- [ ] `SECURITY.md` está presente y actualizado.
- [ ] No se subieron capturas con información sensible.
- [ ] `README.md` y los enlaces relativos funcionan.
- [ ] La imagen social `docs/preview.jpg` está actualizada.
- [ ] La landing se probó en local y, si aplica, en Pages.
- [ ] El formulario inválido bloquea el envío.
- [ ] El formulario válido abre WhatsApp en pestaña nueva.
- [ ] Los enlaces a términos y privacidad funcionan desde el footer y el formulario.
- [ ] Las páginas legales se ven bien en móvil y escritorio.
- [ ] El lightbox cierra con `Escape` y devuelve el foco.

## 9. Opcional: usar GitHub CLI

Si más adelante se instala `gh`:

```powershell
winget install --id GitHub.cli
gh auth login
gh repo create nuni-unas-landing --public --source=. --remote=origin --push
```

No es obligatorio. La ruta web + Git es suficiente.

## 10. Notas de mantenimiento

- Cada cambio importante: commit pequeño y mensaje claro.
- Si se modifican scripts inline, recalcular los hashes de la CSP.
- Si se agregan imágenes, generar AVIF/WebP/JPG y actualizar `width`/`height`.
- Si se agrega analítica, actualizar la CSP y documentar qué se mide.
- Si se agrega un backend, validar en servidor y actualizar la política de privacidad.
- No prometer resultados de negocio sin una línea base y una medición.

## 11. Derechos

El repositorio muestra código y documentación con fines de portfolio. La marca, los textos,
las fotografías y los datos de contacto pertenecen a Nuni Uñas. No reutilizar la identidad
visual ni las fotos sin autorización.
