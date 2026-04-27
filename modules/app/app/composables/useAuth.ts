import { createAuthClient } from 'better-auth/vue'

export function useAuth() {
  const url = useRequestURL()
  const headers = import.meta.server ? useRequestHeaders(['cookie']) : undefined

  return createAuthClient({
    baseURL: url.origin,
    fetchOptions: { headers },
  })
}

export const authClient = createAuthClient()
export const {
  signIn,
  signOut,
  signUp,
  useSession,
} = authClient
