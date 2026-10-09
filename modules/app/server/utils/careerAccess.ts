import type { H3Event } from 'h3'
import { Buffer } from 'node:buffer'
import { createHmac, timingSafeEqual } from 'node:crypto'
import process from 'node:process'

import { useServerAuth } from './auth'

export const CAREER_GRANT_COOKIE = 'cda_cv_grant'

export type CareerGrantVia = 'token' | 'allowlist' | null

export interface CareerGrantStatus {
  granted: boolean
  via: CareerGrantVia
}

function parseCsvList(raw: unknown): string[] {
  return String(raw ?? '')
    .split(',')
    .map(part => part.trim())
    .filter(Boolean)
}

function resolveGrantSecret(config: ReturnType<typeof useRuntimeConfig>): string {
  const dedicated = String(config.careerAccessSecret ?? '').trim()
  if (dedicated)
    return dedicated
  const authSecret = process.env.BETTER_AUTH_SECRET?.trim()
  if (authSecret)
    return authSecret
  return 'cda-career-grant-dev'
}

export function expectedCareerGrantMac(config: ReturnType<typeof useRuntimeConfig>): string {
  return createHmac('sha256', resolveGrantSecret(config))
    .update('cda-cv-grant-v1')
    .digest('hex')
}

function safeEqualString(left: string, right: string): boolean {
  const a = Buffer.from(left)
  const b = Buffer.from(right)
  if (a.length !== b.length)
    return false
  return timingSafeEqual(a, b)
}

export function isCareerTokenValid(
  token: string,
  config: ReturnType<typeof useRuntimeConfig>,
): boolean {
  const candidate = token.trim()
  if (!candidate)
    return false
  const tokens = parseCsvList(config.careerAccessTokens)
  return tokens.some(entry => safeEqualString(candidate, entry))
}

async function resolveAllowlistedUser(
  event: H3Event,
  config: ReturnType<typeof useRuntimeConfig>,
): Promise<boolean> {
  const allowlist = parseCsvList(config.careerAllowlist).map(value => value.toLowerCase())
  if (allowlist.length === 0)
    return false

  try {
    const auth = useServerAuth()
    const session = await auth.api.getSession({ headers: event.headers })
    const user = session?.user
    if (!user)
      return false

    const email = String(user.email ?? '').trim().toLowerCase()
    const id = String(user.id ?? '').trim().toLowerCase()
    return Boolean(
      (email && allowlist.includes(email))
      || (id && allowlist.includes(id)),
    )
  }
  catch {
    // Auth may be unavailable (missing secrets) — treat as not allowlisted.
    return false
  }
}

/**
 * CV grant is independent from community Twitch/Discord login.
 * A session alone never unlocks the career surface.
 */
export async function resolveCareerGrant(event: H3Event): Promise<CareerGrantStatus> {
  const config = useRuntimeConfig(event)
  const cookie = getCookie(event, CAREER_GRANT_COOKIE)
  if (cookie && safeEqualString(cookie, expectedCareerGrantMac(config)))
    return { granted: true, via: 'token' }

  if (await resolveAllowlistedUser(event, config))
    return { granted: true, via: 'allowlist' }

  return { granted: false, via: null }
}

export function issueCareerGrantCookie(event: H3Event): void {
  const config = useRuntimeConfig(event)
  const isProduction = process.env.NODE_ENV === 'production'
  setCookie(event, CAREER_GRANT_COOKIE, expectedCareerGrantMac(config), {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })
}

export function readCareerContact(config: ReturnType<typeof useRuntimeConfig>): {
  fullName: string
  email: string
  phone: string
  location: string
} {
  return {
    fullName: String(config.careerFullName ?? '').trim(),
    email: String(config.careerEmail ?? '').trim(),
    phone: String(config.careerPhone ?? '').trim(),
    location: String(config.careerLocation ?? '').trim(),
  }
}
