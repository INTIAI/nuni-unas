/* =========================================
   NUNI UÑAS · interacciones
   WhatsApp: +54 9 3447 412855
   ========================================= */

document.documentElement.classList.add("reveal-ready");

const STUDIO_WHATSAPP = "5493447412855";
const waLink = (text) =>
  `https://wa.me/${STUDIO_WHATSAPP}?text=${encodeURIComponent(text)}`;

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));

/* Mensaje general con enfoque de neuroventas: deseo, identidad y próximo paso claro. */
const GENERAL_WA_MESSAGE =
  "Hola Nuni! Vi tu web y me quedé pensando en mis manos. Quiero un turno para darme un gusto y salir con las uñas prolijas, con un color que me represente. ¿Qué horarios tenés esta semana?";

const waFloat = $("#waFloat");
if (waFloat) waFloat.href = waLink(GENERAL_WA_MESSAGE);

/* ---------- header con borde al hacer scroll ---------- */

const header = $(".site-header");
const onScroll = () => {
  if (!header) return;
  header.classList.toggle("scrolled", window.scrollY > 10);
};
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

/* ---------- menú móvil ---------- */

const menuToggle = $("#menuToggle");
const mobileNav = $("#mobileNav");

const closeMenu = () => {
  document.body.classList.remove("menu-open");
  if (mobileNav) {
    mobileNav.classList.remove("open");
    mobileNav.setAttribute("aria-hidden", "true");
  }
  if (menuToggle) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
  }
};

if (menuToggle && mobileNav) {
  mobileNav.setAttribute("aria-hidden", "true");

  menuToggle.addEventListener("click", () => {
    const open = !mobileNav.classList.contains("open");
    mobileNav.classList.toggle("open", open);
    mobileNav.setAttribute("aria-hidden", String(!open));
    document.body.classList.toggle("menu-open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  });

  $$("a, button", mobileNav).forEach((item) => {
    item.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    if (!mobileNav.classList.contains("open")) return;
    if (mobileNav.contains(event.target) || menuToggle.contains(event.target)) return;
    closeMenu();
  });
}

window.addEventListener(
  "resize",
  () => {
    if (window.innerWidth > 900) closeMenu();
  },
  { passive: true }
);

/* ---------- revelado al hacer scroll ---------- */

const revealItems = $$("[data-reveal]");

revealItems.forEach((item) => {
  if (item.dataset.delay) {
    item.style.transitionDelay = `${Number(item.dataset.delay)}ms`;
  }
});

if ("IntersectionObserver" in window && !reduceMotion) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          obs.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );

  revealItems.forEach((item) => observer.observe(item));

  const revealInView = () => {
    revealItems.forEach((item) => {
      if (item.classList.contains("in")) return;
      const rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.98 && rect.bottom > 0) {
        item.classList.add("in");
      }
    });
  };

  window.addEventListener("load", revealInView);
} else {
  revealItems.forEach((item) => item.classList.add("in"));
}

/* ---------- fecha mínima: hoy ---------- */

const dateInput = $("#date");

const toISODate = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

if (dateInput) {
  dateInput.min = toISODate(new Date());
  dateInput.addEventListener("input", () => dateInput.setCustomValidity(""));
}

/* ---------- modal de reserva ---------- */

const bookingModal = $("#bookingModal");
const bookingForm = $("#bookingForm");
const nameInput = $("#name");
const phoneInput = $("#phone");
const serviceSelect = $("#service");
const timeSelect = $("#time");
const colorSelect = $("#color");
const notesInput = $("#notes");
const urgentInput = $("#urgent");
const successBox = $("#formSuccess");
const successText = $("#successText");
const waFallback = $("#waFallback");

/* Validación de campos de texto: sin números ni caracteres raros donde no corresponden. */
const NAME_PATTERN = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?:[ '\-][A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)*$/;
const PHONE_PATTERN = /^\+?[\d\s()-]+$/;

const validateName = () => {
  if (!nameInput) return true;

  const raw = nameInput.value.trim();
  const normalized = raw.replace(/\s+/g, " ");
  let message = "";

  if (!normalized) {
    message = nameInput.value ? "Ingresá tu nombre." : "";
  } else if (normalized.length < 2) {
    message = "Ingresá al menos 2 letras.";
  } else if (normalized.length > 60) {
    message = "El nombre no puede superar los 60 caracteres.";
  } else if (!NAME_PATTERN.test(normalized)) {
    message = "Ingresá solo letras, espacios, apóstrofes o guiones. Sin números ni otros símbolos.";
  }

  nameInput.setCustomValidity(message);
  return !message;
};

const validatePhone = () => {
  if (!phoneInput) return true;

  const raw = phoneInput.value.trim();
  const digits = raw.replace(/\D/g, "");
  let message = "";

  if (!raw) {
    message = phoneInput.value ? "Ingresá tu WhatsApp." : "";
  } else if (!PHONE_PATTERN.test(raw)) {
    message = "Ingresá solo números. Podés usar +, espacios, guiones o paréntesis.";
  } else if (digits.length < 8 || digits.length > 15) {
    message = "El WhatsApp debe tener entre 8 y 15 números.";
  }

  phoneInput.setCustomValidity(message);
  return !message;
};

const validateSelect = (select, message) => {
  if (!select) return true;

  const valid = select.value !== "" && select.selectedIndex >= 0;
  select.setCustomValidity(valid ? "" : message);
  return valid;
};

if (nameInput) {
  nameInput.addEventListener("input", validateName);
  nameInput.addEventListener("blur", validateName);
}

if (phoneInput) {
  phoneInput.addEventListener("input", validatePhone);
  phoneInput.addEventListener("blur", validatePhone);
}

[serviceSelect, timeSelect, colorSelect].forEach((select) => {
  if (select) select.addEventListener("change", () => select.setCustomValidity(""));
});

let lastFocused = null;
let lastLightboxFocused = null;

const openBooking = (service) => {
  if (!bookingModal) return;

  lastFocused = document.activeElement;
  bookingModal.hidden = false;
  bookingModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  if (service && serviceSelect) {
    serviceSelect.value = service;
  }

  if (successBox) successBox.hidden = true;
  if (dateInput && !dateInput.min) dateInput.min = toISODate(new Date());

  window.setTimeout(() => {
    const target = $("#name") || $(".modal-close", bookingModal);
    if (target) target.focus();
  }, 40);
};

const closeBooking = () => {
  if (!bookingModal || bookingModal.hidden) return;

  bookingModal.hidden = true;
  bookingModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");

  if (lastFocused && typeof lastFocused.focus === "function") {
    lastFocused.focus();
  }
};

$$("[data-open-booking]").forEach((button) => {
  button.addEventListener("click", () => {
    openBooking(button.dataset.service || "");
  });
});

$$("[data-close]").forEach((element) => {
  element.addEventListener("click", closeBooking);
});

/* ---------- formulario → WhatsApp ---------- */

const formatDate = (value) => {
  if (!value) return "";
  const [y, m, d] = value.split("-");
  return `${d}/${m}/${y}`;
};

const isWithinUrgencyWindow = (value) => {
  if (!value) return false;
  const chosen = new Date(`${value}T23:59:59.999`);
  const diff = chosen.getTime() - Date.now();
  return diff > 0 && diff <= 48 * 60 * 60 * 1000;
};

if (urgentInput) {
  urgentInput.addEventListener("change", () => urgentInput.setCustomValidity(""));
}

if (bookingForm) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (dateInput && dateInput.value) {
      const chosen = new Date(`${dateInput.value}T00:00:00`);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      dateInput.setCustomValidity(
        chosen < today ? "Elegí una fecha a partir de hoy." : ""
      );
    }

    if (urgentInput && urgentInput.checked) {
      urgentInput.setCustomValidity(
        isWithinUrgencyWindow(dateInput ? dateInput.value : "")
          ? ""
          : "El turno urgente solo aplica dentro de las próximas 48 horas."
      );
    }

    validateName();
    validatePhone();
    validateSelect(serviceSelect, "Elegí un servicio de la lista.");
    validateSelect(timeSelect, "Elegí una franja horaria.");
    validateSelect(colorSelect, "Elegí un color de la lista.");

    if (!bookingForm.reportValidity()) return;

    const name = nameInput ? nameInput.value.trim() : "";
    const phone = phoneInput ? phoneInput.value.trim() : "";
    const service =
      serviceSelect && serviceSelect.selectedIndex >= 0
        ? serviceSelect.options[serviceSelect.selectedIndex].text
        : "Por definir";
    const date = dateInput ? dateInput.value : "";
    const franja = timeSelect ? timeSelect.value : "";
    const color = colorSelect ? colorSelect.value : "Ojo de gato";
    const notes = notesInput ? notesInput.value.trim() : "";
    const urgent = urgentInput ? urgentInput.checked : false;

    const message = [
      "Hola Nuni! Quiero reservar un turno.",
      `Nombre: ${name}`,
      `Servicio: ${service}`,
      `Fecha: ${formatDate(date)}`,
      `Franja: ${franja}`,
      `Mi WhatsApp: ${phone}`,
      `Color de referencia: ${color}`,
      notes ? `Nota: ${notes}` : "",
      urgent ? "Urgente: Sí (+$5.000, dentro de 48 h)" : "",
      "¿Me confirmás disponibilidad? Gracias!",
    ]
      .filter((line) => line !== "")
      .join("\n");

    const url = waLink(message);

    if (waFallback) waFallback.href = url;

    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (win) win.opener = null;

    if (successText) {
      successText.textContent = win
        ? name
          ? `¡Listo, ${name}! Abrí WhatsApp con tu mensaje armado.`
          : "¡Listo! Abrí WhatsApp con tu mensaje armado."
        : name
          ? `¡Listo, ${name}! Tu navegador bloqueó la pestaña. Usá el botón de abajo para confirmar por WhatsApp.`
          : "Tu navegador bloqueó la pestaña. Usá el botón de abajo para confirmar por WhatsApp.";
    }

    if (successBox) {
      successBox.hidden = false;
      successBox.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "nearest",
      });
    }
  });

  bookingForm.addEventListener("input", () => {
    if (successBox) successBox.hidden = true;
  });
}

/* ---------- lightbox de galería ---------- */

const lightbox = $("#lightbox");
const lightboxImage = $("#lightboxImage");
const lightboxClose = $("#lightboxClose");
const EMPTY_IMAGE =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

const closeLightbox = () => {
  if (!lightbox || lightbox.hidden) return;
  lightbox.hidden = true;
  document.body.classList.remove("modal-open");
  if (lightboxImage) lightboxImage.src = EMPTY_IMAGE;

  if (lastLightboxFocused && typeof lastLightboxFocused.focus === "function") {
    lastLightboxFocused.focus();
  }
};

$$("[data-lightbox]").forEach((button) => {
  button.addEventListener("click", () => {
    if (!lightbox || !lightboxImage) return;
    lastLightboxFocused = document.activeElement;
    const img = $("img", button);
    lightboxImage.src = button.dataset.lightbox;
    lightboxImage.alt = img ? img.alt : "";
    lightbox.hidden = false;
    document.body.classList.add("modal-open");
    if (lightboxClose) lightboxClose.focus();
  });
});

if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
}

/* ---------- carrusel de compromisos ---------- */

const promisesTrack = $("#promisesTrack");

$$("[data-promise-dir]").forEach((button) => {
  button.addEventListener("click", () => {
    if (!promisesTrack) return;
    const card = $(".promise-card", promisesTrack);
    const step = card ? card.getBoundingClientRect().width + 12 : 300;
    promisesTrack.scrollBy({
      left: Number(button.dataset.promiseDir) * step,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  });
});

/* ---------- teclado: cerrar y atrapar foco ---------- */

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
    closeBooking();
    closeLightbox();
    return;
  }

  if (event.key !== "Tab") return;

  const activeModal =
    bookingModal && !bookingModal.hidden
      ? bookingModal
      : lightbox && !lightbox.hidden
        ? lightbox
        : null;

  if (!activeModal) return;

  const focusables = $$(
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    activeModal
  ).filter((element) => element.offsetParent !== null);

  if (!focusables.length) return;

  const first = focusables[0];
  const last = focusables[focusables.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

/* ---------- año del footer ---------- */

const year = $("#year");
if (year) year.textContent = String(new Date().getFullYear());
