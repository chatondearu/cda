import { eq } from 'drizzle-orm'

import type { Database } from '../client'
import { authAccounts, clans, profiles } from '../schema'

export interface CommunityAccountProviders {
  twitch: boolean
  discord: boolean
  credential: boolean
}

export interface CommunityAccountProfile {
  id: string
  username: string | null
  displayName: string | null
  photoUrl: string | null
  discordUsername: string | null
  discordTag: string | null
  discordNickname: string | null
  isFollow: boolean | null
  isSubscribed: boolean | null
  subTier: number | null
  type: string | null
}

export interface CommunityAccountClan {
  id: string
  name: string | null
  displayName: string | null
  displayNameFr: string | null
  totalMembers: number | null
}

export interface CommunityAccountSnapshot {
  providers: CommunityAccountProviders
  profile: CommunityAccountProfile | null
  clan: CommunityAccountClan | null
}

/**
 * Read-only community hub snapshot for an authenticated user.
 * Does not touch CV grant state.
 */
export async function getCommunityAccountForAuthUser(
  db: Database,
  authUserId: string,
): Promise<CommunityAccountSnapshot> {
  const providerRows = await db
    .select({ providerId: authAccounts.providerId })
    .from(authAccounts)
    .where(eq(authAccounts.userId, authUserId))

  const providers: CommunityAccountProviders = {
    twitch: providerRows.some(row => row.providerId === 'twitch'),
    discord: providerRows.some(row => row.providerId === 'discord'),
    credential: providerRows.some(row => row.providerId === 'credential'),
  }

  const profileRows = await db
    .select({
      id: profiles.id,
      username: profiles.username,
      displayName: profiles.displayName,
      photoUrl: profiles.photoUrl,
      discordUsername: profiles.discordUsername,
      discordTag: profiles.discordTag,
      discordNickname: profiles.discordNickname,
      isFollow: profiles.isFollow,
      isSubscribed: profiles.isSubscribed,
      subTier: profiles.subTier,
      type: profiles.type,
      clanId: profiles.clanId,
    })
    .from(profiles)
    .where(eq(profiles.authUserId, authUserId))
    .limit(1)

  const profileRow = profileRows[0] ?? null

  let clan: CommunityAccountClan | null = null
  if (profileRow?.clanId) {
    const clanRows = await db
      .select({
        id: clans.id,
        name: clans.name,
        displayName: clans.displayName,
        displayNameFr: clans.displayNameFr,
        totalMembers: clans.totalMembers,
      })
      .from(clans)
      .where(eq(clans.id, profileRow.clanId))
      .limit(1)
    clan = clanRows[0] ?? null
  }

  return {
    providers,
    profile: profileRow
      ? {
          id: profileRow.id,
          username: profileRow.username,
          displayName: profileRow.displayName,
          photoUrl: profileRow.photoUrl,
          discordUsername: profileRow.discordUsername,
          discordTag: profileRow.discordTag,
          discordNickname: profileRow.discordNickname,
          isFollow: profileRow.isFollow,
          isSubscribed: profileRow.isSubscribed,
          subTier: profileRow.subTier,
          type: profileRow.type,
        }
      : null,
    clan,
  }
}
