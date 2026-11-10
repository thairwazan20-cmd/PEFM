import { Icon } from './Icon';
import { Counter } from './Effects';
import { WHY, BRANDS, STATS, KEYWORDS, waLink } from '../data';

export function Stats() {
  return (
    <section className="stats" aria-label="PEFM en cifras">
      <div className="container stats__grid">
        {STATS.map((s, i) => (
          <div className="stat reveal" key={s.label} style={{ '--d': `${i * 90}ms` }} data-tilt>
            <Icon name={s.icon} className="stat__icon" />
            <strong><Counter to={s.value} suffix={s.suffix} /></strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Marquee() {
  const row = [...KEYWORDS, ...KEYWORDS];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {row.map((k, i) => (
          <span key={i} className={i % 2 ? 'is-outline' : undefined}>
            {k}<Icon name="bolt" className="marquee__sep" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function Why() {
  return (
    <section className="why">
      <div className="container why__grid">
        {WHY.map((w, i) => (
          <div className="why__item reveal" key={w.title} style={{ '--d': `${i * 110}ms` }}>
            <span className="why__icon"><Icon name={w.icon} className="" /></span>
            <h3>{w.title}</h3>
            <p>{w.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Partners() {
  // Los logos se duplican para que el carrusel haga un bucle continuo
  const logos = [...BRANDS, ...BRANDS];
  return (
    <section className="section" id="proveedores">
      <div className="container">
        <div className="partners reveal">
          <div className="partners__text">
            <span className="eyebrow">Proveedores</span>
            <h2>Trabajamos con marcas líderes del sector eléctrico</h2>
            <p>Nuestros proveedores no solo cumplen con los requisitos actuales: su historial de innovación y la facilidad de integración de sus productos nos dan la confianza para crecer juntos en cada proyecto.</p>
            <a href="#contacto" className="btn btn--primary">Contáctanos <Icon name="arrow" /></a>
          </div>
          <div className="logo-card" role="img" aria-label="Logo PEFM – Proyectos Eléctricos Fabricación y Montaje" data-tilt>
            <img src="/assets/img/emblema.png" alt="" loading="lazy" width="400" height="421" />
            <strong>PEFM</strong>
            <span>Proyectos Eléctricos Fabricación y Montaje</span>
          </div>
        </div>

        <div className="brands reveal" aria-label="Marcas con las que trabajamos">
          <div className="brands__track">
            {logos.map((b, i) => (
              <div
                key={i}
                className={`brand-logo${b.tall ? ' brand-logo--tall' : ''}`}
                aria-hidden={i >= BRANDS.length || undefined}
              >
                <img src={b.src} alt={b.alt} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Cta() {
  return (
    <section className="cta">
      <div className="cta__lines" aria-hidden="true"></div>
      <div className="container cta__inner reveal">
        <div>
          <h2>¿Tienes un proyecto eléctrico en mente?</h2>
          <p>Cuéntanos qué necesitas y te enviamos una cotización sin compromiso.</p>
        </div>
        <a href={waLink('Hola PEFM, tengo un proyecto y quisiera una cotización')} target="_blank" rel="noopener" className="btn btn--accent btn--lg">
          <Icon name="wa" /> Escríbenos por WhatsApp
        </a>
      </div>
    </section>
  );
}
