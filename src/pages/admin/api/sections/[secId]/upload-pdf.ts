import type { APIRoute } from 'astro'
import { supabase } from '../../../../../lib/supabase'
import { isAdminAuthenticated } from '../../../../../lib/auth'

export const POST: APIRoute = async ({ params, request, redirect }) => {
  if (!isAdminAuthenticated(request)) return redirect('/admin/login')

  const { secId } = params
  const form = await request.formData()

  // Obtener client_id para el redirect
  const clientId = form.get('client_id')?.toString() ?? ''
  const backUrl = clientId
    ? `/admin/clientes/${clientId}/secciones/${secId}`
    : `/admin/dashboard`

  // Eliminar PDF
  if (form.get('remove_pdf') === 'true') {
    await supabase.from('sections').update({ pdf_url: '' }).eq('id', secId!)
    return redirect(`${backUrl}?saved=1`)
  }

  const file = form.get('pdf') as File | null
  if (!file || file.size === 0) return redirect(`${backUrl}?error=no-file`)

  // Solo permitir PDFs
  if (file.type !== 'application/pdf') {
    return redirect(`${backUrl}?error=invalid-type`)
  }

  // Máx 20 MB
  if (file.size > 20 * 1024 * 1024) {
    return redirect(`${backUrl}?error=too-large`)
  }

  const path = `pdfs/${secId}/documento.pdf`
  const buffer = new Uint8Array(await file.arrayBuffer())

  const { error: uploadError } = await supabase.storage
    .from('tanelinks-section-files')
    .upload(path, buffer, { contentType: 'application/pdf', upsert: true })

  if (uploadError) {
    console.error('PDF upload error:', uploadError)
    return redirect(`${backUrl}?error=upload-failed`)
  }

  const { data: { publicUrl } } = supabase.storage
    .from('tanelinks-section-files')
    .getPublicUrl(path)

  const { error: dbError } = await supabase
    .from('sections').update({ pdf_url: publicUrl }).eq('id', secId!)

  if (dbError) {
    console.error('DB update error:', dbError)
    return redirect(`${backUrl}?error=db-failed`)
  }

  return redirect(`${backUrl}?saved=1`)
}
