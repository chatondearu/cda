<script setup lang="ts">
const careerItems = useCareerTimeline()

useSeoMeta({
  title: 'SIDE_CHANNEL // CAREER',
  description: 'Unlisted employment log.',
  robots: 'noindex, nofollow',
})

useHead({
  htmlAttrs: {
    lang: 'fr',
  },
  meta: [
    { name: 'robots', content: 'noindex, nofollow' },
  ],
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
        SIDE_CHANNEL_LOG:<br>
        <span class="bg-primary px-2 text-background">[ UNLISTED ]</span><br>
        EMPLOYMENT_TIMELINE
      </template>

      <template #description>
        Parcours professionnel et références employeur — page volontairement absente de la navigation et des index publics. Partagez l’URL seulement avec les personnes concernées.
      </template>
    </UiHeroCommand>

    <UiTimeline :items="[...careerItems]" />
  </div>
</template>
