/* ============================================================
   AWOLESI VICTOR PORTFOLIO — Main JavaScript
   Features: Theme Toggle | Loading Screen | Scroll Reveal
             Mobile Menu | Project Modals | Image Carousel
             Copyright Year | Navbar Scroll Effect
   ============================================================ */

'use strict';

// ─────────────────────────── DOM READY ───────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLoadingScreen();
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initModals();
  initCarousels();
  initCopyrightYear();
  initContactForm();
  initBounceText();
  initCursorGlow();
  initParallax();
  initCountUp();
  initCardTilt();
  initTypedProfileCode();
});

// ─────────────────────────── THEME TOGGLE ───────────────────────────
function initTheme() {
  const html = document.documentElement;
  const themeBtn = document.getElementById('theme-btn');
  const themeIcon = document.getElementById('theme-icon');

  // Load saved theme or default to dark
  const savedTheme = localStorage.getItem('av-theme') || 'dark';
  applyTheme(savedTheme);

  themeBtn?.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('av-theme', next);
  });

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);

    // Also load the light.css dynamically
    let lightLink = document.getElementById('light-theme-css');
    if (theme === 'light') {
      if (!lightLink) {
        lightLink = document.createElement('link');
        lightLink.id = 'light-theme-css';
        lightLink.rel = 'stylesheet';
        lightLink.href = 'ASSETS/styles/light.css';
        document.head.appendChild(lightLink);
      }
    } else {
      lightLink?.remove();
    }

    // Update icon
    if (themeIcon) {
      themeIcon.className = theme === 'dark'
        ? 'fas fa-sharp fa-sun'
        : 'fas fa-sharp fa-moon';
    }
  }
}

// ─────────────────────────── LOADING SCREEN ───────────────────────────
function initLoadingScreen() {
  const loader = document.getElementById('loadingContainer');
  if (!loader) {
    triggerHeroReveals();
    return;
  }

  const hide = () => {
    loader.classList.add('hidden');
    // After transition, trigger initial reveal for visible elements
    setTimeout(() => {
      triggerVisibleReveals();
      triggerHeroReveals();
    }, 200);
  };

  if (document.readyState === 'complete') {
    setTimeout(hide, 1400);
  } else {
    window.addEventListener('load', () => setTimeout(hide, 1400));
    setTimeout(hide, 3500);
  }
}

// ─────────────────────────── NAVBAR ───────────────────────────
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  // Scroll effect
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled > 50) {
      navbar.classList.add('scrolled');
      // Intensify blur dynamically based on scroll distance (cap at 40px)
      const blurVal = Math.min(24 + (scrolled - 50) * 0.05, 40);
      navbar.style.backdropFilter = `blur(${blurVal}px)`;
      navbar.style.webkitBackdropFilter = `blur(${blurVal}px)`;
    } else {
      navbar.classList.remove('scrolled');
      navbar.style.backdropFilter = '';
      navbar.style.webkitBackdropFilter = '';
    }
  }, { passive: true });

  // Active link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => link.classList.remove('active'));
          const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
          active?.classList.add('active');
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
}

// ─────────────────────────── MOBILE MENU ───────────────────────────
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const navbar = document.getElementById('navbar');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const isOpen = menu.classList.contains('open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      menu.classList.add('open');
      navbar?.classList.add('mobile-menu-open');
      btn.setAttribute('aria-expanded', 'true');
      const icon = btn.querySelector('i');
      if (icon) {
        icon.className = 'fas fa-times';
      }
    }
  });
}

function closeMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const btn = document.getElementById('mobile-menu-btn');
  const navbar = document.getElementById('navbar');
  menu?.classList.remove('open');
  navbar?.classList.remove('mobile-menu-open');
  btn?.setAttribute('aria-expanded', 'false');
  const icon = btn?.querySelector('i');
  if (icon) {
    icon.className = 'fas fa-bars';
  }
}

// ─────────────────────────── SCROLL REVEAL ───────────────────────────
function initScrollReveal() {
  // Map staggered container children to individual reveal animations
  document.querySelectorAll('.reveal-stagger').forEach((container) => {
    const children = container.children;
    Array.from(children).forEach((child, index) => {
      child.classList.add('reveal-up');
      // Incremental delay capped at 0.6s to keep visual flow fast
      const delay = Math.min(index * 0.05, 0.6);
      child.style.animationDelay = `${delay}s`;
    });
  });

  const elements = document.querySelectorAll('.reveal-up');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.style.animationDelay || '0s';
          const delayMs = parseFloat(delay) * 1000;
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, delayMs);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
}

function triggerVisibleReveals() {
  // Immediately reveal elements that are already in the viewport
  const elements = document.querySelectorAll('.reveal-up:not(.revealed)');
  elements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      const delay = parseFloat(el.style.animationDelay || '0') * 1000;
      setTimeout(() => el.classList.add('revealed'), delay);
    }
  });
}

// ─────────────────────────── PROJECT MODALS ───────────────────────────
function initModals() {
  // Close on overlay click
  document.querySelectorAll('.modal-overlay').forEach((overlay) => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        const modalId = overlay.id;
        closeModal(modalId);
      }
    });
  });

  // Keyboard: Escape to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach((overlay) => {
        closeModal(overlay.id);
      });
    }
  });

  // Card keyboard activation (Enter/Space)
  document.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  document.body.style.overflow = 'hidden';
  modal.classList.add('active');

  // Focus the close button for accessibility
  setTimeout(() => {
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn?.focus();
  }, 100);

  // Reset carousel to slide 0
  const carouselId = modal.querySelector('.carousel-track')?.id;
  if (carouselId) {
    resetCarousel(carouselId);
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// ─────────────────────────── CAROUSEL ───────────────────────────
const carouselState = {};

function initCarousels() {
  document.querySelectorAll('.carousel-track').forEach((track) => {
    const id = track.id;
    const slides = track.querySelectorAll('.carousel-slide');
    const dotsContainer = document.getElementById(`dots-${id.replace('carousel-', '')}`);

    carouselState[id] = { current: 0, total: slides.length };

    // Build dots
    if (dotsContainer) {
      slides.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.className = `carousel-dot${i === 0 ? ' active' : ''}`;
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => goToSlide(id, i));
        dotsContainer.appendChild(dot);
      });
    }
  });
}

function goToSlide(trackId, index) {
  const track = document.getElementById(trackId);
  if (!track) return;

  const state = carouselState[trackId];
  if (!state) return;

  state.current = Math.max(0, Math.min(index, state.total - 1));
  track.style.transform = `translateX(-${state.current * 100}%)`;

  // Update dots
  const suffix = trackId.replace('carousel-', '');
  const dots = document.querySelectorAll(`#dots-${suffix} .carousel-dot`);
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === state.current);
  });
}

function carouselNext(trackId) {
  const state = carouselState[trackId];
  if (!state) return;
  const next = (state.current + 1) % state.total;
  goToSlide(trackId, next);
}

function carouselPrev(trackId) {
  const state = carouselState[trackId];
  if (!state) return;
  const prev = (state.current - 1 + state.total) % state.total;
  goToSlide(trackId, prev);
}

function resetCarousel(trackId) {
  goToSlide(trackId, 0);
}

// Touch/swipe support for carousels
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.modal-carousel').forEach((carousel) => {
    let startX = 0;
    let isDragging = false;

    carousel.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      isDragging = false;
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;

      const track = carousel.querySelector('.carousel-track');
      if (!track) return;

      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          carouselNext(track.id);
        } else {
          carouselPrev(track.id);
        }
      }
    }, { passive: true });
  });
});

// ─────────────────────────── COPYRIGHT YEAR ───────────────────────────
function initCopyrightYear() {
  const yearEl = document.getElementById('copyright-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

// ─────────────────────────── CONTACT FORM ───────────────────────────
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    let isValid = true;
    const inputs = form.querySelectorAll('.form-input, .form-textarea');

    inputs.forEach((input) => {
      if (!input.value.trim()) {
        isValid = false;
        input.classList.add('form-input-error');
        // Remove class after animation ends to allow re-trigger
        setTimeout(() => input.classList.remove('form-input-error'), 300);
      }
    });

    if (!isValid) {
      e.preventDefault();
      return;
    }

    const btn = document.getElementById('submit-btn');
    if (btn) {
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      btn.disabled = true;
    }
  });
}

// ─────────────────────────── BOUNCE TEXT ───────────────────────────
function initBounceText() {
  document.querySelectorAll('.bounce-text').forEach((el) => {
    const text = el.textContent.trim();
    el.innerHTML = text
      .split('')
      .map((char) => {
        if (char === ' ') return '&nbsp;';
        return `<span>${char}</span>`;
      })
      .join('');
  });
}

// ─────────────────────────── MOUSE-FOLLOW GLOW ───────────────────────────
function initCursorGlow() {
  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  glow.style.opacity = '0';
  document.body.appendChild(glow);

  window.addEventListener('mousemove', (e) => {
    if (document.documentElement.getAttribute('data-theme') === 'light') {
      glow.style.opacity = '0';
      return;
    }
    glow.style.opacity = '1';
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
  });
}

// ─────────────────────────── PARALLAX SCROLLING ───────────────────────────
function initParallax() {
  const heroContent = document.querySelector('#hero .hero-content');
  const glow1 = document.querySelector('.hero-glow-1');
  const glow2 = document.querySelector('.hero-glow-2');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled > window.innerHeight) return;

    if (heroContent) {
      heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
    }
    if (glow1) {
      glow1.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    if (glow2) {
      glow2.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
  }, { passive: true });
}

// ─────────────────────────── STATS COUNT UP ───────────────────────────
function initCountUp() {
  const elements = document.querySelectorAll('.stat-num, .badge-num');

  const animateCount = (el) => {
    const text = el.textContent;
    const target = parseInt(text, 10);
    if (isNaN(target)) return;

    const suffix = text.replace(/[0-9]/g, '');
    const duration = 2000;
    const startTime = performance.now();

    const update = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress * (2 - progress);
      const current = Math.floor(easeProgress * target);
      el.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = text;
      }
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach((el) => observer.observe(el));
}

// ─────────────────────────── 3D CARD TILT ───────────────────────────
function initCardTilt() {
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  if (isMobile) return; // Disable tilt on mobile for performance and better touch feel

  const cards = document.querySelectorAll('.project-card');

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const maxTilt = 6; // subtle tilt

      const tiltX = ((centerY - y) / centerY) * maxTilt;
      const tiltY = ((x - centerX) / centerX) * maxTilt;

      card.classList.add('tilt-active');
      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.classList.remove('tilt-active');
      card.style.transform = '';
    });
  });
}

// ─────────────────────────── HERO BRAND LOTTIE ───────────────────────────
function initTypedProfileCode() {
  const codeEl = document.getElementById('typed-profile-code');
  if (!codeEl) return;

  const snippets = [
    codeEl.dataset.code || codeEl.textContent,
    "// Current stack\nconst stack = [\n  'React',\n  'Node.js',\n  'TypeScript'\n];",
    "// Work mode\nconst available = true;\nconst location = 'Lagos, NG';",
    "// Proof\nconst stats = {\n  years: '2+',\n  projects: '15+'\n};",
  ];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reducedMotion) {
    codeEl.innerHTML = highlightCode(snippets[0]);
    return;
  }

  let snippetIndex = 0;
  let index = 0;
  let deleting = false;
  codeEl.innerHTML = '';

  const typeNext = () => {
    const source = snippets[snippetIndex];
    codeEl.innerHTML = highlightCode(source.slice(0, index));

    if (!deleting && codeEl.scrollHeight > codeEl.clientHeight && index > 0) {
      deleting = true;
      window.setTimeout(typeNext, 700);
      return;
    }

    if (!deleting && index < source.length) {
      index += 1;
      const char = source[index - 1] || '';
      const delay = char === '\n' ? 120 : char === ' ' ? 16 : 28;
      window.setTimeout(typeNext, delay);
      return;
    }

    if (!deleting) {
      const shouldReset = codeEl.scrollHeight > codeEl.clientHeight || index >= source.length;
      deleting = shouldReset;
      window.setTimeout(typeNext, shouldReset ? 1300 : 120);
      return;
    }

    if (index > 0) {
      index = Math.max(0, index - 2);
      window.setTimeout(typeNext, 16);
      return;
    }

    deleting = false;
    snippetIndex = (snippetIndex + 1) % snippets.length;
    window.setTimeout(typeNext, 250);
  };

  function highlightCode(code) {
    let escaped = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    const tokens = [];
    const stash = (html) => {
      const key = `@@TOKEN_${tokens.length}@@`;
      tokens.push(html);
      return key;
    };

    escaped = escaped
      .replace(/(\/\/.*)$/gm, (match) => stash(`<span class="code-comment">${match}</span>`))
      .replace(/'([^']*)'/g, (match) => stash(`<span class="code-string">${match}</span>`))
      .replace(/\b(const|let|true|false)\b/g, '<span class="code-keyword">$1</span>')
      .replace(/\b(\d+\+?)\b/g, '<span class="code-num">$1</span>')
      .replace(/^(\s*)([a-zA-Z_$][\w$]*)(?=:)/gm, '$1<span class="code-key">$2</span>')
      .replace(/\b(victor|stack|available|location|stats)\b/g, '<span class="code-var">$1</span>');

    return escaped.replace(/@@TOKEN_(\d+)@@/g, (_, id) => tokens[Number(id)]);
  }

  const observer = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      typeNext();
      observer.disconnect();
    }
  }, { threshold: 0.4 });

  observer.observe(codeEl);
}

// ─────────────────────────── HERO REVEALS ───────────────────────────
function triggerHeroReveals() {
  document.querySelectorAll('.hero-reveal').forEach((el) => {
    el.classList.add('revealed');
  });
}

// (Logo typing animation function removed per user request)
