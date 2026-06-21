import process from 'node:process'

import { runMigrations } from '@chatondearu/db'

/**
 * Apply pending database migrations once at server startup.
 *
 * Disabled by default; enable in production by setting `DB_MIGRATE_ON_STARTUP=true`.
 * A failed migration aborts startup so a broken deploy never serves traffic.
 */
export default defineNitroPlugin(async () => {
  if (process.env.DB_MIGRATE_ON_STARTUP !== 'true')
    return

  const migrationsFolder = process.env.DB_MIGRATIONS_FOLDER ?? './drizzle'

  try {
    await runMigrations({ migrationsFolder })
  }
  catch (error) {
    console.error('[db] Startup migration failed.', error)
    throw error
  }
})
