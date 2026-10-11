export interface CareerGrantState {
  granted: boolean
  via: 'token' | 'allowlist' | null
}

/**
 * Client/SSR helper for the CV grant status (not community session).
 */
export function useCareerGrant() {
  const requestFetch = useRequestFetch()

  return useAsyncData(
    'career-grant',
    () => requestFetch<CareerGrantState>('/api/career/access'),
    {
      default: () => ({ granted: false, via: null }),
    },
  )
}

export async function redeemCareerAccessToken(token: string): Promise<CareerGrantState> {
  const requestFetch = useRequestFetch()
  return requestFetch<CareerGrantState>('/api/career/access', {
    method: 'POST',
    body: { token: token.trim() },
  })
}
