<script setup lang="ts">
const config = useRuntimeConfig()

useHead(() => {
  const src = config.public.umamiScriptUrl
  const websiteId = config.public.umamiWebsiteId
  if (!src || !websiteId)
    return {}

  return {
    script: [
      {
        key: 'umami-analytics',
        defer: true,
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
</template>
