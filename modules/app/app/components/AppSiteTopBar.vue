<script setup lang="ts">
const { telemetry } = useSystemData()
</script>

<template>
  <UiTopBar :title="telemetry.statusTitle">
    <template #actions>
      <span class="hidden items-center gap-2 md:flex">
        <span class="h-2 w-2 animate-pulse bg-primary_fixed_dim" />
        {{ telemetry.secureLineText }}
      </span>
      <span class="hidden opacity-60 md:inline">{{ telemetry.userText }}</span>
      <AppSettingsMenu />
    </template>
  </UiTopBar>
</template>
