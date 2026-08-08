<script setup lang="ts">
type PacketLossTone = 'nominal' | 'degraded' | 'critical'

interface PacketLossToneClasses {
  text: string
  border: string
  statusLabel: string
}

interface Props {
  percent: number
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: 'PACKET LOSS',
})

const NOMINAL_MAX_PERCENT = 2
const DEGRADED_MAX_PERCENT = 10

function resolveTone(percent: number): PacketLossTone {
  if (percent <= NOMINAL_MAX_PERCENT) {
    return 'nominal'
  }

  if (percent <= DEGRADED_MAX_PERCENT) {
    return 'degraded'
  }

  return 'critical'
}

function resolveToneClasses(tone: PacketLossTone): PacketLossToneClasses {
  switch (tone) {
    case 'nominal':
      return { text: 'text-primary', border: 'border-primary/40', statusLabel: 'NOMINAL' }
    case 'degraded':
      return { text: 'text-tertiary', border: 'border-tertiary/40', statusLabel: 'DEGRADED' }
    case 'critical':
      return { text: 'text-error', border: 'border-error/60', statusLabel: 'CRITICAL' }
    default: {
      const exhaustiveCheck: never = tone
      return exhaustiveCheck
    }
  }
}

const clampedPercent = computed(() => Math.min(Math.max(props.percent, 0), 100))
const tone = computed(() => resolveTone(clampedPercent.value))
const toneClasses = computed(() => resolveToneClasses(tone.value))
</script>

<template>
  <div
    class="flex flex-col gap-1 border-l-2 bg-surface_container_lowest px-3 py-2"
    :class="toneClasses.border"
  >
    <div class="flex items-center justify-between gap-3 font-mono text-[9px] uppercase tracking-widest">
      <span class="text-primary/40">{{ label }}</span>
      <span :class="toneClasses.text">{{ toneClasses.statusLabel }}</span>
    </div>
    <span
      class="font-mono text-lg"
      :class="toneClasses.text"
    >{{ clampedPercent.toFixed(1) }}%</span>
  </div>
</template>
