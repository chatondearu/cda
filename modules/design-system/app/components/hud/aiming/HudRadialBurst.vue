<script setup lang="ts">
interface Props {
  /** Number of radiating spokes. */
  spokes?: number
  /** Index of the spoke to highlight (e.g. an active bearing). */
  highlightIndex?: number
  /** Breathe the highlighted spoke (still gated by the global HUD motion switch). */
  pulse?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  spokes: 16,
  highlightIndex: -1,
  pulse: true,
})

const MIN_SPOKES = 4
const MAX_SPOKES = 32

const clampedSpokes = computed(() => Math.min(Math.max(Math.round(props.spokes), MIN_SPOKES), MAX_SPOKES))

const spokeLines = computed(() => Array.from({ length: clampedSpokes.value }, (_, index) => ({
  angle: index * (360 / clampedSpokes.value),
  isHighlighted: index === props.highlightIndex,
  isEven: index % 2 === 0,
})))
</script>

<template>
  <div class="relative h-24 w-24 rounded-full border border-outline_variant/15 bg-surface_container_lowest">
    <svg
      viewBox="0 0 100 100"
      class="absolute inset-0 h-full w-full"
    >
      <line
        v-for="spoke in spokeLines"
        :key="spoke.angle"
        x1="50"
        y1="4"
        x2="50"
        y2="20"
        :transform="`rotate(${spoke.angle} 50 50)`"
        stroke-linecap="round"
        :stroke-width="spoke.isHighlighted ? 2 : 1"
        :class="[
          spoke.isHighlighted && pulse ? 'hud-motion-target hud-anim-crosshair-breathe-subtle' : '',
          spoke.isHighlighted ? 'stroke-primary' : (spoke.isEven ? 'stroke-primary_fixed_dim/40' : 'stroke-outline_variant/25'),
        ]"
      />
      <circle
        cx="50"
        cy="50"
        r="2"
        class="fill-primary_fixed_dim"
      />
    </svg>
  </div>
</template>
