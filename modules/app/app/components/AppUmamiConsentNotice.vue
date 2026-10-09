<script setup lang="ts">
const { t } = useI18n()
const { showNotice, accept, decline } = useUmamiConsent()
</script>

<template>
  <div
    v-if="showNotice"
    class="fixed inset-x-0 bottom-0 z-50 border-t border-outline_variant/30 bg-surface_container_high px-4 py-3 md:px-8"
    role="dialog"
    aria-live="polite"
    :aria-label="t('privacy.umami.ariaLabel')"
  >
    <div class="mx-auto max-w-5xl flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div class="min-w-0 space-y-1">
        <p class="text-[10px] text-primary tracking-widest font-mono uppercase">
          {{ t('privacy.umami.title') }}
        </p>
        <p class="text-sm text-on_surface/80 leading-snug">
          {{ t('privacy.umami.body') }}
        </p>
      </div>
      <div class="flex shrink-0 gap-2">
        <UiButton variant="secondary" type="button" @click="decline">
          {{ t('privacy.umami.decline') }}
        </UiButton>
        <UiButton type="button" @click="accept">
          {{ t('privacy.umami.accept') }}
        </UiButton>
      </div>
    </div>
  </div>
</template>
