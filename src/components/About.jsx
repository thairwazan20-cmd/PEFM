import { useState } from 'react';
import { Icon } from './Icon';
import { Counter } from './Effects';
import { SectionHead } from './UI';
import { STATS } from '../data';

const TABS = [
  { id: 'mision', label: 'Nuestra Misión', text: 'Brindar soluciones integrales en toda la rama de la industria, la minería y el sector eléctrico. Nuestro proceso de fabricación cumple con las normas vigentes ISO, NEMA, IEC, entre otras.' },
  { id: 'vision', label: 'Nuestra Visión', text: 'Ser referentes en soluciones integrales para toda la rama industrial, proporcionando servicios de ingeniería y automatización que acompañen el avance tecnológico.' },
];

const CHECKS = [
  'Personal certificado y especializado',
  'Fabricación propia de tableros',
  'Componentes de marcas líderes',
  'Atención a industria, minería y edificaciones',
];

/* Anillo de progreso con contador */
function Ring({ value, suffix, label, ring, i }) {
  const C = 2 * Math.PI * 54;
  return (
    <div className="ring reveal" style={{ '--d': `${i * 120}ms`, '--off': C * (1 - ring), '--c': C }}>
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <defs>
          <linearGradient id={`rg${i}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f7c21b" />
            <stop offset="1" stopColor="#f3932b" />
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r="54" className="ring__track" />
        <circle cx="60" cy="60" r="54" className="ring__bar" stroke={`url(#rg${i})`} />
      </svg>
      <div className="ring__val">
        <strong><Counter to={value} suffix={suffix} /></strong>
        <span>{label}</span>
      </div>
    </div>
  );
}

export default function About() {
  const [tab, setTab] = useState('mision');

  return (
    <section className="section about" id="nosotros">
      <div className="container about__grid">
        <div className="about__media reveal reveal--left">
          <div className="about__main">
            <img src="/assets/img/nosotros.webp" alt="Técnico de PEFM midiendo un tablero eléctrico con multímetro" loading="lazy" width="1600" height="891" />
          </div>
          <div className="about__second">
            <img src="/assets/img/servicios/3.webp" alt="Técnico de PEFM trabajando en un tablero" loading="lazy" />
          </div>
          <div className="about__badge" data-tilt>
            <img src="/assets/img/emblema.png" alt="" width="44" height="46" />
            <div><strong>S.A.C.</strong><span>Lima · Perú</span></div>
          </div>
          <div className="about__dots" aria-hidden="true"></div>
        </div>

        <div className="about__text">
          <SectionHead
            align="left"
            eyebrow="Sobre nosotros"
            title={<>Conoce <em>quiénes somos</em> y por qué <em>elegirnos</em></>}
          />
          <div className="reveal" style={{ '--d': '120ms' }}>
            <p className="about__lead">Somos una empresa dedicada al desarrollo, diseño y construcción de productos eléctricos y estructuras metalmecánicas, con experiencia en instalación, automatización, equipos de distribución eléctrica y calidad de energía.</p>
            <p>Contamos con un staff de profesionales certificados y especializados en cada área, y trabajamos de la mano con proyectos que demandan alta funcionalidad, seguridad y rendimiento.</p>

            <div className="tabs">
              <div className="tabs__list" role="tablist">
                {TABS.map((t) => (
                  <button key={t.id} role="tab" id={`b-${t.id}`} aria-controls={`t-${t.id}`} aria-selected={tab === t.id} onClick={() => setTab(t.id)}>
                    {t.label}
                  </button>
                ))}
              </div>
              {TABS.map((t) => (
                <div key={t.id} className="tabs__panel" role="tabpanel" id={`t-${t.id}`} aria-labelledby={`b-${t.id}`} hidden={tab !== t.id}>
                  <p>{t.text}</p>
                </div>
              ))}
            </div>

            <ul className="ticks ticks--two">
              {CHECKS.map((c) => <li key={c}><Icon name="check" />{c}</li>)}
            </ul>
          </div>
        </div>
      </div>

      <div className="container rings">
        {STATS.map((s, i) => <Ring key={s.label} {...s} i={i} />)}
      </div>
    </section>
  );
}
