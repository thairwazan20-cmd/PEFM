import { useState } from 'react';

const TABS = [
  { id: 'mision', label: 'Nuestra Misión', text: 'Brindar soluciones integrales en toda la rama de la industria, la minería y el sector eléctrico. Nuestro proceso de fabricación cumple con las normas vigentes ISO, NEMA, IEC, entre otras.' },
  { id: 'vision', label: 'Nuestra Visión', text: 'Ser referentes en soluciones integrales para toda la rama industrial, proporcionando servicios de ingeniería y automatización que acompañen el avance tecnológico.' },
];

export default function About() {
  const [tab, setTab] = useState('mision');

  return (
    <section className="section" id="nosotros">
      <div className="container about">
        <div className="about__media reveal reveal--left">
          <img src="/assets/img/nosotros.webp" alt="Técnico de PEFM midiendo un tablero eléctrico con multímetro" loading="lazy" width="1600" height="891" />
          <div className="about__badge" data-tilt>
            <img src="/assets/img/emblema.png" alt="" width="44" height="46" />
            <div><strong>S.A.C.</strong><span>Lima · Perú</span></div>
          </div>
        </div>
        <div className="about__text reveal reveal--right">
          <span className="eyebrow">Sobre nosotros</span>
          <h2>Ingeniería eléctrica con funcionalidad, seguridad y rendimiento</h2>
          <p>Somos una empresa dedicada al desarrollo, diseño y construcción de productos eléctricos y estructuras metalmecánicas, con experiencia en instalación, automatización, equipos de distribución eléctrica y calidad de energía.</p>
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

          <ul className="checks">
            <li>Personal certificado y especializado</li>
            <li>Fabricación propia de tableros</li>
            <li>Componentes de marcas líderes</li>
            <li>Atención a industria, minería y edificaciones</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
