import { defineMiddleware } from 'astro:middleware'
import { isAdminAuthenticated } from './lib/auth'

const PUBLIC_ADMIN_PATHS = ['/admin/login', '/admin/api/login']

export const onRequest = defineMiddleware(({ url, request, redirect }, next) => {
  const path = url.pathname

  if (path.startsWith('/admin') && !PUBLIC_ADMIN_PATHS.includes(path)) {
    if (!isAdminAuthenticated(request)) {
      return redirect('/admin/login')
    }
  }

  return next()
})
