<script setup lang="ts">
const { t } = useI18n()
const careerItems = useCareerTimeline()
const { profileLinks } = useCareerProfileLinks()
const { contact, hasContact } = useCareerContact()

useSeoMeta({
  title: t('career.seoTitle'),
  description: t('career.seoDescription'),
  robots: 'noindex, nofollow',
})

useHead({
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
  await downloadCareerPdf(careerItems, profileLinks, contact.value)
}
</script>

<template>
  <div>
    <UiHeroCommand>
      <template #title>
        SIDE_CHANNEL_LOG:<br>
        <span class="bg-primary px-2 text-background">[ UNLISTED ]</span><br>
        <template v-if="contact.fullName">
          <span class="uppercase">{{ contact.fullName }}</span><span class="text-primary/75"> [ EMPLOYMENT_TIMELINE ]</span>
        </template>
        <template v-else>
          EMPLOYMENT_TIMELINE
        </template>
      </template>

      <template #description>
        {{ t('career.heroDescription') }}
      </template>

      <template #actions>
        <UiButton variant="secondary" @click="exportCareerPdf">
          {{ t('career.exportPdf') }}
        </UiButton>
      </template>
    </UiHeroCommand>

    <section class="border-b border-primary_fixed_dim/10 bg-surface_container_lowest p-8 md:p-16">
      <div
        class="grid gap-10 lg:items-start md:gap-12"
        :class="hasContact ? 'lg:grid-cols-2 xl:gap-16' : ''"
      >
        <div
          v-if="hasContact"
          class="min-w-0"
        >
          <UiSectionHeader
            code="MODULE_01A"
            title="COMMS_DIRECT"
          >
            <template #right>
              <span class="text-[10px] text-primary/40 font-mono">RUNTIME_ENV</span>
            </template>
          </UiSectionHeader>
          <ul class="mt-6 flex flex-col gap-6 lg:mt-8">
            <li
              v-if="contact.email"
              class="min-w-0"
            >
              <span class="mb-1 block text-[11px] text-primary font-bold tracking-widest font-mono uppercase">
                EMAIL
              </span>
              <a
                class="break-all text-sm text-primary_fixed_dim font-mono transition-none hover:text-primary"
                :href="`mailto:${contact.email}`"
              >
                {{ contact.email }}
              </a>
            </li>
            <li
              v-if="contact.phone"
              class="min-w-0"
            >
              <span class="mb-1 block text-[11px] text-primary font-bold tracking-widest font-mono uppercase">
                PHONE
              </span>
              <a
                class="break-all text-sm text-primary_fixed_dim font-mono transition-none hover:text-primary"
                :href="`tel:${contact.phone.replace(/\s+/g, '')}`"
              >
                {{ contact.phone }}
              </a>
            </li>
            <li
              v-if="contact.location"
              class="min-w-0"
            >
              <span class="mb-1 block text-[11px] text-primary font-bold tracking-widest font-mono uppercase">
                LOCATION
              </span>
              <p class="text-sm text-primary/80 font-mono">
                {{ contact.location }}
              </p>
            </li>
          </ul>
        </div>

        <div class="min-w-0">
          <UiSectionHeader
            code="MODULE_01B"
            title="OUTBOUND_CHANNELS"
          >
            <template #right>
              <span class="text-[10px] text-primary/40 font-mono">TLS_1_2+</span>
            </template>
          </UiSectionHeader>
          <ul
            class="mt-6 flex flex-col gap-4 lg:mt-8"
            :class="hasContact ? '' : 'md:flex-row md:flex-wrap md:gap-x-10 md:gap-y-4'"
          >
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
        </div>
      </div>
    </section>

    <UiTimeline :items="[...careerItems]" />
  </div>
</template>
