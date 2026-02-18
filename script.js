/* ============================================================
   AIFlow — script.js
   ============================================================ */

(function () {
  'use strict';

  /* ── Dark Mode ──────────────────────────────────────────── */
  const html = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');

  function applyTheme(dark) {
    if (dark) {
      html.classList.add('dark');
      themeToggle.innerHTML = '<span class="material-symbols-outlined" aria-hidden="true">light_mode</span>';
      themeToggle.setAttribute('aria-label', 'Activar modo claro');
    } else {
      html.classList.remove('dark');
      themeToggle.innerHTML = '<span class="material-symbols-outlined" aria-hidden="true">dark_mode</span>';
      themeToggle.setAttribute('aria-label', 'Activar modo oscuro');
    }
  }

  // Init from localStorage or system preference
  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(stored === 'dark' || (!stored && prefersDark));

  themeToggle.addEventListener('click', () => {
    const isDark = html.classList.contains('dark');
    applyTheme(!isDark);
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
  });

  /* ── Mobile Menu ────────────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close mobile menu on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  /* ── Scroll Spy ─────────────────────────────────────────── */
  const navLinks = document.querySelectorAll('.nav__links a[href^="#"]');
  const sections = document.querySelectorAll('section[id]');

  function updateScrollSpy() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }

  window.addEventListener('scroll', updateScrollSpy, { passive: true });
  updateScrollSpy();

  /* ── Scroll-Reveal (IntersectionObserver) ───────────────── */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all immediately
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ── Nav shadow on scroll ───────────────────────────────── */
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 10 ? '0 2px 20px rgba(0,0,0,0.08)' : '';
  }, { passive: true });

  /* ── Contact Form ───────────────────────────────────────── */
  const form = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mzdavaqn';

  function validateField(field) {
    const group = field.closest('.form-group');
    const errorMsg = group.querySelector('.error-msg');
    let valid = true;
    let msg = '';

    if (field.required && !field.value.trim()) {
      valid = false;
      msg = 'Este campo es obligatorio.';
    } else if (field.type === 'email' && field.value.trim()) {
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(field.value.trim())) {
        valid = false;
        msg = 'Introduce un email válido.';
      }
    }

    group.classList.toggle('has-error', !valid);
    if (errorMsg) errorMsg.textContent = msg;
    return valid;
  }

  // Live validation on blur
  form.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.closest('.form-group').classList.contains('has-error')) {
        validateField(field);
      }
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate all fields
    const fields = form.querySelectorAll('input, select, textarea');
    let allValid = true;
    fields.forEach(field => {
      if (!validateField(field)) allValid = false;
    });
    if (!allValid) return;

    const submitBtn = form.querySelector('.btn-submit');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando…';

    try {
      const data = new FormData(form);
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        form.style.display = 'none';
        formSuccess.classList.add('visible');
      } else {
        throw new Error('Error en el servidor');
      }
    } catch {
      // Fallback: mailto
      const nombre = form.nombre.value;
      const email = form.email.value;
      const servicio = form.servicio.value;
      const mensaje = form.mensaje.value;
      const subject = encodeURIComponent(`Consultoría BiAilitics — ${servicio}`);
      const body = encodeURIComponent(`Nombre: ${nombre}\nEmail: ${email}\nServicio: ${servicio}\n\n${mensaje}`);
      window.location.href = `mailto:infobiailitics@gmail.com?subject=${subject}&body=${body}`;
      submitBtn.disabled = false;
      submitBtn.textContent = 'Solicitar consultoría gratuita →';
    }
  });

})();
