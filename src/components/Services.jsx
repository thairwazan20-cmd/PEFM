import { useState } from 'react';
import { Icon } from './Icon';
import { SectionHead } from './UI';
import { SERVICES, PROCESS, SECTORS, COTIZACION, waLink } from '../data';

export function Services() {
  const [active, setActive] = useState(0);

  return (
    <section className="section services" id="servicios">
      <div className="container">
        <div className="services__head">
          <SectionHead
            align="left"
            light
            eyebrow="Servicios y soluciones"
            title={<>Servicios que <em>impulsan</em> tu operación</>}
          />
          <p className="services__intro reveal">Realizamos trabajos en campo con personal propio y equipos de medición especializados.</p>
        </div>

        <div className="svc">
          <div className="svc__list">
            {SERVICES.map((s, i) => (
              <div className={`svc__item reveal${active === i ? ' is-active' : ''}`} key={s.title} style={{ '--d': `${i * 70}ms` }}>
                <button
                  className="svc__btn"
                  aria-expanded={active === i}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                >
                  <span className="svc__num">0{i + 1}</span>
                  <span className="svc__ico"><Icon name={s.icon} /></span>
                  <span className="svc__title">{s.title}</span>
                  <Icon name="arrow" className="i svc__arrow" />
                </button>
                <div className="svc__desc">
                  <div>
                    <p>{s.text}</p>
                    <img src={s.image} alt="" loading="lazy" className="svc__mobile-img" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="svc__media reveal reveal--right">
            {SERVICES.map((s, i) => (
              <img key={s.image} src={s.image} alt={s.title} loading="lazy" className={active === i ? 'is-active' : undefined} />
            ))}
            <div className="svc__caption" key={active}>
              <span><Icon name={SERVICES[active].icon} /></span>
              <div>
                <small>Servicio 0{active + 1}</small>
                <strong>{SERVICES[active].title}</strong>
              </div>
            </div>
            <a href={waLink(`${COTIZACION} de: ${SERVICES[active].title}`)} target="_blank" rel="noopener" className="svc__cta" aria-label="Cotizar este servicio por WhatsApp">
              <Icon name="arrow" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section className="section process">
      <div className="container">
        <SectionHead
          eyebrow="Metodología"
          title={<>Cómo <em>trabajamos</em></>}
          text="Acompañamos tu proyecto de principio a fin, con un mismo equipo responsable."
        />
        <ol className="steps reveal">
          <span className="steps__line" aria-hidden="true"><i /></span>
          {PROCESS.map((s, i) => (
            <li className="step" key={s.title} style={{ '--d': `${300 + i * 220}ms` }}>
              <span className="step__ico"><Icon name={s.icon} /></span>
              <small>Paso 0{i + 1}</small>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Sectors() {
  return (
    <section className="section section--alt sectors">
      <div className="container">
        <SectionHead
          eyebrow="Sectores"
          title={<>Soluciones para cada <em>industria</em></>}
          text="Atendemos proyectos que demandan alta funcionalidad, seguridad y rendimiento."
        />
        <div className="sectors__grid">
          {SECTORS.map((s, i) => (
            <article className="sector reveal reveal--zoom" key={s.title} style={{ '--d': `${i * 100}ms` }}>
              <img src={s.image} alt="" loading="lazy" />
              <div className="sector__body">
                <span className="sector__ico"><Icon name={s.icon} /></span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
