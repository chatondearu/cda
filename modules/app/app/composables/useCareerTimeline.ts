import type { TimelineItem } from '../../../design-system-nuxt/app/composables/useSystemData'
import { hasMeaningfulTimelineBody } from '../utils/timelineContent'

interface CareerTimelineDoc extends TimelineItem {
  slug: string
  locale: string
  order: number
  body?: unknown
}

async function fetchCareerTimeline(locale: string): Promise<CareerTimelineDoc[]> {
  const localized = await queryCollection('career_timeline')
    .where('locale', '=', locale)
    .order('order', 'ASC')
    .all()

  if (localized.length > 0)
    return localized as CareerTimelineDoc[]

  const fallback = await queryCollection('career_timeline')
    .where('locale', '=', 'fr')
    .order('order', 'ASC')
    .all()

  return fallback as CareerTimelineDoc[]
}

export function useCareerTimeline() {
  const { locale } = useI18n()
  const currentLocale = computed(() => locale.value || 'fr')
  const { data } = useAsyncData(
    () => `career-timeline-${currentLocale.value}`,
    () => fetchCareerTimeline(currentLocale.value),
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
        detailsPath: hasBody ? `/rx-quiet/catnip-buffer/career/${item.slug}` : undefined,
      }
    }),
  )
}

export function useCareerTimelineDetail() {
  const route = useRoute()
  const { locale } = useI18n()
  const slug = computed(() => String(route.params.slug))
  const currentLocale = computed(() => locale.value || 'fr')

  return useAsyncData(
    () => `career-timeline-detail-${slug.value}-${currentLocale.value}`,
    async () => {
      const localized = await queryCollection('career_timeline')
        .where('slug', '=', slug.value)
        .where('locale', '=', currentLocale.value)
        .first()

      if (localized)
        return localized

      return queryCollection('career_timeline')
        .where('slug', '=', slug.value)
        .where('locale', '=', 'fr')
        .first()
    },
    { watch: [slug, currentLocale] },
  )
}
