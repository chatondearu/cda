import { eq } from 'drizzle-orm'

import type { Database } from '../client'
import { profiles } from '../schema'

/** Minimal shape of an auth user needed to provision a profile. */
export interface AuthUserLike {
  id: string
  email?: string | null
  name?: string | null
  image?: string | null
}

/**
 * Ensure a business `profiles` row exists for a freshly created auth user.
 *
 * Resolution order:
 * 1. Already linked → no-op (idempotent on retries).
 * 2. Legacy profile matched by email and not yet linked → link it.
 * 3. Otherwise create a new profile tied to the auth user.
 */
export async function ensureProfileForAuthUser(db: Database, user: AuthUserLike): Promise<void> {
  const alreadyLinked = await db
    .select({ id: profiles.id })
    .from(profiles)
    .where(eq(profiles.authUserId, user.id))
    .limit(1)

  if (alreadyLinked[0])
    return

  if (user.email) {
    const byEmail = await db
      .select({ id: profiles.id, authUserId: profiles.authUserId })
      .from(profiles)
      .where(eq(profiles.email, user.email))
      .limit(1)

    const candidate = byEmail[0]
    if (candidate && !candidate.authUserId) {
      await db
        .update(profiles)
        .set({ authUserId: user.id })
        .where(eq(profiles.id, candidate.id))
      return
    }
  }

  await db
    .insert(profiles)
    .values({
      id: user.id,
      authUserId: user.id,
      email: user.email ?? null,
      displayName: user.name ?? null,
      photoUrl: user.image ?? null,
    })
    .onConflictDoNothing()
}
