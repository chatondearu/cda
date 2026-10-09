/**
 * Shared public-page SEO (title/description + og/twitter).
 *
 * Temporary OG image: `/images/logo_w_bg.png` (brand mark with background).
 * A dedicated 1200×630 social card can replace this path later without
 * changing call sites — keep absolute URLs via `siteUrl`.
 */
export function usePageSeo(options: {
  title: MaybeRefOrGetter<string>
  description: MaybeRefOrGetter<string>
}) {
  const config = useRuntimeConfig()
  const route = useRoute()
  const requestURL = useRequestURL()

  const siteOrigin = computed(() => {
    const configured = String(config.public.siteUrl ?? '').trim().replace(/\/+$/, '')
    return configured || requestURL.origin
  })

  const pageUrl = computed(() => {
    const path = route.fullPath.split('?')[0] ?? '/'
    return `${siteOrigin.value}${path}`
  })

  // Temporary safe default until a dedicated OG asset ships (see file header).
  const ogImage = computed(() => `${siteOrigin.value}/images/logo_w_bg.png`)

  useSeoMeta({
    title: () => toValue(options.title),
    description: () => toValue(options.description),
    ogTitle: () => toValue(options.title),
    ogDescription: () => toValue(options.description),
    ogImage: () => ogImage.value,
    ogUrl: () => pageUrl.value,
    ogType: 'website',
    twitterTitle: () => toValue(options.title),
    twitterDescription: () => toValue(options.description),
    twitterImage: () => ogImage.value,
    twitterCard: 'summary',
  })
}
