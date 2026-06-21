import { createDb } from '@chatondearu/db'

// Shared singleton Postgres pool for the whole server runtime (auth + API).
export const db = createDb()
