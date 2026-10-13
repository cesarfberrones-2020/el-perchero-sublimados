import type { ProductItem, ProcessStep, DifferentialItem, TestimonialItem, FaqItem } from '../types';

export const PRODUCTS: ProductItem[] = [
  {
    id: 'gorras-personalizadas',
    name: 'Gorras Personalizadas',
    category: 'caps',
    categoryLabel: 'Gorras & Headwear',
    tag: 'Colección Urbana',
    badge: 'Top Ventas',
    shortDesc: 'Trucker caps con malla ventilada, snapbacks urbanas y dad hats con parches sublimados de ultra alta resolución.',
    fullDesc: 'Lleva tu marca o estilo urbano a la cabeza con nuestras gorras de confección premium. Utilizamos parches termosellados de sublimación HD que capturan hasta el más mínimo degradado y microdetalle con bordes reforzados y costuras de alta resistencia.',
    image: '/images/perchero-gorras-hoodie.png',
    priceNote: 'Desde $10 USD / Descuento especial por docena',
    minQuantity: 'Desde 1 unidad (Precios por mayor desde 12 uds)',
    popularFor: 'Marcas streetwear, eventos deportivos, dotación de empresas, regalos personales y creadores de contenido.',
    features: [
      'Modelos Trucker clásica, Snapback plana y Curva estilo béisbol',
      'Parches sublimados HD y bordados con el sello de El Perchero',
      'Mallas respirables y broches ajustables de alta durabilidad',
      'Resistentes al sudor, sol y lavados frecuentes sin deformarse'
    ],
    colorsAvailable: ['Negro Intenso', 'Azul Marino', 'Verde Militar', 'Blanco/Negro', 'Camuflado Urbano']
  },
  {
    id: 'streetwear-camisetas-joggers',
    name: 'Camisetas DTF, Hoodies & Alta Pinta',
    category: 'streetwear',
    categoryLabel: 'Streetwear & Alta Pinta',
    tag: 'DTF & Sublimación',
    badge: 'Tendencia 2026',
    shortDesc: 'Hoodies full-print urbanos, camisetas en DTF de alta definición y prendas exclusivas de Alta Pinta con acabados dorados.',
    fullDesc: 'Diseñado para quienes buscan estética urbana y de gala con máximo impacto. Combinamos hoodies sublimados full-color, camisetas con tecnología DTF textil de ultra adherencia y sastrería personalizada de Alta Pinta con detalles exclusivos.',
    image: '/images/perchero-right-apparel.png',
    priceNote: 'Desde $18 USD / Tarifas preferenciales para marcas',
    minQuantity: 'Desde 1 unidad (Producción para marcas desde 10 uds)',
    popularFor: 'Lanzamientos de marcas independientes, artistas, outfits urbanos, eventos de gala y drops limitados.',
    features: [
      'Algodón peinado de alto gramaje (220g+) y telas premium para hoodies',
      'Estampado DTF y Sublimación HD que no se cuartea ni pierde color',
      'Personalización de Alta Pinta con detalles dorados y acabados de autor',
      'Garantía de resistencia: colores intensos lavado tras lavado'
    ],
    colorsAvailable: ['Black Night', 'Gold Edition', 'Off-White', 'Charcoal Grey', 'Full Print Urbano']
  },
  {
    id: 'tazas-termos-creativos',
    name: 'Tazas Creativas & Termos Metálicos',
    category: 'mugs',
    categoryLabel: 'Tazas & Termos',
    tag: 'Regalos & Drinkware',
    badge: 'Favorito para Regalo',
    shortDesc: 'Tazas de cerámica brillante de 11oz y 15oz, tazas mágicas termosensibles y vasos térmicos en acero inoxidable.',
    fullDesc: 'La opción perfecta para regalos inolvidables, coleccionables o merchandising diario. Nuestras cerámicas cuentan con recubrimiento de polímero grado AAA para un brillo espejo y máxima definición, junto con termos de acero de doble pared.',
    image: '/images/perchero-tazas-termos.png',
    priceNote: 'Desde $6 USD / Descuentos a partir de 6 unidades',
    minQuantity: 'Desde 1 unidad (Paquetes empresariales desde 24 uds)',
    popularFor: 'Regalos personalizados, dotación de oficina, souvenirs, coleccionistas y eventos corporativos.',
    features: [
      'Cerámica grado AAA de 11oz y 15oz con acabado ultrabrillante',
      'Tazas Mágicas: fondo negro que revela tu diseño al verter líquido caliente',
      'Termos metálicos doble pared insulados al vacío (frío 24h / caliente 12h)',
      'Impresión envolvente panorámica 360° con tintas fotográficas de alta densidad'
    ],
    colorsAvailable: ['Blanco Puro', 'Taza Mágica Negra', 'Acero Inoxidable', 'Full Color']
  },
  {
    id: 'sublimacion-corporativa',
    name: 'Colección Completa & Merch Corporativo',
    category: 'corporate',
    categoryLabel: 'Merch Corporativo',
    tag: 'Empresarial & Eventos',
    badge: 'Solución Integral',
    shortDesc: 'Paquetes completos de identidad visual: chompas, gorras, tazas, termos y camisetas corporativas para empresas y eventos.',
    fullDesc: 'Haz que tu marca o evento destaque con nuestra línea integral de personalización. Producimos kits completos que combinan prendas textiles (hoodies, camisetas, gorras) con artículos promocionales (tazas, termos) manteniendo fidelidad total a tu logotipo.',
    image: '/images/perchero-left-merch.png',
    priceNote: 'Cotizaciones escalables según volumen y kit',
    minQuantity: 'Desde 12 unidades (Grandes lotes disponibles)',
    popularFor: 'Kits de bienvenida a nuevos empleados (Onboarding), ferias comerciales, congresos y regalos de fin de año.',
    features: [
      'Mousepads ergonómicos y Gamer XXL con base de caucho antideslizante y bordes cosidos',
      'Cintas lanyard porta-carnet en satín brillante con mosquetón metálico de seguridad',
      'Tote bags ecológicas de lona sublimada resistentes al peso',
      'Empaque personalizado institucional y muestras físicas o digitales previas'
    ],
    colorsAvailable: ['Colores Corporativos según Pantone', 'Negro Mate', 'Blanco', 'Gris Grafito']
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Envías tu idea o logo',
    subtitle: 'Sin complicaciones técnicas',
    description: 'Compártenos tu logotipo, ilustración, frase o foto de referencia a través de nuestro cotizador o WhatsApp. Si aún no tienes un diseño listo o solo tienes una idea, ¡nuestro equipo creativo te ayuda a conceptualizarlo sin costo adicional!',
    highlights: [
      'Aceptamos JPG, PNG, PDF, Illustrator o bocetos hechos a mano',
      'Asesoría técnica inmediata sobre la mejor técnica de estampado',
      'Atención rápida y personalizada por diseñadores'
    ],
    icon: 'MessageSquareText'
  },
  {
    number: '02',
    title: 'Diseñamos una vista previa digital',
    subtitle: 'Visualiza antes de producir',
    description: 'En tiempo récord preparamos un fotomontaje digital fotorrealista (mockup) aplicado directamente sobre el producto real. Podrás ajustar tamaños, combinaciones de color, proporciones y detalles hasta que quedes 100% satisfecho.',
    highlights: [
      'Mockup realista fotorrealista para aprobación final',
      'Correcciones y ajustes sin cargos ocultos',
      'Calibración de colores para máxima fidelidad visual'
    ],
    icon: 'Layers'
  },
  {
    number: '03',
    title: 'Producimos y entregamos',
    subtitle: 'Calidad que se siente y dura',
    description: 'Tras tu aprobación, encendemos nuestras prensas térmicas de alta presión. Usamos tintas premium que se fusionan a nivel molecular con el material. Empacamos con esmero y despachamos puntualmente a la puerta de tu casa o empresa.',
    highlights: [
      'Prensado térmico industrial con control de temperatura digital',
      'Control de calidad pieza por pieza antes de embalar',
      'Envíos seguros a nivel local y nacional con número de guía'
    ],
    icon: 'Flame'
  }
];

export const DIFFERENTIALS: DifferentialItem[] = [
  {
    id: 'personalizada',
    title: 'Atención 100% Personalizada',
    description: 'No eres un número de pedido más. Hablas directamente con creativos que entienden de arte, telas y diseño para orientarte en la mejor decisión.',
    icon: 'HeartHandshake',
    stat: '100%',
    statLabel: 'Acompañamiento humano'
  },
  {
    id: 'calidad',
    title: 'Calidad Superior & Tintas Premium',
    description: 'Utilizamos tintas de sublimación de alta penetración y papeles de transferencia térmica de grado industrial. Los colores no se caen ni se agrietan.',
    icon: 'Sparkles',
    stat: '0%',
    statLabel: 'Desgaste al lavar'
  },
  {
    id: 'tiempo',
    title: 'Entregas Puntuales Garantizadas',
    description: 'Respetamos tu calendario al pie de la letra. Sabemos que tus eventos, aniversarios y lanzamientos no dan espera.',
    icon: 'Clock',
    stat: '24-72h',
    statLabel: 'Tiempos ágiles récord'
  },
  {
    id: 'precios',
    title: 'Precios Competitivos y Mayoristas',
    description: 'Excelente relación costo-beneficio tanto para piezas unitarias exclusivas como para pedidos por volumen con descuentos escalonados para negocios.',
    icon: 'BadgePercent',
    stat: 'Escalable',
    statLabel: 'De 1 a +1,000 unidades'
  },
  {
    id: 'garantia',
    title: 'Garantía Total de Satisfacción',
    description: 'Si tu producto presenta alguna anomalía de impresión o confección imputable al taller, lo reponemos sin rodeos.',
    icon: 'ShieldCheck',
    stat: '100%',
    statLabel: 'Garantía de reposición'
  },
  {
    id: 'tecnologia',
    title: 'Tecnología de Prensa de Alta Presión',
    description: 'Equipos térmicos neumáticos con distribución homogénea de calor para evitar zonas desvanecidas o sombras indeseadas.',
    icon: 'Zap',
    stat: 'HD 4K',
    statLabel: 'Detalles ultrafinos'
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: '1',
    clientName: 'Mateo Restrepo',
    role: 'Fundador',
    companyOrBrand: 'RAW Streetwear Co.',
    comment: 'Trabajar con El Perchero cambió por completo la percepción de mi marca. La tela pesada de las camisetas y la definición de los estampados oversize tienen nivel internacional. Ya vamos por el tercer drop con ellos.',
    rating: 5,
    productPurchased: 'Camisetas Oversize Full Print',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: '2',
    clientName: 'Carolina Méndez',
    role: 'Directora de Gestión Humana',
    companyOrBrand: 'Nexum Tech Solutions',
    comment: 'Pedimos 180 kits de bienvenida con termos, lanyards y mousepads con los colores institucionales. La entrega fue 2 días antes de lo pactado y los colaboradores quedaron felices con los acabados.',
    rating: 5,
    productPurchased: 'Kits Corporativos & Termos Inox',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: '3',
    clientName: 'Andrés Felipe Gómez',
    role: 'Organizador',
    companyOrBrand: 'Torneo Nacional de Pádel',
    comment: 'Las gorras trucker quedaron brutales. El parche sublimado tiene unos colores súper vivos que resistieron sol y lluvia durante todo el fin de semana del campeonato. Recomendadísimos al 100%.',
    rating: 5,
    productPurchased: 'Gorras Trucker con Parche HD',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  }
];

export const FAQS: FaqItem[] = [
  {
    question: '¿Cuál es la cantidad mínima que puedo pedir?',
    answer: '¡Trabajamos desde 1 sola unidad para regalos y proyectos personales! Si requieres pedidos por volumen (a partir de 12 o 50 unidades), aplicamos descuentos escalonados muy atractivos para empresas y marcas.',
    category: 'Pedidos'
  },
  {
    question: '¿En qué formatos debo enviar mi diseño o logo?',
    answer: 'Lo ideal son archivos vectoriales (.AI, .EPS, .PDF o .SVG) o imágenes en alta resolución (.PNG con fondo transparente o .JPG a 300 DPI). Si no cuentas con estos formatos, envíanos lo que tengas y nuestro equipo lo optimizará.',
    category: 'Diseño'
  },
  {
    question: '¿Los estampados con sublimación se borran o cuartean al lavar?',
    answer: 'No. A diferencia del vinilo textil o la serigrafía tradicional gruesa, la sublimación pasa de estado sólido a gaseoso mediante calor y se une permanentemente a los polímeros de la tela. No se despega, no se cuartea y conserva su suavidad.',
    category: 'Calidad'
  },
  {
    question: '¿Cuánto tiempo tarda la producción y entrega?',
    answer: 'Para pedidos unitarios o muestras, el tiempo estándar de producción es de 24 a 48 horas tras aprobar el mockup digital. Para producciones medianas y grandes, coordinamos un cronograma de 3 a 5 días hábiles con despacho express.',
    category: 'Tiempos'
  },
  {
    question: '¿Realizan envíos a nivel nacional?',
    answer: 'Sí, despachamos con las mejores transportadoras a nivel nacional con empaque seguro y número de guía para que rastrees tu pedido en tiempo real hasta tu puerta.',
    category: 'Envíos'
  }
];
