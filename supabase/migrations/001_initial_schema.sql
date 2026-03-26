-- =============================================
-- SINNERGIA - Database Schema
-- =============================================

-- Clients
CREATE TABLE clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT,
  website TEXT,
  industry TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Services
CREATE TABLE services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'zap',
  features TEXT[] DEFAULT '{}',
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Projects
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  category TEXT NOT NULL DEFAULT 'general',
  images TEXT[] DEFAULT '{}',
  results_text TEXT,
  featured BOOLEAN DEFAULT false,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Team Members
CREATE TABLE team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT,
  photo_url TEXT,
  social_links JSONB DEFAULT '{}',
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Testimonials
CREATE TABLE testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  quote TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_role TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Blog Posts
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL DEFAULT '',
  excerpt TEXT,
  cover_image TEXT,
  category TEXT NOT NULL DEFAULT 'general',
  published BOOLEAN DEFAULT false,
  reading_time INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Contact Submissions
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Site Config
CREATE TABLE site_config (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL
);

-- =============================================
-- INDEXES
-- =============================================

CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_featured ON projects(featured);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON blog_posts(published);
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX idx_site_config_key ON site_config(key);

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================

ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read clients" ON clients FOR SELECT USING (true);
CREATE POLICY "Public read services" ON services FOR SELECT USING (true);
CREATE POLICY "Public read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read team" ON team_members FOR SELECT USING (true);
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public read published posts" ON blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Public read config" ON site_config FOR SELECT USING (true);

-- Public insert for contact form
CREATE POLICY "Public insert contact" ON contact_submissions FOR INSERT WITH CHECK (true);

-- Authenticated full access
CREATE POLICY "Auth full clients" ON clients FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth full services" ON services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth full projects" ON projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth full team" ON team_members FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth full testimonials" ON testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth full blog" ON blog_posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth full contact" ON contact_submissions FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth full config" ON site_config FOR ALL USING (auth.role() = 'authenticated');

-- =============================================
-- SEED DATA
-- =============================================

-- Services
INSERT INTO services (title, description, icon, features, "order") VALUES
('Marketing Digital', 'Estrategias digitales integrales que impulsan tu marca y generan resultados medibles.', 'megaphone', ARRAY['Google Ads', 'Meta Ads', 'Email Marketing', 'Automatizacion'], 1),
('Branding & Diseño', 'Creamos identidades visuales unicas que conectan con tu audiencia y destacan en el mercado.', 'palette', ARRAY['Identidad Visual', 'Logo Design', 'Brand Guidelines', 'Packaging'], 2),
('Desarrollo Web', 'Sitios web modernos, rapidos y optimizados para convertir visitantes en clientes.', 'code', ARRAY['Sitios Web', 'E-commerce', 'Landing Pages', 'Apps Web'], 3),
('Redes Sociales', 'Gestion profesional de redes sociales con contenido que genera engagement real.', 'share', ARRAY['Content Creation', 'Community Management', 'Influencer Marketing', 'Social Ads'], 4),
('SEO & Analytics', 'Posicionamiento organico y analisis de datos para tomar decisiones inteligentes.', 'bar', ARRAY['SEO On-Page', 'SEO Tecnico', 'Google Analytics', 'Reportes'], 5),
('Produccion Audiovisual', 'Contenido visual de alto impacto: video, fotografia y motion graphics.', 'camera', ARRAY['Video Corporativo', 'Fotografia', 'Motion Graphics', 'Reels & Shorts'], 6);

-- Team Members
INSERT INTO team_members (name, role, bio, social_links, "order") VALUES
('Maria Rodriguez', 'CEO & Fundadora', 'Mas de 10 años de experiencia en marketing digital. Apasionada por la innovacion y los resultados.', '{"linkedin": "#", "twitter": "#"}', 1),
('Carlos Mendez', 'Director Creativo', 'Diseñador con ojo para el detalle. Transforma ideas en experiencias visuales memorables.', '{"linkedin": "#", "instagram": "#"}', 2),
('Ana Torres', 'Head of Strategy', 'Experta en data-driven marketing. Convierte datos en estrategias ganadoras.', '{"linkedin": "#", "twitter": "#"}', 3),
('Diego Fernandez', 'Lead Developer', 'Full-stack developer especializado en crear experiencias web que impactan.', '{"linkedin": "#", "github": "#"}', 4);

-- Clients
INSERT INTO clients (name, industry, website) VALUES
('TechFlow', 'Tecnologia', 'https://techflow.com'),
('GreenLife', 'Sustentabilidad', 'https://greenlife.com'),
('Urban Eats', 'Gastronomia', 'https://urbaneats.com'),
('FitPro', 'Fitness', 'https://fitpro.com');

-- Projects
INSERT INTO projects (title, slug, description, client_id, category, results_text, featured, "order") VALUES
('Rebranding TechFlow', 'rebranding-techflow', 'Rediseño completo de la identidad visual y estrategia digital de TechFlow, una startup tecnologica en crecimiento.', (SELECT id FROM clients WHERE name = 'TechFlow'), 'branding', '+250% engagement en redes sociales', true, 1),
('E-commerce GreenLife', 'ecommerce-greenlife', 'Desarrollo de tienda online con enfoque sustentable, incluyendo estrategia de marketing digital integral.', (SELECT id FROM clients WHERE name = 'GreenLife'), 'desarrollo', '+180% en ventas online', true, 2),
('Campaña Urban Eats', 'campana-urban-eats', 'Lanzamiento de campaña 360 para la nueva linea de restaurantes, incluyendo branding, redes y publicidad.', (SELECT id FROM clients WHERE name = 'Urban Eats'), 'marketing', '+300% reservas mensuales', true, 3),
('App FitPro', 'app-fitpro', 'Diseño y desarrollo de la aplicacion web de fitness con gamificacion y comunidad integrada.', (SELECT id FROM clients WHERE name = 'FitPro'), 'desarrollo', '+500% descargas en 3 meses', true, 4);

-- Testimonials
INSERT INTO testimonials (client_id, quote, author_name, author_role, rating) VALUES
((SELECT id FROM clients WHERE name = 'TechFlow'), 'Sinnergia transformo nuestra marca por completo. Los resultados superaron todas nuestras expectativas. Son un equipo excepcional.', 'Roberto Silva', 'CEO de TechFlow', 5),
((SELECT id FROM clients WHERE name = 'GreenLife'), 'La estrategia digital que implementaron multiplico nuestras ventas. Su enfoque data-driven marca la diferencia.', 'Laura Gomez', 'CMO de GreenLife', 5),
((SELECT id FROM clients WHERE name = 'Urban Eats'), 'Creatividad y resultados. Sinnergia entiende como ninguna otra agencia lo que una marca necesita para destacar.', 'Marco Ruiz', 'Fundador de Urban Eats', 5);

-- Blog Posts
INSERT INTO blog_posts (title, slug, content, excerpt, category, published, reading_time) VALUES
('5 Tendencias de Marketing Digital para 2024', '5-tendencias-marketing-digital-2024', '<h2>El marketing evoluciona constantemente</h2><p>En un mundo digital en constante cambio, mantenerse actualizado es clave para el exito. Aqui te compartimos las 5 tendencias mas importantes.</p><h3>1. Inteligencia Artificial Generativa</h3><p>La IA esta revolucionando la forma en que creamos contenido, desde textos hasta imagenes y videos.</p><h3>2. Video Corto</h3><p>TikTok, Reels e YouTube Shorts siguen dominando el engagement en redes sociales.</p><h3>3. Marketing de Comunidad</h3><p>Las marcas que construyen comunidades autenticas tienen mayor lealtad y engagement.</p><h3>4. Personalizacion Avanzada</h3><p>Los usuarios esperan experiencias personalizadas en cada punto de contacto.</p><h3>5. Sostenibilidad como Estrategia</h3><p>Los consumidores prefieren marcas comprometidas con el medio ambiente.</p>', 'Descubre las tendencias que van a dominar el marketing digital y como puedes aprovecharlas para tu marca.', 'marketing', true, 5),
('Como Crear una Identidad de Marca Poderosa', 'como-crear-identidad-marca-poderosa', '<h2>Tu marca es mas que un logo</h2><p>Una identidad de marca solida es la base de cualquier estrategia de marketing exitosa. Te explicamos como construirla paso a paso.</p><h3>Define tu proposito</h3><p>Antes de pensar en colores o tipografias, necesitas claridad sobre tu mision, vision y valores.</p><h3>Conoce a tu audiencia</h3><p>Investiga profundamente a tu publico objetivo. Entiende sus necesidades, deseos y puntos de dolor.</p><h3>Diseña tu identidad visual</h3><p>Logo, paleta de colores, tipografia y estilo fotografico deben ser coherentes y memorables.</p>', 'Aprende los pasos fundamentales para construir una identidad de marca que conecte con tu audiencia.', 'branding', true, 4),
('SEO en 2024: Guia Completa para Principiantes', 'seo-2024-guia-completa', '<h2>Que es el SEO y por que importa</h2><p>El SEO (Search Engine Optimization) es el proceso de optimizar tu sitio web para aparecer en los primeros resultados de Google.</p><h3>Palabras clave</h3><p>La investigacion de keywords sigue siendo fundamental. Usa herramientas como Google Keyword Planner o Ahrefs.</p><h3>Contenido de calidad</h3><p>Google premia el contenido util, original y bien estructurado. Escribe para personas, no para algoritmos.</p>', 'Todo lo que necesitas saber sobre SEO para posicionar tu sitio web en los primeros resultados de Google.', 'seo', true, 6);

-- Site Config
INSERT INTO site_config (key, value) VALUES
('site_name', 'Sinnergia'),
('tagline', 'Transformamos marcas con estrategias digitales que generan resultados reales'),
('contact_email', 'hola@sinnergia.com'),
('contact_phone', '+54 11 1234-5678'),
('address', 'Buenos Aires, Argentina'),
('instagram', 'https://instagram.com/sinnergia'),
('linkedin', 'https://linkedin.com/company/sinnergia'),
('twitter', 'https://twitter.com/sinnergia');
