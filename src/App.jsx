import { useEffect, useState } from 'react';
import { IconSprite } from './components/Icon';
import { TopBar, Header } from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Products from './components/Products';
import { Stats, Marquee, Why, Partners, Cta } from './components/Sections';
import Contact from './components/Contact';
import { Footer, FloatingButtons } from './components/Footer';
import { Cursor, Preloader, ScrollProgress, usePointerEffects } from './components/Effects';

/* Estado derivado del scroll. Solo provoca render cuando cambia algún valor. */
function useScrollState() {
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);

  useEffect(() => {
    let last = scrollY, raf = 0;
    const update = () => {
      raf = 0;
      const y = scrollY;
      setScrolled(y > 10);
      setShowTop(y > 700);
      if (Math.abs(y - last) > 6) {
        setHideHeader(y > last && y > 500);
        last = y;
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => { removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  return { scrolled, showTop, hideHeader };
}

/* Animaciones de aparición para los elementos con la clase .reveal */
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function App() {
  const [product, setProduct] = useState('tableros');
  const { scrolled, showTop, hideHeader } = useScrollState();
  useReveal();
  usePointerEffects();

  /* Si se entra con un enlace a una sección (#contacto…), ir a ella tras el render */
  useEffect(() => {
    try {
      const target = location.hash && document.querySelector(location.hash);
      if (target) target.scrollIntoView();
    } catch { /* hash no válido como selector */ }
  }, []);

  return (
    <>
      <Preloader />
      <ScrollProgress />
      <TopBar />
      <Header scrolled={scrolled} hidden={hideHeader} onSelectProduct={setProduct} />
      <main>
        <Hero />
        <Stats />
        <About />
        <Services />
        <Products active={product} onSelect={setProduct} />
        <Marquee />
        <Why />
        <Partners />
        <Cta />
        <Contact />
      </main>
      <Footer onSelectProduct={setProduct} />
      <FloatingButtons showTop={showTop} />
      <Cursor />
      <IconSprite />
    </>
  );
}
