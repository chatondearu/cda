export type UmamiConsent = 'granted' | 'denied'

const STORAGE_KEY = 'cda_umami_consent'

/**
 * Gate Umami loading behind explicit consent when public keys are configured.
 * Empty NUXT_PUBLIC_UMAMI_* → analytics disabled; no banner.
 */
export function useUmamiConsent() {
  const config = useRuntimeConfig()
  const consent = useState<UmamiConsent | null>('umami-consent', () => null)
  const hydrated = useState('umami-consent-hydrated', () => false)

  const configured = computed(() => {
    const src = String(config.public.umamiScriptUrl ?? '').trim()
    const id = String(config.public.umamiWebsiteId ?? '').trim()
    return Boolean(src && id)
  })

  const showNotice = computed(() => configured.value && hydrated.value && consent.value === null)
  const trackingAllowed = computed(() => configured.value && consent.value === 'granted')

  function persist(value: UmamiConsent) {
    consent.value = value
    if (import.meta.client)
      localStorage.setItem(STORAGE_KEY, value)
  }

  function accept() {
    persist('granted')
  }

  function decline() {
    persist('denied')
  }

  onMounted(() => {
    if (hydrated.value)
      return
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'granted' || stored === 'denied')
      consent.value = stored
    hydrated.value = true
  })

  return {
    configured,
    consent,
    showNotice,
    trackingAllowed,
    accept,
    decline,
  }
}
