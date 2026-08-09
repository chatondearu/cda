<script setup lang="ts">
export type HudBigArrowDirection = 'up' | 'right' | 'down' | 'left'
export type HudBigArrowTone = 'active' | 'warning' | 'error' | 'idle'

interface Props {
  direction: HudBigArrowDirection
  label?: string
  tone?: HudBigArrowTone
}

const props = withDefaults(defineProps<Props>(), {
  tone: 'active',
})

const toneClassMap: Record<HudBigArrowTone, string> = {
  active: 'text-primary',
  warning: 'text-tertiary',
  error: 'text-error',
  idle: 'text-on_surface_variant/50',
}

// Base shape points right; rotate the whole glyph to face the other cardinal directions.
const directionRotationMap: Record<HudBigArrowDirection, string> = {
  right: 'rotate-0',
  down: 'rotate-90',
  left: 'rotate-180',
  up: '-rotate-90',
}

const svgClass = computed(() => [toneClassMap[props.tone], directionRotationMap[props.direction]])
</script>

<template>
  <div class="inline-flex flex-col items-center gap-1">
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      class="h-10 w-10 origin-center"
      :class="svgClass"
    >
      <polygon points="2,12 18,12 18,4 30,16 18,28 18,20 2,20" />
    </svg>
    <span
      v-if="label"
      class="font-mono text-[9px] uppercase tracking-widest"
      :class="toneClassMap[tone]"
    >{{ label }}</span>
  </div>
</template>
