import type { ComputedRef } from 'vue'

export interface CareerContactFields {
  /** Full name as you want it shown (e.g. "Prénom Nom") */
  fullName: string
  email: string
  phone: string
  location: string
}

/**
 * Career contact strings from runtime config (.env / deployment env).
 * Uses NUXT_PUBLIC_* keys — values are inlined for client-side PDF export (not secret from the browser).
 */
export function useCareerContact(): {
  contact: ComputedRef<CareerContactFields>
  hasContact: ComputedRef<boolean>
} {
  const config = useRuntimeConfig()

  const contact = computed<CareerContactFields>(() => ({
    fullName: String(config.public.careerFullName ?? '').trim(),
    email: String(config.public.careerEmail ?? '').trim(),
    phone: String(config.public.careerPhone ?? '').trim(),
    location: String(config.public.careerLocation ?? '').trim(),
  }))

  const hasContact = computed(() => {
    const c = contact.value
    return Boolean(c.email || c.phone || c.location)
  })

  return { contact, hasContact }
}
