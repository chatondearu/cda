/**
 * Permanent redirect: alternate domains (e.g. .com) → canonical siteUrl with English
 * locale when the path does not already start with /en, /zh, or /ja.
 *
 * Configure with NUXT_PUBLIC_REDIRECT_HOSTS_EN (comma-separated hostnames, no scheme).
 */

const PREFIXED_LOCALES = ['/en', '/zh', '/ja'] as const

function pathHasLocalePrefix(pathname: string): boolean {
  return PREFIXED_LOCALES.some(
    prefix => pathname === prefix || pathname.startsWith(`${prefix}/`),
  )
}

export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
  const rawHosts = config.public.redirectHostsEn
  if (!rawHosts || typeof rawHosts !== 'string')
    return

  const aliasHosts = new Set(
    rawHosts.split(',').map(h => h.trim().toLowerCase()).filter(Boolean),
  )
  if (aliasHosts.size === 0)
    return

  const url = getRequestURL(event)
  const host = url.hostname.toLowerCase()

  if (!aliasHosts.has(host))
    return

  const siteUrlRaw = config.public.siteUrl
  if (!siteUrlRaw || typeof siteUrlRaw !== 'string')
    return

  let canonical: URL
  try {
    canonical = new URL(siteUrlRaw)
  }
  catch {
    return
  }

  let pathname = url.pathname || '/'
  const search = url.search || ''

  if (!pathHasLocalePrefix(pathname))
    pathname = pathname === '/' ? '/en' : `/en${pathname}`

  const target = `${canonical.origin}${pathname}${search}`
  return sendRedirect(event, target, 301)
})
