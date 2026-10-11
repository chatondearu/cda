import { asc, eq } from 'drizzle-orm'

import type { Database } from '../client'
import { clans, profiles } from '../schema'

export interface ClanSurfaceItem {
  id: string
  name: string | null
  displayName: string | null
  displayNameFr: string | null
  description: string | null
  totalMembers: number | null
  totalPoints: string | null
  color: string | null
  imagePath: string | null
}

export interface ClanMembershipStatus {
  clanId: string | null
  isMember: boolean
  isBoughtClanAccess: boolean | null
}

export interface ClansSurfaceSnapshot {
  clans: ClanSurfaceItem[]
  membership: ClanMembershipStatus
}

/**
 * Read-only clan roster + current-user membership for the community surface.
 * No purchase / join mutations.
 */
export async function listClansSurfaceForAuthUser(
  db: Database,
  authUserId: string,
): Promise<ClansSurfaceSnapshot> {
  const [clanRows, membership] = await Promise.all([
    db
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
      .orderBy(asc(clans.displayName), asc(clans.name), asc(clans.id)),
    resolveMembership(db, authUserId),
  ])

  return {
    clans: clanRows,
    membership,
  }
}

async function resolveMembership(
  db: Database,
  authUserId: string,
): Promise<ClanMembershipStatus> {
  const rows = await db
    .select({
      clanId: profiles.clanId,
      isBoughtClanAccess: profiles.isBoughtClanAccess,
    })
    .from(profiles)
    .where(eq(profiles.authUserId, authUserId))
    .limit(1)

  const row = rows[0]
  if (!row) {
    return {
      clanId: null,
      isMember: false,
      isBoughtClanAccess: null,
    }
  }

  return {
    clanId: row.clanId,
    isMember: Boolean(row.clanId),
    isBoughtClanAccess: row.isBoughtClanAccess,
  }
}
