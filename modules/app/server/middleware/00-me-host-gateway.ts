/**
 * CV / "me" dedicated host: avoid i18n loop (/ <-> /en) and keep a single entry at /.
 * - Sets cda_locale=fr so @nuxtjs/i18n does not send users to /en on the root.
 * - Strips /en, /zh, /ja prefix with 301 to / (same host).
 *
 * public.meHost must match the Host header (e.g. rlienard.fr) — set NUXT_PUBLIC_ME_HOST in prod.
 */
const PREFIXED_LOCALES = ['/en', '/zh', '/ja'] as const

function pathHasLocalePrefix(pathname: string): boolean {
  return PREFIXED_LOCALES.some(
    prefix => pathname === prefix || pathname.startsWith(`${prefix}/`),
  )
}

export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
  const meHost = String(config.public.meHost ?? '').trim().toLowerCase()
  if (!meHost)
    return

  const url = getRequestURL(event)
  const host = url.hostname.toLowerCase()
  if (host !== meHost)
    return

  // Match i18n detectBrowserLanguage.cookieKey in nuxt.config
  setCookie(event, 'cda_locale', 'fr', {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })

  const pathname = url.pathname || '/'
  if (!pathHasLocalePrefix(pathname))
    return

  const search = url.search || ''
  return sendRedirect(event, `${url.origin}/${search}`, 301)
})
