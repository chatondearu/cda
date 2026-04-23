<script setup lang="ts">
const { t } = useI18n()
const streamerItems = useStreamerTimeline()
const { metrics, sources, syncedAtLabel } = useTimelineVerifiedData()
const verifiedStats = computed(() => [
  { label: t('timelinePage.stats.channelCreated'), value: metrics.channelCreatedAt },
  { label: t('timelinePage.stats.peakViewers'), value: `${metrics.peakViewers} (${metrics.peakViewersAt})` },
  { label: t('timelinePage.stats.lastLiveKnown'), value: metrics.lastKnownLiveAt },
  { label: t('timelinePage.stats.followersTwitch'), value: `${metrics.twitchFollowersCurrent} / ${metrics.twitchFollowersTarget}` },
  { label: t('timelinePage.stats.followersTracker'), value: `${metrics.twitchTrackerFollowers}` },
])

useSeoMeta({
  description: t('timeline.seoDescription'),
  ogTitle: '[og:title]',
  ogDescription: '[og:description]',
  ogImage: '[og:image]',
  ogUrl: '[og:url]',
  twitterTitle: '[twitter:title]',
  twitterDescription: '[twitter:description]',
  twitterImage: '[twitter:image]',
  twitterCard: 'summary',
})

useHead({
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon.png',
    },
  ],
})
</script>

<template>
  <div>
    <UiHeroCommand>
      <template #title>
        BROADCAST_LOG:<br>
        <span class="bg-primary px-2 text-background">[ CHATONDEARU ]</span><br>
        {{ t('timelinePage.heroTitle') }}
      </template>

      <template #description>
        {{ t('timeline.heroDescription') }}
      </template>
    </UiHeroCommand>

    <UiTimeline :items="[...streamerItems]" />
    <section class="px-8 pb-12 md:px-14">
      <div class="border border-primary_fixed_dim/20 bg-surface_container p-6">
        <UiCornerMarks />
        <p class="text-xs text-primary tracking-[0.18em] font-mono uppercase">
          {{ t('timelinePage.verifiedDataTitle') }}
        </p>
        <p class="mt-2 text-sm text-on_surface_variant">
          {{ t('timelinePage.verifiedDataDescription') }}
        </p>
        <dl class="grid grid-cols-1 mt-4 gap-3 md:grid-cols-2">
          <div
            v-for="stat in verifiedStats"
            :key="stat.label"
            class="border border-outline_variant/30 bg-surface_container_high p-3"
          >
            <dt class="text-[11px] text-primary/70 tracking-[0.14em] font-mono uppercase">
              {{ stat.label }}
            </dt>
            <dd class="mt-1 text-sm text-on_surface">
              {{ stat.value }}
            </dd>
          </div>
        </dl>
        <p class="mt-4 text-xs text-on_surface_variant/80 font-mono">
          {{ t('timelinePage.verifiedDataNote') }}
        </p>
        <p class="mt-2 text-xs text-on_surface_variant/80 font-mono">
          {{ t('timelinePage.verifiedDataSources', { sources: sources.join(' + ') }) }}
        </p>
        <p class="mt-1 text-xs text-on_surface_variant/80 font-mono">
          {{ t('timelinePage.lastSyncedAt', { date: syncedAtLabel }) }}
        </p>
      </div>
    </section>
  </div>
</template>

<i18n lang="json">
{
  "fr": {
    "timelinePage": {
      "heroTitle": "MON_PARCOURS_EN_LIVE",
      "verifiedDataTitle": "DONNEES_PUBLIQUES_VERIFIEES",
      "verifiedDataDescription": "Des chiffres concrets pour raconter une histoire vraie, sans gonfler les stats.",
      "verifiedDataNote": "J assume les ecarts entre plateformes: ici, je prefere la transparence a l effet vitrine.",
      "verifiedDataSources": "Sources utilisees: {sources}",
      "lastSyncedAt": "Mise a jour des donnees: {date}",
      "stats": {
        "channelCreated": "CREATION_DE_CHAINE",
        "peakViewers": "PIC_D_AUDIENCE",
        "lastLiveKnown": "DERNIER_LIVE_CONNU",
        "followersTwitch": "OBJECTIF_TWITCH",
        "followersTracker": "SUIVI_TWITCHTRACKER"
      }
    }
  },
  "en": {
    "timelinePage": {
      "heroTitle": "CREATOR_TIMELINE",
      "verifiedDataTitle": "VERIFIED_PUBLIC_DATA",
      "verifiedDataDescription": "Public metrics used to rebuild the Twitch comeback timeline.",
      "verifiedDataNote": "Sources: official Twitch + TwitchTracker. Follower gaps may come from platform update delays.",
      "verifiedDataSources": "Active sources: {sources}",
      "lastSyncedAt": "Last sync: {date}",
      "stats": {
        "channelCreated": "CHANNEL_CREATED",
        "peakViewers": "PEAK_VIEWERS",
        "lastLiveKnown": "LAST_LIVE_KNOWN",
        "followersTwitch": "TWITCH_FOLLOWERS_GOAL",
        "followersTracker": "TWITCHTRACKER_FOLLOWERS"
      }
    }
  },
  "zh": {
    "timelinePage": {
      "heroTitle": "创作时间线",
      "verifiedDataTitle": "VERIFIED_PUBLIC_DATA",
      "verifiedDataDescription": "用于重建 Twitch 回归时间线的公开数据。",
      "verifiedDataNote": "来源：Twitch 官方 + TwitchTracker。关注数差异可能来自平台更新延迟。",
      "verifiedDataSources": "当前来源：{sources}",
      "lastSyncedAt": "最后同步：{date}",
      "stats": {
        "channelCreated": "CHANNEL_CREATED",
        "peakViewers": "PEAK_VIEWERS",
        "lastLiveKnown": "LAST_LIVE_KNOWN",
        "followersTwitch": "TWITCH_FOLLOWERS_GOAL",
        "followersTracker": "TWITCHTRACKER_FOLLOWERS"
      }
    }
  },
  "ja": {
    "timelinePage": {
      "heroTitle": "クリエイター年表",
      "verifiedDataTitle": "VERIFIED_PUBLIC_DATA",
      "verifiedDataDescription": "Twitch復帰タイムラインに使う公開データ。",
      "verifiedDataNote": "情報源: Twitch公式 + TwitchTracker。フォロワー差分は更新タイミングの違いで発生する場合があります。",
      "verifiedDataSources": "有効なソース: {sources}",
      "lastSyncedAt": "最終同期: {date}",
      "stats": {
        "channelCreated": "CHANNEL_CREATED",
        "peakViewers": "PEAK_VIEWERS",
        "lastLiveKnown": "LAST_LIVE_KNOWN",
        "followersTwitch": "TWITCH_FOLLOWERS_GOAL",
        "followersTracker": "TWITCHTRACKER_FOLLOWERS"
      }
    }
  }
}
</i18n>
