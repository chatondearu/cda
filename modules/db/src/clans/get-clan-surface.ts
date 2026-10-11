import { eq } from 'drizzle-orm'

import type { Database } from '../client'
import { clans, profiles } from '../schema'
import type { ClanMembershipStatus, ClanSurfaceItem } from './list-clans-surface'

export interface ClanDetailSurface {
  clan: ClanSurfaceItem
  membership: ClanMembershipStatus & { isThisClan: boolean }
}

/**
 * Read-only single-clan payload with membership relative to the auth user.
 */
export async function getClanSurfaceForAuthUser(
  db: Database,
  authUserId: string,
  clanId: string,
): Promise<ClanDetailSurface | null> {
  const clanRows = await db
    .select({
      id: clans.id,
      name: clans.name,
      displayName: clans.displayName,
      displayNameFr: clans.displayNameFr,
      description: clans.description,
      totalMembers: clans.totalMembers,
      totalPoints: clans.totalPoints,
      color: clans.color,
      imagePath: clans.imagePath,
    })
    .from(clans)
    .where(eq(clans.id, clanId))
    .limit(1)

  const clan = clanRows[0]
  if (!clan)
    return null

  const profileRows = await db
    .select({
      clanId: profiles.clanId,
      isBoughtClanAccess: profiles.isBoughtClanAccess,
    })
    .from(profiles)
    .where(eq(profiles.authUserId, authUserId))
    .limit(1)

  const profile = profileRows[0]
  const memberClanId = profile?.clanId ?? null

  return {
    clan,
    membership: {
      clanId: memberClanId,
      isMember: Boolean(memberClanId),
      isBoughtClanAccess: profile?.isBoughtClanAccess ?? null,
      isThisClan: memberClanId === clan.id,
    },
  }
}
