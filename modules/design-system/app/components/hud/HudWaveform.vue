<script setup lang="ts">
interface Props {
  seed?: string
  bars?: number
  /** Render the animated scan overlay (still gated by the global HUD motion switch). */
  sweep?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  seed: 'HUD-WAVEFORM',
  bars: 24,
  sweep: true,
})

const MIN_HEIGHT_PERCENT = 12
const MAX_HEIGHT_PERCENT = 100

const barHeights = computed(() => {
  const base = hashSeed(props.seed)

  return Array.from({ length: props.bars }, (_, index) => {
    const unit = seededUnit(base, index)
    return MIN_HEIGHT_PERCENT + Math.round(unit * (MAX_HEIGHT_PERCENT - MIN_HEIGHT_PERCENT))
  })
})
</script>

<template>
  <div class="relative flex h-16 items-end gap-0.5 overflow-hidden border border-primary/20 bg-surface_container_lowest px-2 py-1">
    <span
      v-for="(height, index) in barHeights"
      :key="index"
      class="flex-1 bg-primary/60"
      :style="{ height: `${height}%` }"
    />

    <span
      v-if="sweep"
      class="hud-motion-target hud-anim-waveform-sweep pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-primary/10"
    />
  </div>
</template>
