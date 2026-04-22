<script setup lang="ts">
const { navItems } = useSystemData()
const config = useRuntimeConfig()
const requestUrl = useRequestURL()
const requestHost = requestUrl.host.split(':')[0]?.trim().toLowerCase() ?? ''
const meHost = String(config.public.meHost ?? 'me.rlienard.fr').trim().toLowerCase()
const siteUrl = String(config.public.siteUrl ?? 'https://chatondearu.fr').trim()
const isMeHostLayout = requestHost === meHost

const footerLinks = [
  { label: 'TERMINAL_EXIT', to: '/' },
  { label: 'OPEN_CHANNEL', to: '/contact' },
  { label: 'ENCRYPT_DATA', to: '/system/diag' },
  { label: 'SYSTEM_HALT', to: '/cda-lab' },
  { label: 'CORE_DUMP', to: '/archive' },
]
</script>

<template>
  <UiPageFrame>
    <template v-if="isMeHostLayout">
      <main class="min-h-screen flex flex-col">
        <div class="w-full border-b border-primary_fixed_dim/10 bg-surface_container_low px-6 py-3 text-right md:px-10">
          <a
            :href="siteUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="text-[11px] text-primary/80 tracking-widest font-mono uppercase hover:text-primary"
          >
            GO_TO_CHATONDEARU.FR
          </a>
        </div>
        <div class="flex-1">
          <slot />
        </div>
      </main>
    </template>
    <template v-else>
      <UiTopBar title="REF-01/SYS_STATUS: NOMINAL" />
      <div class="min-h-screen flex pt-16">
        <UiSideNav :items="navItems" />
        <main class="flex flex-1 flex-col overflow-x-hidden pb-20 md:pb-0">
          <div class="flex-1">
            <slot />
          </div>
          <UiFooterLinks :links="footerLinks" />
        </main>
      </div>
      <UiMobileDockNav :items="navItems" />
    </template>
  </UiPageFrame>
</template>
