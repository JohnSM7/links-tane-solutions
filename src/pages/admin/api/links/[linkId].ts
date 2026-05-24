import type { APIRoute } from 'astro'
import { supabase } from '../../../../lib/supabase'

export const POST: APIRoute = async ({ params, request, redirect }) => {
  const { linkId } = params
  const form = await request.formData()
  const redirectUrl = form.get('redirect')?.toString() ?? '/admin/dashboard'

  await supabase.from('links').delete().eq('id', linkId!)

  return redirect(redirectUrl)
}
