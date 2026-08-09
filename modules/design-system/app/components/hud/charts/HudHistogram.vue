<script setup lang="ts">
interface Props {
  seed?: string
  bins?: number
  /** Render the animated scan overlay (still gated by the global HUD motion switch). */
  sweep?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  seed: 'HUD-HISTOGRAM',
  bins: 20,
  sweep: true,
})

const MIN_HEIGHT_PERCENT = 8
const MAX_HEIGHT_PERCENT = 100

// Bias the distribution toward the middle bins (bell-shape) so the histogram
// reads as a frequency distribution rather than uniform noise (HudWaveform).
const binHeights = computed(() => {
  const base = hashSeed(props.seed)
  const center = (props.bins - 1) / 2

  return Array.from({ length: props.bins }, (_, index) => {
    const unit = seededUnit(base, index)
    const distanceFromCenter = center === 0 ? 0 : Math.abs(index - center) / center
    const bellFactor = 1 - (distanceFromCenter ** 2) * 0.75
    const height = MAX_HEIGHT_PERCENT * bellFactor * (0.55 + unit * 0.45)

    return Math.min(MAX_HEIGHT_PERCENT, Math.max(MIN_HEIGHT_PERCENT, Math.round(height)))
  })
})
</script>

<template>
  <div class="relative flex h-16 items-end gap-px overflow-hidden border-b border-primary/30 bg-surface_container_lowest px-2 pt-1">
    <span
      v-for="(height, index) in binHeights"
      :key="index"
      class="flex-1 bg-primary/50"
      :style="{ height: `${height}%` }"
    />

    <span
      v-if="sweep"
      class="hud-motion-target hud-anim-waveform-sweep pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-primary/10"
    />
  </div>
</template>
