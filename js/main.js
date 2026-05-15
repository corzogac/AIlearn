/* ═══════════════════════════════════════════════
   Ai-LEARN Project Website — Main JS
   ═══════════════════════════════════════════════ */

'use strict';

// ── Sticky navbar ─────────────────────────────
const navbar = document.getElementById('navbar');
if (navbar) {
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ── Mobile nav toggle ─────────────────────────
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// ── Active nav link based on current page ──────
if (navLinks) {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.querySelectorAll('a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}

// ── Work Package accordion ────────────────────
document.querySelectorAll('.wp-header').forEach(header => {
  header.addEventListener('click', () => {
    const item = header.closest('.wp-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.wp-item.open').forEach(el => el.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
  header.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); header.click(); }
  });
});
const firstWp = document.querySelector('.wp-item');
if (firstWp) firstWp.classList.add('open');

// ── Smooth scroll offset for fixed nav ────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = (navbar ? navbar.offsetHeight : 80) + 16;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
  });
});

// ── Fade-in on scroll (intersection observer) ─
const fadeEls = document.querySelectorAll(
  '.objective-card, .partner-card, .case-card, .tool-card, ' +
  '.fact-card, .timeline-card, .result-item, .contact-card, ' +
  '.quicklink-card, .agent-card, .news-card, .aura-role-list li'
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
