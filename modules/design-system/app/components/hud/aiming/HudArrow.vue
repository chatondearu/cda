<script setup lang="ts">
interface Props {
  bearing: number
  label?: string
  /** Shaft length factor, 0.2–1; scales the vector magnitude. */
  magnitude?: number
}

const props = withDefaults(defineProps<Props>(), {
  magnitude: 1,
})

const MIN_MAGNITUDE = 0.2
const MAX_MAGNITUDE = 1
const SHAFT_LENGTH = 16

const normalizedBearing = computed(() => ((Math.round(props.bearing) % 360) + 360) % 360)
const clampedMagnitude = computed(() => Math.min(Math.max(props.magnitude, MIN_MAGNITUDE), MAX_MAGNITUDE))
const shaftLength = computed(() => Math.round(clampedMagnitude.value * SHAFT_LENGTH * 100) / 100)
const bearingLabel = computed(() => `${String(normalizedBearing.value).padStart(3, '0')}\u00B0`)
</script>

<template>
  <div class="flex flex-col items-center gap-2 border border-outline_variant/20 bg-surface_container_lowest px-3 py-2">
    <div class="relative h-12 w-12">
      <svg
        viewBox="0 0 24 24"
        class="h-full w-full"
      >
        <g :transform="`rotate(${normalizedBearing} 12 12)`">
          <line
            x1="12"
            y1="12"
            x2="12"
            :y2="12 - shaftLength"
            class="stroke-primary_fixed_dim"
            stroke-width="1.25"
            stroke-linecap="round"
          />
          <path
            :d="`M 12 ${12 - shaftLength - 3} L 9 ${12 - shaftLength + 2} L 15 ${12 - shaftLength + 2} Z`"
            class="fill-primary"
          />
        </g>
      </svg>

      <span class="hud-motion-target hud-anim-crosshair-breathe absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary_fixed_dim" />
    </div>

    <div class="flex flex-col items-center gap-0.5">
      <span
        v-if="label"
        class="font-mono text-[9px] uppercase tracking-widest text-primary/40"
      >{{ label }}</span>
      <span class="font-mono text-sm text-primary">{{ bearingLabel }}</span>
    </div>
  </div>
</template>
