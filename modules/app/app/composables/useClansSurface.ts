export interface ClanSurfaceItem {
  id: string
  name: string | null
  displayName: string | null
  displayNameFr: string | null
  description: string | null
  totalMembers: number | null
  totalPoints: string | null
  color: string | null
  imagePath: string | null
}

export interface ClanMembershipStatus {
  clanId: string | null
  isMember: boolean
  isBoughtClanAccess: boolean | null
}

export interface ClansSurfacePayload {
  clans: ClanSurfaceItem[]
  membership: ClanMembershipStatus
}

export interface ClanDetailPayload {
  clan: ClanSurfaceItem
  membership: ClanMembershipStatus & { isThisClan: boolean }
}

/**
 * Load authenticated clan roster + membership for `/clans`.
 */
export function useClansSurface() {
  const requestFetch = useRequestFetch()

  return useAsyncData(
    'clans-surface',
    () => requestFetch<ClansSurfacePayload>('/api/clans'),
  )
}

/**
 * Load authenticated single-clan detail for `/clans/:id`.
 */
export function useClanDetail(clanId: MaybeRefOrGetter<string>) {
  const requestFetch = useRequestFetch()

  return useAsyncData(
    () => `clan-detail-${toValue(clanId)}`,
    () => requestFetch<ClanDetailPayload>(`/api/clans/${toValue(clanId)}`),
    { watch: [() => toValue(clanId)] },
  )
}
