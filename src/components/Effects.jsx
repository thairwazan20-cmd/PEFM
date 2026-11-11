import { useEffect, useRef, useState } from 'react';

const canHover = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------------------------------------------------------
   Cursor personalizado: punto + anillo con inercia.
   Solo en equipos con mouse y sin "reducir movimiento".
   --------------------------------------------------------- */
export function Cursor() {
  const [enabled] = useState(() => typeof window !== 'undefined' && canHover() && !reducedMotion());
  const dot = useRef();
  const ring = useRef();

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add('has-cursor');

    let x = -100, y = -100, rx = -100, ry = -100, raf;
    const d = dot.current, r = ring.current;

    const show = (on) => { d.classList.toggle('is-hidden', !on); r.classList.toggle('is-hidden', !on); };
    const move = (e) => {
      x = e.clientX; y = e.clientY;
      d.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      show(true);
    };
    const loop = () => {
      rx += (x - rx) * 0.17;
      ry += (y - ry) * 0.17;
      r.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    const over = (e) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      const text = t.closest('input, textarea, select');
      const view = !text && t.closest('.tile, .pmodal__thumb, .pcard');
      const link = !text && !view && t.closest('a, button, [role="tab"], [data-cursor]');
      r.classList.toggle('is-view', !!view);
      r.classList.toggle('is-link', !!link);
      r.classList.toggle('is-text', !!text);
      d.classList.toggle('is-text', !!text);
    };
    const down = () => r.classList.add('is-down');
    const up = () => r.classList.remove('is-down');
    const out = (e) => { if (!e.relatedTarget) show(false); };

    addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', over);
    addEventListener('pointerdown', down);
    addEventListener('pointerup', up);
    document.addEventListener('mouseout', out);
    raf = requestAnimationFrame(loop);

    return () => {
      root.classList.remove('has-cursor');
      cancelAnimationFrame(raf);
      removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
      removeEventListener('pointerdown', down);
      removeEventListener('pointerup', up);
      document.removeEventListener('mouseout', out);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div className="cursor-ring is-hidden" ref={ring} aria-hidden="true">
        <div className="cursor-ring__shape"><span>Ver</span></div>
      </div>
      <div className="cursor-dot is-hidden" ref={dot} aria-hidden="true"><i /></div>
    </>
  );
}

/* ---------------------------------------------------------
   Barra de progreso de lectura (expone --scroll de 0 a 1)
   --------------------------------------------------------- */
export function ScrollProgress() {
  useEffect(() => {
    const root = document.documentElement;
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = root.scrollHeight - innerHeight;
      root.style.setProperty('--scroll', max > 0 ? (scrollY / max).toFixed(4) : '0');
    };
    const request = () => { if (!raf) raf = requestAnimationFrame(update); };
    addEventListener('scroll', request, { passive: true });
    addEventListener('resize', request);
    update();
    return () => {
      removeEventListener('scroll', request);
      removeEventListener('resize', request);
      cancelAnimationFrame(raf);
    };
  }, []);
  return <div className="scroll-progress" aria-hidden="true" />;
}

/* ---------------------------------------------------------
   Pantalla de carga con el emblema
   --------------------------------------------------------- */
export function Preloader() {
  const [phase, setPhase] = useState('on'); // on → out → gone

  useEffect(() => {
    const start = performance.now();
    let t;
    const finish = () => {
      clearTimeout(t);
      t = setTimeout(() => setPhase('out'), Math.max(0, 900 - (performance.now() - start)));
    };
    if (document.readyState === 'complete') finish();
    else addEventListener('load', finish, { once: true });
    const failsafe = setTimeout(() => setPhase('out'), 3500);
    return () => { clearTimeout(t); clearTimeout(failsafe); removeEventListener('load', finish); };
  }, []);

  useEffect(() => {
    if (phase !== 'out') return;
    document.documentElement.classList.add('is-loaded');
    const t = setTimeout(() => setPhase('gone'), 800);
    return () => clearTimeout(t);
  }, [phase]);

  if (phase === 'gone') return null;
  return (
    <div className={`preloader${phase === 'out' ? ' is-out' : ''}`} aria-hidden="true">
      <div className="preloader__inner">
        <img src="/assets/img/emblema.png" alt="" width="84" height="88" />
        <strong>PEFM</strong>
        <div className="preloader__bar"><span /></div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   Efectos de puntero: botones magnéticos y tarjetas 3D
   --------------------------------------------------------- */
export function usePointerEffects() {
  useEffect(() => {
    if (!canHover() || reducedMotion()) return;
    let mag = null, tilt = null;

    const resetMag = () => { if (mag) mag.style.translate = ''; mag = null; };
    const resetTilt = () => {
      if (!tilt) return;
      ['--rx', '--ry'].forEach((p) => tilt.style.removeProperty(p));
      tilt = null;
    };

    const move = (e) => {
      const t = e.target instanceof Element ? e.target : null;

      const m = t && t.closest('.btn, .wa-float, .to-top');
      if (mag !== m) resetMag();
      if (m) {
        mag = m;
        const r = m.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        m.style.translate = `${dx * 0.22}px ${dy * 0.3}px`;
      }

      const c = t && t.closest('[data-tilt]');
      if (tilt !== c) resetTilt();
      if (c) {
        tilt = c;
        const r = c.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        c.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`);
        c.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
        c.style.setProperty('--rx', `${((0.5 - py) * 9).toFixed(2)}deg`);
        c.style.setProperty('--ry', `${((px - 0.5) * 9).toFixed(2)}deg`);
      }
    };
    const leave = () => { resetMag(); resetTilt(); };

    document.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    return () => {
      document.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', leave);
    };
  }, []);
}

/* ---------------------------------------------------------
   Red de partículas "eléctricas" del hero
   --------------------------------------------------------- */
export function HeroCanvas() {
  const ref = useRef();

  useEffect(() => {
    if (reducedMotion()) return;
    const canvas = ref.current;
    const host = canvas.parentElement;
    const ctx = canvas.getContext('2d');
    const LINK = 130, MOUSE = 190;
    let w = 0, h = 0, pts = [], raf = 0, running = false;
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.offsetWidth; h = canvas.offsetHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(80, (w * h) / 15000));
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.6 + 0.7,
      }));
    };

    const frame = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }
      ctx.lineWidth = 1;
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(150,180,235,${(1 - d / LINK) * 0.28})`;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (dm < MOUSE) {
          ctx.strokeStyle = `rgba(247,194,27,${(1 - dm / MOUSE) * 0.75})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
        ctx.fillStyle = dm < MOUSE ? 'rgba(247,194,27,.95)' : 'rgba(255,255,255,.55)';
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    };

    const start = () => { if (!running) { running = true; raf = requestAnimationFrame(frame); } };
    const stop = () => { running = false; cancelAnimationFrame(raf); };
    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = mouse.y = -9999; };

    resize();
    const io = new IntersectionObserver(([en]) => (en.isIntersecting ? start() : stop()));
    io.observe(host);
    addEventListener('resize', resize);
    host.addEventListener('pointermove', onMove, { passive: true });
    host.addEventListener('pointerleave', onLeave);
    return () => {
      stop(); io.disconnect();
      removeEventListener('resize', resize);
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <canvas className="hero__canvas" ref={ref} aria-hidden="true" />;
}

/* ---------------------------------------------------------
   Contador animado que arranca al entrar en pantalla
   --------------------------------------------------------- */
export function Counter({ to, suffix = '', duration = 1800 }) {
  const ref = useRef();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (reducedMotion()) { setValue(to); return; }
    let raf;
    const io = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (now) => {
        const k = Math.min(1, (now - t0) / duration);
        setValue(Math.round(to * (1 - Math.pow(1 - k, 3))));
        if (k < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(ref.current);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to, duration]);

  return <span ref={ref}>{value}{suffix}</span>;
}
