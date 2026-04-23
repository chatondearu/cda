import type { TimelineItem } from '../../../design-system-nuxt/app/composables/useSystemData'
import { hasMeaningfulTimelineBody } from '../utils/timelineContent'

interface StreamerTimelineDoc extends TimelineItem {
  slug: string
  locale: string
  order: number
  body?: unknown
}

async function fetchStreamerTimeline(locale: string): Promise<StreamerTimelineDoc[]> {
  const localized = await queryCollection('streamer_timeline')
    .where('locale', '=', locale)
    .order('order', 'ASC')
    .all()

  if (localized.length > 0)
    return localized as StreamerTimelineDoc[]

  const fallback = await queryCollection('streamer_timeline')
    .where('locale', '=', 'en')
    .order('order', 'ASC')
    .all()

  return fallback as StreamerTimelineDoc[]
}

export function useStreamerTimeline() {
  const { locale } = useI18n()
  const currentLocale = computed(() => locale.value || 'fr')
  const { data } = useAsyncData(
    () => `streamer-timeline-${currentLocale.value}`,
    () => fetchStreamerTimeline(currentLocale.value),
    { default: () => [], watch: [currentLocale] },
  )

  return computed<TimelineItem[]>(() =>
    (data.value ?? []).map((item) => {
      const hasBody = hasMeaningfulTimelineBody(item)
      return {
        period: item.period,
        title: item.title,
        reference: item.reference,
        description: item.description,
        tags: item.tags,
        layout: item.layout,
        detailsPath: hasBody ? `/timeline/${item.slug}` : undefined,
      }
    }),
  )
}

export function useStreamerTimelineDetail() {
  const route = useRoute()
  const { locale } = useI18n()
  const slug = computed(() => String(route.params.slug))
  const currentLocale = computed(() => locale.value || 'fr')

  return useAsyncData(
    () => `streamer-timeline-detail-${slug.value}-${currentLocale.value}`,
    async () => {
      const localized = await queryCollection('streamer_timeline')
        .where('slug', '=', slug.value)
        .where('locale', '=', currentLocale.value)
        .first()

      if (localized)
        return localized

      return queryCollection('streamer_timeline')
        .where('slug', '=', slug.value)
        .where('locale', '=', 'en')
        .first()
    },
    { watch: [slug, currentLocale] },
  )
}
