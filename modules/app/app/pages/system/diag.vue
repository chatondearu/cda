<script setup lang="ts">
const { t } = useI18n()
const { telemetry } = useSystemData()

const hudStatusMap = {
  NOMINAL: 'active',
  SYNCING: 'pending',
  SCANNING: 'standby',
} as const

const hudStatus = computed(() => hudStatusMap[telemetry.value.status])

const hudLogLines = computed(() => [
  { t: '000', message: telemetry.value.coordText },
  { t: '001', message: telemetry.value.secureLineText },
  { t: '002', message: telemetry.value.userText },
])
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
    <div class="grid mt-6 gap-4 md:grid-cols-2">
      <HudTelemetryCluster
        title="DIAG_CLUSTER"
        :meter="{ label: 'MEM_LOAD', value: `${telemetry.memLoadPercent}%`, progress: telemetry.memLoadPercent }"
        :status="{ label: 'SYS', status: hudStatus }"
        :code="{ code: telemetry.latencyMs.toFixed(1), prefix: 'MS' }"
      />
      <HudLogStream :lines="hudLogLines" />
    </div>
  </section>
</template>
