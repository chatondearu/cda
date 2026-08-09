<script setup lang="ts">
interface Props {
  seed?: string
  points?: number
  /** Render the animated scan overlay (still gated by the global HUD motion switch). */
  sweep?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  seed: 'HUD-OSCILLOSCOPE',
  points: 48,
  sweep: true,
})

const VIEW_WIDTH = 100
const VIEW_HEIGHT = 40
const CENTER_Y = VIEW_HEIGHT / 2
const AMPLITUDE = VIEW_HEIGHT / 2 - 4
const GRID_COLUMNS = 8
const GRID_ROWS = 4

const columnLines = computed(() =>
  Array.from({ length: GRID_COLUMNS - 1 }, (_, index) => ((index + 1) * VIEW_WIDTH) / GRID_COLUMNS),
)

const rowLines = computed(() =>
  Array.from({ length: GRID_ROWS - 1 }, (_, index) => ((index + 1) * VIEW_HEIGHT) / GRID_ROWS),
)

const trace = computed(() => {
  const base = hashSeed(props.seed)
  const step = VIEW_WIDTH / (props.points - 1)

  return Array.from({ length: props.points }, (_, index) => {
    const unit = seededUnit(base, index) * 2 - 1
    return {
      x: Math.round(index * step * 100) / 100,
      y: Math.round((CENTER_Y - unit * AMPLITUDE) * 100) / 100,
    }
  })
})

const linePoints = computed(() => trace.value.map(point => `${point.x},${point.y}`).join(' '))
</script>

<template>
  <div class="relative h-24 overflow-hidden border border-primary/20 bg-surface_container_lowest">
    <svg
      :viewBox="`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`"
      preserveAspectRatio="none"
      class="h-full w-full"
    >
      <line
        v-for="x in columnLines"
        :key="`col-${x}`"
        :x1="x"
        :x2="x"
        y1="0"
        :y2="VIEW_HEIGHT"
        class="stroke-outline_variant/15"
        stroke-width="0.4"
      />
      <line
        v-for="y in rowLines"
        :key="`row-${y}`"
        x1="0"
        :x2="VIEW_WIDTH"
        :y1="y"
        :y2="y"
        class="stroke-outline_variant/15"
        stroke-width="0.4"
      />
      <line
        x1="0"
        :x2="VIEW_WIDTH"
        :y1="CENTER_Y"
        :y2="CENTER_Y"
        class="stroke-primary/25"
        stroke-width="0.5"
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
      class="hud-motion-target hud-anim-waveform-sweep pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-primary/10"
    />
  </div>
</template>
