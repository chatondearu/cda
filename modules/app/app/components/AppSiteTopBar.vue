<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <UiTopBar :title="t('layout.topbarTitle')">
    <template #actions>
      <span class="hidden items-center gap-2 md:flex">
        <span class="h-2 w-2 animate-pulse bg-primary_fixed_dim" />
        {{ t('ui.secureLine') }}
      </span>
      <span class="hidden opacity-60 md:inline">{{ t('ui.userAdmin') }}</span>
      <AppSettingsMenu />
    </template>
  </UiTopBar>
</template>
