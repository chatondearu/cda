import { eq } from 'drizzle-orm'

import { createDb } from '../client'
import { clans, profiles, tests } from '../schema'

async function runSeed() {
  const db = createDb()

  await db.insert(clans).values({
    id: 'seed-clan',
    name: 'seed-clan',
    displayName: 'Seed Clan',
    displayNameFr: 'Clan Seed',
    totalMembers: 1,
    totalPoints: '0',
    rawData: { seed: true },
  }).onConflictDoNothing()

  await db.insert(profiles).values({
    id: 'seed-profile',
    username: 'seed_user',
    displayName: 'Seed User',
    clanId: 'seed-clan',
    isSubscribed: false,
    isSubGift: false,
    rawData: { seed: true },
  }).onConflictDoNothing()

  await db.insert(tests).values({
    id: 'seed-test',
    name: 'Seed Test',
    rawData: { seed: true },
  }).onConflictDoNothing()

  const seededProfile = await db.select({ id: profiles.id }).from(profiles).where(eq(profiles.id, 'seed-profile'))
  console.info(`Seed completed. Profiles found: ${seededProfile.length}`)
}

runSeed().catch((error: unknown) => {
  console.error('Seed failed.', error)
  process.exitCode = 1
})
