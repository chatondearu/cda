<script setup lang="ts">
export type HudThreatLevel = 'low' | 'moderate' | 'high' | 'critical'

interface HudThreatLevelConfig {
  index: number
  border: string
  fill: string
  text: string
  label: string
}

interface Props {
  level?: HudThreatLevel
  designation?: string
}

const props = withDefaults(defineProps<Props>(), {
  level: 'low',
})

const LEVELS: HudThreatLevel[] = ['low', 'moderate', 'high', 'critical']

function resolveLevelConfig(level: HudThreatLevel): HudThreatLevelConfig {
  switch (level) {
    case 'low':
      return { index: 1, border: 'border-primary', fill: 'bg-primary', text: 'text-primary', label: 'LOW' }
    case 'moderate':
      return { index: 2, border: 'border-tertiary', fill: 'bg-tertiary', text: 'text-tertiary', label: 'MODERATE' }
    case 'high':
      return { index: 3, border: 'border-error', fill: 'bg-error', text: 'text-error', label: 'HIGH' }
    case 'critical':
      return { index: 4, border: 'border-error', fill: 'bg-error', text: 'text-error', label: 'CRITICAL' }
    default: {
      const exhaustiveCheck: never = level
      return exhaustiveCheck
    }
  }
}

const config = computed(() => resolveLevelConfig(props.level))
const isCritical = computed(() => props.level === 'critical')
</script>

<template>
  <div
    class="inline-flex w-52 flex-col gap-2 border-2 bg-surface_container_lowest px-3 py-2"
    :class="config.border"
  >
    <div class="flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-primary/40">
      <span>THREAT LEVEL</span>
      <span v-if="designation">{{ designation }}</span>
    </div>

    <div class="flex gap-0.5">
      <span
        v-for="(lvl, index) in LEVELS"
        :key="lvl"
        class="h-2 flex-1 border"
        :class="index < config.index
          ? [config.border, config.fill, isCritical ? 'hud-motion-target hud-anim-lock-pulse' : '']
          : 'border-outline_variant/25'"
      />
    </div>

    <span
      class="font-mono text-sm font-bold uppercase tracking-widest"
      :class="config.text"
    >{{ config.label }}</span>
  </div>
</template>
