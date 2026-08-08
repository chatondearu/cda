<script setup lang="ts">
interface Props {
  rings?: number
  blipAngle?: number
  /** Render the rotating sweep line (still gated by the global HUD motion switch). */
  sweep?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  rings: 3,
  blipAngle: 45,
  sweep: true,
})

const MIN_RINGS = 1
const MAX_RINGS = 5

const clampedRings = computed(() => Math.min(Math.max(Math.round(props.rings), MIN_RINGS), MAX_RINGS))
const clampedAngle = computed(() => ((Math.round(props.blipAngle) % 360) + 360) % 360)

// Inner concentric rings only — the outer boundary is the component's own border.
const innerRingInsets = computed(() =>
  Array.from({ length: clampedRings.value - 1 }, (_, index) => ((index + 1) * 50) / clampedRings.value),
)
</script>

<template>
  <div class="relative h-24 w-24 rounded-full border border-primary_fixed_dim/35 bg-surface_container_lowest">
    <span
      v-for="inset in innerRingInsets"
      :key="inset"
      class="absolute rounded-full border border-outline_variant/20"
      :style="{ inset: `${inset}%` }"
    />

    <div
      v-if="sweep"
      class="hud-motion-target hud-anim-radar-sweep pointer-events-none absolute inset-0"
    >
      <span
        class="absolute left-1/2 top-1/2 h-1/2 w-px origin-bottom bg-gradient-to-t from-primary/50 to-transparent"
        style="transform: translateX(-50%) translateY(-100%)"
      />
    </div>

    <div
      class="absolute left-1/2 top-1/2 h-1/2 w-px origin-bottom bg-primary_fixed_dim/60"
      :style="{ transform: `translateX(-50%) translateY(-100%) rotate(${clampedAngle}deg)` }"
    >
      <span class="absolute -top-0.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-primary" />
    </div>

    <span class="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary_fixed_dim" />
  </div>
</template>
