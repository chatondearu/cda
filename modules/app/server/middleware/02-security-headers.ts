import process from 'node:process'

/**
 * Baseline HTTP security headers for community + CV hosts.
 *
 * CSP is built at request time so NUXT_PUBLIC_UMAMI_SCRIPT_URL origin is allowlisted
 * without hardcoding a host. OAuth navigations (Twitch/Discord) are top-level redirects
 * and are not blocked by script-src; /api/auth/* stays same-origin.
 *
 * Host notes:
 * - Community (chatondearu.fr) and CV (meHost) share this Nitro app → same header set.
 * - Umami is typically enabled only on the community host via env; empty Umami keys
 *   omit the script origin from CSP.
 * - HSTS is sent only when the request is HTTPS (or X-Forwarded-Proto=https behind Coolify).
 */

function originFromUrl(raw: unknown): string | undefined {
  if (typeof raw !== 'string' || !raw.trim())
    return undefined
  try {
    return new URL(raw.trim()).origin
  }
  catch {
    return undefined
  }
}

export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
  const umamiOrigin = originFromUrl(config.public.umamiScriptUrl)
  const isDev = process.env.NODE_ENV === 'development'

  const scriptSrc = ['\'self\'', '\'unsafe-inline\'']
  if (isDev)
    scriptSrc.push('\'unsafe-eval\'')
  if (umamiOrigin)
    scriptSrc.push(umamiOrigin)

  const connectSrc = ['\'self\'']
  if (umamiOrigin)
    connectSrc.push(umamiOrigin)
  if (isDev)
    connectSrc.push('ws:', 'wss:')

  const csp = [
    `default-src 'self'`,
    `script-src ${scriptSrc.join(' ')}`,
    `style-src 'self' 'unsafe-inline'`,
    `img-src 'self' data: blob: https:`,
    `font-src 'self' data:`,
    `connect-src ${connectSrc.join(' ')}`,
    `frame-ancestors 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
    `object-src 'none'`,
  ].join('; ')

  setHeader(event, 'Content-Security-Policy', csp)
  setHeader(event, 'X-Frame-Options', 'DENY')
  setHeader(event, 'Referrer-Policy', 'strict-origin-when-cross-origin')
  setHeader(event, 'X-Content-Type-Options', 'nosniff')
  setHeader(event, 'Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  setHeader(event, 'X-DNS-Prefetch-Control', 'off')

  // HSTS-ready: only on TLS-terminated requests (Coolify / prod proxy).
  if (getRequestProtocol(event) === 'https') {
    setHeader(event, 'Strict-Transport-Security', 'max-age=15552000; includeSubDomains')
  }
})
