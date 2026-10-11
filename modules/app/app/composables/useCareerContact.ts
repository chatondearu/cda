import type { ComputedRef } from 'vue'

export interface CareerContactFields {
  /** Full name as you want it shown (e.g. "Prénom Nom") */
  fullName: string
  email: string
  phone: string
  location: string
}

const emptyContact: CareerContactFields = {
  fullName: '',
  email: '',
  phone: '',
  location: '',
}

/**
 * Career contact strings from the server-only API (requires CV grant).
 * PII is not exposed via NUXT_PUBLIC_* runtime config.
 */
export function useCareerContact(): {
  contact: ComputedRef<CareerContactFields>
  hasContact: ComputedRef<boolean>
  pending: ComputedRef<boolean>
} {
  const requestFetch = useRequestFetch()
  const { data, status } = useAsyncData(
    'career-contact',
    async () => {
      try {
        return await requestFetch<CareerContactFields>('/api/career/contact')
      }
      catch {
        return emptyContact
      }
    },
    { default: () => emptyContact },
  )

  const contact = computed<CareerContactFields>(() => data.value ?? emptyContact)

  const hasContact = computed(() => {
    const c = contact.value
    return Boolean(c.email || c.phone || c.location || c.fullName)
  })

  const pending = computed(() => status.value === 'pending')

  return { contact, hasContact, pending }
}
