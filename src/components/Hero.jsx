import { useCallback, useEffect, useRef, useState } from 'react';
import { Icon } from './Icon';
import { HeroCanvas } from './Effects';
import { HERO_SLIDES, COTIZACION, waLink } from '../data';

const INTERVAL = 5500;
const TITLE = ['Tableros', 'eléctricos', 'y', 'soluciones', 'industriales'];
const TITLE_HL = ['hechas', 'a', 'la', 'medida'];

/* Palabra con animación de entrada escalonada */
const Word = ({ children, i }) => (
  <><span className="word"><span style={{ '--i': i }}>{children}</span></span>{' '}</>
);

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const timer = useRef();
  const hero = useRef();
  const content = useRef();
  const slides = useRef();

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
      content.current.style.transform = `translate3d(0, ${y * 0.28}px, 0)`;
      content.current.style.opacity = String(Math.max(0, 1 - y / 650));
      slides.current.style.transform = `translate3d(0, ${y * 0.18}px, 0)`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    addEventListener('scroll', onScroll, { passive: true });
    return () => { removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  const go = (i) => { setCurrent((i + HERO_SLIDES.length) % HERO_SLIDES.length); restart(); };

  return (
    <section className="hero" id="inicio" ref={hero}>
      <div className="hero__slides" aria-hidden="true" ref={slides}>
        {HERO_SLIDES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            className={i === current ? 'is-active' : undefined}
            {...(i === 0 ? { fetchpriority: 'high' } : { loading: 'lazy' })}
          />
        ))}
      </div>
      <div className="hero__shade"></div>
      <HeroCanvas />
      <div className="hero__glow" aria-hidden="true"></div>

      <div className="container hero__content" ref={content}>
        <span className="eyebrow eyebrow--light hero-anim" style={{ '--i': 0 }}>
          Fabricación · Montaje · Automatización
        </span>
        <h1>
          {TITLE.map((w, i) => <Word key={w} i={i + 1}>{w}</Word>)}
          <span className="hl">
            {TITLE_HL.map((w, i) => <Word key={w} i={i + 1 + TITLE.length}>{w}</Word>)}
          </span>
        </h1>
        <p className="hero-anim" style={{ '--i': 8 }}>
          Diseñamos, fabricamos y montamos productos eléctricos y estructuras metalmecánicas para la industria, la minería y la construcción, con normas IEC, NEMA e ISO.
        </p>
        <div className="hero__actions hero-anim" style={{ '--i': 9 }}>
          <a href="#productos" className="btn btn--accent">Ver productos <Icon name="arrow" /></a>
          <a href={waLink(COTIZACION)} target="_blank" rel="noopener" className="btn btn--ghost">
            <Icon name="wa" /> Solicitar cotización
          </a>
        </div>
        <ul className="hero__badges hero-anim" style={{ '--i': 10 }}>
          <li><Icon name="shield" />Normas IEC · NEMA · ISO</li>
          <li><Icon name="bolt" />Baja tensión 440/380/220/110 Vac</li>
          <li><Icon name="box" />Stock diario de conectores</li>
        </ul>
      </div>

      <div className="hero__controls">
        <span className="hero__count">
          <b>{String(current + 1).padStart(2, '0')}</b> / {String(HERO_SLIDES.length).padStart(2, '0')}
        </span>
        <div className="hero__dots" role="tablist" aria-label="Imágenes destacadas">
          {HERO_SLIDES.map((src, i) => (
            <button
              key={src}
              role="tab"
              aria-label={`Imagen ${i + 1}`}
              aria-selected={i === current}
              style={{ '--dur': `${INTERVAL}ms` }}
              onClick={() => go(i)}
            />
          ))}
        </div>
        <div className="hero__arrows">
          <button aria-label="Imagen anterior" onClick={() => go(current - 1)}><Icon name="arrow" className="i i-flip" /></button>
          <button aria-label="Imagen siguiente" onClick={() => go(current + 1)}><Icon name="arrow" /></button>
        </div>
      </div>

      <a href="#nosotros" className="hero__scroll" aria-label="Bajar a la siguiente sección">
        <span className="hero__mouse"><i /></span>
        <small>Scroll</small>
      </a>
    </section>
  );
}
