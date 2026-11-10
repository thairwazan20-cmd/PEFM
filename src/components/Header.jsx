import { useEffect, useState } from 'react';
import { Icon } from './Icon';
import { NAV, PRODUCTS, COTIZACION, waLink } from '../data';

export function TopBar() {
  return (
    <div className="topbar">
      <div className="container topbar__inner">
        <div className="topbar__info">
          <a href="tel:+5117666738"><Icon name="phone" />(01) 766-6738</a>
          <a href="mailto:ventas@pefmo.com"><Icon name="mail" />ventas@pefmo.com</a>
          <span className="hide-md"><Icon name="pin" />Carabayllo – Lima, Perú</span>
        </div>
        <div className="topbar__social">
          <a href={waLink()} target="_blank" rel="noopener" aria-label="WhatsApp"><Icon name="wa" /></a>
        </div>
      </div>
    </div>
  );
}

/* Devuelve el id de la sección visible en el centro de la pantalla */
function useActiveSection() {
  const [active, setActive] = useState('inicio');
  useEffect(() => {
    const spy = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    document.querySelectorAll('main section[id]').forEach((s) => spy.observe(s));
    return () => spy.disconnect();
  }, []);
  return active;
}

export function Header({ scrolled, hidden, onSelectProduct }) {
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  const close = () => setOpen(false);
  const linkClass = (id) => `nav__link${active === id ? ' active' : ''}`;
  const cls = ['header', scrolled && 'is-scrolled', hidden && !open && 'is-hidden'].filter(Boolean).join(' ');

  return (
    <header className={cls} id="header">
      <div className="container header__inner">
        <a href="#inicio" className="brand" aria-label="PEFM – Inicio">
          <img src="/assets/img/emblema.png" alt="" width="48" height="50" />
          <span className="brand__text">
            <strong>PEFM</strong>
            <small>Proyectos Eléctricos Fabricación y Montaje</small>
          </span>
        </a>

        <button
          className="nav-toggle"
          aria-label="Abrir menú"
          aria-expanded={open}
          aria-controls="nav"
          onClick={() => setOpen((o) => !o)}
        >
          <span></span><span></span><span></span>
        </button>

        <nav className={`nav${open ? ' open' : ''}`} id="nav">
          {NAV.map(({ id, label, drop }) =>
            drop ? (
              <div className="nav__drop" key={id}>
                <a href={`#${id}`} className={linkClass(id)} onClick={close}>
                  {label} <Icon name="down" className="i i-sm" />
                </a>
                <div className="nav__menu">
                  {PRODUCTS.map((p) => (
                    <a key={p.id} href="#productos" onClick={() => { onSelectProduct(p.id); close(); }}>
                      {p.title}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a key={id} href={`#${id}`} className={linkClass(id)} onClick={close}>{label}</a>
            )
          )}
          <a href={waLink(COTIZACION)} target="_blank" rel="noopener" className="btn btn--accent nav__cta" onClick={close}>
            Cotizar ahora
          </a>
        </nav>
      </div>
    </header>
  );
}
