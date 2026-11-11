import { useCallback, useEffect, useRef, useState } from 'react';
import { Icon } from './Icon';
import { HeroCanvas } from './Effects';
import { HERO_SLIDES, BRANDS, COTIZACION, waLink } from '../data';

const INTERVAL = 5500;
const TITLE = ['Tableros', 'eléctricos', 'y', 'soluciones', 'industriales'];
const TITLE_HL = ['hechas', 'a', 'la', 'medida'];
const pad = (n) => String(n).padStart(2, '0');

/* Palabra con animación de entrada escalonada */
const Word = ({ children, i }) => (
  <><span className="word"><span style={{ '--i': i }}>{children}</span></span>{' '}</>
);

/* Sello circular giratorio con el emblema */
function Seal() {
  return (
    <div className="seal" aria-hidden="true">
      <svg viewBox="0 0 120 120">
        <defs>
          <path id="seal-path" d="M60,60 m-47,0 a47,47 0 1,1 94,0 a47,47 0 1,1 -94,0" />
        </defs>
        <text>
          <textPath href="#seal-path" textLength="292">PEFM · TABLEROS · MONTAJE · AUTOMATIZACIÓN ·</textPath>
        </text>
      </svg>
      <img src="/assets/img/emblema.png" alt="" width="52" height="54" />
    </div>
  );
}

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const timer = useRef();
  const hero = useRef();
  const copy = useRef();
  const visual = useRef();

  const restart = useCallback(() => {
    clearInterval(timer.current);
    timer.current = setInterval(() => setCurrent((c) => (c + 1) % HERO_SLIDES.length), INTERVAL);
  }, []);

  useEffect(() => {
    restart();
    return () => clearInterval(timer.current);
  }, [restart]);

  /* Parallax al hacer scroll */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = Math.min(scrollY, hero.current.offsetHeight);
      copy.current.style.transform = `translate3d(0, ${y * 0.22}px, 0)`;
      copy.current.style.opacity = String(Math.max(0, 1 - y / 700));
      visual.current.style.transform = `translate3d(0, ${y * 0.1}px, 0)`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    addEventListener('scroll', onScroll, { passive: true });
    return () => { removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  const go = (i) => { setCurrent((i + HERO_SLIDES.length) % HERO_SLIDES.length); restart(); };
  const logos = [...BRANDS, ...BRANDS];

  return (
    <section className="hero" id="inicio" ref={hero}>
      <HeroCanvas />
      <div className="hero__grid" aria-hidden="true"></div>
      <div className="hero__glow" aria-hidden="true"></div>
      <div className="hero__glow hero__glow--blue" aria-hidden="true"></div>

      <div className="container hero__inner">
        <div className="hero__copy" ref={copy}>
          <span className="hero__tag hero-anim" style={{ '--i': 0 }}>
            <span className="pulse-dot"></span> Fabricación · Montaje · Automatización
          </span>
          <h1>
            {TITLE.map((w, i) => <Word key={w} i={i + 1}>{w}</Word>)}
            <span className="hl">
              {TITLE_HL.map((w, i) => <Word key={w} i={i + 1 + TITLE.length}>{w}</Word>)}
            </span>
          </h1>
          <p className="hero__lead hero-anim" style={{ '--i': 8 }}>
            Diseñamos, fabricamos y montamos productos eléctricos y estructuras metalmecánicas para la industria, la minería y la construcción.
          </p>
          <div className="hero__actions hero-anim" style={{ '--i': 9 }}>
            <a href="#productos" className="btn btn--accent btn--lg">Ver productos <Icon name="arrow" /></a>
            <a href={waLink(COTIZACION)} target="_blank" rel="noopener" className="btn btn--ghost btn--lg">
              <Icon name="wa" /> Solicitar cotización
            </a>
          </div>
          <ul className="hero__facts hero-anim" style={{ '--i': 10 }}>
            <li><strong>IEC · NEMA · ISO</strong><span>Normas de fabricación</span></li>
            <li><strong>440 V</strong><span>Tableros en baja tensión</span></li>
            <li><strong>Stock diario</strong><span>Conectores de cobre</span></li>
          </ul>
        </div>

        <div className="hero__visual hero-anim" style={{ '--i': 5 }} ref={visual}>
          <div className="hero__frame">
            {HERO_SLIDES.map((src, i) => (
              <img
                key={src}
                src={src}
                alt=""
                className={i === current ? 'is-active' : undefined}
                {...(i === 0 ? { fetchpriority: 'high' } : { loading: 'lazy' })}
              />
            ))}
            <div className="hero__frame-shade"></div>
            <div className="hero__controls">
              <span className="hero__count"><b>{pad(current + 1)}</b> / {pad(HERO_SLIDES.length)}</span>
              <span className="hero__bar" aria-hidden="true">
                <i key={current} style={{ '--dur': `${INTERVAL}ms` }} />
              </span>
              <button aria-label="Imagen anterior" onClick={() => go(current - 1)}><Icon name="arrow" className="i i-flip" /></button>
              <button aria-label="Imagen siguiente" onClick={() => go(current + 1)}><Icon name="arrow" /></button>
            </div>
          </div>

          <div className="hero__float hero__float--a" data-tilt>
            <span className="hero__float-ico"><Icon name="bolt" /></span>
            <span><b>440 / 380 / 220 / 110 Vac</b><small>Tableros en baja tensión</small></span>
          </div>
          <div className="hero__float hero__float--b" data-tilt>
            <span className="hero__float-ico hero__float-ico--green"><Icon name="box" /></span>
            <span><b>Stock diario</b><small>Conectores de cobre</small></span>
          </div>
          <Seal />
        </div>
      </div>

      <div className="hero__brands">
        <div className="container hero__brands-inner">
          <span className="hero__brands-label">Trabajamos con<br />marcas líderes</span>
          <div className="hero__brands-track-wrap">
            <div className="hero__brands-track">
              {logos.map((b, i) => (
                <img key={i} src={b.src} alt={i < BRANDS.length ? b.alt : ''} aria-hidden={i >= BRANDS.length || undefined} loading="lazy" className={b.tall ? 'is-tall' : undefined} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
