import { index } from 'drizzle-orm/pg-core'
import { integer, numeric, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

import { rawDataColumn } from './core'

export const clans = pgTable('clans', {
  id: text('id').primaryKey(),
  name: text('name'),
  displayName: text('display_name'),
  displayNameFr: text('display_name_fr'),
  color: text('color'),
  imagePath: text('image_path'),
  description: text('description'),
  chieftainProfileId: text('chieftain_profile_id'),
  totalMembers: integer('total_members'),
  totalPoints: numeric('total_points', { precision: 14, scale: 4 }),
  createdAt: timestamp('created_at', { withTimezone: true }),
  rawData: rawDataColumn,
}, table => ({
  nameIdx: index('clans_name_idx').on(table.name),
  chieftainProfileIdIdx: index('clans_chieftain_profile_id_idx').on(table.chieftainProfileId),
}))
