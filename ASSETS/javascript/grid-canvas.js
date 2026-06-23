/* ============================================================
   HERO PREMIUM GRID — Canvas-based sleek background
   Palette-aware: #3498DB lines on dark, subtle navy on light
   Mobile: static grid (performance). Desktop: animated + mouse glow.
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
  let isMobile = window.matchMedia('(max-width: 768px)').matches;
  let isTouch = window.matchMedia('(pointer: coarse)').matches;

  const GRID_SIZE = isMobile ? 48 : 64;
  const MAJOR_EVERY = 4;
  const GLOW_RADIUS = isMobile ? 140 : 220;
  const NODE_RADIUS = 0.9;
  const WAVE_SPEED = 0.0004;

  let time = 0;

  function getColors() {
    if (isDark) {
      return {
        line: '52, 152, 219',
        major: '52, 152, 219',
        node: '52, 152, 219',
        vignette: '26, 37, 48',
      };
    }
    return {
      line: '44, 62, 80',
      major: '52, 152, 219',
      node: '52, 152, 219',
      vignette: '236, 240, 241',
    };
  }

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
  }

  function dist(x1, y1, x2, y2) {
    const dx = x1 - x2;
    const dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function drawVignette(colors) {
    const cx = width / 2;
    const cy = height / 2;
    const radius = Math.max(width, height) * 0.8;
    const gradient = ctx.createRadialGradient(cx, cy, radius * 0.15, cx, cy, radius);
    gradient.addColorStop(0, `rgba(${colors.vignette}, 0)`);
    gradient.addColorStop(1, `rgba(${colors.vignette}, ${isDark ? 0.35 : 0.22})`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }

  function getAlphas() {
    return {
      minor: isDark ? 0.045 : 0.038,
      major: isDark ? 0.10 : 0.075,
      glow: isDark ? 0.24 : 0.17,
      nodeBase: isDark ? 0.065 : 0.05,
      nodeGlow: isDark ? 0.48 : 0.36,
    };
  }

  function drawGrid(colors) {
    const alphas = getAlphas();
    const cols = Math.ceil(width / GRID_SIZE) + 1;
    const rows = Math.ceil(height / GRID_SIZE) + 1;

    for (let i = 0; i <= cols; i++) {
      const x = i * GRID_SIZE;
      const isMajor = i % MAJOR_EVERY === 0;
      const dxMouse = Math.abs(x - mouse.x);
      const proximity = isTouch ? 0 : Math.max(0, 1 - dxMouse / GLOW_RADIUS);
      const baseAlpha = isMajor ? alphas.major : alphas.minor;
      const alpha = baseAlpha + (alphas.glow - baseAlpha) * proximity * proximity;
      const rgb = isMajor ? colors.major : colors.line;

      ctx.beginPath();
      ctx.moveTo(x + 0.5, 0);
      ctx.lineTo(x + 0.5, height);
      ctx.strokeStyle = `rgba(${rgb}, ${alpha})`;
      ctx.lineWidth = isMajor ? 0.65 : 0.4;
      ctx.stroke();
    }

    for (let j = 0; j <= rows; j++) {
      const y = j * GRID_SIZE;
      const isMajor = j % MAJOR_EVERY === 0;
      const dyMouse = Math.abs(y - mouse.y);
      const proximity = isTouch ? 0 : Math.max(0, 1 - dyMouse / GLOW_RADIUS);
      const baseAlpha = isMajor ? alphas.major : alphas.minor;
      const alpha = baseAlpha + (alphas.glow - baseAlpha) * proximity * proximity;
      const rgb = isMajor ? colors.major : colors.line;

      ctx.beginPath();
      ctx.moveTo(0, y + 0.5);
      ctx.lineTo(width, y + 0.5);
      ctx.strokeStyle = `rgba(${rgb}, ${alpha})`;
      ctx.lineWidth = isMajor ? 0.65 : 0.4;
      ctx.stroke();
    }

    for (let i = 0; i <= cols; i += MAJOR_EVERY) {
      for (let j = 0; j <= rows; j += MAJOR_EVERY) {
        const x = i * GRID_SIZE;
        const y = j * GRID_SIZE;
        const d = dist(x, y, mouse.x, mouse.y);
        const proximity = isTouch ? 0 : Math.max(0, 1 - d / GLOW_RADIUS);
        const wave = isMobile ? 0 : Math.sin(time * 1000 + i * 0.3 + j * 0.3) * 0.015;
        const alpha = alphas.nodeBase + wave + (alphas.nodeGlow - alphas.nodeBase) * proximity * proximity;

        if (alpha > 0.025) {
          ctx.beginPath();
          ctx.arc(x, y, NODE_RADIUS + proximity * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${colors.node}, ${alpha})`;
          ctx.fill();
        }
      }
    }

    if (!isTouch && mouse.x > 0 && mouse.y > 0) {
      const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, GLOW_RADIUS);
      gradient.addColorStop(0, `rgba(${colors.major}, ${isDark ? 0.05 : 0.045})`);
      gradient.addColorStop(0.5, `rgba(${colors.major}, ${isDark ? 0.018 : 0.015})`);
      gradient.addColorStop(1, `rgba(${colors.major}, 0)`);
      ctx.fillStyle = gradient;
      ctx.fillRect(mouse.x - GLOW_RADIUS, mouse.y - GLOW_RADIUS, GLOW_RADIUS * 2, GLOW_RADIUS * 2);
    }
  }

  function draw() {
    if (!isActive) {
      animId = null;
      return;
    }

    const colors = getColors();
    time += WAVE_SPEED;
    ctx.clearRect(0, 0, width, height);

    /* Vignette under grid so lines stay visible in dark mode */
    drawVignette(colors);
    drawGrid(colors);

    if (!isMobile) {
      animId = requestAnimationFrame(draw);
    } else {
      animId = null;
    }
  }

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

  function checkTheme() {
    isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    canvas.style.opacity = isDark ? '1' : '0.85';
    if (isActive) {
      if (isMobile) {
        draw();
      } else if (!animId) {
        start();
      }
    }
  }

  const hero = document.getElementById('hero');

  hero?.addEventListener('mousemove', (e) => {
    if (isTouch) return;
    const rect = hero.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  hero?.addEventListener('mouseleave', () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      isMobile = window.matchMedia('(max-width: 768px)').matches;
      resize();
      if (isMobile) {
        stop();
        isActive = true;
        draw();
      } else if (!animId) {
        start();
      }
    }, 150);
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stop();
    } else {
      start();
    }
  });

  const observer = new MutationObserver(() => checkTheme());
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reducedMotion.matches) {
    canvas.style.opacity = isDark ? '0.45' : '0.35';
  }

  resize();
  checkTheme();
  start();
})();
