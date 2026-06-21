import { createAuthClient } from 'better-auth/vue'

/**
 * Single entry point for the Better Auth client.
 * Forwards cookies during SSR so the session is resolved server-side.
 */
export function useAuth() {
  const url = useRequestURL()
  const headers = import.meta.server ? useRequestHeaders(['cookie']) : undefined

  return createAuthClient({
    baseURL: url.origin,
    fetchOptions: { headers },
  })
}
