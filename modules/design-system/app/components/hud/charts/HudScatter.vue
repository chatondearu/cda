<script setup lang="ts">
interface Props {
  seed?: string
  points?: number
  /** Fraction of points flagged as outliers, rendered in the `error` tone. */
  outlierThreshold?: number
}

const props = withDefaults(defineProps<Props>(), {
  seed: 'HUD-SCATTER',
  points: 32,
  outlierThreshold: 0.88,
})

const VIEW_WIDTH = 100
const VIEW_HEIGHT = 60
const MARGIN = 5
const POINT_SEED_STEP = 401

const plottedPoints = computed(() => {
  const base = hashSeed(props.seed)

  return Array.from({ length: props.points }, (_, index) => {
    const xUnit = seededUnit(base, index * 2)
    const yUnit = seededUnit(base, index * 2 + 1)
    const outlierUnit = seededUnit((base + POINT_SEED_STEP) >>> 0, index)

    return {
      x: Math.round((MARGIN + xUnit * (VIEW_WIDTH - MARGIN * 2)) * 100) / 100,
      y: Math.round((MARGIN + (1 - yUnit) * (VIEW_HEIGHT - MARGIN * 2)) * 100) / 100,
      isOutlier: outlierUnit > props.outlierThreshold,
    }
  })
})
</script>

<template>
  <div class="h-32 w-full border border-primary/20 bg-surface_container_lowest px-2 py-2">
    <svg
      :viewBox="`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`"
      preserveAspectRatio="none"
      class="h-full w-full"
    >
      <line
        :x1="MARGIN"
        :x2="VIEW_WIDTH - MARGIN"
        :y1="VIEW_HEIGHT - MARGIN"
        :y2="VIEW_HEIGHT - MARGIN"
        class="stroke-outline_variant/30"
        stroke-width="0.5"
      />
      <line
        :x1="MARGIN"
        :x2="MARGIN"
        :y1="MARGIN"
        :y2="VIEW_HEIGHT - MARGIN"
        class="stroke-outline_variant/30"
        stroke-width="0.5"
      />

      <circle
        v-for="(point, index) in plottedPoints"
        :key="index"
        :cx="point.x"
        :cy="point.y"
        r="1.4"
        :class="point.isOutlier ? 'fill-error/80' : 'fill-primary/60'"
      />
    </svg>
  </div>
</template>
