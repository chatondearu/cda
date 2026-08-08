import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'

const UI_COMPONENTS_DIR = join(process.cwd(), 'app/components/ui')

const forbiddenPatterns = [
  {
    name: 'hex color',
    regex: /#[\da-fA-F]{3,8}\b/g,
  },
  {
    name: 'black/white utility',
    regex: /\b(?:bg|text|border|from|to|ring|fill|stroke)-(?:black|white)\b/g,
  },
  {
    name: 'raw rgb/rgba function',
    regex: /\brgba?\(\s*(?!var\(--)[^)]+\)/g,
  },
]

async function getVueFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = await Promise.all(entries.map(async (entry) => {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory())
      return getVueFiles(fullPath)

    if (entry.isFile() && entry.name.endsWith('.vue'))
      return [fullPath]

    return []
  }))

  return files.flat()
}

function getTemplateContent(source) {
  const templateMatch = source.match(/<template>([\s\S]*?)<\/template>/)
  return templateMatch?.[1] ?? ''
}

function findViolations(source) {
  const templateContent = getTemplateContent(source)
  if (!templateContent)
    return []

  const lines = templateContent.split('\n')
  const violations = []

  for (const [index, line] of lines.entries()) {
    for (const pattern of forbiddenPatterns) {
      pattern.regex.lastIndex = 0
      if (!pattern.regex.test(line))
        continue

      violations.push({
        line: index + 1,
        rule: pattern.name,
        content: line.trim(),
      })
    }
  }

  return violations
}

async function main() {
  const files = await getVueFiles(UI_COMPONENTS_DIR)
  const errors = []

  for (const filePath of files) {
    const source = await readFile(filePath, 'utf8')
    const violations = findViolations(source)

    if (!violations.length)
      continue

    errors.push({ filePath, violations })
  }

  if (!errors.length) {
    console.log('Color guard: no hardcoded colors found in UI components.')
    process.exit(0)
  }

  console.error('Color guard failed. Replace hardcoded colors with semantic Uno tokens.')
  for (const error of errors) {
    console.error(`\n- ${error.filePath}`)
    for (const violation of error.violations)
      console.error(`  [line ${violation.line}] ${violation.rule}: ${violation.content}`)
  }

  process.exit(1)
}

main().catch((error) => {
  console.error('Color guard crashed:', error)
  process.exit(1)
})
