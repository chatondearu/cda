import process from 'node:process'

import { drizzle } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { Pool } from 'pg'

export interface RunMigrationsOptions {
  /** Postgres connection string. Defaults to `DATABASE_URL`. */
  connectionString?: string
  /** Folder containing the generated Drizzle SQL migrations and `meta/`. */
  migrationsFolder: string
}

/**
 * Apply pending Drizzle migrations using a short-lived connection pool.
 *
 * Relies only on runtime dependencies (`drizzle-orm`, `pg`), so it can run in a
 * slim production image without `drizzle-kit`.
 */
export async function runMigrations(options: RunMigrationsOptions): Promise<void> {
  const connectionString = options.connectionString ?? process.env.DATABASE_URL
  if (!connectionString)
    throw new Error('DATABASE_URL is required to run migrations.')

  const pool = new Pool({ connectionString })
  try {
    const db = drizzle(pool)
    await migrate(db, { migrationsFolder: options.migrationsFolder })
  }
  finally {
    await pool.end()
  }
}
