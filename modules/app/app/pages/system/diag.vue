<script setup lang="ts">
const { t } = useI18n()
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
        <UiSystemBadge :text="t('system.syncNominal')" />
        <UiSystemBadge :text="t('system.latency')" />
        <UiSystemBadge :text="t('system.coreTemp')" />
      </div>
    </div>
  </section>
</template>
