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
    id: "0",
    title: "Tu Proyecto Digital en Menos de 7 Días: Cómo lo Hacemos Posible",
    slug: "proyecto-digital-en-7-dias",
    content: `
      <p><strong>Mientras otras agencias te piden 3 meses, nosotros entregamos en 7 días.</strong> No es magia. No es improvisación. Es un sistema diseñado para eliminar todo lo que frena un proyecto y enfocarnos en lo único que importa: resultados.</p>

      <p>Si estás leyendo esto, probablemente ya pasaste por la experiencia de contratar una agencia que te prometió un sitio web "en unas semanas" y terminaste esperando meses, con reuniones interminables, cambios que nunca llegan y un presupuesto que se infla sin explicación.</p>

      <p><strong>Eso se terminó.</strong></p>

      <h2>Por qué la mayoría de las agencias tardan tanto</h2>

      <p>El modelo tradicional de agencia está roto. Se basa en procesos diseñados para justificar tarifas altas, no para entregar valor rápido:</p>

      <ul>
        <li><strong>Semanas de "discovery"</strong> que podrían resolverse en una llamada de 45 minutos</li>
        <li><strong>Rondas infinitas de revisión</strong> porque el primer approach no se alineó con lo que el cliente necesitaba</li>
        <li><strong>Equipos fragmentados</strong> donde el diseñador no habla con el developer y nadie entiende el negocio del cliente</li>
        <li><strong>Herramientas obsoletas</strong> que requieren configuraciones manuales que la tecnología moderna ya automatizó</li>
      </ul>

      <p>El resultado: proyectos que demoran 8-12 semanas cuando deberían estar listos en días.</p>

      <h2>El método Sinnergia: 7 días, sin atajos</h2>

      <p>No entregamos rápido porque cortemos esquinas. Entregamos rápido porque eliminamos todo lo que no genera valor. Así funciona nuestro proceso:</p>

      <h3>Día 1-2: Estrategia y estructura</h3>
      <p>Todo arranca con una sesión intensiva donde definimos juntos los objetivos, la audiencia y las métricas de éxito. No hacemos un brief de 40 páginas que nadie lee — hacemos un documento vivo de una página con lo esencial: qué necesitás, para quién, y cómo medimos el éxito.</p>
      <p>En paralelo, nuestro equipo ya está armando la arquitectura del sitio, definiendo la estructura de contenido y seleccionando el stack tecnológico óptimo. Cuando terminás la sesión de estrategia, el esqueleto de tu proyecto ya existe.</p>

      <h3>Día 3-4: Diseño y desarrollo simultáneo</h3>
      <p>Acá es donde la magia sucede. Mientras la mayoría de las agencias diseña primero y desarrolla después (duplicando tiempos), nosotros trabajamos en paralelo con un sistema de componentes que permite diseñar y buildear al mismo tiempo.</p>
      <p>Usamos tecnología de punta — <strong>Next.js, React, Tailwind CSS</strong> — que nos permite crear interfaces de alto rendimiento a velocidades que frameworks antiguos no pueden igualar. No estamos arrastrando WordPress con 47 plugins. Estamos construyendo software real, optimizado desde el primer commit.</p>

      <h3>Día 5-6: Contenido, optimización y pulido</h3>
      <p>El sitio ya funciona. Ahora lo hacemos brillar. Integramos tu contenido real, optimizamos para SEO, configuramos analytics, aseguramos que cargue en menos de 2 segundos y que la experiencia mobile sea impecable.</p>
      <p>Cada página pasa por un checklist de 50+ puntos que cubre rendimiento, accesibilidad, SEO técnico y compatibilidad cross-browser. No entregamos un sitio "que funciona" — entregamos un sitio que <strong>performa</strong>.</p>

      <h3>Día 7: Lanzamiento</h3>
      <p>Deploy a producción, DNS configurados, SSL activo, monitoreo en tiempo real. Tu proyecto está live, funcionando, y listo para recibir tráfico real. Sin dramas, sin "falta un detallito", sin excusas.</p>

      <h2>¿Qué incluye un proyecto de 7 días?</h2>

      <p>Esto no es un template genérico con tu logo pegado encima. Cada proyecto incluye:</p>

      <ul>
        <li><strong>Diseño 100% custom</strong> — nada de plantillas. Tu marca, tu identidad, tu personalidad</li>
        <li><strong>Desarrollo con tecnología moderna</strong> — sitios que cargan en menos de 2 segundos, optimizados para Google</li>
        <li><strong>Responsive perfecto</strong> — se ve impecable en celular, tablet y desktop</li>
        <li><strong>SEO técnico de base</strong> — meta tags, sitemap, robots.txt, datos estructurados, Core Web Vitals optimizados</li>
        <li><strong>Panel de administración</strong> — para que puedas actualizar tu contenido sin depender de nadie</li>
        <li><strong>Analytics configurado</strong> — sabés desde el día 1 cuánta gente visita tu sitio y qué hacen</li>
        <li><strong>Hosting y deploy incluido</strong> — nos encargamos de la infraestructura para que vos te enfoques en tu negocio</li>
      </ul>

      <h2>"¿Pero la calidad no se resiente?"</h2>

      <p>Es la pregunta que todos hacen. Y es lógica. Estamos condicionados a pensar que rápido = malo.</p>

      <p>La realidad es otra: <strong>la velocidad es consecuencia de la expertise, no enemiga de la calidad.</strong> Un cirujano experimentado opera más rápido Y con mejores resultados que uno novato. Lo mismo aplica al desarrollo digital.</p>

      <p>Nuestro equipo ha construido cientos de proyectos. Cada uno nos enseñó algo. Cada error se convirtió en un proceso optimizado. Cada solución exitosa se transformó en un componente reutilizable. No empezamos de cero — empezamos desde la experiencia acumulada.</p>

      <p>Los resultados hablan:</p>

      <ul>
        <li>+45% en conversiones para un e-commerce de moda en su primer mes</li>
        <li>+12,000 descargas en 30 días para una app de delivery</li>
        <li>3x en alcance orgánico para una marca de wellness</li>
        <li>+200 empresas usando una plataforma SaaS que construimos</li>
      </ul>

      <h2>Para quién es esto</h2>

      <p>Este modelo no es para todos. Es para:</p>

      <ul>
        <li><strong>Emprendedores</strong> que necesitan validar una idea rápido sin gastar una fortuna</li>
        <li><strong>PyMEs</strong> que saben que necesitan presencia digital pero no pueden esperar 3 meses</li>
        <li><strong>Startups</strong> que necesitan una landing o MVP antes de su próxima ronda de inversión</li>
        <li><strong>Marcas establecidas</strong> que quieren renovar su imagen digital sin pausar sus operaciones</li>
      </ul>

      <p>Si sos de los que prefiere reuniones semanales durante meses para "afinar detalles", probablemente no somos la agencia para vos. Si querés resultados concretos, rápido, y sin vueltas — hablemos.</p>

      <h2>El costo de esperar</h2>

      <p>Cada día sin presencia digital optimizada es dinero que dejás en la mesa. Mientras vos esperás a que "la agencia de siempre" te entregue el sitio, tu competencia ya está capturando a tus clientes potenciales en Google, en redes, en cada búsqueda.</p>

      <p>No se trata solo del sitio web. Se trata de las oportunidades que perdés mientras no lo tenés. Los leads que no captás. Las ventas que no cerrás. La credibilidad que no construís.</p>

      <p><strong>7 días.</strong> Eso es todo lo que necesitamos para cambiar el juego.</p>

      <h2>¿Listo para empezar?</h2>

      <p>Escribinos hoy y en una semana tu proyecto está live. Sin letra chica, sin sorpresas, sin excusas. Solo resultados.</p>
    `,
    excerpt:
      "Mientras otras agencias te piden 3 meses, nosotros entregamos en 7 días. No es magia — es un sistema diseñado para eliminar todo lo que frena un proyecto.",
    cover_image: null,
    category: "Sinnergia",
    published: true,
    reading_time: 7,
    created_at: "2025-03-25",
  },
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
