import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

import * as schema from './schema'

export function createPool(connectionString = process.env.DATABASE_URL): Pool {
  if (!connectionString) {
    throw new Error('DATABASE_URL is required to create a Postgres pool.')
  }

  return new Pool({ connectionString })
}

export function createDb(connectionString = process.env.DATABASE_URL) {
  const pool = createPool(connectionString)
  return drizzle(pool, { schema })
}
