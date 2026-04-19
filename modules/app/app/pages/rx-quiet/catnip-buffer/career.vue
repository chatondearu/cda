<script setup lang="ts">
const careerItems = useCareerTimeline()
const { profileLinks } = useCareerProfileLinks()

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

async function exportCareerPdf(): Promise<void> {
  await downloadCareerPdf(careerItems, profileLinks)
}
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

      <template #actions>
        <UiButton variant="secondary" @click="exportCareerPdf">
          EXPORT_PDF_ARCHIVE
        </UiButton>
      </template>
    </UiHeroCommand>

    <section class="border-b border-primary_fixed_dim/10 bg-surface_container_lowest p-8 md:p-16">
      <UiSectionHeader
        code="MODULE_01B"
        title="OUTBOUND_CHANNELS"
      >
        <template #right>
          <span class="text-[10px] text-primary/40 font-mono">TLS_1_2+</span>
        </template>
      </UiSectionHeader>
      <ul class="flex flex-col gap-4 md:flex-row md:flex-wrap md:gap-x-10 md:gap-y-4">
        <li
          v-for="link in profileLinks"
          :key="link.id"
          class="min-w-0"
        >
          <a
            class="group max-w-full flex flex-col border-b border-transparent pb-1 text-sm text-primary font-bold tracking-widest font-mono uppercase transition-none hover:border-primary"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="truncate">{{ link.label }}</span>
            <span class="mt-1 break-all text-[11px] text-primary/50 font-normal tracking-normal normal-case group-hover:text-primary/70">
              {{ link.url }}
            </span>
          </a>
        </li>
      </ul>
    </section>

    <UiTimeline :items="[...careerItems]" />
  </div>
</template>
