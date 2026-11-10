export const WHATSAPP = '51960752147';

export const waLink = (text) =>
  `https://wa.me/${WHATSAPP}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

export const COTIZACION = 'Hola PEFM, quisiera una cotización';

export const HERO_SLIDES = [1, 2, 3, 4, 5, 6, 7].map((n) => `/assets/img/inicio/${n}.webp`);

export const SERVICES = [
  { icon: 'tool', title: 'Mantenimiento de tableros', text: 'Revisión y mejora de tableros existentes. Mantenimiento preventivo, correctivo y predictivo.' },
  { icon: 'building', title: 'Instalaciones eléctricas', text: 'Instalaciones residenciales, en edificaciones e industriales, de principio a fin.' },
  { icon: 'cpu', title: 'Automatización industrial', text: 'Programación de PLC y variadores de velocidad. Automatización de procesos industriales.' },
  { icon: 'wave', title: 'Calidad de energía', text: 'Estudios de calidad de energía eléctrica para detectar armónicos, caídas y pérdidas.' },
  { icon: 'camera', title: 'Sistemas de seguridad', text: 'Cámaras de videovigilancia y control de acceso para empresas y edificaciones.' },
  { icon: 'doc', title: 'Levantamiento de información', text: 'Relevamiento eléctrico en campo, diagramas unifilares y documentación técnica.' },
];

const img = (folder, n, alt) => ({ src: `/assets/img/${folder}/${n}.webp`, alt });

export const FIELD_WORK = [
  img('servicios', 1, 'Equipo PEFM realizando mantenimiento de tableros'),
  ...[2, 3, 4, 5, 6, 7, 8, 9].map((n) => img('servicios', n, `Trabajo en campo PEFM ${n}`)),
];

export const PRODUCTS = [
  {
    id: 'tableros',
    icon: 'panel',
    tab: 'Tableros Eléctricos',
    title: 'Tableros Eléctricos',
    intro: <>Fabricamos tableros en baja tensión <strong>440 / 380 / 220 / 110 Vac</strong> según normas IEC y NEMA.</>,
    items: [
      'Tableros generales',
      'Tableros de distribución: adosados, empotrados y autosoportados',
      'Tableros de banco de condensadores',
      'Tableros de transferencia automática',
      'Tableros de PVC',
    ],
    cta: 'Cotizar tablero',
    wa: 'Hola PEFM, quisiera cotizar un tablero eléctrico',
    gallery: 'Tableros eléctricos',
    images: [
      img('tableros', 1, 'Tablero eléctrico PEFM 1'),
      img('tableros', 2, 'Tablero autosoportado PEFM'),
      ...[3, 4, 5, 6, 7].map((n) => img('tableros', n, `Tablero eléctrico PEFM ${n}`)),
    ],
  },
  {
    id: 'conectores',
    icon: 'plug',
    tab: 'Conectores de Cobre',
    title: 'Conectores de Cobre',
    intro: <>Conectores de cobre para riel DIN y caja moldeada. <strong>Contamos con stock diario.</strong></>,
    items: [
      'Conectores para riel DIN trifásicos 220 Vac',
      'Conectores para riel DIN trifásicos + neutro 380 Vac',
      'Conectores para caja moldeada 3×15 mm',
      'Conectores para caja moldeada 3×20 mm',
    ],
    cta: 'Cotizar conectores',
    wa: 'Hola PEFM, quisiera cotizar conectores de cobre',
    gallery: 'Conectores de cobre',
    images: [
      img('conectores', 1, 'Conectores de cobre con aislamiento rojo, negro y azul'),
      ...[2, 3, 4, 5, 6].map((n) => img('conectores', n, `Conector de cobre PEFM ${n}`)),
    ],
  },
  {
    id: 'proteccion',
    icon: 'shield',
    tab: 'Equipos de Protección',
    title: 'Equipos de Protección Eléctrica',
    intro: <>Protege tus equipos sensibles ante variaciones de tensión y cortes de energía.</>,
    items: [
      'Transformadores de aislamiento',
      'Conectores con transformador de aislamiento',
      'UPS (sistemas de alimentación ininterrumpida)',
    ],
    cta: 'Cotizar equipos',
    wa: 'Hola PEFM, quisiera cotizar equipos de protección',
    gallery: 'Equipos de protección',
    four: true,
    images: [
      img('proteccion', 1, 'Transformadores de aislamiento PEFM'),
      ...[2, 3, 4].map((n) => img('proteccion', n, `Equipo de protección PEFM ${n}`)),
    ],
  },
];

export const WHY = [
  { icon: 'shield', title: 'Normas internacionales', text: 'Fabricación bajo IEC, NEMA e ISO.' },
  { icon: 'users', title: 'Personal certificado', text: 'Especialistas en cada área técnica.' },
  { icon: 'box', title: 'Stock permanente', text: 'Conectores de cobre disponibles a diario.' },
  { icon: 'clock', title: 'Respuesta rápida', text: 'Cotizaciones directas por WhatsApp.' },
];

export const STATS = [
  { icon: 'tool', value: 6, label: 'Servicios especializados' },
  { icon: 'panel', value: 3, label: 'Líneas de productos' },
  { icon: 'shield', value: 7, label: 'Marcas líderes aliadas' },
  { icon: 'bolt', value: 440, suffix: ' V', label: 'Tableros en baja tensión' },
];

export const KEYWORDS = [
  'Tableros eléctricos', 'Automatización PLC', 'Conectores de cobre',
  'Calidad de energía', 'Instalaciones industriales', 'Equipos de protección',
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

export const PHONES = [
  { href: 'tel:+5117666738', label: '(01) 766-6738' },
  { href: 'tel:+51960156395', label: '+51 960 156 395' },
  { href: 'tel:+51960752147', label: '+51 960 752 147' },
  { href: 'tel:+51998220467', label: '+51 998 220 467' },
];

export const EMAILS = ['ventas@pefmo.com', 'proyectos1@pefmo.com', 'jdelgado@pefmo.com', 'jrivera@pefmo.com'];

export const INTERESTS = [
  'Tableros eléctricos', 'Conectores de cobre', 'Equipos de protección', 'Mantenimiento de tableros',
  'Instalaciones eléctricas', 'Automatización / PLC', 'Calidad de energía', 'Otro',
];

export const NAV = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'nosotros', label: 'Nosotros' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'productos', label: 'Productos', drop: true },
  { id: 'proveedores', label: 'Proveedores' },
  { id: 'contacto', label: 'Contacto' },
];
