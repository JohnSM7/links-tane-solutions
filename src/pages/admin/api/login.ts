import type { APIRoute } from 'astro'
import { setAdminCookie } from '../../../lib/auth'

export const POST: APIRoute = async ({ request, redirect }) => {
  const form = await request.formData()
  const password = form.get('password')?.toString() ?? ''

  const adminPassword = import.meta.env.ADMIN_PASSWORD as string
  const adminSecret = import.meta.env.ADMIN_SECRET as string

  if (!adminPassword || !adminSecret || password !== adminPassword) {
    return redirect('/admin/login?error=1')
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: '/admin/dashboard',
      'Set-Cookie': setAdminCookie(adminSecret),
    },
  })
}
