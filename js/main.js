/* ═══════════════════════════════════════════════
   Ai-LEARN Project Website — Main JS
   ═══════════════════════════════════════════════ */

'use strict';

// ── Sticky navbar ─────────────────────────────
const navbar = document.getElementById('navbar');
const onScroll = () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
};
window.addEventListener('scroll', onScroll, { passive: true });

// ── Mobile nav toggle ─────────────────────────
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── Active nav link on scroll ─────────────────
const sections = document.querySelectorAll('section[id], footer[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const observerOpts = { rootMargin: '-40% 0px -55% 0px' };
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
      });
    }
  });
}, observerOpts);
sections.forEach(s => sectionObserver.observe(s));

// ── Work Package accordion ────────────────────
document.querySelectorAll('.wp-header').forEach(header => {
  header.addEventListener('click', () => {
    const item = header.closest('.wp-item');
    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.wp-item.open').forEach(el => el.classList.remove('open'));

    // Toggle clicked
    if (!isOpen) item.classList.add('open');
  });

  // Keyboard support
  header.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      header.click();
    }
  });
});

// Open the first WP by default
const firstWp = document.querySelector('.wp-item');
if (firstWp) firstWp.classList.add('open');

// ── Smooth scroll offset for fixed nav ────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = navbar.offsetHeight + 16;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ── Fade-in on scroll (intersection observer) ─
const fadeEls = document.querySelectorAll(
  '.objective-card, .partner-card, .case-card, .tool-card, ' +
  '.fact-card, .timeline-card, .result-item, .contact-card'
);

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      fadeObserver.unobserve(entry.target);
    }
  });
}, { rootMargin: '0px 0px -60px 0px' });

fadeEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity 0.5s ease ${(i % 6) * 0.07}s, transform 0.5s ease ${(i % 6) * 0.07}s`;
  fadeObserver.observe(el);
});
