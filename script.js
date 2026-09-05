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
  const SIGNUP_ENDPOINT = 'https://formsubmit.co/ajax/d82e4433baf3cd56d1b004ad29f56314';
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

      fetch(SIGNUP_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          email: email,
          source: form.id === 'hero-form' ? 'hero' : 'bottom-cta',
          _subject: 'New Dippi waitlist signup',
          _template: 'table',
          _cc: 'nab.isthisabanger@gmail.com'
        })
      })
      .then(res => {
        if (!res.ok) throw new Error('signup failed');
        return res.json();
      })
      .then(data => {
        if (data.success !== 'true' && data.success !== true) throw new Error('signup rejected');
        formGroup.innerHTML = `
          <div class="form-success">
            &#10003; You're on the list! We'll be in touch soon.
          </div>
        `;
        if (formNote) formNote.style.display = 'none';
      })
      .catch(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = form.id === 'hero-form' ? 'Notify Me' : 'Join the Waitlist';
        let err = form.querySelector('.form-error');
        if (!err) {
          err = document.createElement('p');
          err.className = 'form-error';
          err.style.cssText = 'color: #ffd7b0; font-size: 0.85rem; margin-top: 0.5rem;';
          form.appendChild(err);
        }
        err.textContent = "Hmm, that didn't go through. Please try again.";
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
