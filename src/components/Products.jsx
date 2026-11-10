import { Icon } from './Icon';
import { Gallery } from './Gallery';
import { PRODUCTS, waLink } from '../data';

export default function Products({ active, onSelect }) {
  return (
    <section className="section" id="productos">
      <div className="container">
        <div className="section__head reveal">
          <span className="eyebrow">Productos</span>
          <h2>Selecciona nuestra gama de productos</h2>
          <p>Fabricación propia con componentes de marcas reconocidas.</p>
        </div>

        <div className="ptabs">
          <div className="ptabs__list" role="tablist">
            {PRODUCTS.map((p) => (
              <button key={p.id} role="tab" aria-selected={active === p.id} onClick={() => onSelect(p.id)}>
                <Icon name={p.icon} />{p.tab}
              </button>
            ))}
          </div>

          {PRODUCTS.map((p) => (
            <div className="ptabs__panel" key={p.id} hidden={active !== p.id}>
              <div className="product">
                <div className="product__info">
                  <h3>{p.title}</h3>
                  <p>{p.intro}</p>
                  <ul className="checks">
                    {p.items.map((it) => <li key={it}>{it}</li>)}
                  </ul>
                  <a href={waLink(p.wa)} target="_blank" rel="noopener" className="btn btn--primary">
                    {p.cta} <Icon name="arrow" />
                  </a>
                </div>
                <Gallery
                  name={p.gallery}
                  images={p.images}
                  className={`gallery--product${p.four ? ' gallery--four' : ''}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
