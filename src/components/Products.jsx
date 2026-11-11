import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from './Icon';
import { SectionHead, Lightbox } from './UI';
import { PRODUCTS, STANDARDS, waLink } from '../data';

export function Standards() {
  return (
    <section className="standards" aria-label="Normas de fabricación">
      <div className="container standards__inner">
        <div className="standards__head reveal">
          <span className="eyebrow">Calidad garantizada</span>
          <h2>Fabricamos bajo <em>normas internacionales</em></h2>
        </div>
        <div className="standards__grid">
          {STANDARDS.map((s, i) => (
            <div className="std reveal" key={s.code} style={{ '--d': `${i * 90}ms` }} data-tilt>
              <span className="std__code">{s.code}</span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Products({ onOpen }) {
  return (
    <section className="section products" id="productos">
      <div className="container">
        <SectionHead
          eyebrow="Productos"
          title={<>Nuestras líneas de <em>productos</em></>}
          text="Fabricación propia con componentes de marcas reconocidas. Elige una línea para ver el detalle y la galería."
        />
        <div className="pgrid">
          {PRODUCTS.map((p, i) => (
            <button
              key={p.id}
              className="pcard reveal"
              style={{ '--d': `${i * 120}ms` }}
              onClick={() => onOpen(p.id)}
              data-tilt
            >
              <span className="pcard__media"><img src={p.cover} alt="" loading="lazy" /></span>
              <span className="pcard__num">0{i + 1}</span>
              <span className="pcard__body">
                <span className="pcard__icon"><Icon name={p.icon} /></span>
                <span className="pcard__title">{p.title}</span>
                <span className="pcard__text">{p.short}</span>
                <span className="pcard__foot">
                  <span>{p.items.length} tipos · {p.images.length} fotos</span>
                  <span className="pcard__more">Ver detalles <Icon name="plus" /></span>
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Panel lateral con el detalle de una línea de producto */
export function ProductModal({ id, onClose, onChange }) {
  const index = PRODUCTS.findIndex((p) => p.id === id);
  const p = PRODUCTS[index];
  const [lb, setLb] = useState(null);
  const [closing, setClosing] = useState(false);
  const closeBtn = useRef();

  const close = () => {
    setClosing(true);
    setTimeout(onClose, 380);
  };
  const go = (d) => onChange(PRODUCTS[(index + d + PRODUCTS.length) % PRODUCTS.length].id);

  useEffect(() => {
    const lastFocus = document.activeElement;
    document.body.style.overflow = 'hidden';
    closeBtn.current?.focus();
    const onKey = (e) => e.key === 'Escape' && close();
    addEventListener('keydown', onKey);
    return () => {
      removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      lastFocus?.focus?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!p) return null;

  return createPortal(
    <div className={`pmodal${closing ? ' is-closing' : ''}`} role="dialog" aria-modal="true" aria-labelledby="pmodal-title">
      <div className="pmodal__backdrop" onClick={close}></div>
      <div className="pmodal__panel">
        <div className="pmodal__head">
          <span className="pmodal__crumb">Línea {index + 1} de {PRODUCTS.length}</span>
          <div className="pmodal__nav">
            <button onClick={() => go(-1)} aria-label="Línea anterior"><Icon name="arrow" className="i i-flip" /></button>
            <button onClick={() => go(1)} aria-label="Línea siguiente"><Icon name="arrow" /></button>
            <button ref={closeBtn} onClick={close} aria-label="Cerrar" className="pmodal__close"><Icon name="x" /></button>
          </div>
        </div>

        <div className="pmodal__body" key={p.id}>
          <div className="pmodal__hero">
            <img src={p.cover} alt="" />
            <div>
              <span className="pmodal__icon"><Icon name={p.icon} /></span>
              <h2 id="pmodal-title">{p.title}</h2>
            </div>
          </div>

          <div className="pmodal__content">
            <div className="pmodal__info">
              <p className="pmodal__intro">{p.intro}</p>
              <h3>Tipos disponibles</h3>
              <ul className="ticks">
                {p.items.map((it) => <li key={it}><Icon name="check" />{it}</li>)}
              </ul>
              <a href={waLink(p.wa)} target="_blank" rel="noopener" className="btn btn--accent btn--block">
                <Icon name="wa" /> {p.cta}
              </a>
              <small className="pmodal__note">Te respondemos por WhatsApp con la cotización.</small>
            </div>

            <div className="pmodal__gallery">
              {p.images.map((im, i) => (
                <button key={im.src} className="pmodal__thumb" style={{ '--d': `${i * 60}ms` }} onClick={() => setLb(i)} aria-label={`Ampliar: ${im.alt}`}>
                  <img src={im.src} alt={im.alt} loading="lazy" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {lb !== null && (
        <Lightbox
          images={p.images.map((im) => ({ ...im, group: p.title }))}
          index={lb}
          setIndex={setLb}
          onClose={() => setLb(null)}
        />
      )}
    </div>,
    document.body
  );
}
