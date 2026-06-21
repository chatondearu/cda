import process from 'node:process'

import { ensureProfileForAuthUser } from '@chatondearu/db'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'

import { db } from './db'

const betterAuthSecret = process.env.BETTER_AUTH_SECRET

if (!betterAuthSecret) {
  throw new Error('BETTER_AUTH_SECRET is required to initialize Better Auth.')
}

export const auth = betterAuth({
  secret: betterAuthSecret,
  baseURL: process.env.BETTER_AUTH_URL,
  basePath: '/api/auth',
  database: drizzleAdapter(db, { provider: 'pg' }),
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
