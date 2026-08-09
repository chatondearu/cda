<script setup lang="ts">
interface Props {
  seed?: string
  points?: number
  label?: string
  /** Render the animated scan overlay (still gated by the global HUD motion switch). */
  sweep?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  seed: 'HUD-GRAPH',
  points: 20,
  sweep: true,
})

const VIEW_WIDTH = 100
const VIEW_HEIGHT = 48
const TOP_MARGIN = 4
const BOTTOM_MARGIN = 4
const PLOT_HEIGHT = VIEW_HEIGHT - TOP_MARGIN - BOTTOM_MARGIN
const GRID_ROWS = 4

const gridLines = computed(() =>
  Array.from({ length: GRID_ROWS - 1 }, (_, index) => TOP_MARGIN + ((index + 1) * PLOT_HEIGHT) / GRID_ROWS),
)

const trace = computed(() => {
  const base = hashSeed(props.seed)
  const step = VIEW_WIDTH / (props.points - 1)

  return Array.from({ length: props.points }, (_, index) => {
    const unit = seededUnit(base, index)
    return {
      x: Math.round(index * step * 100) / 100,
      y: Math.round((TOP_MARGIN + (1 - unit) * PLOT_HEIGHT) * 100) / 100,
    }
  })
})

const linePoints = computed(() => trace.value.map(point => `${point.x},${point.y}`).join(' '))

const areaPoints = computed(() => {
  const last = trace.value.at(-1)
  const first = trace.value[0]
  if (!last || !first)
    return ''

  return `${first.x},${VIEW_HEIGHT - BOTTOM_MARGIN} ${linePoints.value} ${last.x},${VIEW_HEIGHT - BOTTOM_MARGIN}`
})
</script>

<template>
  <div class="flex flex-col gap-1">
    <div class="relative h-24 overflow-hidden border border-primary/20 bg-surface_container_lowest px-2 py-1">
      <svg
        :viewBox="`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`"
        preserveAspectRatio="none"
        class="h-full w-full"
      >
        <line
          v-for="y in gridLines"
          :key="y"
          x1="0"
          :x2="VIEW_WIDTH"
          :y1="y"
          :y2="y"
          class="stroke-outline_variant/20"
          stroke-width="0.5"
        />
        <polygon
          :points="areaPoints"
          class="fill-primary/10"
        />
        <polyline
          :points="linePoints"
          fill="none"
          stroke-width="1.25"
          stroke-linejoin="round"
          stroke-linecap="round"
          class="stroke-primary"
        />
      </svg>

      <span
        v-if="sweep"
        class="hud-motion-target hud-anim-waveform-sweep pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-primary/10"
      />
    </div>

    <span
      v-if="label"
      class="font-mono text-[9px] uppercase tracking-widest text-primary/40"
    >{{ label }}</span>
  </div>
</template>
