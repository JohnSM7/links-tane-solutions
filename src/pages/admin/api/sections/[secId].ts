import type { APIRoute } from 'astro'
import { supabase } from '../../../../lib/supabase'

export const POST: APIRoute = async ({ params, request, redirect }) => {
  const { secId } = params
  const form = await request.formData()
  const method = form.get('_method')?.toString().toUpperCase()
  const clientId = form.get('client_id')?.toString()

  if (method === 'DELETE') {
    await supabase.from('sections').delete().eq('id', secId!)
    return redirect(`/admin/clientes/${clientId}`)
  }

  // PUT — update
  const payload = {
    slug: form.get('slug')?.toString().toLowerCase().trim(),
    titulo: form.get('titulo')?.toString().trim(),
    icono: form.get('icono')?.toString().trim() ?? '🔗',
    descripcion: form.get('descripcion')?.toString().trim() ?? '',
    contenido: form.get('contenido')?.toString() ?? '',
    orden: parseInt(form.get('orden')?.toString() ?? '0'),
    activo: form.get('activo') === 'true',
  }

  const { error } = await supabase.from('sections').update(payload).eq('id', secId!)

  if (error) return redirect(`/admin/clientes/${clientId}/secciones/${secId}?error=1`)
  return redirect(`/admin/clientes/${clientId}/secciones/${secId}?saved=1`)
}
