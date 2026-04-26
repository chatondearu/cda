import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

type FirestoreTimestamp = { __type: 'timestamp', iso: string }
type FirestoreReference = { __type: 'documentReference', path: string }
type FirestorePrimitive = null | boolean | number | string | FirestoreTimestamp | FirestoreReference
type FirestoreObject = { [key: string]: FirestoreValue }
type FirestoreValue = FirestorePrimitive | FirestoreObject | FirestoreValue[]

type FirestoreDocument = {
  id: string
  path: string
  data: Record<string, FirestoreValue>
}

type ExportManifest = {
  outputDir: string
  collections: Array<{
    relativePath: string
    file: string
    documentCount: number
  }>
}

const defaultInputDir = path.resolve(process.cwd(), '../../tmp/firestore-dump')
const defaultOutputPath = path.resolve(process.cwd(), './generated/firestore-import.sql')

function getArg(flag: string): string | undefined {
  const index = process.argv.findIndex(value => value === flag)
  if (index === -1)
    return undefined
  return process.argv[index + 1]
}

function normalizeFirestoreValue(value: FirestoreValue | undefined): unknown {
  if (value === null || value === undefined)
    return null
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean')
    return value
  if (Array.isArray(value))
    return value.map(normalizeFirestoreValue)
  if (typeof value === 'object' && '__type' in value) {
    if (value.__type === 'timestamp')
      return value.iso
    if (value.__type === 'documentReference')
      return value.path
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, nestedValue]) => [key, normalizeFirestoreValue(nestedValue)]),
  )
}

function toSqlLiteral(value: unknown): string {
  if (value === null || value === undefined)
    return 'NULL'
  if (typeof value === 'boolean')
    return value ? 'TRUE' : 'FALSE'
  if (typeof value === 'number')
    return Number.isFinite(value) ? String(value) : 'NULL'
  if (typeof value === 'string')
    return `'${value.replaceAll('\'', '\'\'')}'`

  return `'${JSON.stringify(value).replaceAll('\'', '\'\'')}'::jsonb`
}

function buildUpsert(table: string, row: Record<string, unknown>): string {
  const entries = Object.entries(row)
  const columns = entries.map(([key]) => `"${key}"`).join(', ')
  const values = entries.map(([, value]) => toSqlLiteral(value)).join(', ')
  const updates = entries
    .filter(([key]) => key !== 'id')
    .map(([key]) => `"${key}" = EXCLUDED."${key}"`)
    .join(', ')

  return `INSERT INTO "${table}" (${columns}) VALUES (${values}) ON CONFLICT ("id") DO UPDATE SET ${updates};`
}

function parseTimestamp(value: FirestoreValue | undefined): string | null {
  const normalized = normalizeFirestoreValue(value)
  return typeof normalized === 'string' ? normalized : null
}

function parseIntValue(value: FirestoreValue | undefined): number | null {
  const normalized = normalizeFirestoreValue(value)
  if (typeof normalized === 'number')
    return Number.isFinite(normalized) ? Math.trunc(normalized) : null
  return null
}

function parseFloatValue(value: FirestoreValue | undefined): number | null {
  const normalized = normalizeFirestoreValue(value)
  if (typeof normalized === 'number')
    return Number.isFinite(normalized) ? normalized : null
  return null
}

function parseBooleanValue(value: FirestoreValue | undefined): boolean | null {
  const normalized = normalizeFirestoreValue(value)
  if (typeof normalized === 'boolean')
    return normalized
  return null
}

function parseStringValue(value: FirestoreValue | undefined): string | null {
  const normalized = normalizeFirestoreValue(value)
  if (typeof normalized === 'string')
    return normalized
  return null
}

function parseJsonValue(value: FirestoreValue | undefined): unknown {
  const normalized = normalizeFirestoreValue(value)
  if (normalized === null || normalized === undefined)
    return {}
  if (typeof normalized === 'object')
    return normalized
  return { value: normalized }
}

function extractChieftainProfileId(value: FirestoreValue | undefined): string | null {
  const normalized = normalizeFirestoreValue(value)
  if (!normalized || typeof normalized !== 'object')
    return null
  if ('uid' in normalized && typeof normalized.uid === 'string')
    return normalized.uid
  if ('ref' in normalized && typeof normalized.ref === 'string')
    return normalized.ref.split('/').at(-1) ?? null
  return null
}

function mapDocument(collection: string, document: FirestoreDocument): { table: string, row: Record<string, unknown> } {
  const data = document.data
  const rawData = normalizeFirestoreValue(data)

  switch (collection) {
    case 'clans':
      return {
        table: 'clans',
        row: {
          id: document.id,
          name: parseStringValue(data.name),
          display_name: parseStringValue(data.displayName),
          display_name_fr: parseStringValue(data.displayNameFR),
          color: parseStringValue(data.color),
          image_path: parseStringValue(data.imagePath),
          description: parseStringValue(data.description),
          chieftain_profile_id: extractChieftainProfileId(data.chieftain),
          total_members: parseIntValue(data.totalMembers),
          total_points: parseFloatValue(data.totalPoints),
          created_at: parseTimestamp(data.createdAt),
          raw_data: rawData,
        },
      }

    case 'profiles':
      return {
        table: 'profiles',
        row: {
          id: document.id,
          username: parseStringValue(data.username),
          display_name: parseStringValue(data.displayName),
          email: parseStringValue(data.email),
          photo_url: parseStringValue(data.photoUrl),
          description: parseStringValue(data.description),
          clan_id: parseStringValue(data.clanId),
          broadcaster_type: parseStringValue(data.broadcasterType),
          twitch_created_at: parseTimestamp(data.twitchCreatedAt),
          is_follow: parseBooleanValue(data.isFollow),
          followed_at: parseTimestamp(data.followedAt),
          is_bought_clan_access: parseBooleanValue(data.isBoughtClanAccess),
          discord_id: parseStringValue(data.discordId),
          discord_username: parseStringValue(data.discordUsername),
          discord_nickname: parseStringValue(data.discordNickname),
          discord_tag: parseStringValue(data.discordTag),
          discord_linked_at: parseTimestamp(data.discordLinkedAt),
          type: parseStringValue(data.type),
          is_subscribed: parseBooleanValue(data.isSubscribed),
          is_sub_gift: parseBooleanValue(data.isSubGift),
          sub_tier: parseIntValue(data.subTier),
          sub_duration_months: parseIntValue(data.subDurationMonths),
          sub_streak_months: parseIntValue(data.subStreakMonths),
          sub_cumulative_months: parseIntValue(data.subCumulativeMonths),
          subscribed_at: parseTimestamp(data.subscribedAt),
          created_at: parseTimestamp(data.createdAt),
          updated_at: parseTimestamp(data.updatedAt),
          raw_data: rawData,
        },
      }

    case 'clansRewards':
      return {
        table: 'clan_rewards',
        row: {
          id: document.id,
          type: parseStringValue(data.type),
          name: parseStringValue(data.name),
          reward_id: parseStringValue(data.rewardId),
          status: parseStringValue(data.status),
          tier: parseIntValue(data.tier),
          value: parseFloatValue(data.value),
          visible: parseBooleanValue(data.visible),
          raw_data: rawData,
        },
      }

    case 'clansEvents':
      return {
        table: 'clan_events',
        row: {
          id: document.id,
          clan_id: parseStringValue(data.clanId) ?? parseStringValue(data.clanid),
          author_id: parseStringValue(data.authorId),
          author_display_name: parseStringValue(data.authorDisplayName),
          auth_display_name: parseStringValue(data.authDisplayName),
          type: parseStringValue(data.type),
          message: parseStringValue(data.message),
          description: parseStringValue(data.description),
          clan_reward_id: parseStringValue(data.clanRewardId),
          value: parseFloatValue(data.value),
          bits_amount: parseIntValue(data.bitsAmount),
          bits_amout_legacy: parseIntValue(data.bitsAmout),
          coins_amount: parseIntValue(data.coinsAmount),
          subs_amount: parseIntValue(data.subsAmount),
          is_renew: parseBooleanValue(data.isRenew),
          redeemed_at: parseTimestamp(data.redeemedAt),
          created_at: parseTimestamp(data.createdAt),
          raw_data: rawData,
        },
      }

    case 'tests':
      return {
        table: 'tests',
        row: {
          id: document.id,
          name: parseStringValue(data.name),
          created_at: parseTimestamp(data.createdAt),
          raw_data: rawData,
        },
      }

    case 'tests/clans/questions':
      return {
        table: 'test_clan_questions',
        row: {
          id: document.id,
          test_id: 'clans',
          question_index: parseIntValue(data.index),
          text: parseStringValue(data.text),
          answers: parseJsonValue(data.answers),
          created_at: parseTimestamp(data.createdAt),
          raw_data: rawData,
        },
      }

    case 'tests/clans/answers':
      return {
        table: 'test_clan_answers',
        row: {
          id: document.id,
          test_id: 'clans',
          question_index: parseIntValue(data.questionIndex),
          answer_a: parseStringValue(data.a),
          answer_b: parseStringValue(data.b),
          answer_c: parseStringValue(data.c),
          created_at: parseTimestamp(data.createdAt),
          raw_data: rawData,
        },
      }

    case 'tests/clans/responses':
      return {
        table: 'test_clan_responses',
        row: {
          id: document.id,
          test_id: 'clans',
          current_question: parseStringValue(data.currentQuestion),
          is_done: parseBooleanValue(data.isDone),
          result_clan_id: parseStringValue(data.result),
          list: parseJsonValue(data.list),
          totals_members: parseIntValue(data.totalsMembers),
          created_at: parseTimestamp(data.createdAt),
          updated_at: parseTimestamp(data.updatedAt),
          finished_at: parseTimestamp(data.finishedAt),
          raw_data: rawData,
        },
      }

    default:
      throw new Error(`Unsupported collection path: ${collection}`)
  }
}

async function readDocuments(filePath: string): Promise<FirestoreDocument[]> {
  const content = await readFile(filePath, 'utf8')
  if (!content.trim())
    return []

  return content
    .trim()
    .split('\n')
    .filter(Boolean)
    .map((line) => {
      const parsed = JSON.parse(line) as FirestoreDocument
      return parsed
    })
}

async function run() {
  const inputDir = getArg('--input') ?? defaultInputDir
  const outputPath = path.resolve(getArg('--output') ?? defaultOutputPath)

  const manifestPath = path.join(inputDir, 'export-manifest.json')
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8')) as ExportManifest

  const sections: string[] = [
    '-- Generated SQL import from Firestore dump',
    '-- This file is intentionally not versioned.',
    'BEGIN;',
  ]

  const tableOrder = [
    'clans',
    'profiles',
    'clansRewards',
    'clansEvents',
    'tests',
    'tests/clans/questions',
    'tests/clans/answers',
    'tests/clans/responses',
  ]

  for (const collectionPath of tableOrder) {
    const collection = manifest.collections.find(item => item.relativePath === collectionPath)
    if (!collection)
      continue

    const filePath = path.join(inputDir, collection.file)
    const docs = await readDocuments(filePath)
    sections.push(`-- ${collectionPath} (${docs.length} documents)`)

    for (const doc of docs) {
      const mapped = mapDocument(collectionPath, doc)
      sections.push(buildUpsert(mapped.table, mapped.row))
    }
  }

  sections.push('COMMIT;')

  await mkdir(path.dirname(outputPath), { recursive: true })
  await writeFile(outputPath, `${sections.join('\n')}\n`, 'utf8')

  console.info(`Import SQL generated at ${outputPath}`)
}

run().catch((error: unknown) => {
  console.error('Failed to generate import SQL.', error)
  process.exitCode = 1
})
