import type { APIRoute } from 'astro'
import { supabase } from '../../../lib/supabase'

export const POST: APIRoute = async ({ request, redirect }) => {
  const form = await request.formData()
  const sectionId = form.get('section_id')?.toString()
  const clientId = form.get('client_id')?.toString()

  const payload = {
    section_id: sectionId,
    titulo: form.get('titulo')?.toString().trim(),
    url: form.get('url')?.toString().trim(),
    icono: form.get('icono')?.toString().trim() ?? '🔗',
    descripcion: form.get('descripcion')?.toString().trim() ?? '',
    orden: parseInt(form.get('orden')?.toString() ?? '0'),
    activo: true,
  }

  const { error } = await supabase.from('links').insert(payload)

  if (error) return redirect(`/admin/clientes/${clientId}/secciones/${sectionId}/links/nuevo?error=1`)
  return redirect(`/admin/clientes/${clientId}/secciones/${sectionId}`)
}
