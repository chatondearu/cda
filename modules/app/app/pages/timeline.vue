<script setup lang="ts">
const { t } = useI18n()
const streamerItems = useStreamerTimeline()

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
  </div>
</template>

<i18n lang="json">
{
  "fr": {
    "timelinePage": {
      "heroTitle": "CREATOR_TIMELINE"
    }
  },
  "en": {
    "timelinePage": {
      "heroTitle": "CREATOR_TIMELINE"
    }
  },
  "zh": {
    "timelinePage": {
      "heroTitle": "创作时间线"
    }
  },
  "ja": {
    "timelinePage": {
      "heroTitle": "クリエイター年表"
    }
  }
}
</i18n>
