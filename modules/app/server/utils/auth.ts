import process from 'node:process'

import { authAccounts, authSessions, authUsers, authVerifications, ensureProfileForAuthUser } from '@chatondearu/db'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'

import { useDb } from './db'

const isProduction = process.env.NODE_ENV === 'production'

/**
 * Build the trustedOrigins allowlist for CSRF / origin checks.
 * Always includes BETTER_AUTH_URL; optional comma-separated BETTER_AUTH_TRUSTED_ORIGINS;
 * NUXT_PUBLIC_SITE_URL is added when it differs from the auth base.
 */
function resolveTrustedOrigins(): string[] {
  const origins = new Set<string>()

  const authUrl = process.env.BETTER_AUTH_URL?.trim()
  if (authUrl) {
    try {
      origins.add(new URL(authUrl).origin)
    }
    catch {
      // Ignore malformed BETTER_AUTH_URL; Better Auth will fail later if required.
    }
  }

  const siteUrl = process.env.NUXT_PUBLIC_SITE_URL?.trim()
  if (siteUrl) {
    try {
      origins.add(new URL(siteUrl).origin)
    }
    catch {
      // Ignore malformed site URL.
    }
  }

  const extra = process.env.BETTER_AUTH_TRUSTED_ORIGINS?.split(',') ?? []
  for (const raw of extra) {
    const value = raw.trim()
    if (!value)
      continue
    try {
      origins.add(new URL(value).origin)
    }
    catch {
      // Skip non-URL entries.
    }
  }

  // Local dev convenience when BETTER_AUTH_URL is unset or points elsewhere.
  if (!isProduction)
    origins.add('http://localhost:3000')

  return [...origins]
}

function createServerAuth() {
  const betterAuthSecret = process.env.BETTER_AUTH_SECRET
  if (!betterAuthSecret)
    throw new Error('BETTER_AUTH_SECRET is required to initialize Better Auth.')

  const db = useDb()

  return betterAuth({
    secret: betterAuthSecret,
    baseURL: process.env.BETTER_AUTH_URL,
    basePath: '/api/auth',
    trustedOrigins: resolveTrustedOrigins(),
    database: drizzleAdapter(db, {
      provider: 'pg',
      // Map Better Auth models to our prefixed Drizzle table exports.
      schema: {
        user: authUsers,
        session: authSessions,
        account: authAccounts,
        verification: authVerifications,
      },
    }),
    // Email/password remains for existing accounts; open signup is disabled
    // so the community gateway is Twitch-first, not an open spam surface.
    emailAndPassword: {
      enabled: true,
      disableSignUp: true,
      minPasswordLength: 8,
      maxPasswordLength: 128,
      autoSignIn: true,
    },
    socialProviders: {
      // Optional secondary identity for community members.
      discord: {
        clientId: process.env.DISCORD_CLIENT_ID as string,
        clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
      },
      // Primary community identity (streamer gateway).
      twitch: {
        clientId: process.env.TWITCH_CLIENT_ID as string,
        clientSecret: process.env.TWITCH_CLIENT_SECRET as string,
      },
    },
    // Built-in Better Auth rate limiting (on by default in production).
    rateLimit: {
      enabled: true,
      window: 60,
      max: 100,
      customRules: {
        '/sign-in/email': {
          window: 60,
          max: 5,
        },
        '/sign-up/email': {
          window: 60,
          max: 3,
        },
        '/sign-in/social': {
          window: 60,
          max: 20,
        },
      },
    },
    advanced: {
      useSecureCookies: isProduction,
      defaultCookieAttributes: {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'lax',
        path: '/',
      },
    },
    databaseHooks: {
      user: {
        create: {
          after: async (user) => {
            // Provision the linked business profile; never block signup on failure.
            try {
              await ensureProfileForAuthUser(db, user)
            }
            catch (error) {
              console.error('[auth] Failed to provision profile for user', user.id, error)
            }
          },
        },
      },
    },
  })
}

let instance: ReturnType<typeof createServerAuth> | undefined

/**
 * Lazily build the Better Auth instance on first use.
 * Lazy init keeps secrets/DB out of build & prerender, only required at runtime.
 */
export function useServerAuth() {
  instance ??= createServerAuth()
  return instance
}
