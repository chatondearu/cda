import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'

const migrationDir = path.resolve(process.cwd(), './drizzle')
const dataMutationPattern = /^\s*(insert|update|delete|copy)\b/i

async function run() {
  const entries = await readdir(migrationDir, { withFileTypes: true })
  const migrationFiles = entries
    .filter(entry => entry.isFile() && entry.name.endsWith('.sql'))
    .map(entry => entry.name)
    .sort()

  for (const migrationFile of migrationFiles) {
    const migrationPath = path.join(migrationDir, migrationFile)
    const content = await readFile(migrationPath, 'utf8')

    const statements = content
      .split('--> statement-breakpoint')
      .map(statement => statement.trim())
      .filter(Boolean)

    for (const statement of statements) {
      if (dataMutationPattern.test(statement)) {
        throw new Error(`Data mutation statement found in migration ${migrationFile}: ${statement.slice(0, 120)}...`)
      }
    }
  }

  console.info(`Migration check passed for ${migrationFiles.length} file(s).`)
}

run().catch((error: unknown) => {
  console.error('Migration structure check failed.', error)
  process.exitCode = 1
})
