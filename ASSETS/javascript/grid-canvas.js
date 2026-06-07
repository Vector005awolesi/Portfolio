/* ============================================================
   HERO ANIMATED GRID — Canvas-based interactive background
   Only active in dark mode. Mouse-reactive glow at grid nodes.
   ============================================================ */

(function () {
  'use strict';

  const canvas = document.getElementById('hero-grid-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let animId = null;
  let mouse = { x: -9999, y: -9999 };
  let isActive = true;
  let isDark = true;

  // ── Config ──
  const GRID_SIZE = 48;
  const NODE_RADIUS = 1.2;
  const GLOW_RADIUS = 180;
  const LINE_ALPHA_BASE = 0.04;
  const LINE_ALPHA_GLOW = 0.18;
  const NODE_ALPHA_BASE = 0.06;
  const NODE_ALPHA_GLOW = 0.55;
  const PARTICLE_COUNT = 28;
  const WAVE_SPEED = 0.0006;

  // ── Particles ──
  let particles = [];

  function createParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.3 + 0.1,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  // ── Resize ──
  function resize() {
    const hero = document.getElementById('hero');
    if (!hero) return;
    const rect = hero.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    createParticles();
  }

  // ── Distance helper ──
  function dist(x1, y1, x2, y2) {
    const dx = x1 - x2;
    const dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy);
  }

  // ── Draw ──
  let time = 0;

  function draw() {
    if (!isActive) {
      animId = null;
      return;
    }

    const color = isDark ? '138, 180, 248' : '26, 115, 232';

    time += WAVE_SPEED;
    ctx.clearRect(0, 0, width, height);

    const cols = Math.ceil(width / GRID_SIZE) + 1;
    const rows = Math.ceil(height / GRID_SIZE) + 1;

    // Draw grid lines
    for (let i = 0; i <= cols; i++) {
      const x = i * GRID_SIZE;
      // Check if any point along this vertical line is near mouse
      const dxMouse = Math.abs(x - mouse.x);
      const proximityV = Math.max(0, 1 - dxMouse / GLOW_RADIUS);
      const alpha = LINE_ALPHA_BASE + (LINE_ALPHA_GLOW - LINE_ALPHA_BASE) * proximityV;

      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.strokeStyle = `rgba(${color}, ${alpha})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    for (let j = 0; j <= rows; j++) {
      const y = j * GRID_SIZE;
      const dyMouse = Math.abs(y - mouse.y);
      const proximityH = Math.max(0, 1 - dyMouse / GLOW_RADIUS);
      const alpha = LINE_ALPHA_BASE + (LINE_ALPHA_GLOW - LINE_ALPHA_BASE) * proximityH;

      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.strokeStyle = `rgba(${color}, ${alpha})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    // Draw nodes at intersections with glow
    for (let i = 0; i <= cols; i++) {
      for (let j = 0; j <= rows; j++) {
        const x = i * GRID_SIZE;
        const y = j * GRID_SIZE;
        const d = dist(x, y, mouse.x, mouse.y);
        const proximity = Math.max(0, 1 - d / GLOW_RADIUS);

        // Subtle wave animation
        const wave = Math.sin(time * 1000 + i * 0.4 + j * 0.4) * 0.02;
        const alpha = NODE_ALPHA_BASE + wave + (NODE_ALPHA_GLOW - NODE_ALPHA_BASE) * proximity * proximity;
        const radius = NODE_RADIUS + proximity * 2.5;

        if (alpha > 0.02) {
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${color}, ${alpha})`;
          ctx.fill();

          // Extra glow ring for close nodes
          if (proximity > 0.3) {
            ctx.beginPath();
            ctx.arc(x, y, radius + 4 * proximity, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${color}, ${proximity * 0.12})`;
            ctx.fill();
          }
        }
      }
    }

    // Draw particles
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.phase += 0.01;

      // Wrap around
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      const flicker = Math.sin(p.phase) * 0.15 + 0.85;
      const pDist = dist(p.x, p.y, mouse.x, mouse.y);
      const pGlow = Math.max(0, 1 - pDist / (GLOW_RADIUS * 1.5));

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius * flicker, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color}, ${(p.alpha + pGlow * 0.3) * flicker})`;
      ctx.fill();
    });

    // Radial mouse glow overlay
    if (mouse.x > 0 && mouse.y > 0) {
      const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, GLOW_RADIUS);
      gradient.addColorStop(0, `rgba(${color}, ${isDark ? 0.04 : 0.05})`);
      gradient.addColorStop(1, `rgba(${color}, 0)`);
      ctx.fillStyle = gradient;
      ctx.fillRect(mouse.x - GLOW_RADIUS, mouse.y - GLOW_RADIUS, GLOW_RADIUS * 2, GLOW_RADIUS * 2);
    }

    animId = requestAnimationFrame(draw);
  }

  // ── Start / Stop ──
  function start() {
    if (animId) return;
    isActive = true;
    draw();
  }

  function stop() {
    isActive = false;
    if (animId) {
      cancelAnimationFrame(animId);
      animId = null;
    }
    ctx.clearRect(0, 0, width, height);
  }

  // ── Theme awareness ──
  function checkTheme() {
    const theme = document.documentElement.getAttribute('data-theme');
    isDark = theme !== 'light';
    canvas.style.opacity = '1';
  }

  // ── Events ──
  const hero = document.getElementById('hero');

  hero?.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  hero?.addEventListener('mouseleave', () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  // Debounced resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resize();
    }, 150);
  });

  // Pause when tab hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stop();
    } else if (isDark) {
      start();
    }
  });

  // Theme change observer
  const observer = new MutationObserver(() => checkTheme());
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });

  // ── Init ──
  // Disable on small screens for performance
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  if (isMobile) {
    canvas.style.display = 'none';
    return;
  }

  resize();
  checkTheme();
  start();
})();
