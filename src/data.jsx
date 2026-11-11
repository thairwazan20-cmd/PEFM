/* =========================================================
   Contenido del sitio. Para cambiar textos, fotos o datos
   de contacto, edita solo este archivo.
   ========================================================= */

export const WHATSAPP = '51960752147';

export const waLink = (text) =>
  `https://wa.me/${WHATSAPP}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

export const COTIZACION = 'Hola PEFM, quisiera una cotización';

const img = (folder, n, alt) => ({ src: `/assets/img/${folder}/${n}.webp`, alt });

export const HERO_SLIDES = [1, 2, 3, 4, 5, 6, 7].map((n) => `/assets/img/inicio/${n}.webp`);

export const NAV = [
  { id: 'nosotros', label: 'Nosotros' },
  { id: 'productos', label: 'Productos', mega: true },
  { id: 'servicios', label: 'Servicios' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'contacto', label: 'Contacto' },
];

/* Normas bajo las que se fabrica */
export const STANDARDS = [
  { code: 'IEC', title: 'Normas IEC', text: 'Diseño y ensamblaje de tableros según estándares internacionales.' },
  { code: 'NEMA', title: 'Normas NEMA', text: 'Gabinetes y grados de protección para cada ambiente.' },
  { code: 'ISO', title: 'Normas ISO', text: 'Procesos de fabricación ordenados y controlados.' },
  { code: 'BT', title: 'Baja tensión', text: 'Tableros en 440 / 380 / 220 / 110 Vac.' },
];

export const PRODUCTS = [
  {
    id: 'tableros',
    icon: 'panel',
    title: 'Tableros Eléctricos',
    short: 'Fabricación propia en baja tensión según normas IEC y NEMA.',
    intro: <>Fabricamos tableros en baja tensión <strong>440 / 380 / 220 / 110 Vac</strong> según normas IEC y NEMA.</>,
    cover: '/assets/img/tableros/2.webp',
    items: [
      'Tableros generales',
      'Tableros de distribución: adosados, empotrados y autosoportados',
      'Tableros de banco de condensadores',
      'Tableros de transferencia automática',
      'Tableros de PVC',
    ],
    cta: 'Cotizar tablero',
    wa: 'Hola PEFM, quisiera cotizar un tablero eléctrico',
    images: [
      img('tableros', 1, 'Tablero eléctrico PEFM'),
      img('tableros', 2, 'Tablero autosoportado PEFM'),
      ...[3, 4, 5, 6, 7].map((n) => img('tableros', n, `Tablero eléctrico PEFM ${n}`)),
    ],
  },
  {
    id: 'conectores',
    icon: 'plug',
    title: 'Conectores de Cobre',
    short: 'Para riel DIN y caja moldeada, con stock disponible a diario.',
    intro: <>Conectores de cobre para riel DIN y caja moldeada. <strong>Contamos con stock diario.</strong></>,
    cover: '/assets/img/conectores/1.webp',
    items: [
      'Conectores para riel DIN trifásicos 220 Vac',
      'Conectores para riel DIN trifásicos + neutro 380 Vac',
      'Conectores para caja moldeada 3×15 mm',
      'Conectores para caja moldeada 3×20 mm',
    ],
    cta: 'Cotizar conectores',
    wa: 'Hola PEFM, quisiera cotizar conectores de cobre',
    images: [
      img('conectores', 1, 'Conectores de cobre con aislamiento rojo, negro y azul'),
      ...[2, 3, 4, 5, 6].map((n) => img('conectores', n, `Conector de cobre PEFM ${n}`)),
    ],
  },
  {
    id: 'proteccion',
    icon: 'shield',
    title: 'Equipos de Protección',
    short: 'Transformadores de aislamiento y UPS para equipos sensibles.',
    intro: <>Protege tus equipos sensibles ante variaciones de tensión y cortes de energía.</>,
    cover: '/assets/img/proteccion/1.webp',
    items: [
      'Transformadores de aislamiento',
      'Conectores con transformador de aislamiento',
      'UPS (sistemas de alimentación ininterrumpida)',
    ],
    cta: 'Cotizar equipos',
    wa: 'Hola PEFM, quisiera cotizar equipos de protección',
    images: [
      img('proteccion', 1, 'Transformadores de aislamiento PEFM'),
      ...[2, 3, 4].map((n) => img('proteccion', n, `Equipo de protección PEFM ${n}`)),
    ],
  },
];

export const STATS = [
  { value: 6, label: 'Servicios especializados', ring: 0.6 },
  { value: 3, label: 'Líneas de productos', ring: 0.45 },
  { value: 7, label: 'Marcas líderes aliadas', ring: 0.7 },
  { value: 440, suffix: 'V', label: 'Tableros en baja tensión', ring: 0.9 },
];

export const SERVICES = [
  { icon: 'tool', title: 'Mantenimiento de tableros', text: 'Revisión y mejora de tableros existentes. Mantenimiento preventivo, correctivo y predictivo para que tu operación no se detenga.', image: '/assets/img/servicios/1.webp' },
  { icon: 'building', title: 'Instalaciones eléctricas', text: 'Instalaciones residenciales, en edificaciones e industriales, de principio a fin, con personal propio.', image: '/assets/img/servicios/6.webp' },
  { icon: 'cpu', title: 'Automatización industrial', text: 'Programación de PLC y variadores de velocidad. Automatizamos tus procesos industriales.', image: '/assets/img/servicios/4.webp' },
  { icon: 'wave', title: 'Calidad de energía', text: 'Estudios de calidad de energía eléctrica para detectar armónicos, caídas de tensión y pérdidas.', image: '/assets/img/servicios/8.webp' },
  { icon: 'camera', title: 'Sistemas de seguridad', text: 'Cámaras de videovigilancia y control de acceso para empresas y edificaciones.', image: '/assets/img/servicios/7.webp' },
  { icon: 'doc', title: 'Levantamiento de información', text: 'Relevamiento eléctrico en campo, diagramas unifilares y documentación técnica.', image: '/assets/img/servicios/5.webp' },
];

export const PROCESS = [
  { icon: 'search', title: 'Levantamiento', text: 'Visitamos tu planta, relevamos la instalación y definimos los requerimientos técnicos.' },
  { icon: 'pen', title: 'Ingeniería y diseño', text: 'Elaboramos diagramas unifilares y seleccionamos componentes según normas IEC y NEMA.' },
  { icon: 'factory', title: 'Fabricación', text: 'Ensamblamos los tableros en nuestro taller con componentes de marcas líderes.' },
  { icon: 'play', title: 'Montaje y puesta en marcha', text: 'Instalamos, probamos y entregamos con la documentación técnica.' },
];

export const SECTORS = [
  { icon: 'factory', title: 'Industria', text: 'Tableros de fuerza y control, automatización y mantenimiento de planta.', image: '/assets/img/tableros/4.webp' },
  { icon: 'mountain', title: 'Minería', text: 'Soluciones robustas de distribución y protección para operaciones exigentes.', image: '/assets/img/servicios/9.webp' },
  { icon: 'hardhat', title: 'Construcción y edificaciones', text: 'Instalaciones eléctricas completas para obras y edificios.', image: '/assets/img/servicios/6.webp' },
  { icon: 'bolt', title: 'Sector eléctrico', text: 'Calidad de energía, protección y distribución eléctrica.', image: '/assets/img/servicios/2.webp' },
];

export const FIELD_WORK = [
  img('servicios', 1, 'Equipo PEFM realizando mantenimiento de tableros'),
  ...[2, 3, 4, 5, 6, 7, 8, 9].map((n) => img('servicios', n, `Trabajo en campo PEFM ${n}`)),
];

/* Filtros de la galería de proyectos */
export const PROJECT_GROUPS = [
  { id: 'campo', label: 'Trabajos en campo', images: FIELD_WORK },
  ...PRODUCTS.map((p) => ({ id: p.id, label: p.title, images: p.images })),
];

export const BRANDS = [
  { src: '/assets/img/marcas/schneider.svg', alt: 'Schneider Electric' },
  { src: '/assets/img/marcas/abb.svg', alt: 'ABB' },
  { src: '/assets/img/marcas/siemens.svg', alt: 'Siemens' },
  { src: '/assets/img/marcas/legrand.svg', alt: 'Legrand' },
  { src: '/assets/img/marcas/rittal.svg', alt: 'Rittal', tall: true },
  { src: '/assets/img/marcas/circutor.webp', alt: 'Circutor' },
  { src: '/assets/img/marcas/steck.webp', alt: 'Steck' },
];

export const KEYWORDS = [
  'Tableros eléctricos', 'Automatización PLC', 'Conectores de cobre',
  'Calidad de energía', 'Instalaciones industriales', 'Equipos de protección',
];

export const PHONES = [
  { href: 'tel:+5117666738', label: '(01) 766-6738' },
  { href: 'tel:+51960156395', label: '+51 960 156 395' },
  { href: 'tel:+51960752147', label: '+51 960 752 147' },
  { href: 'tel:+51998220467', label: '+51 998 220 467' },
];

export const EMAILS = ['ventas@pefmo.com', 'proyectos1@pefmo.com', 'jdelgado@pefmo.com', 'jrivera@pefmo.com'];

export const ADDRESS = 'Programa de Vivienda Casa Grande de Punchauca Mz. A Lt. 04 – Carabayllo – Lima';
export const MAP_SRC = 'https://maps.google.com/maps?q=Casa%20Grande%20de%20Punchauca%2C%20Carabayllo%2C%20Lima%2C%20Per%C3%BA&z=15&output=embed';

export const INTERESTS = [
  'Tableros eléctricos', 'Conectores de cobre', 'Equipos de protección', 'Mantenimiento de tableros',
  'Instalaciones eléctricas', 'Automatización / PLC', 'Calidad de energía', 'Otro',
];
