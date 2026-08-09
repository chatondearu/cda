<script setup lang="ts">
export type HudCommsStatus = 'link' | 'no-link' | 'scanning'

interface HudCommsStatusConfig {
  border: string
  text: string
  barBorder: string
  barFill: string
  label: string
}

interface Props {
  channel: string
  frequency?: string
  signal?: number
  encrypted?: boolean
  status?: HudCommsStatus
}

const props = withDefaults(defineProps<Props>(), {
  signal: 3,
  encrypted: false,
  status: 'link',
})

const SIGNAL_BARS = 5

function resolveStatusConfig(status: HudCommsStatus): HudCommsStatusConfig {
  switch (status) {
    case 'link':
      return { border: 'border-primary/50', text: 'text-primary', barBorder: 'border-primary', barFill: 'bg-primary', label: 'LINK' }
    case 'no-link':
      return { border: 'border-error/50', text: 'text-error', barBorder: 'border-error', barFill: 'bg-error', label: 'NO LINK' }
    case 'scanning':
      return { border: 'border-tertiary/50', text: 'text-tertiary', barBorder: 'border-tertiary', barFill: 'bg-tertiary', label: 'SCANNING' }
    default: {
      const exhaustiveCheck: never = status
      return exhaustiveCheck
    }
  }
}

const statusConfig = computed(() => resolveStatusConfig(props.status))
const clampedSignal = computed(() => Math.min(Math.max(props.signal, 0), SIGNAL_BARS))
const bars = computed(() => Array.from({ length: SIGNAL_BARS }, (_, index) => ({
  index,
  isActive: index < clampedSignal.value,
})))
const isScanning = computed(() => props.status === 'scanning')
</script>

<template>
  <div
    class="inline-flex w-56 flex-col gap-1.5 border bg-surface_container_lowest px-3 py-2"
    :class="statusConfig.border"
  >
    <div class="flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-primary/40">
      <span>{{ channel }}</span>
      <span :class="[statusConfig.text, isScanning ? 'hud-motion-target hud-anim-lock-pulse' : '']">{{ statusConfig.label }}</span>
    </div>

    <div class="flex items-end justify-between gap-3">
      <span
        v-if="frequency"
        class="font-mono text-sm text-primary"
      >{{ frequency }}</span>
      <div class="flex items-end gap-0.5">
        <span
          v-for="bar in bars"
          :key="bar.index"
          class="hud-motion-target hud-anim-segment-fill w-1 border"
          :style="{ height: `${6 + bar.index * 3}px` }"
          :class="bar.isActive ? [statusConfig.barBorder, statusConfig.barFill] : 'border-outline_variant/25 bg-transparent'"
        />
      </div>
    </div>

    <div
      v-if="encrypted"
      class="flex items-center gap-1 font-mono text-[8px] uppercase tracking-widest text-primary/40"
    >
      <span class="h-1.5 w-1.5 border border-primary/50" />
      <span>ENCRYPTED</span>
    </div>
  </div>
</template>
