<script setup lang="ts">
const config = useRuntimeConfig()
const { trackingAllowed } = useUmamiConsent()

useHead(() => {
  if (!trackingAllowed.value)
    return {}

  const src = String(config.public.umamiScriptUrl ?? '').trim()
  const websiteId = String(config.public.umamiWebsiteId ?? '').trim()
  if (!src || !websiteId)
    return {}

  return {
    script: [
      {
        'key': 'umami-analytics',
        'defer': true,
        src,
        'data-website-id': websiteId,
      },
    ],
  }
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <AppUmamiConsentNotice />
</template>
