-- TaneLinks: schema propio para aislar de otros proyectos

CREATE SCHEMA IF NOT EXISTS links;

GRANT USAGE ON SCHEMA links TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA links GRANT ALL ON TABLES TO anon, authenticated, service_role;

CREATE TABLE IF NOT EXISTS links.clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  nombre text NOT NULL,
  ciudad text DEFAULT '',
  anfitriones text DEFAULT '',
  brand_primary text DEFAULT '#15264E',
  brand_background text DEFAULT '#F8F2E6',
  brand_accent text DEFAULT '#C8A064',
  hero_titulo text DEFAULT '',
  hero_subtitulo text DEFAULT '',
  hero_image_url text DEFAULT '',
  whatsapp text DEFAULT '',
  email text DEFAULT '',
  airbnb_url text DEFAULT '',
  booking_url text DEFAULT '',
  activo boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS links.sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES links.clients(id) ON DELETE CASCADE,
  slug text NOT NULL,
  titulo text NOT NULL,
  icono text DEFAULT '🔗',
  descripcion text DEFAULT '',
  contenido text DEFAULT '',
  orden integer DEFAULT 0,
  activo boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  UNIQUE(client_id, slug)
);

CREATE TABLE IF NOT EXISTS links.links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id uuid NOT NULL REFERENCES links.sections(id) ON DELETE CASCADE,
  titulo text NOT NULL,
  url text NOT NULL,
  descripcion text DEFAULT '',
  icono text DEFAULT '🔗',
  orden integer DEFAULT 0,
  activo boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Index para queries frecuentes
CREATE INDEX IF NOT EXISTS idx_clients_slug ON links.clients(slug);
CREATE INDEX IF NOT EXISTS idx_sections_client ON links.sections(client_id, activo, orden);
CREATE INDEX IF NOT EXISTS idx_links_section ON links.links(section_id, activo, orden);
