# Caso de estudio — Nuni Uñas

## Ficha del proyecto

| Campo | Detalle |
|---|---|
| Cliente | Nuni Uñas |
| Rubro | Manicura semipermanente, ojo de gato y belleza de manos |
| Ubicación | Colón, Entre Ríos, Argentina |
| Tipo de proyecto | Landing de conversión + handoff a WhatsApp |
| Meta de negocio | +20% de clientas en 6 meses |
| Rol | Producto, UX/UI, frontend, accesibilidad, performance y documentación |
| Stack | HTML5, CSS3, JavaScript vanilla, JSON-LD, AVIF/WebP/JPEG |
| Estado | MVP funcional y auditado; listo para publicar |

## 1. Contexto

Nuni es una emprendedora de la belleza que atiende con cita previa. Su operación diaria ya funcionaba: tenía clientas, servicios definidos y un canal de contacto que usa todo el mundo en Argentina, WhatsApp.

El problema aparecía **antes** de la confirmación:

- La clienta interesada tenía que preguntar precio, disponibilidad y condiciones.
- Nuni respondía una por una, muchas veces con datos incompletos.
- La conversación se extendía en horarios en los que no estaba atendiendo.
- No había un lugar único que explicara servicios, precios, garantía y estilo.
- La decisión de compra se enfriaba por fricción, no por falta de interés.

La clienta no pedía “una página linda”. Pedía **más clientas y una agenda menos caótica**. La estética era importante porque el rubro es visual, pero la estética sola no resolvía el negocio.

## 2. Objetivo y marco de trabajo

Objetivo declarado por la clienta:

> Aumentar las clientas en un 20% en 6 meses.

Se trabajó con tres acuerdos:

1. **La meta es una hipótesis**, no una promesa. Hay que medirla.
2. **No agregar herramientas antes de validar el flujo.** Un calendario o CRM prematuro podía sumar costo y resistencia.
3. **La confirmación sigue siendo humana.** La web ordena; Nuni decide.

## 3. Diagnóstico

### Problema principal

El interés existía, pero el primer contacto tenía demasiada fricción y poca estructura.

### Problemas secundarios

- Precio y garantía dispersos.
- Consultas incompletas.
- Dificultad para priorizar urgencias.
- Falta de prueba de confianza en un rubro donde la imagen lo es todo.
- Mala experiencia si la clienta entraba desde el teléfono.

### Hipótesis de solución

Si se concentra la propuesta de valor en una landing rápida, se explican precios y garantía, y se ofrece un formulario breve que arma un mensaje completo para WhatsApp, entonces:

- aumenta la intención de contacto;
- mejora la calidad de las consultas;
- disminuye el ida y vuelta;
- y mejora la conversión a turno confirmado.

## 4. Usuaria y trabajo a resolver

**Perfil:** mujer de Colón y alrededores que busca manicura semipermanente u ojo de gato, valora la estética, compara opciones desde el teléfono y decide rápido si confía.

**Job to be done:**

> “Quiero verme prolija y sentirme cuidada, sin perder tiempo preguntando cosas básicas ni arriesgarme a un precio que no conozco.”

**Objeciones frecuentes:**

- ¿Cuánto sale?
- ¿Tiene garantía?
- ¿Cómo reservo?
- ¿Puedo elegir color?
- ¿Atiende urgente?
- ¿Dónde es?

La landing responde esas objeciones antes de que se conviertan en mensajes.

## 5. Recorrido antes y después

### Antes

```text
Ve una publicación → pregunta “Hola, precio” → espera respuesta →
responde servicio/fecha/color → coordina → confirma
```

Problemas: interrupciones, datos dispersos, consultas incompletas, pérdida de interés.

### Después

```text
Ve la landing → entiende propuesta y precio → toca “Reservar” →
completa servicio, fecha, franja, color y WhatsApp → mensaje listo →
Nuni confirma disponibilidad
```

Mejoras: menos preguntas repetidas, consulta con contexto, agenda más ordenada, experiencia móvil clara.

## 6. Decisiones de producto y UX

### 6.1 Una sola acción principal

El CTA “Reservar” aparece en el header, el hero, las tarjetas de servicio, la sección emocional, el footer y el botón flotante de WhatsApp. No compite con diez acciones distintas.

### 6.2 Precio visible

Mostrar los precios reduce incertidumbre y filtra consultas. La clienta sabe si el servicio entra en su presupuesto antes de escribir.

### 6.3 Formulario como pre-reserva

El formulario no pretende reemplazar la agenda. Captura la información mínima para que Nuni pueda responder con contexto:

- nombre;
- WhatsApp;
- servicio;
- fecha;
- franja horaria;
- color de referencia;
- nota opcional;
- urgencia;
- consentimiento para contactar.

### 6.4 Validación con lenguaje humano

Los mensajes están en español rioplatense y explican qué corregir. No se usa el mensaje genérico del navegador.

### 6.5 Urgencia con regla

El adicional por urgencia tiene una condición clara: dentro de las próximas 48 h y sujeto a disponibilidad. No es una falsa escasez.

### 6.6 Handoff a WhatsApp

WhatsApp es el canal natural de la clienta. El sitio abre una pestaña nueva con el mensaje armado y usa `noopener,noreferrer` para evitar riesgos de seguridad.

### 6.7 Mobile-first

La mayor parte del tráfico de un negocio local de belleza llega desde el teléfono. El diseño prioriza:

- lectura clara;
- botones grandes;
- formulario en una columna;
- imágenes optimizadas;
- navegación simple;
- foco visible.

### 6.8 Confianza

- Garantía de 7 días.
- Precio claro.
- Lenguaje de acompañamiento.
- Sin testimonios inventados.
- Sin promesas de resultados.

## 7. Neuroventas aplicadas con criterio

| Palanca | Implementación | Por qué funciona |
|---|---|---|
| Claridad | Precios y servicios en tarjetas | Reduce ambigüedad y carga cognitiva |
| Microcompromisos | Elegir servicio, fecha, color | La persona avanza con pasos pequeños |
| Reducción de fricción | WhatsApp con mensaje listo | Elimina la hoja en blanco |
| Prueba de confianza | Garantía de 7 días | Baja el riesgo percibido |
| Urgencia honesta | +$5.000 dentro de 48 h | Incentiva decisión sin engaño |
| Anclaje de valor | Servicios con precio y descripción | Ordena la comparación |
| Efecto de contexto | Fotos reales del trabajo | La estética funciona como prueba visual |
| Reciprocidad | “Te confirmo yo”, “sin sorpresas” | Genera vínculo y previsibilidad |
| CTA contextual | Botón en cada punto de decisión | Aprovecha la intención del momento |

**Límite ético:** no se usan reseñas falsas, escasez artificial, presión agresiva ni promesas de resultados. La persuasión se apoya en información y confianza, no en manipulación.

## 8. Arquitectura técnica

### Enfoque

Se eligió una landing estática porque:

- el tráfico esperado no requiere backend;
- el costo de operación es mínimo;
- la velocidad es mejor;
- no hay datos sensibles que almacenar;
- el mantenimiento es simple;
- permite publicar en cualquier hosting estático.

### Componentes

- `index.html`: estructura semántica, metadatos, Open Graph, JSON-LD, CSP y contenido.
- `styles.css`: sistema visual, responsive, hero, galería, modal y animaciones.
- `script.js`: menú, reveal, validación, WhatsApp, modal, lightbox y foco.
- `fonts.css` + `assets/fonts/`: tipografías autohospedadas.
- `imagenes/optimized/`: AVIF, WebP y JPG.
- `agent/audit.mjs`: auditoría sin dependencias.
- `docs/`: documentación del caso y guía de publicación.

### Seguridad

- CSP por hash para los dos scripts inline.
- `referrer` con `strict-origin-when-cross-origin`.
- `noopener,noreferrer` en enlaces externos y `window.open`.
- Sin secretos, sin cookies propias, sin base de datos.
- Sin PHP ni endpoints.

### Performance

- Imágenes en AVIF con fallback WebP/JPEG.
- Dimensiones explícitas para evitar layout shift.
- `loading="lazy"` y `decoding="async"` fuera del above-the-fold.
- Fuentes autohospedadas con `font-display: swap`.
- Sin librerías de terceros.
- 21 variantes, ~184 KB en AVIF.

### Accesibilidad

- HTML semántico y skip link.
- Diálogos con `aria-modal`, `aria-labelledby` y `hidden`.
- Focus trap y restauración de foco.
- `Escape` cierra modal/lightbox.
- Mensajes de error asociados a campos.
- `role="status"` para confirmación.
- Respeto por `prefers-reduced-motion`.

## 9. Agenda y contactos: alcance real

Esta versión **no es un sistema de reservas**. Es una capa de pre-reserva y ordenamiento del contacto.

Lo que sí hace:

- captura datos completos;
- valida nombre y WhatsApp;
- registra consentimiento;
- arma un mensaje legible;
- abre WhatsApp en pestaña nueva;
- deja un fallback visible si la ventana no se abre.

Lo que no hace todavía:

- consultar disponibilidad real;
- bloquear horarios;
- cobrar señas;
- enviar recordatorios;
- sincronizar un calendario;
- gestionar clientas en un CRM.

Esa decisión fue deliberada: validar el flujo antes de invertir en infraestructura. El roadmap propone avanzar por etapas.

## 10. Métricas y experimentos

### North Star propuesta

**Turnos confirmados por mes.**

### Embudo

```text
Visitas
  → clics a WhatsApp
  → formularios iniciados
  → formularios completados
  → consultas con datos completos
  → turnos confirmados
  → recurrencia
```

### Línea base

Antes de atribuir mejoras al sitio, registrar:

- visitas mensuales;
- consultas por WhatsApp;
- turnos confirmados;
- ticket promedio;
- tiempo de respuesta;
- porcentaje de consultas con datos completos.

### Experimentos de los próximos 6 meses

1. CTA principal: “Reservar turno” vs. “Consultar disponibilidad”.
2. Formulario: fecha + franja vs. solo “preferencia de horario”.
3. Prueba social: garantía visible vs. foto + garantía.
4. Urgencia: adicional visible vs. solo en el formulario.
5. Respuesta: plantilla de confirmación vs. respuesta libre.
6. Canal: enlace en bio vs. Google Business Profile vs. referidos.

### Cómo se sabrá si se cumplió el +20%

Se compara el promedio mensual de clientas nuevas de los 6 meses posteriores contra el promedio de los 3 meses previos, ajustando por estacionalidad si hay datos suficientes.

Sin esa comparación, el +20% es solo una intención.

## 11. Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| El formulario agrega fricción | Campos mínimos y CTA claro; medir abandono |
| WhatsApp no abre en algunos dispositivos | Fallback visible con enlace directo |
| La clienta no quiere dar datos | Consentimiento explícito y promesa de uso solo para coordinar |
| Aumento de consultas sin capacidad de respuesta | Plantillas y horarios de respuesta definidos |
| Métricas mal atribuidas | UTM, línea base y comparación mensual |
| Fotos pesadas | Pipeline AVIF/WebP/JPEG y auditoría de firmas |
| Cambios futuros rompen la CSP | Auditoría de hashes en cada cambio |

## 12. Lo que no se hizo y por qué

- **No se agregó un calendario:** primero había que validar el flujo y la demanda.
- **No se agregó un CRM:** el volumen actual no lo justificaba.
- **No se usó un framework:** la landing no lo necesitaba; menos peso y menos mantenimiento.
- **No se inventaron testimonios:** la confianza se construye con transparencia.
- **No se prometió el +20%:** se definió cómo medirlo.
- **No se automatizó el cobro de señas:** implica decisiones legales y operativas que la clienta debe validar.

## 13. Aprendizajes

1. En un negocio local, la conversión no termina en el clic: termina en una conversación.
2. El mejor formulario es el que pide lo justo y devuelve contexto.
3. La velocidad y la claridad son parte de la experiencia de marca.
4. La neuroventas funciona mejor cuando ordena la decisión y no cuando presiona.
5. Un MVP estático puede validar un flujo de negocio sin infraestructura costosa.

## 14. Próximos pasos

- Publicar y medir.
- Instrumentar eventos del embudo.
- Optimizar el tiempo de primera respuesta.
- Activar Google Business Profile y SEO local.
- Evaluar calendario, señas y recordatorios según demanda.
- Iterar copy y CTA con datos, no con intuición.

---

**Repositorio:** landing de Nuni Uñas  
**Documentación técnica:** [`agent/Agent.md`](../agent/Agent.md)  
**Guía de publicación:** [`docs/publicacion-github.md`](publicacion-github.md)
