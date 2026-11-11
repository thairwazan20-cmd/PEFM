import { useEffect, useState } from 'react';
import { Icon } from './Icon';
import { NAV, PRODUCTS, COTIZACION, waLink } from '../data';

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

export function Header({ scrolled, hidden, onOpenProduct }) {
  const [open, setOpen] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [open]);

  const openProduct = (id) => {
    setOpen(false);
    document.activeElement?.blur();
    onOpenProduct(id);
  };

  const cls = ['header', scrolled && 'is-scrolled', hidden && !open && 'is-hidden', open && 'is-open']
    .filter(Boolean).join(' ');

  return (
    <header className={cls}>
      <div className="header__bar">
        <a href="#inicio" className="brand" aria-label="PEFM – Inicio" onClick={() => setOpen(false)}>
          <img src="/assets/img/emblema.png" alt="" width="44" height="46" />
          <span className="brand__text">
            <strong>PEFM</strong>
            <small>Proyectos Eléctricos Fabricación y Montaje</small>
          </span>
        </a>

        <nav className="nav" aria-label="Principal">
          {NAV.map(({ id, label, mega }) => (
            <div className={`nav__item${mega ? ' has-mega' : ''}`} key={id}>
              <a href={`#${id}`} className={`nav__link${active === id ? ' is-active' : ''}`}>
                {label}{mega && <Icon name="down" className="i i-sm" />}
              </a>
              {mega && (
                <div className="mega">
                  <div className="mega__grid">
                    {PRODUCTS.map((p) => (
                      <button className="mega__card" key={p.id} onClick={() => openProduct(p.id)}>
                        <span className="mega__img"><img src={p.cover} alt="" loading="lazy" /></span>
                        <span className="mega__txt">
                          <strong>{p.title}</strong>
                          <small>{p.short}</small>
                        </span>
                      </button>
                    ))}
                  </div>
                  <div className="mega__aside">
                    <Icon name="bolt" className="mega__bolt" />
                    <strong>¿Necesitas algo a medida?</strong>
                    <p>Diseñamos y fabricamos según los requerimientos de tu proyecto.</p>
                    <a href={waLink(COTIZACION)} target="_blank" rel="noopener" className="btn btn--accent btn--sm">
                      Cotizar <Icon name="arrow" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="header__actions">
          <a href="tel:+5117666738" className="header__phone">
            <span><Icon name="phone" /></span>
            <span><small>Llámanos</small>(01) 766-6738</span>
          </a>
          <a href={waLink(COTIZACION)} target="_blank" rel="noopener" className="btn btn--accent header__cta">
            Cotizar ahora
          </a>
          <button
            className="burger"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            aria-controls="mnav"
            onClick={() => setOpen((o) => !o)}
          >
            <span></span><span></span>
          </button>
        </div>
      </div>

      {/* Menú móvil a pantalla completa */}
      <div className="mnav" id="mnav" aria-hidden={!open}>
        <nav className="mnav__links">
          {NAV.map(({ id, label }, i) => (
            <a key={id} href={`#${id}`} style={{ '--i': i }} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
              <small>0{i + 1}</small>{label}
            </a>
          ))}
        </nav>
        <div className="mnav__products" style={{ '--i': NAV.length }}>
          {PRODUCTS.map((p) => (
            <button key={p.id} onClick={() => openProduct(p.id)} tabIndex={open ? 0 : -1}>
              <Icon name={p.icon} />{p.title}
            </button>
          ))}
        </div>
        <div className="mnav__foot" style={{ '--i': NAV.length + 1 }}>
          <a href="tel:+5117666738" tabIndex={open ? 0 : -1}><Icon name="phone" />(01) 766-6738</a>
          <a href="mailto:ventas@pefmo.com" tabIndex={open ? 0 : -1}><Icon name="mail" />ventas@pefmo.com</a>
          <a href={waLink(COTIZACION)} target="_blank" rel="noopener" className="btn btn--accent btn--block" tabIndex={open ? 0 : -1}>
            <Icon name="wa" /> Cotizar por WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}
