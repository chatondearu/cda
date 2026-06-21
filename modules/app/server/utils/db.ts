import type { Database } from '@chatondearu/db'
import { createDb } from '@chatondearu/db'

let instance: Database | undefined

/**
 * Lazily create and reuse a single Postgres pool for the server runtime.
 * Lazy init avoids opening a connection at build/prerender time.
 */
export function useDb(): Database {
  instance ??= createDb()
  return instance
}
