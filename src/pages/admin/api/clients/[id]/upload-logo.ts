import type { APIRoute } from 'astro'
import { supabase } from '../../../../../lib/supabase'
import { isAdminAuthenticated } from '../../../../../lib/auth'

export const POST: APIRoute = async ({ params, request, redirect }) => {
  if (!isAdminAuthenticated(request)) return redirect('/admin/login')

  const { id } = params
  const form = await request.formData()

  // Detect fetch (JSON) vs traditional form submission
  const wantsJson = request.headers.get('accept')?.includes('application/json')

  const fail = (msg: string, status = 400) => wantsJson
    ? new Response(JSON.stringify({ ok: false, error: msg }), { status, headers: { 'Content-Type': 'application/json' } })
    : redirect(`/admin/clientes/${id}?error=${encodeURIComponent(msg)}`)

  // Handle logo removal
  if (form.get('remove_logo') === 'true') {
    const { error } = await supabase.from('clients').update({ logo_url: '' }).eq('id', id!)
    if (error) return fail(error.message, 500)
    return redirect(`/admin/clientes/${id}?saved=1`)
  }

  const file = form.get('logo') as File | null
  if (!file || file.size === 0) return fail('no-file')

  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'png'
  const path = `logos/${id}/logo.${ext}`
  const buffer = new Uint8Array(await file.arrayBuffer())

  const { error: uploadError } = await supabase.storage
    .from('tanelinks-section-files')
    .upload(path, buffer, { contentType: file.type, upsert: true })

  if (uploadError) {
    console.error('Storage upload error:', uploadError)
    return fail(uploadError.message, 500)
  }

  const { data: { publicUrl } } = supabase.storage
    .from('tanelinks-section-files')
    .getPublicUrl(path)

  const { error: dbError } = await supabase.from('clients').update({ logo_url: publicUrl }).eq('id', id!)
  if (dbError) {
    console.error('DB update error:', dbError)
    return fail(dbError.message, 500)
  }

  if (wantsJson) {
    return new Response(JSON.stringify({ ok: true, url: publicUrl }), {
      status: 200, headers: { 'Content-Type': 'application/json' }
    })
  }
  return redirect(`/admin/clientes/${id}?saved=1`)
}
