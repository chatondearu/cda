#!/usr/bin/env node
import { execSync } from 'node:child_process'
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const OWNER = process.env.GITHUB_OWNER ?? 'chatondearu'
const ARCHIVE_DIR = join(process.cwd(), 'modules/app/content/archive')

function run(command) {
  return execSync(command, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim()
}

function toSlug(name) {
  return name.toLowerCase().replace(/\s+/g, '-')
}

function toTitle(name) {
  return name.toUpperCase().replaceAll('.', '_')
}

function toTech(language) {
  return (language || 'CONFIG').toUpperCase()
}

function toStatus(archived) {
  return archived ? 'unfinished' : 'nominal'
}

function toProjectUrl(repo) {
  if (repo.homepage && /^https?:\/\//.test(repo.homepage))
    return repo.homepage
  if (repo.has_pages)
    return `https://${OWNER}.github.io/${repo.name}/`
  return repo.html_url
}

function toPreviewImage(url) {
  return `https://image.thum.io/get/width/1200/crop/700/noanimate/${encodeURIComponent(url)}`
}

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n?/)
  if (!match)
    return null
  return { raw: match[1], start: match.index, end: match.index + match[0].length }
}

function updateFrontmatter(raw, data) {
  const lines = raw.split('\n').filter(Boolean)
  const kept = []
  let inTopicsBlock = false
  for (const line of lines) {
    if (line.startsWith('github_topics:')) {
      inTopicsBlock = true
      continue
    }
    if (inTopicsBlock && line.match(/^\s+-\s/))
      continue
    inTopicsBlock = false
    if (
      line.startsWith('repo_url:')
      || line.startsWith('github_pinned:')
      || line.startsWith('project_url:')
      || line.startsWith('image:')
    ) {
      continue
    }
    kept.push(line)
  }

  const repoIndex = kept.findIndex(line => line.startsWith('tech:'))
  const insertAt = repoIndex >= 0 ? repoIndex + 1 : kept.length
  const topicsLines = data.topics.length > 0
    ? ['github_topics:', ...data.topics.map(topic => `  - ${topic}`)]
    : ['github_topics: []']

  kept.splice(
    insertAt,
    0,
    `image: ${data.image}`,
    `repo_url: ${data.repoUrl}`,
    ...topicsLines,
    `github_pinned: ${data.pinned ? 'true' : 'false'}`,
    `project_url: ${data.projectUrl}`,
  )

  return kept.join('\n')
}

function createArchiveFile(repo, order) {
  const slug = toSlug(repo.name)
  const capsule = String(order - 89).padStart(2, '0')
  const projectUrl = toProjectUrl(repo)
  const image = toPreviewImage(projectUrl)
  const topicsLines = repo.topics.length > 0
    ? `github_topics:\n${repo.topics.map(topic => `  - ${topic}`).join('\n')}`
    : 'github_topics: []'

  return `---
slug: ${slug}
capsule: "DATA_CAPSULE: ${capsule}"
title: ${toTitle(repo.name)}
status: ${toStatus(repo.archived)}
description: "${(repo.description || 'Repository archive entry.').replaceAll('"', '\'')}"
tech: ${toTech(repo.language)}
image: ${image}
repo_url: ${repo.html_url}
${topicsLines}
github_pinned: false
project_url: ${projectUrl}
tier: other
order: ${order}
---

# ${toTitle(repo.name)}

Extend this capsule in Nuxt Studio (body + frontmatter).
`
}

function main() {
  const repos = JSON.parse(run(`gh api users/${OWNER}/repos --paginate`))
  const pinnedResponse = JSON.parse(run(`gh api graphql -f query='query { user(login: "${OWNER}") { pinnedItems(first: 6, types: REPOSITORY) { nodes { ... on Repository { name } } } } }'`))
  const pinnedSet = new Set(pinnedResponse.data.user.pinnedItems.nodes.map(node => node.name))

  const files = readdirSync(ARCHIVE_DIR).filter(file => file.endsWith('.md'))
  const bySlug = new Map()
  let maxOrder = 0
  for (const file of files) {
    const fullPath = join(ARCHIVE_DIR, file)
    const content = readFileSync(fullPath, 'utf8')
    const slug = content.match(/^slug:\s*(.+)$/m)?.[1]?.trim()
    const order = Number(content.match(/^order:\s*(\d+)$/m)?.[1] ?? '0')
    maxOrder = Math.max(maxOrder, order)
    if (slug)
      bySlug.set(slug, fullPath)
  }

  for (const repo of repos) {
    if (repo.fork)
      continue
    const slug = toSlug(repo.name)
    const projectUrl = toProjectUrl(repo)
    const image = toPreviewImage(projectUrl)
    const data = {
      repoUrl: repo.html_url,
      topics: repo.topics || [],
      pinned: pinnedSet.has(repo.name),
      projectUrl,
      image,
    }

    const existingPath = bySlug.get(slug)
    if (existingPath) {
      const content = readFileSync(existingPath, 'utf8')
      const frontmatter = parseFrontmatter(content)
      if (!frontmatter)
        continue
      const nextFrontmatter = updateFrontmatter(frontmatter.raw, data)
      const nextContent = `${content.slice(0, frontmatter.start)}---\n${nextFrontmatter}\n---\n${content.slice(frontmatter.end)}`
      writeFileSync(existingPath, nextContent)
      continue
    }

    maxOrder += 1
    const newPath = join(ARCHIVE_DIR, `${repo.name}.md`)
    writeFileSync(newPath, createArchiveFile(repo, maxOrder))
  }

  console.log(`Archive sync completed for ${repos.length} repositories.`)
}

main()
