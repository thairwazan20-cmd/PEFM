(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const WHATSAPP = '51960752147';

  /* Año del footer */
  $('#year').textContent = new Date().getFullYear();

  /* Header al hacer scroll + botón volver arriba */
  const header = $('#header'), toTop = $('.to-top');
  const onScroll = () => {
    header.classList.toggle('is-scrolled', scrollY > 10);
    toTop.classList.toggle('show', scrollY > 700);
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  toTop.addEventListener('click', () => scrollTo({ top: 0 }));

  /* Menú móvil */
  const toggle = $('.nav-toggle'), nav = $('#nav');
  const closeNav = () => { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); };
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  $$('a', nav).forEach(a => a.addEventListener('click', closeNav));

  /* Enlace activo según la sección visible */
  const links = $$('.nav__link');
  const spy = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  $$('main section[id]').forEach(s => spy.observe(s));

  /* Slider del hero */
  const slides = $$('.hero__slides img'), dotsBox = $('.hero__dots');
  let current = 0, timer;
  const dots = slides.map((_, i) => {
    const b = document.createElement('button');
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-label', `Imagen ${i + 1}`);
    b.addEventListener('click', () => { go(i); restart(); });
    dotsBox.appendChild(b);
    return b;
  });
  const go = i => {
    slides[current].classList.remove('is-active');
    current = (i + slides.length) % slides.length;
    slides[current].classList.add('is-active');
    dots.forEach((d, j) => d.setAttribute('aria-selected', String(j === current)));
  };
  const restart = () => { clearInterval(timer); timer = setInterval(() => go(current + 1), 5500); };
  go(0); restart();

  /* Pestañas Misión / Visión */
  $$('[data-tabs]').forEach(box => {
    const btns = $$('[role="tab"]', box);
    btns.forEach(b => b.addEventListener('click', () => {
      btns.forEach(x => {
        const on = x === b;
        x.setAttribute('aria-selected', String(on));
        $('#' + x.getAttribute('aria-controls')).hidden = !on;
      });
    }));
  });

  /* Pestañas de productos (también desde el menú y el footer) */
  const pbtns = $$('[data-ptabs] [role="tab"]'), panels = $$('[data-panel]');
  const showProduct = name => {
    pbtns.forEach(b => b.setAttribute('aria-selected', String(b.dataset.tab === name)));
    panels.forEach(p => { p.hidden = p.dataset.panel !== name; });
  };
  pbtns.forEach(b => b.addEventListener('click', () => showProduct(b.dataset.tab)));
  $$('a[data-tab]').forEach(a => a.addEventListener('click', () => showProduct(a.dataset.tab)));

  /* Carrusel de marcas: duplica los logos para un bucle continuo */
  const track = $('.brands__track');
  if (track) $$('.brand-logo', track).forEach(n => {
    const c = n.cloneNode(true);
    c.setAttribute('aria-hidden', 'true');
    track.appendChild(c);
  });

  /* Lightbox */
  const lb = $('#lightbox'), lbImg = $('img', lb), lbCap = $('figcaption', lb);
  let group = [], idx = 0, lastFocus;
  const render = () => {
    const a = group[idx], img = $('img', a);
    lbImg.src = a.getAttribute('href');
    lbImg.alt = img.alt;
    lbCap.textContent = `${a.closest('[data-gallery]').dataset.gallery} · ${idx + 1} / ${group.length}`;
  };
  const openLb = (a) => {
    group = $$('.gallery__item', a.closest('[data-gallery]'));
    idx = group.indexOf(a);
    lastFocus = document.activeElement;
    render();
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    $('.lightbox__close', lb).focus();
  };
  const closeLb = () => { lb.hidden = true; document.body.style.overflow = ''; lastFocus && lastFocus.focus(); };
  const step = d => { idx = (idx + d + group.length) % group.length; render(); };
  $$('.gallery__item').forEach(a => a.addEventListener('click', e => { e.preventDefault(); openLb(a); }));
  $('.lightbox__close', lb).addEventListener('click', closeLb);
  $('.lightbox__prev', lb).addEventListener('click', () => step(-1));
  $('.lightbox__next', lb).addEventListener('click', () => step(1));
  lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
  addEventListener('keydown', e => {
    if (lb.hidden) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });
  let tx = 0;
  lb.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
  });

  /* Animaciones de aparición */
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: .12 });
  $$('.reveal').forEach(el => io.observe(el));

  /* Formulario → WhatsApp */
  $('#form').addEventListener('submit', e => {
    e.preventDefault();
    const f = new FormData(e.target);
    const msg = [
      'Hola PEFM, quisiera una cotización.',
      `*Nombre:* ${f.get('nombre')}`,
      f.get('empresa') ? `*Empresa:* ${f.get('empresa')}` : '',
      `*Teléfono:* ${f.get('telefono')}`,
      `*Interés:* ${f.get('interes')}`,
      `*Mensaje:* ${f.get('mensaje')}`
    ].filter(Boolean).join('\n');
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
  });
})();
