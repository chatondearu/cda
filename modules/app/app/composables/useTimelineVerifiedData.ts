interface TimelineMetricRecord {
  channelCreatedAt: string
  peakViewers: number
  peakViewersAt: string
  lastKnownLiveAt: string
  twitchFollowersCurrent: number
  twitchFollowersTarget: number
  twitchTrackerFollowers: number
  syncedAt: string
}

const TIMELINE_METRICS: TimelineMetricRecord = {
  channelCreatedAt: '2018-10-23',
  peakViewers: 73,
  peakViewersAt: '2021-10-09',
  lastKnownLiveAt: '2022-05-08',
  twitchFollowersCurrent: 885,
  twitchFollowersTarget: 1000,
  twitchTrackerFollowers: 961,
  syncedAt: '2026-04-23',
}

const TIMELINE_SOURCES = ['Twitch', 'TwitchTracker'] as const

export function useTimelineVerifiedData() {
  const { locale } = useI18n()

  const syncedAtLabel = computed(() => {
    const value = new Date(TIMELINE_METRICS.syncedAt)
    const formatter = new Intl.DateTimeFormat(locale.value || 'fr', {
      dateStyle: 'long',
    })
    return formatter.format(value)
  })

  return {
    metrics: TIMELINE_METRICS,
    sources: TIMELINE_SOURCES,
    syncedAtLabel,
  }
}
