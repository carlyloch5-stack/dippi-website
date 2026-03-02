/* ============================================
   DIPPI — Landing Page Scripts
   Good Vibes. Easy Rides.
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- NAV SCROLL BEHAVIOR ----------
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  const handleNavScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // ---------- HERO FADE-IN ON LOAD ----------
  const heroElements = document.querySelectorAll('.fade-up');
  setTimeout(() => {
    heroElements.forEach(el => el.classList.add('visible'));
  }, 200);

  // ---------- SCROLL REVEAL (Intersection Observer) ----------
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ---------- FORM HANDLING ----------
  const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbzOGQaQeau7LbetI59LrO0lB_vzeob_KbE_n0DIuhWYOWKX3s_jxDOldBiOvPduXMMX9A/exec';
  const forms = document.querySelectorAll('#hero-form, #cta-form');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const email = input.value.trim();

      if (!email) return;

      const formGroup = form.querySelector('.form-group');
      const formNote = form.querySelector('.form-note');
      const submitBtn = form.querySelector('button[type="submit"]');

      // Disable button while sending
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      // Send email to Google Sheet
      fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email })
      })
      .then(() => {
        formGroup.innerHTML = `
          <div class="form-success">
            &#10003; You're on the list! We'll be in touch soon.
          </div>
        `;
        if (formNote) formNote.style.display = 'none';
      })
      .catch(() => {
        formGroup.innerHTML = `
          <div class="form-success">
            &#10003; You're on the list! We'll be in touch soon.
          </div>
        `;
        if (formNote) formNote.style.display = 'none';
      });
    });
  });

  // ---------- SMOOTH SCROLL FOR ANCHOR LINKS ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ---------- PARALLAX SCENE (subtle) ----------
  const heroScene = document.querySelector('.hero-scene');
  if (heroScene && window.matchMedia('(min-width: 900px)').matches) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const heroHeight = document.querySelector('.hero').offsetHeight;
      if (scrollY < heroHeight) {
        const progress = scrollY / heroHeight;
        heroScene.style.transform = `translateY(${progress * 20}px)`;
      }
    }, { passive: true });
  }

});
