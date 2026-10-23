import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

const html = read("index.html");
const legalPages = ["terminos.html", "privacidad.html"];
const legalDocs = legalPages.map((file) => ({ file, html: read(file) }));
const htmlDocs = [html, ...legalDocs.map((doc) => doc.html)];
const css = read("styles.css");
const js = read("script.js");

const results = [];
const errors = [];
const warnings = [];

const pass = (name, detail = "") => results.push({ ok: true, name, detail });
const fail = (name, detail = "") => {
  results.push({ ok: false, name, detail });
  errors.push(`${name}${detail ? `: ${detail}` : ""}`);
};
const warn = (name, detail = "") => {
  results.push({ ok: true, name: `[aviso] ${name}`, detail });
  warnings.push(`${name}${detail ? `: ${detail}` : ""}`);
};

const localPath = (value) => {
  let ref = value.trim();
  if (!ref) return null;
  if (/^(?:https?:)?\/\//i.test(ref)) return null;
  if (/^(?:data:|mailto:|tel:|javascript:|#)/i.test(ref)) return null;

  try {
    ref = decodeURIComponent(ref.split(/[?#]/, 1)[0]);
  } catch {
    return ref.split(/[?#]/, 1)[0];
  }

  if (!ref) return null;
  return ref.replace(/^\/+/, "");
};

const refExists = (ref) => {
  const file = path.join(root, ref);
  return fs.existsSync(file) && fs.statSync(file).isFile();
};

const collectHtmlRefs = () => {
  const refs = new Map();

  for (const doc of htmlDocs) {
    for (const match of doc.matchAll(/\b(?:src|href)="([^"]+)"/g)) {
      const ref = localPath(match[1]);
      if (ref) refs.set(ref, "HTML");
    }

    for (const match of doc.matchAll(/\bsrcset="([^"]+)"/g)) {
      for (const candidate of match[1].split(",")) {
        const ref = localPath(candidate.trim().split(/\s+/, 1)[0]);
        if (ref) refs.set(ref, "HTML srcset");
      }
    }

    for (const match of doc.matchAll(/\bdata-lightbox="([^"]+)"/g)) {
      const ref = localPath(match[1]);
      if (ref) refs.set(ref, "lightbox");
    }
  }

  return refs;
};

const collectCssRefs = () => {
  const refs = new Set();
  for (const match of css.matchAll(/url\(\s*(['"]?)([^)'"]+)\1\s*\)/g)) {
    const ref = localPath(match[2]);
    if (ref) refs.add(ref);
  }
  return refs;
};

const existingRefs = new Map([...collectHtmlRefs()]);
for (const ref of collectCssRefs()) existingRefs.set(ref, "CSS");

const missing = [...existingRefs].filter(([ref]) => !refExists(ref));
if (missing.length) {
  for (const [ref, source] of missing) fail("Referencia local inexistente", `${ref} (${source})`);
} else {
  pass("Referencias locales", `${existingRefs.size} archivos referenciados existen`);
}

const originalPngRefs = [
  ...html.matchAll(/imagenes\/[^"')\s]+\.(?:png|PNG)/g),
  ...css.matchAll(/imagenes\/[^"')\s]+\.(?:png|PNG)/g),
];
if (originalPngRefs.length) {
  fail("PNG original referenciado", originalPngRefs.map((match) => match[0]).join(", "));
} else {
  pass("Assets optimizados", "no quedan referencias directas a los PNG originales");
}

const optimized = [
  "manicura-fucsia",
  "manicura-rosa-negra",
  "manos-lima",
  "hero-manicura",
  "manicura-menta",
  "manicura-celeste",
  "ritual-pies",
];
const missingVariants = [];
const badSignatures = [];
for (const name of optimized) {
  for (const extension of ["avif", "webp", "jpg"]) {
    const ref = `imagenes/optimized/${name}.${extension}`;
    if (!refExists(ref)) {
      missingVariants.push(ref);
      continue;
    }

    const header = fs.readFileSync(path.join(root, ref)).subarray(0, 16);
    const signatureOk =
      extension === "avif"
        ? header.subarray(4, 8).toString("ascii") === "ftyp"
        : extension === "webp"
          ? header.subarray(0, 4).toString("ascii") === "RIFF" &&
            header.subarray(8, 12).toString("ascii") === "WEBP"
          : header[0] === 0xff && header[1] === 0xd8;

    if (!signatureOk) badSignatures.push(ref);
  }
}
if (missingVariants.length) {
  fail("Variantes optimizadas incompletas", missingVariants.join(", "));
} else if (badSignatures.length) {
  fail("Formato de imagen incorrecto", badSignatures.join(", "));
} else {
  pass("Variantes optimizadas", `${optimized.length * 3} archivos AVIF/WebP/JPEG con formato correcto`);
}

const imgTags = html.match(/<img\b[^>]*>/g) || [];
const imgIssues = [];
for (const tag of imgTags) {
  if (/\bid="lightboxImage"/.test(tag)) {
    if (!/\balt=/.test(tag)) imgIssues.push("lightboxImage sin alt");
    continue;
  }
  for (const attribute of ["alt", "width", "height", "loading", "decoding"]) {
    if (!new RegExp(`\\b${attribute}=`).test(tag)) {
      imgIssues.push(`img sin ${attribute}: ${tag.slice(0, 70)}...`);
    }
  }
}
if (imgIssues.length) fail("Atributos de imágenes", imgIssues.join(" | "));
else pass("Atributos de imágenes", "alt, dimensiones, lazy loading y decoding presentes");

const externalLinks = htmlDocs.flatMap((doc) =>
  (doc.match(/<a\b[^>]*target="_blank"[^>]*>/g) || []).filter((tag) =>
    /target="_blank"/.test(tag)
  )
);
const badLinks = externalLinks.filter((tag) => {
  const rel = tag.match(/\brel="([^"]*)"/)?.[1] || "";
  return !/\bnoopener\b/.test(rel) || !/\bnoreferrer\b/.test(rel);
});
if (badLinks.length) fail("Enlaces externos", "falta noopener/noreferrer");
else pass("Enlaces externos", `${externalLinks.length} enlaces con noopener y noreferrer`);

const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
if (duplicateIds.length) fail("IDs duplicados", [...new Set(duplicateIds)].join(", "));
else pass("IDs únicos", `${ids.length} IDs sin duplicados`);

const inlineScripts = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)].map(
  (match) => match[1]
);
const cspContent = html.match(
  /<meta\s+http-equiv="Content-Security-Policy"\s+content="([^"]+)"/
)?.[1] || "";
const missingHashes = [];
for (const script of inlineScripts) {
  const hash = `sha256-${crypto.createHash("sha256").update(script, "utf8").digest("base64")}`;
  if (!cspContent.includes(hash)) missingHashes.push(hash);
}
if (!cspContent) fail("CSP", "no se encontró la meta Content-Security-Policy");
else if (missingHashes.length) fail("CSP", `hashes desactualizados: ${missingHashes.join(", ")}`);
else pass("CSP", `${inlineScripts.length} scripts inline autorizados por hash`);

const requiredMeta = [
  ["charset", /<meta\s+charset="utf-8"/i],
  ["viewport", /<meta\s+name="viewport"/i],
  ["description", /<meta\s+name="description"/i],
  ["referrer", /<meta\s+name="referrer"/i],
  ["theme-color", /<meta\s+name="theme-color"/i],
];
const missingMeta = requiredMeta.filter(([, pattern]) => !pattern.test(html)).map(([name]) => name);
if (missingMeta.length) fail("Metadatos", `faltan: ${missingMeta.join(", ")}`);
else pass("Metadatos", "charset, viewport, description, referrer y theme-color");

const badLangDocs = [html, ...legalDocs.map((doc) => doc.html)].filter(
  (doc) => !/<html\s+lang="es-AR"/.test(doc)
);
if (badLangDocs.length) fail("Idioma", 'se esperaba lang="es-AR" en todas las páginas');
else pass("Idioma", `${htmlDocs.length} páginas con lang=es-AR`);

if (htmlDocs.some((doc) => /\bsrc=""|\bhref="#"/.test(doc))) {
  fail("Atributos vacíos", 'se encontró src="" o href="#"');
} else {
  pass("Atributos vacíos", "sin src/href vacíos en todas las páginas");
}

const legalIssues = [];
for (const { file, html: doc } of legalDocs) {
  if (!/<meta\s+http-equiv="Content-Security-Policy"/.test(doc)) {
    legalIssues.push(`${file}: sin CSP`);
  }
  if (!/<meta\s+name="description"/.test(doc)) {
    legalIssues.push(`${file}: sin description`);
  }
  if (!/<meta\s+name="referrer"/.test(doc)) {
    legalIssues.push(`${file}: sin referrer`);
  }
}
for (const file of legalPages) {
  if (!html.includes(`href="${file}"`)) {
    legalIssues.push(`${file}: no está enlazado desde index.html`);
  }
}
if (legalIssues.length) {
  fail("Legal y privacidad", legalIssues.join(" | "));
} else {
  pass("Legal y privacidad", "páginas enlazadas, con CSP y metadatos");
}

const originalFiles = [
  "imagen 1.png",
  "imagen 2.PNG",
  "imagen 3.PNG",
  "imagen 4.PNG",
  "imagen 5.png",
  "imagen 6.png",
  "pie imagen 7.PNG",
].filter((file) => fs.existsSync(path.join(root, "imagenes", file)));

const optimizedBytes = optimized.reduce(
  (total, name) => total + fs.statSync(path.join(root, "imagenes/optimized", `${name}.avif`)).size,
  0
);

if (originalFiles.length === 7) {
  const originalBytes = originalFiles.reduce(
    (total, file) => total + fs.statSync(path.join(root, "imagenes", file)).size,
    0
  );
  const saving = Math.round((1 - optimizedBytes / originalBytes) * 100);
  pass(
    "Peso de imágenes",
    `${Math.round(originalBytes / 1024)} KB PNG → ${Math.round(optimizedBytes / 1024)} KB AVIF (-${saving}%)`
  );
} else {
  pass(
    "Peso de imágenes",
    `${Math.round(optimizedBytes / 1024)} KB AVIF en total; los PNG originales de la galería no están en el proyecto`
  );
}

for (const result of results) {
  console.log(`${result.ok ? "[OK]  " : "[ERROR]"} ${result.name}${result.detail ? ` — ${result.detail}` : ""}`);
}

console.log("");
console.log(`Resumen: ${results.length} comprobaciones, ${errors.length} errores, ${warnings.length} avisos.`);
if (errors.length) {
  console.log("");
  console.log("Errores:");
  for (const error of errors) console.log(`- ${error}`);
  process.exitCode = 1;
}
