import type { APIRoute } from 'astro'
import { supabase } from '../../../../lib/supabase'

export const POST: APIRoute = async ({ params, request, redirect }) => {
  const { id } = params
  const form = await request.formData()
  const method = form.get('_method')?.toString().toUpperCase()

  if (method === 'DELETE') {
    await supabase.from('clients').delete().eq('id', id!)
    return redirect('/admin/dashboard')
  }

  // PUT — update
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
    activo: form.get('activo') === 'true',
  }

  const { error } = await supabase.from('clients').update(payload).eq('id', id!)

  if (error) return redirect(`/admin/clientes/${id}?error=1`)
  return redirect(`/admin/clientes/${id}?saved=1`)
}
