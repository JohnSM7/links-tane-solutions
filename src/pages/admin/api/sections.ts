import type { APIRoute } from 'astro'
import { supabase } from '../../../lib/supabase'

export const POST: APIRoute = async ({ request, redirect }) => {
  const form = await request.formData()
  const clientId = form.get('client_id')?.toString()

  const payload = {
    client_id: clientId,
    slug: form.get('slug')?.toString().toLowerCase().trim(),
    titulo: form.get('titulo')?.toString().trim(),
    icono: form.get('icono')?.toString().trim() ?? '🔗',
    descripcion: form.get('descripcion')?.toString().trim() ?? '',
    contenido: form.get('contenido')?.toString() ?? '',
    orden: parseInt(form.get('orden')?.toString() ?? '0'),
    activo: true,
  }

  const { error } = await supabase.from('sections').insert(payload)

  if (error) return redirect(`/admin/clientes/${clientId}/secciones/nueva?error=1`)
  return redirect(`/admin/clientes/${clientId}`)
}
