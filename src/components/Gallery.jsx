import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

/* Galería de imágenes; al hacer clic abre el visor (lightbox) */
export function Gallery({ name, images, className = '' }) {
  const [index, setIndex] = useState(null);

  return (
    <>
      <div className={`gallery ${className}`}>
        {images.map((img, i) => (
          <a
            key={img.src}
            href={img.src}
            className={`gallery__item reveal reveal--zoom${i === 0 ? ' gallery__item--big' : ''}`}
            style={{ '--d': `${Math.min(i, 6) * 70}ms` }}
            onClick={(e) => { e.preventDefault(); setIndex(i); }}
          >
            <img src={img.src} alt={img.alt} loading="lazy" />
          </a>
        ))}
      </div>
      {index !== null && (
        <Lightbox name={name} images={images} index={index} setIndex={setIndex} onClose={() => setIndex(null)} />
      )}
    </>
  );
}

function Lightbox({ name, images, index, setIndex, onClose }) {
  const closeBtn = useRef();
  const touchX = useRef(0);
  const step = (d) => setIndex((i) => (i + d + images.length) % images.length);

  useEffect(() => {
    const lastFocus = document.activeElement;
    document.body.style.overflow = 'hidden';
    closeBtn.current.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    };
    addEventListener('keydown', onKey);
    return () => {
      removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
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
        <figcaption>{`${name} · ${index + 1} / ${images.length}`}</figcaption>
      </figure>
      <button className="lightbox__nav lightbox__next" aria-label="Siguiente" onClick={() => step(1)}>&#8250;</button>
    </div>,
    document.body
  );
}
