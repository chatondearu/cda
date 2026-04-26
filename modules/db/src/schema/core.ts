import { sql } from 'drizzle-orm'
import { jsonb, numeric, timestamp } from 'drizzle-orm/pg-core'

export const rawDataColumn = jsonb('raw_data').notNull().default(sql`'{}'::jsonb`)

export const numericScore = numeric('score', { precision: 14, scale: 4 })

export const createdAtColumn = timestamp('created_at', { withTimezone: true })
export const updatedAtColumn = timestamp('updated_at', { withTimezone: true })
