export interface Client {
  id: string
  slug: string
  nombre: string
  ciudad: string
  contacto_extra: string
  brand_primary: string
  brand_background: string
  brand_accent: string
  hero_titulo: string
  hero_subtitulo: string
  hero_image_url: string
  logo_url: string
  whatsapp: string
  email: string
  activo: boolean
  created_at: string
}

export interface Section {
  id: string
  client_id: string
  slug: string
  titulo: string
  icono: string
  descripcion: string
  contenido: string
  orden: number
  activo: boolean
  created_at: string
  links?: Link[]
}

export interface Link {
  id: string
  section_id: string
  titulo: string
  url: string
  descripcion: string
  icono: string
  orden: number
  activo: boolean
  created_at: string
}
