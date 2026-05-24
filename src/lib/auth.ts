function parseCookies(cookieHeader: string): Record<string, string> {
  return Object.fromEntries(
    cookieHeader.split(';').map(c => {
      const [key, ...vals] = c.trim().split('=')
      return [key.trim(), vals.join('=')]
    })
  )
}

export function isAdminAuthenticated(request: Request): boolean {
  const cookieHeader = request.headers.get('cookie') || ''
  const cookies = parseCookies(cookieHeader)
  const secret = import.meta.env.ADMIN_SECRET as string
  return !!secret && cookies['tl_admin'] === secret
}

export function setAdminCookie(secret: string): string {
  return `tl_admin=${secret}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`
}

export function clearAdminCookie(): string {
  return `tl_admin=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`
}
