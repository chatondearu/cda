<script setup lang="ts">
interface Props {
  seed?: string
  points?: number
  /** Fill the area under the trace, not just stroke the line. */
  filled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  seed: 'HUD-SPARKLINE',
  points: 16,
  filled: false,
})

const VIEW_WIDTH = 100
const VIEW_HEIGHT = 32
const TOP_MARGIN = 3
const BOTTOM_MARGIN = 3
const PLOT_HEIGHT = VIEW_HEIGHT - TOP_MARGIN - BOTTOM_MARGIN

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

  return `${first.x},${VIEW_HEIGHT} ${linePoints.value} ${last.x},${VIEW_HEIGHT}`
})

const lastPoint = computed(() => trace.value.at(-1))
</script>

<template>
  <div class="inline-flex h-10 w-32 items-stretch border border-primary/20 bg-surface_container_lowest px-1.5 py-1">
    <svg
      :viewBox="`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`"
      preserveAspectRatio="none"
      class="h-full w-full"
    >
      <polygon
        v-if="filled"
        :points="areaPoints"
        class="fill-primary/10"
      />
      <polyline
        :points="linePoints"
        fill="none"
        stroke-width="1.5"
        stroke-linejoin="round"
        stroke-linecap="round"
        class="stroke-primary"
      />
      <circle
        v-if="lastPoint"
        :cx="lastPoint.x"
        :cy="lastPoint.y"
        r="1.6"
        class="fill-primary"
      />
    </svg>
  </div>
</template>
