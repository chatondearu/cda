<script setup lang="ts">
const { navItems } = useSystemData()
const { t } = useI18n()
const config = useRuntimeConfig()
const requestUrl = useRequestURL()
const requestHost = requestUrl.host.split(':')[0]?.trim().toLowerCase() ?? ''
const meHost = String(config.public.meHost ?? '').trim().toLowerCase()
const siteUrl = String(config.public.siteUrl ?? '').trim()
const isMeHostLayout = meHost.length > 0 && requestHost === meHost

const footerLinks = [
  { label: t('layout.footerLinks.exit'), to: '/' },
  { label: t('layout.footerLinks.contact'), to: '/contact' },
  { label: t('layout.footerLinks.diag'), to: '/system/diag' },
  { label: t('layout.footerLinks.lab'), to: '/cda-lab' },
  { label: t('layout.footerLinks.archive'), to: '/archive' },
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
            {{ t('layout.goToMainSite') }}
          </a>
        </div>
        <div class="flex-1">
          <slot />
        </div>
      </main>
    </template>
    <template v-else>
      <AppSiteTopBar />
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
