export interface CommunityProviders {
  twitch: boolean
  discord: boolean
  credential: boolean
}

export interface CommunityProfile {
  id: string
  username: string | null
  displayName: string | null
  photoUrl: string | null
  discordUsername: string | null
  discordTag: string | null
  discordNickname: string | null
  isFollow: boolean | null
  isSubscribed: boolean | null
  subTier: number | null
  type: string | null
}

export interface CommunityClan {
  id: string
  name: string | null
  displayName: string | null
  displayNameFr: string | null
  totalMembers: number | null
}

export interface CommunityAccountPayload {
  user: {
    id: string
    name: string
    email: string
    image: string | null
  }
  providers: CommunityProviders
  profile: CommunityProfile | null
  clan: CommunityClan | null
}

/**
 * Load the authenticated community hub payload (profile + providers + clan).
 * Distinct from CV grant helpers — community session never implies career access.
 */
export function useCommunityAccount() {
  const requestFetch = useRequestFetch()

  return useAsyncData(
    'community-account',
    () => requestFetch<CommunityAccountPayload>('/api/account/community'),
  )
}
