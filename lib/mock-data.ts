import type { Project, TeamMember, Service, Testimonial, BlogPost } from "@/types/database";

export const mockServices: Service[] = [
  {
    id: "1",
    title: "Marketing Digital",
    description:
      "Estrategias data-driven que conectan tu marca con la audiencia correcta. Campañas en Google Ads, Meta Ads y email marketing con ROI medible.",
    icon: "megaphone",
    features: ["Google Ads", "Meta Ads", "Email Marketing", "Analytics"],
    order: 1,
    created_at: "2025-01-01",
  },
  {
    id: "2",
    title: "Branding & Diseño",
    description:
      "Creamos identidades visuales memorables que transmiten la esencia de tu marca. Desde el logo hasta el sistema de diseño completo.",
    icon: "palette",
    features: ["Identidad Visual", "Logo Design", "Brand Guidelines", "Packaging"],
    order: 2,
    created_at: "2025-01-01",
  },
  {
    id: "4",
    title: "Redes Sociales",
    description:
      "Gestión integral de tus redes sociales con contenido estratégico, community management y crecimiento orgánico sostenible.",
    icon: "share",
    features: ["Content Strategy", "Community Management", "Reels & Stories", "Influencer Marketing"],
    order: 4,
    created_at: "2025-01-01",
  },
  {
    id: "5",
    title: "SEO & Analytics",
    description:
      "Posicionamos tu sitio en los primeros resultados de Google con estrategias de SEO técnico, contenido optimizado y análisis de datos.",
    icon: "bar",
    features: ["SEO Técnico", "Keyword Research", "Link Building", "Data Analytics"],
    order: 5,
    created_at: "2025-01-01",
  },
  {
    id: "6",
    title: "Producción Audiovisual",
    description:
      "Contenido audiovisual profesional que cuenta la historia de tu marca. Video corporativo, reels, fotografía y motion graphics.",
    icon: "camera",
    features: ["Video Corporativo", "Reels", "Fotografía", "Motion Graphics"],
    order: 6,
    created_at: "2025-01-01",
  },
];

export const mockTestimonials: Testimonial[] = [
  {
    id: "1",
    client_id: "1",
    quote:
      "Sinnergia transformó nuestra presencia digital por completo. En 3 meses duplicamos nuestras ventas online y el engagement en redes creció un 200%.",
    author_name: "Andrea López",
    author_role: "CEO, Moda Luxe",
    rating: 5,
    created_at: "2025-02-01",
    client: { id: "1", name: "Moda Luxe", logo_url: null, website: null, industry: "Fashion", created_at: "2025-01-01" },
  },
  {
    id: "2",
    client_id: "2",
    quote:
      "El equipo de desarrollo entregó una app impecable en tiempo récord. La experiencia de usuario es excepcional y nuestros clientes lo notan.",
    author_name: "Felipe Contreras",
    author_role: "Founder, QuickBite",
    rating: 5,
    created_at: "2025-03-01",
    client: { id: "2", name: "QuickBite", logo_url: null, website: null, industry: "Food Tech", created_at: "2025-01-01" },
  },
  {
    id: "3",
    client_id: "3",
    quote:
      "La estrategia de SEO que implementaron nos llevó del puesto 30 al top 3 en Google. El tráfico orgánico se triplicó en 6 meses.",
    author_name: "María Fernanda Ríos",
    author_role: "CMO, GreenVida",
    rating: 5,
    created_at: "2025-04-01",
    client: { id: "3", name: "GreenVida", logo_url: null, website: null, industry: "Wellness", created_at: "2025-01-01" },
  },
];

export const mockPosts: BlogPost[] = [
  {
    id: "1",
    title: "5 Tendencias de Marketing Digital para 2025",
    slug: "tendencias-marketing-digital-2025",
    content: `
      <h2>El marketing digital no para de evolucionar</h2>
      <p>Cada año trae nuevas herramientas, plataformas y comportamientos de los consumidores que redefinen cómo las marcas se conectan con su audiencia. En 2025, estas son las tendencias que están marcando la diferencia.</p>

      <h3>1. IA Generativa en la creación de contenido</h3>
      <p>La inteligencia artificial ya no es solo una herramienta de automatización. Hoy, las marcas más innovadoras la utilizan para generar contenido personalizado a escala, desde copys publicitarios hasta imágenes y videos adaptados a cada segmento de audiencia.</p>

      <h3>2. Video corto como formato rey</h3>
      <p>TikTok, Reels e YouTube Shorts siguen dominando el engagement. Las marcas que no están produciendo video corto están perdiendo la oportunidad de conectar con audiencias más jóvenes y generar viralidad orgánica.</p>

      <h3>3. Comercio social (Social Commerce)</h3>
      <p>La línea entre redes sociales y e-commerce se difumina cada vez más. Instagram Shop, TikTok Shop y las integraciones de WhatsApp Business permiten a los usuarios comprar sin salir de la plataforma.</p>

      <h3>4. First-party data y el fin de las cookies</h3>
      <p>Con la desaparición de las cookies de terceros, las estrategias basadas en datos propios se vuelven críticas. Email marketing, programas de lealtad y contenido gated son las nuevas fuentes de datos confiables.</p>

      <h3>5. Experiencias inmersivas con AR</h3>
      <p>La realidad aumentada permite a los consumidores interactuar con productos antes de comprarlos. Desde probarse ropa virtualmente hasta visualizar muebles en su hogar, las experiencias AR están aumentando las tasas de conversión significativamente.</p>

      <h2>Conclusión</h2>
      <p>Adaptarse a estas tendencias no es opcional — es una necesidad competitiva. Las marcas que experimenten temprano con estas tecnologías y formatos tendrán una ventaja significativa en el mercado digital de 2025.</p>
    `,
    excerpt:
      "Descubre las estrategias que están revolucionando el marketing digital este año: IA generativa, video corto, y más.",
    cover_image: null,
    category: "Marketing",
    published: true,
    reading_time: 5,
    created_at: "2025-03-15",
  },
  {
    id: "2",
    title: "Cómo el Branding Aumenta tus Ventas",
    slug: "branding-aumenta-ventas",
    content: `
      <h2>El branding no es solo un logo</h2>
      <p>Muchas empresas confunden branding con diseño gráfico. Aunque el diseño es una parte fundamental, el branding abarca la percepción completa que el público tiene de tu marca — y esa percepción impacta directamente en tus ventas.</p>

      <h3>Confianza = Conversión</h3>
      <p>Los consumidores compran de marcas en las que confían. Una identidad visual consistente, un tono de voz definido y una propuesta de valor clara generan la confianza necesaria para que un visitante se convierta en cliente.</p>

      <h3>Diferenciación en un mercado saturado</h3>
      <p>En mercados donde los productos son similares, el branding es lo que te separa de la competencia. No se trata de ser mejor — se trata de ser diferente y memorable. Las marcas con personalidad propia capturan la atención y la lealtad.</p>

      <h3>El valor percibido justifica el precio</h3>
      <p>Un branding sólido permite cobrar precios premium. Los consumidores están dispuestos a pagar más por marcas que perciben como de alta calidad, aunque el producto sea funcionalmente similar al de la competencia.</p>

      <h2>Conclusión</h2>
      <p>Invertir en branding no es un gasto — es la inversión con mayor retorno a largo plazo para cualquier negocio que quiera crecer de forma sostenible.</p>
    `,
    excerpt:
      "Una identidad de marca sólida no es solo estética — es una inversión directa en la confianza y lealtad de tus clientes.",
    cover_image: null,
    category: "Branding",
    published: true,
    reading_time: 4,
    created_at: "2025-03-01",
  },
  {
    id: "3",
    title: "Guía Completa de SEO para Principiantes",
    slug: "guia-seo-principiantes",
    content: `
      <h2>¿Qué es SEO y por qué importa?</h2>
      <p>SEO (Search Engine Optimization) es el conjunto de técnicas para posicionar tu sitio web en los primeros resultados de Google. El 75% de los usuarios nunca pasa de la primera página — si no estás ahí, prácticamente no existís.</p>

      <h3>Keywords: la base de todo</h3>
      <p>Todo empieza con entender qué busca tu audiencia. Las herramientas de keyword research te permiten identificar los términos que tus potenciales clientes usan para encontrar productos o servicios como los tuyos. Enfocate en keywords de cola larga con intención de compra clara.</p>

      <h3>SEO On-Page</h3>
      <p>Optimizar cada página de tu sitio incluye: títulos descriptivos con keywords, meta descriptions atractivas, headers jerárquicos (H1, H2, H3), URLs limpias, imágenes optimizadas con alt text, y contenido de valor que responda las preguntas de tu audiencia.</p>

      <h3>SEO Técnico</h3>
      <p>La velocidad de carga, la experiencia mobile, la estructura del sitemap, los datos estructurados y la seguridad HTTPS son factores técnicos que Google evalúa para rankear tu sitio. Un sitio lento o que no funciona bien en móvil pierde posiciones rápidamente.</p>

      <h3>Link Building</h3>
      <p>Los enlaces externos que apuntan a tu sitio son como votos de confianza. Cuantos más sitios relevantes y de autoridad te enlacen, mejor será tu posicionamiento. Estrategias como guest posting, PR digital y contenido compartible son clave.</p>

      <h3>Medir y ajustar</h3>
      <p>SEO no es un esfuerzo de una sola vez. Usá Google Search Console y Google Analytics para monitorear tus posiciones, identificar oportunidades y ajustar tu estrategia constantemente.</p>

      <h2>Conclusión</h2>
      <p>El SEO es una de las estrategias de marketing digital con mayor retorno a largo plazo. Requiere paciencia y consistencia, pero los resultados son acumulativos y sostenibles.</p>
    `,
    excerpt:
      "Todo lo que necesitas saber para posicionar tu sitio web en Google: desde keywords hasta link building.",
    cover_image: null,
    category: "SEO",
    published: true,
    reading_time: 8,
    created_at: "2025-02-15",
  },
];

export const mockProjects: Project[] = [
  {
    id: "1",
    title: "Rediseño E-Commerce Premium",
    slug: "rediseno-ecommerce-premium",
    description:
      "Transformamos la experiencia de compra online con un diseño moderno, UX optimizada y un aumento del 45% en conversiones.",
    client_id: "1",
    category: "Diseño Web",
    images: [],
    results_text: "+45% conversiones",
    featured: true,
    order: 1,
    created_at: "2025-01-01",
    client: { id: "1", name: "Moda Luxe", logo_url: null, website: null, industry: "Fashion", created_at: "2025-01-01" },
  },
  {
    id: "2",
    title: "App de Delivery en Tiempo Real",
    slug: "app-delivery-tiempo-real",
    description:
      "Desarrollo de una aplicación móvil con tracking en tiempo real, notificaciones push y sistema de pagos integrado.",
    client_id: "2",
    category: "Desarrollo Mobile",
    images: [],
    results_text: "+12K descargas en 1 mes",
    featured: true,
    order: 2,
    created_at: "2025-02-01",
    client: { id: "2", name: "QuickBite", logo_url: null, website: null, industry: "Food Tech", created_at: "2025-01-01" },
  },
  {
    id: "3",
    title: "Campaña Digital 360°",
    slug: "campana-digital-360",
    description:
      "Estrategia integral de marketing digital con redes sociales, Google Ads y email marketing que triplicó el alcance de la marca.",
    client_id: "3",
    category: "Marketing Digital",
    images: [],
    results_text: "3x alcance orgánico",
    featured: true,
    order: 3,
    created_at: "2025-03-01",
    client: { id: "3", name: "GreenVida", logo_url: null, website: null, industry: "Wellness", created_at: "2025-01-01" },
  },
  {
    id: "4",
    title: "Plataforma SaaS de Analytics",
    slug: "plataforma-saas-analytics",
    description:
      "Dashboard interactivo con visualización de datos en tiempo real, reportes automatizados e integración con múltiples fuentes de datos.",
    client_id: "4",
    category: "Desarrollo Web",
    images: [],
    results_text: "+200 empresas activas",
    featured: true,
    order: 4,
    created_at: "2025-04-01",
    client: { id: "4", name: "DataFlow", logo_url: null, website: null, industry: "SaaS", created_at: "2025-01-01" },
  },
];

export const mockTeam: TeamMember[] = [
  {
    id: "1",
    name: "Valentina Torres",
    role: "Directora Creativa",
    bio: "10+ años liderando equipos creativos en agencias top de Latinoamérica.",
    photo_url: null,
    social_links: { linkedin: "#", instagram: "#" },
    order: 1,
    created_at: "2025-01-01",
  },
  {
    id: "2",
    name: "Martín Ruiz",
    role: "Lead Developer",
    bio: "Full-stack developer especializado en React, Next.js y arquitecturas cloud.",
    photo_url: null,
    social_links: { linkedin: "#", github: "#" },
    order: 2,
    created_at: "2025-01-01",
  },
  {
    id: "3",
    name: "Camila Herrera",
    role: "Estratega Digital",
    bio: "Experta en growth marketing, SEO y campañas de performance.",
    photo_url: null,
    social_links: { linkedin: "#", twitter: "#" },
    order: 3,
    created_at: "2025-01-01",
  },
  {
    id: "4",
    name: "Lucas Méndez",
    role: "Diseñador UX/UI",
    bio: "Apasionado por crear interfaces intuitivas y experiencias memorables.",
    photo_url: null,
    social_links: { linkedin: "#", instagram: "#" },
    order: 4,
    created_at: "2025-01-01",
  },
];
