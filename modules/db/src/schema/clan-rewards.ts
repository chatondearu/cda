import { boolean, index, integer, numeric, pgTable, text } from 'drizzle-orm/pg-core'

import { rawDataColumn } from './core'

export const clanRewards = pgTable('clan_rewards', {
  id: text('id').primaryKey(),
  type: text('type'),
  name: text('name'),
  rewardId: text('reward_id'),
  status: text('status'),
  tier: integer('tier'),
  value: numeric('value', { precision: 14, scale: 4 }),
  visible: boolean('visible'),
  rawData: rawDataColumn,
}, table => ({
  typeIdx: index('clan_rewards_type_idx').on(table.type),
}))
