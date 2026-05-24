import type { APIRoute } from 'astro'
import { supabase } from '../../../lib/supabase'

export const POST: APIRoute = async ({ request, redirect }) => {
  const form = await request.formData()

  const payload = {
    slug: form.get('slug')?.toString().toLowerCase().trim(),
    nombre: form.get('nombre')?.toString().trim(),
    ciudad: form.get('ciudad')?.toString().trim() ?? '',
    contacto_extra: form.get('contacto_extra')?.toString().trim() ?? '',
    brand_primary: form.get('brand_primary')?.toString() ?? '#15264E',
    brand_background: form.get('brand_background')?.toString() ?? '#F8F2E6',
    brand_accent: form.get('brand_accent')?.toString() ?? '#C8A064',
    hero_titulo: form.get('hero_titulo')?.toString().trim() ?? '',
    hero_subtitulo: form.get('hero_subtitulo')?.toString().trim() ?? '',
    hero_image_url: form.get('hero_image_url')?.toString().trim() ?? '',
    whatsapp: form.get('whatsapp')?.toString().trim() ?? '',
    email: form.get('email')?.toString().trim() ?? '',
    activo: true,
  }

  const { data, error } = await supabase.from('clients').insert(payload).select('id').single()

  if (error || !data) return redirect('/admin/clientes/nuevo?error=1')

  return redirect(`/admin/clientes/${data.id}?saved=1`)
}
