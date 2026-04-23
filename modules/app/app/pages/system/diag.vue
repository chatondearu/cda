<script setup lang="ts">
const { t } = useI18n()
const { telemetry } = useSystemData()
</script>

<template>
  <section class="px-8 py-12 md:px-14">
    <UiSectionHeader
      code="MODULE_06"
      :title="t('system.title')"
    />
    <div class="grid gap-6 md:grid-cols-2">
      <UiGlassDiagnosticPanel />
      <div class="space-y-3">
        <UiSystemBadge :text="`SYNC: ${telemetry.status}`" />
        <UiSystemBadge :text="telemetry.latencyText" />
        <UiSystemBadge :text="telemetry.coreTempText" />
      </div>
    </div>
  </section>
</template>
