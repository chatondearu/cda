import { boolean, index, integer, numeric, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

import { clans } from './clans'
import { clanRewards } from './clan-rewards'
import { rawDataColumn } from './core'
import { profiles } from './profiles'

export const clanEvents = pgTable('clan_events', {
  id: text('id').primaryKey(),
  clanId: text('clan_id').references(() => clans.id, { onDelete: 'set null' }),
  authorId: text('author_id').references(() => profiles.id, { onDelete: 'set null' }),
  authorDisplayName: text('author_display_name'),
  authDisplayName: text('auth_display_name'),
  type: text('type'),
  message: text('message'),
  description: text('description'),
  clanRewardId: text('clan_reward_id').references(() => clanRewards.id, { onDelete: 'set null' }),
  value: numeric('value', { precision: 14, scale: 4 }),
  bitsAmount: integer('bits_amount'),
  bitsAmoutLegacy: integer('bits_amout_legacy'),
  coinsAmount: integer('coins_amount'),
  subsAmount: integer('subs_amount'),
  isRenew: boolean('is_renew'),
  redeemedAt: timestamp('redeemed_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }),
  rawData: rawDataColumn,
}, table => ({
  clanIdIdx: index('clan_events_clan_id_idx').on(table.clanId),
  authorIdIdx: index('clan_events_author_id_idx').on(table.authorId),
  typeIdx: index('clan_events_type_idx').on(table.type),
  createdAtIdx: index('clan_events_created_at_idx').on(table.createdAt),
}))
