import { boolean, index, integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

import { clans } from './clans'
import { rawDataColumn } from './core'

export const profiles = pgTable('profiles', {
  id: text('id').primaryKey(),
  username: text('username'),
  displayName: text('display_name'),
  email: text('email'),
  photoUrl: text('photo_url'),
  description: text('description'),
  clanId: text('clan_id').references(() => clans.id, { onDelete: 'set null' }),
  broadcasterType: text('broadcaster_type'),
  twitchCreatedAt: timestamp('twitch_created_at', { withTimezone: true }),
  isFollow: boolean('is_follow'),
  followedAt: timestamp('followed_at', { withTimezone: true }),
  isBoughtClanAccess: boolean('is_bought_clan_access'),
  discordId: text('discord_id'),
  discordUsername: text('discord_username'),
  discordNickname: text('discord_nickname'),
  discordTag: text('discord_tag'),
  discordLinkedAt: timestamp('discord_linked_at', { withTimezone: true }),
  type: text('type'),
  isSubscribed: boolean('is_subscribed'),
  isSubGift: boolean('is_sub_gift'),
  subTier: integer('sub_tier'),
  subDurationMonths: integer('sub_duration_months'),
  subStreakMonths: integer('sub_streak_months'),
  subCumulativeMonths: integer('sub_cumulative_months'),
  subscribedAt: timestamp('subscribed_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }),
  updatedAt: timestamp('updated_at', { withTimezone: true }),
  rawData: rawDataColumn,
}, table => ({
  usernameIdx: index('profiles_username_idx').on(table.username),
  clanIdIdx: index('profiles_clan_id_idx').on(table.clanId),
}))
