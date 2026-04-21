<script setup lang="ts">
const directChannels = [
  { id: 'email', label: 'EMAIL_CHANNEL', value: 'contact@chatondearu.fr', href: 'mailto:contact@chatondearu.fr' },
  { id: 'github', label: 'GITHUB_SIGNAL', value: 'github.com/chatondearu', href: 'https://github.com/chatondearu' },
  { id: 'linkedin', label: 'LINKEDIN_NODE', value: 'linkedin.com/in/romalie', href: 'https://www.linkedin.com/in/romalie/' },
] as const

const collaborationProtocol = [
  'STACK: Vue.js / Nuxt / TypeScript',
  'DELIVERY: Feature build, migration, diagnostics',
  'FORMAT: Remote-first, async-friendly',
] as const

useSeoMeta({
  title: 'CONTACT // CHATONDEARU',
  description: 'Canaux de contact et protocole de collaboration.',
  ogTitle: '[og:title]',
  ogDescription: '[og:description]',
  ogImage: '[og:image]',
  ogUrl: '[og:url]',
  twitterTitle: '[twitter:title]',
  twitterDescription: '[twitter:description]',
  twitterImage: '[twitter:image]',
  twitterCard: 'summary',
})
</script>

<template>
  <div>
    <UiHeroCommand icon="hub">
      <template #title>
        COMMS_GATEWAY:<br>
        <span class="bg-primary px-2 text-background">[ OPEN_CHANNEL ]</span><br>
        CONTACT_PROTOCOL
      </template>

      <template #description>
        Point d’entrée pour lancer une discussion projet, demander un audit technique, ou planifier une mission de développement.
      </template>

      <template #actions>
        <UiButton href="mailto:contact@chatondearu.fr">
          INITIATE_HANDSHAKE
        </UiButton>
        <UiButton
          variant="secondary"
          to="/archive"
        >
          REVIEW_ARCHIVE
        </UiButton>
      </template>
    </UiHeroCommand>

    <section class="border-b border-primary_fixed_dim/10 bg-surface_container_lowest p-8 md:p-16">
      <div class="grid gap-10 md:grid-cols-2 md:gap-12 xl:gap-16">
        <div class="min-w-0">
          <UiSectionHeader
            code="MODULE_02A"
            title="DIRECT_CHANNELS"
          >
            <template #right>
              <span class="text-[10px] text-primary/40 font-mono">TLS_ACTIVE</span>
            </template>
          </UiSectionHeader>

          <ul class="mt-6 flex flex-col gap-6 lg:mt-8">
            <li
              v-for="channel in directChannels"
              :key="channel.id"
              class="min-w-0"
            >
              <span class="mb-1 block text-[11px] text-primary font-bold tracking-widest font-mono uppercase">
                {{ channel.label }}
              </span>
              <a
                :href="channel.href"
                target="_blank"
                rel="noopener noreferrer"
                class="break-all text-sm text-primary_fixed_dim font-mono transition-none hover:text-primary"
              >
                {{ channel.value }}
              </a>
            </li>
          </ul>
        </div>

        <div class="min-w-0">
          <UiSectionHeader
            code="MODULE_02B"
            title="COLLAB_PROTOCOL"
          >
            <template #right>
              <span class="text-[10px] text-primary/40 font-mono">SYNC_READY</span>
            </template>
          </UiSectionHeader>

          <ul class="mt-6 flex flex-col gap-4 lg:mt-8">
            <li
              v-for="item in collaborationProtocol"
              :key="item"
              class="border border-outline_variant/20 bg-surface px-4 py-4 text-xs text-primary/80 tracking-wide font-mono uppercase"
            >
              {{ item }}
            </li>
          </ul>
          <p class="mt-6 max-w-xl text-[11px] text-primary/60 leading-relaxed font-mono">
            SLA_HINT: Premier retour sous 24-72h selon charge active.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
