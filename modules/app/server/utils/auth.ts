import process from 'node:process'

import { authAccounts, authSessions, authUsers, authVerifications, ensureProfileForAuthUser } from '@chatondearu/db'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'

import { useDb } from './db'

function createServerAuth() {
  const betterAuthSecret = process.env.BETTER_AUTH_SECRET
  if (!betterAuthSecret)
    throw new Error('BETTER_AUTH_SECRET is required to initialize Better Auth.')

  const db = useDb()

  return betterAuth({
    secret: betterAuthSecret,
    baseURL: process.env.BETTER_AUTH_URL,
    basePath: '/api/auth',
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
    emailAndPassword: {
      enabled: true,
      minPasswordLength: 8,
      maxPasswordLength: 128,
      autoSignIn: true,
    },
    socialProviders: {
      discord: {
        clientId: process.env.DISCORD_CLIENT_ID as string,
        clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
      },
      twitch: {
        clientId: process.env.TWITCH_CLIENT_ID as string,
        clientSecret: process.env.TWITCH_CLIENT_SECRET as string,
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
