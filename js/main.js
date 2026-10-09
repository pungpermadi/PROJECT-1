/* ============================================================
   Ipung Permadi — Portfolio
   Interactions: typewriter, particles, nav, reveal, form, to-top
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  initYear();
  initTypewriter();
  initParticles();
  initNavbar();
  initMobileMenu();
  initScrollSpy();
  initReveal();
  initContactForm();
  initToTop();
});

/* ---------- Footer year ---------- */
function initYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

/* ---------- Typewriter effect ---------- */
function initTypewriter() {
  const target = document.getElementById("typewriter");
  if (!target) return;

  const phrases = [
    "Music Director",
    "Olah rasa dengan suara",
    "Direct Scores Movie Music",
    "Jakarta, Indonesia",
  ];
  let p = 0, c = 0, deleting = false;

  const tick = () => {
    const word = phrases[p];
    target.textContent = deleting
      ? word.substring(0, c--)
      : word.substring(0, c++);

    let delay = deleting ? 45 : 90;

    if (!deleting && c === word.length + 1) {
      delay = 1600;
      deleting = true;
    } else if (deleting && c === 0) {
      deleting = false;
      p = (p + 1) % phrases.length;
      delay = 350;
    }
    setTimeout(tick, delay);
  };
  tick();
}

/* ---------- Animated particles ---------- */
function initParticles() {
  const canvas = document.getElementById("particles");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let w, h, particles;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const resize = () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    const count = Math.min(90, Math.floor((w * h) / 18000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.8 + 0.5,
    }));
  };

  const colors = ["124,92,255", "34,211,238", "255,92,138"];

  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < particles.length; i++) {
      const a = particles[i];
      a.x += a.vx; a.y += a.vy;
      if (a.x < 0 || a.x > w) a.vx *= -1;
      if (a.y < 0 || a.y > h) a.vy *= -1;

      ctx.beginPath();
      ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(124,92,255,0.6)";
      ctx.fill();

      // link nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          const c = colors[(i + j) % colors.length];
          ctx.strokeStyle = `rgba(${c},${(1 - dist / 120) * 0.18})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  };

  resize();
  window.addEventListener("resize", resize);
  if (!reduced) draw();
}

/* ---------- Navbar background on scroll ---------- */
function initNavbar() {
  const nav = document.getElementById("navbar");
  if (!nav) return;
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 20);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ---------- Mobile menu toggle ---------- */
function initMobileMenu() {
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("nav-menu");
  if (!toggle || !menu) return;

  const close = () => {
    toggle.classList.remove("open");
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });

  menu.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", close)
  );
}

/* ---------- Scroll spy (active nav link) ---------- */
function initScrollSpy() {
  const links = Array.from(document.querySelectorAll(".nav__link"));
  const sections = links
    .map((l) => document.querySelector(l.getAttribute("href")))
    .filter(Boolean);
  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach((l) =>
            l.classList.toggle("active", l.getAttribute("href") === `#${id}`)
          );
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => observer.observe(s));
}

/* ---------- Reveal on scroll ---------- */
function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // light stagger for grouped elements
          setTimeout(() => entry.target.classList.add("visible"), i * 60);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  items.forEach((el) => observer.observe(el));
}

/* ---------- Contact form validation ---------- */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  const status = document.getElementById("form-status");

  const setError = (name, msg) => {
    const field = form.querySelector(`#${name}`).closest(".field");
    const err = form.querySelector(`.field__error[data-for="${name}"]`);
    field.classList.toggle("invalid", Boolean(msg));
    if (err) err.textContent = msg || "";
    return !msg;
  };

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    const okName = setError("name", name ? "" : "Nama wajib diisi.");
    const okEmail = setError(
      "email",
      !email ? "Email wajib diisi." : !emailRe.test(email) ? "Format email tidak valid." : ""
    );
    const okMsg = setError(
      "message",
      !message ? "Pesan wajib diisi." : message.length < 10 ? "Pesan minimal 10 karakter." : ""
    );
    return okName && okEmail && okMsg;
  };

  // live clear on input
  ["name", "email", "message"].forEach((n) =>
    form[n].addEventListener("input", () => setError(n, ""))
  );

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    status.className = "form__status";
    status.textContent = "";

    if (!validate()) {
      status.classList.add("error");
      status.textContent = "Mohon perbaiki kesalahan di atas.";
      return;
    }

    // simulate async send
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Mengirim...";

    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = original;
      form.reset();
      status.classList.add("success");
      status.textContent = "Terima kasih! Pesan Anda berhasil terkirim.";
      setTimeout(() => {
        status.textContent = "";
        status.className = "form__status";
      }, 5000);
    }, 1200);
  });
}

/* ---------- Back to top ---------- */
function initToTop() {
  const btn = document.getElementById("to-top");
  if (!btn) return;
  const onScroll = () => btn.classList.toggle("show", window.scrollY > 500);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  btn.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );
}
