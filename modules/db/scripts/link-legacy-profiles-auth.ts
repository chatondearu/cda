import { and, eq, isNull, isNotNull } from 'drizzle-orm'

import { createDb } from '../src/client'
import { authAccounts, authUsers, profiles } from '../src/schema'

type LinkReason = 'email' | 'discord' | 'twitch'

type LinkResult = {
  profileId: string
  authUserId: string
  reason: LinkReason
}

type UnlinkedProfile = {
  profileId: string
  email: string | null
  discordId: string | null
}

function getFlag(flag: string): string | undefined {
  const index = process.argv.findIndex(arg => arg === flag)
  if (index === -1)
    return undefined

  return process.argv[index + 1]
}

async function main() {
  const apply = getFlag('--apply') === 'true'
  const db = createDb()

  const sourceProfiles = await db
    .select({
      id: profiles.id,
      authUserId: profiles.authUserId,
      email: profiles.email,
      discordId: profiles.discordId,
    })
    .from(profiles)
    .where(and(isNull(profiles.authUserId), isNotNull(profiles.id)))

  const linked: LinkResult[] = []
  const unlinked: UnlinkedProfile[] = []

  for (const profile of sourceProfiles) {
    let userId: string | null = null
    let reason: LinkReason | null = null

    if (profile.email) {
      const byEmail = await db.select({ id: authUsers.id })
        .from(authUsers)
        .where(eq(authUsers.email, profile.email))
        .limit(1)
      if (byEmail[0]?.id) {
        userId = byEmail[0].id
        reason = 'email'
      }
    }

    if (!userId && profile.discordId) {
      const byDiscord = await db.select({ userId: authAccounts.userId })
        .from(authAccounts)
        .where(and(eq(authAccounts.providerId, 'discord'), eq(authAccounts.accountId, profile.discordId)))
        .limit(1)
      if (byDiscord[0]?.userId) {
        userId = byDiscord[0].userId
        reason = 'discord'
      }
    }

    if (!userId) {
      const byTwitch = await db.select({ userId: authAccounts.userId })
        .from(authAccounts)
        .where(and(eq(authAccounts.providerId, 'twitch'), eq(authAccounts.accountId, profile.id)))
        .limit(1)
      if (byTwitch[0]?.userId) {
        userId = byTwitch[0].userId
        reason = 'twitch'
      }
    }

    if (!userId || !reason) {
      unlinked.push({
        profileId: profile.id,
        email: profile.email,
        discordId: profile.discordId,
      })
      continue
    }

    linked.push({
      profileId: profile.id,
      authUserId: userId,
      reason,
    })

    if (apply) {
      await db.update(profiles)
        .set({ authUserId: userId })
        .where(eq(profiles.id, profile.id))
    }
  }

  console.info(JSON.stringify({
    mode: apply ? 'apply' : 'dry-run',
    checkedProfiles: sourceProfiles.length,
    linkedProfiles: linked.length,
    unlinkedProfiles: unlinked.length,
    linked,
    unlinked,
  }, null, 2))
}

main().catch((error: unknown) => {
  console.error('Failed to link legacy profiles with auth users.', error)
  process.exitCode = 1
})
