import type { ArchiveItem } from '../../../design-system-nuxt/app/composables/useSystemData'

const ARCHIVE_LIST_KEY = 'content-archive-list'

/** Stable handler so all callers share the same useAsyncData key + hash (home + /archive). */
function fetchArchiveList() {
  return queryCollection('archive').order('order', 'ASC').all()
}

/** Maps a Nuxt Content archive document to the shape expected by UiArchiveCard. */
export function mapArchiveDocumentToItem(doc: {
  slug: string
  capsule: string
  title: string
  status: ArchiveItem['status']
  description: string
  tech: string
  image: string
  repo_url: string
  github_topics?: string[]
  github_pinned?: boolean
  tier: ArchiveItem['tier']
}): ArchiveItem {
  return {
    slug: doc.slug,
    capsule: doc.capsule,
    title: doc.title,
    status: doc.status,
    description: doc.description,
    tech: doc.tech,
    image: doc.image,
    repoUrl: doc.repo_url,
    githubTopics: doc.github_topics ?? [],
    githubPinned: doc.github_pinned ?? false,
    tier: doc.tier,
  }
}

/** Shared list fetch for archive index and home preview (deduped by key). */
export function useArchiveList() {
  return useAsyncData(ARCHIVE_LIST_KEY, fetchArchiveList, { default: () => [] })
}

/** Detail route: refetches when `slug` param changes. */
export function useArchiveDetail() {
  const route = useRoute()
  const slug = computed(() => String(route.params.slug))
  return useAsyncData(slug, () => queryCollection('archive').where('slug', '=', slug.value).first(), { watch: [slug] })
}
