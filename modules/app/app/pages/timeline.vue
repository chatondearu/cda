<script setup lang="ts">
const streamerItems = useStreamerTimeline()

useSeoMeta({
  description: 'Chronologie du parcours créateur ChatonDeAru — streaming, communauté et broadcast.',
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
  htmlAttrs: {
    lang: 'fr',
  },
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
        CREATOR_TIMELINE
      </template>

      <template #description>
        Jalons du parcours en tant que streamer et créateur sous l’alias ChatonDeAru : chaîne, formats, infra de stream et moments marquants côté communauté — sans détail du CV logiciel.
      </template>
    </UiHeroCommand>

    <UiTimeline :items="[...streamerItems]" />
  </div>
</template>
