<script setup lang="ts">
const { navItems } = useSystemData()

const footerLinks = [
  { label: 'TERMINAL_EXIT', to: '/' },
  { label: 'ENCRYPT_DATA', to: '/system/diag' },
  { label: 'SYSTEM_HALT', to: '/lab' },
  { label: 'CORE_DUMP', to: '/archive' },
]
</script>

<template>
  <UiPageFrame>
    <UiTopBar title="REF-01/SYS_STATUS: NOMINAL" />
    <div class="min-h-screen flex pt-16">
      <UiSideNav :items="navItems" />
      <main class="flex-1 overflow-x-hidden pb-20 md:pb-0">
        <slot />
        <UiFooterLinks :links="footerLinks" />
      </main>
    </div>
    <UiMobileDockNav :items="navItems" />
  </UiPageFrame>
</template>
