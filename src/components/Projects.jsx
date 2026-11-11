import { useMemo, useState } from 'react';
import { Icon } from './Icon';
import { SectionHead, Lightbox } from './UI';
import { PROJECT_GROUPS, BRANDS, KEYWORDS } from '../data';

const LIMIT = 12;

export function Projects() {
  const [filter, setFilter] = useState('all');
  const [expanded, setExpanded] = useState(false);
  const [lb, setLb] = useState(null);

  const items = useMemo(() => {
    const groups = filter === 'all' ? PROJECT_GROUPS : PROJECT_GROUPS.filter((g) => g.id === filter);
    return groups.flatMap((g) => g.images.map((im) => ({ ...im, group: g.label })));
  }, [filter]);

  const visible = expanded ? items : items.slice(0, LIMIT);
  const choose = (id) => { setFilter(id); setExpanded(false); };

  return (
    <section className="section projects" id="proyectos">
      <div className="container">
        <SectionHead
          eyebrow="Galería"
          title={<>Proyectos <em>realizados</em></>}
          text="Trabajos en campo y productos fabricados en nuestro taller. Haz clic en una foto para ampliarla."
        />

        <div className="chips reveal" role="group" aria-label="Filtrar proyectos">
          <button className="chip" aria-pressed={filter === 'all'} onClick={() => choose('all')}>
            <Icon name="grid" /> Todos
          </button>
          {PROJECT_GROUPS.map((g) => (
            <button key={g.id} className="chip" aria-pressed={filter === g.id} onClick={() => choose(g.id)}>
              {g.label} <small>{g.images.length}</small>
            </button>
          ))}
        </div>

        <div className="masonry" key={filter}>
          {visible.map((im, i) => (
            <button
              key={im.src}
              className="tile"
              style={{ '--d': `${Math.min(i, 11) * 55}ms` }}
              onClick={() => setLb(i)}
              aria-label={`Ampliar: ${im.alt}`}
            >
              <img src={im.src} alt={im.alt} loading="lazy" />
              <span className="tile__tag">{im.group}</span>
            </button>
          ))}
        </div>

        {items.length > LIMIT && (
          <div className="projects__more">
            <button className="btn btn--outline" onClick={() => setExpanded((e) => !e)}>
              {expanded ? 'Ver menos' : `Ver todas (${items.length})`}
              <Icon name={expanded ? 'up' : 'down'} />
            </button>
          </div>
        )}
      </div>

      {lb !== null && (
        <Lightbox images={visible} index={lb} setIndex={setLb} onClose={() => setLb(null)} />
      )}
    </section>
  );
}

export function Brands() {
  const row = [...BRANDS, ...BRANDS];
  const Lane = ({ reverse }) => (
    <div className={`lane${reverse ? ' lane--rev' : ''}`}>
      <div className="lane__track">
        {(reverse ? [...row].reverse() : row).map((b, i) => (
          <div className={`logo${b.tall ? ' logo--tall' : ''}`} key={i} aria-hidden={i >= BRANDS.length || reverse || undefined}>
            <img src={b.src} alt={b.alt} loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="section section--alt brands" id="proveedores">
      <div className="container brands__grid">
        <div className="brands__text">
          <SectionHead
            align="left"
            eyebrow="Proveedores"
            title={<>Marcas que respaldan <em>cada proyecto</em></>}
            text="Nuestros proveedores no solo cumplen con los requisitos actuales: su historial de innovación y la facilidad de integración de sus productos nos dan la confianza para crecer juntos en cada proyecto."
          />
          <a href="#contacto" className="btn btn--primary reveal">Contáctanos <Icon name="arrow" /></a>
        </div>
        <div className="brands__lanes reveal reveal--right" aria-label="Marcas con las que trabajamos">
          <Lane />
          <Lane reverse />
        </div>
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
