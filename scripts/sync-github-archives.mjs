#!/usr/bin/env node
import { execSync } from 'node:child_process'
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const OWNER = process.env.GITHUB_OWNER ?? 'chatondearu'
const ARCHIVE_DIR = join(process.cwd(), 'modules/app/content/archive')
const IMAGES_DIR = join(process.cwd(), 'modules/app/public/images/archive')

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
  return null
}

function screenshotUrl(url) {
  return `https://image.thum.io/get/width/1200/crop/700/noanimate/${url}`
}

function buildFallbackSvg(repo) {
  const title = repo.name.toUpperCase().replaceAll('&', '&amp;')
  const desc = (repo.description || 'Repository capsule').replaceAll('&', '&amp;')
  const lang = (repo.language || 'CONFIG').toUpperCase()
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="700" viewBox="0 0 1200 700">
  <defs>
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="#0A0E14"/>
      <stop offset="100%" stop-color="#1A2433"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="700" fill="url(#bg)"/>
  <rect x="40" y="40" width="1120" height="620" fill="none" stroke="#6EE7F9" stroke-opacity="0.35" stroke-width="2"/>
  <rect x="60" y="60" width="1080" height="580" fill="none" stroke="#6EE7F9" stroke-opacity="0.15" stroke-width="1"/>
  <text x="90" y="160" fill="#9EEAF4" font-size="24" font-family="monospace" letter-spacing="2">ARCHIVE CAPSULE</text>
  <text x="90" y="240" fill="#E4F4F7" font-size="64" font-weight="700" font-family="monospace">${title}</text>
  <text x="90" y="320" fill="#B4CBD1" font-size="28" font-family="monospace">TECH: ${lang}</text>
  <text x="90" y="390" fill="#9FB2B8" font-size="24" font-family="monospace">${desc.slice(0, 78)}</text>
  <text x="90" y="610" fill="#6EE7F9" font-size="20" font-family="monospace">github.com/${OWNER}/${repo.name}</text>
</svg>`
}

function generateImageAsset(repo, slug, projectUrl) {
  mkdirSync(IMAGES_DIR, { recursive: true })
  if (projectUrl) {
    return screenshotUrl(projectUrl)
  }

  const svgPath = join(IMAGES_DIR, `${slug}.svg`)
  writeFileSync(svgPath, buildFallbackSvg(repo), 'utf8')
  return `/images/archive/${slug}.svg`
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
  const projectUrl = toProjectUrl(repo) ?? repo.html_url
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
image: __IMAGE_PLACEHOLDER__
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

async function main() {
  const repos = JSON.parse(run(`gh api users/${OWNER}/repos --paginate`))
  const nonForkRepos = repos.filter(repo => !repo.fork)
  const pinnedResponse = JSON.parse(run(`gh api graphql -f query='query { user(login: "${OWNER}") { pinnedItems(first: 6, types: REPOSITORY) { nodes { ... on Repository { name } } } } }'`))
  const pinnedSet = new Set(pinnedResponse.data.user.pinnedItems.nodes.map(node => node.name))

  const files = readdirSync(ARCHIVE_DIR).filter(file => file.endsWith('.md'))
  const bySlug = new Map()
  const imageBySlug = new Map()
  let maxOrder = 0

  mkdirSync(IMAGES_DIR, { recursive: true })
  for (const imageFile of readdirSync(IMAGES_DIR)) {
    const match = imageFile.match(/^(.+)\.(svg)$/)
    if (match)
      imageBySlug.set(match[1], join(IMAGES_DIR, imageFile))
  }

  for (const file of files) {
    const fullPath = join(ARCHIVE_DIR, file)
    const content = readFileSync(fullPath, 'utf8')
    const slug = content.match(/^slug:\s*(.+)$/m)?.[1]?.trim()
    const order = Number(content.match(/^order:\s*(\d+)$/m)?.[1] ?? '0')
    maxOrder = Math.max(maxOrder, order)
    if (slug)
      bySlug.set(slug, fullPath)
  }

  const validSlugs = new Set(nonForkRepos.map(repo => toSlug(repo.name)))
  const slugsNeedingSvg = new Set(nonForkRepos.filter(repo => !toProjectUrl(repo)).map(repo => toSlug(repo.name)))
  for (const [slug, filePath] of bySlug) {
    if (validSlugs.has(slug))
      continue
    rmSync(filePath, { force: true })
    const imagePath = imageBySlug.get(slug)
    if (imagePath)
      rmSync(imagePath, { force: true })
  }
  for (const [slug, imagePath] of imageBySlug) {
    if (!slugsNeedingSvg.has(slug))
      rmSync(imagePath, { force: true })
  }

  for (const repo of nonForkRepos) {
    const slug = toSlug(repo.name)
    const projectUrl = toProjectUrl(repo)
    const image = generateImageAsset(repo, slug, projectUrl)
    const data = {
      repoUrl: repo.html_url,
      topics: repo.topics || [],
      pinned: pinnedSet.has(repo.name),
      projectUrl: projectUrl ?? repo.html_url,
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
    const created = createArchiveFile(repo, maxOrder).replace('__IMAGE_PLACEHOLDER__', image)
    writeFileSync(newPath, created)
  }

  console.log(`Archive sync completed for ${nonForkRepos.length} non-fork repositories.`)
}

await main()
