import type { APIRoute } from 'astro'
import { clearAdminCookie } from '../../../lib/auth'

export const POST: APIRoute = () => {
  return new Response(null, {
    status: 302,
    headers: {
      Location: '/admin/login',
      'Set-Cookie': clearAdminCookie(),
    },
  })
}
