import { Icon } from './Icon';
import { Gallery } from './Gallery';
import { SERVICES, FIELD_WORK } from '../data';

export default function Services() {
  return (
    <section className="section section--alt section--grid" id="servicios">
      <div className="container">
        <div className="section__head reveal">
          <span className="eyebrow">Servicios y soluciones</span>
          <h2>¡Nuestros servicios para su empresa!</h2>
          <p>Realizamos trabajos en campo con personal propio y equipos de medición especializados.</p>
        </div>

        <div className="services">
          {SERVICES.map((s, i) => (
            <article className="service reveal" key={s.title} style={{ '--d': `${(i % 3) * 110}ms` }} data-tilt>
              <span className="service__num">{String(i + 1).padStart(2, '0')}</span>
              <div className="service__icon"><Icon name={s.icon} className="" /></div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </article>
          ))}
        </div>

        <div className="section__sub reveal">
          <h3>Trabajos en campo</h3>
          <p>Algunos de nuestros proyectos realizados. Haz clic para ampliar.</p>
        </div>
        <Gallery name="Trabajos en campo" images={FIELD_WORK} className="gallery--feature" />
      </div>
    </section>
  );
}
