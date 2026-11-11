import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

/* Encabezado de sección con título de dos tonos: usa <em> para la parte destacada */
export function SectionHead({ eyebrow, title, text, align = 'center', light = false, children }) {
  return (
    <div className={`shead shead--${align}${light ? ' shead--light' : ''} reveal`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {text && <p>{text}</p>}
      {children}
    </div>
  );
}

/* Visor de imágenes a pantalla completa */
export function Lightbox({ images, index, setIndex, onClose }) {
  const closeBtn = useRef();
  const touchX = useRef(0);
  const step = (d) => setIndex((i) => (i + d + images.length) % images.length);

  useEffect(() => {
    const lastFocus = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtn.current.focus();
    // En fase de captura para que Escape no cierre también un modal que esté debajo
    const onKey = (e) => {
      if (e.key === 'Escape') { e.stopImmediatePropagation(); onClose(); }
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    };
    addEventListener('keydown', onKey, true);
    return () => {
      removeEventListener('keydown', onKey, true);
      document.body.style.overflow = prevOverflow;
      lastFocus?.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const img = images[index];

  return createPortal(
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Visor de imágenes"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
      }}
    >
      <button ref={closeBtn} className="lightbox__close" aria-label="Cerrar" onClick={onClose}>&times;</button>
      <button className="lightbox__nav lightbox__prev" aria-label="Anterior" onClick={() => step(-1)}>&#8249;</button>
      <figure>
        <img key={img.src} src={img.src} alt={img.alt} />
        <figcaption>{img.group ? `${img.group} · ` : ''}{index + 1} / {images.length}</figcaption>
      </figure>
      <button className="lightbox__nav lightbox__next" aria-label="Siguiente" onClick={() => step(1)}>&#8250;</button>
    </div>,
    document.body
  );
}
