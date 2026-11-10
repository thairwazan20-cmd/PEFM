import { Icon } from './Icon';
import { NAV, PRODUCTS, waLink } from '../data';

export function Footer({ onSelectProduct }) {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <a href="#inicio" className="brand brand--footer">
            <img src="/assets/img/emblema.png" alt="" width="48" height="50" />
            <span className="brand__text"><strong>PEFM</strong><small>Proyectos Eléctricos Fabricación y Montaje S.A.C.</small></span>
          </a>
          <p>Soluciones integrales para la industria, la minería y el sector eléctrico.</p>
        </div>
        <div>
          <h4>Navegación</h4>
          {NAV.slice(1).map((n) => <a key={n.id} href={`#${n.id}`}>{n.label}</a>)}
        </div>
        <div>
          <h4>Productos</h4>
          {PRODUCTS.map((p) => (
            <a key={p.id} href="#productos" onClick={() => onSelectProduct(p.id)}>{p.tab}</a>
          ))}
        </div>
        <div>
          <h4>Contacto</h4>
          <a href="tel:+5117666738">(01) 766-6738</a>
          <a href="mailto:ventas@pefmo.com">ventas@pefmo.com</a>
          <a href={waLink()} target="_blank" rel="noopener">WhatsApp +51 960 752 147</a>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container">© {new Date().getFullYear()} PEFMO.COM · Todos los derechos reservados.</div>
      </div>
    </footer>
  );
}

export function FloatingButtons({ showTop }) {
  return (
    <>
      <a className="wa-float" href={waLink('Hola PEFM')} target="_blank" rel="noopener" aria-label="Escríbenos por WhatsApp">
        <Icon name="wa" className="" />
      </a>
      <button className={`to-top${showTop ? ' show' : ''}`} aria-label="Volver arriba" onClick={() => scrollTo({ top: 0 })}>
        <Icon name="up" />
      </button>
    </>
  );
}
