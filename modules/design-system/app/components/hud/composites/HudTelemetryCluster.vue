<script setup lang="ts">
interface HudTelemetryMeter {
  label: string
  value: string
  progress: number
}

interface HudTelemetryStatus {
  label: string
  status?: 'active' | 'standby' | 'offline' | 'pending' | 'locked'
}

interface HudTelemetryCode {
  code: string
  prefix?: string
}

interface Props {
  title?: string
  meter: HudTelemetryMeter
  status: HudTelemetryStatus
  code: HudTelemetryCode
}

defineProps<Props>()
</script>

<template>
  <div class="flex flex-col gap-2 border border-primary/20 bg-surface_container_lowest px-3 py-2">
    <span
      v-if="title"
      class="font-mono text-[10px] uppercase tracking-widest text-primary/40"
    >{{ title }}</span>
    <HudMeterBar
      :label="meter.label"
      :value="meter.value"
      :progress="meter.progress"
    />
    <div class="flex items-center justify-between gap-4">
      <HudStatusLine
        :label="status.label"
        :status="status.status"
      />
      <HudCodeReadout
        :code="code.code"
        :prefix="code.prefix"
      />
    </div>
  </div>
</template>
