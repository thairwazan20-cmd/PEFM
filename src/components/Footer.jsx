import { Icon } from './Icon';
import { NAV, PRODUCTS, COTIZACION, waLink } from '../data';

export function Footer({ onOpenProduct }) {
  return (
    <footer className="footer">
      <div className="container footer__cta reveal">
        <div>
          <span className="eyebrow eyebrow--light">¿Listo para empezar?</span>
          <h2>¿Tienes un proyecto eléctrico <em>en mente?</em></h2>
        </div>
        <a href={waLink(COTIZACION)} target="_blank" rel="noopener" className="btn btn--accent btn--xl">
          <Icon name="wa" /> Cotizar por WhatsApp
        </a>
      </div>

      <div className="container footer__grid">
        <div className="footer__about">
          <a href="#inicio" className="brand brand--footer">
            <img src="/assets/img/emblema.png" alt="" width="48" height="50" />
            <span className="brand__text"><strong>PEFM</strong><small>Proyectos Eléctricos Fabricación y Montaje S.A.C.</small></span>
          </a>
          <p>Soluciones integrales para la industria, la minería y el sector eléctrico.</p>
          <a href={waLink()} target="_blank" rel="noopener" className="footer__social" aria-label="WhatsApp"><Icon name="wa" /></a>
        </div>
        <div>
          <h4>Navegación</h4>
          {NAV.map((n) => <a key={n.id} href={`#${n.id}`}>{n.label}</a>)}
        </div>
        <div>
          <h4>Productos</h4>
          {PRODUCTS.map((p) => (
            <button key={p.id} onClick={() => onOpenProduct(p.id)}>{p.title}</button>
          ))}
        </div>
        <div>
          <h4>Contacto</h4>
          <a href="tel:+5117666738"><Icon name="phone" />(01) 766-6738</a>
          <a href="mailto:ventas@pefmo.com"><Icon name="mail" />ventas@pefmo.com</a>
          <a href={waLink()} target="_blank" rel="noopener"><Icon name="wa" />+51 960 752 147</a>
          <span><Icon name="pin" />Carabayllo – Lima, Perú</span>
        </div>
      </div>

      <div className="footer__big" aria-hidden="true">PEFM</div>

      <div className="footer__bottom">
        <div className="container">
          <span>© {new Date().getFullYear()} PEFMO.COM · Todos los derechos reservados.</span>
          <a href="#inicio">Volver arriba <Icon name="up" /></a>
        </div>
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
