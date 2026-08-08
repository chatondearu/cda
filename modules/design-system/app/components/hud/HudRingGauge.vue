<script setup lang="ts">
interface Props {
  value: number
  label?: string
  max?: number
}

const props = withDefaults(defineProps<Props>(), {
  max: 100,
})

// r = 15.9155 gives a circumference of ~100 in the "0 0 36 36" viewBox,
// so the arc length maps directly to a percentage.
const RADIUS = 15.9155

const clampedValue = computed(() => Math.min(Math.max(props.value, 0), props.max))
const percent = computed(() => Math.round((clampedValue.value / props.max) * 100))
const dashArray = computed(() => `${percent.value} ${100 - percent.value}`)
</script>

<template>
  <div class="flex flex-col items-center gap-2">
    <div class="relative h-20 w-20">
      <svg
        viewBox="0 0 36 36"
        class="h-full w-full -rotate-90"
      >
        <circle
          cx="18"
          cy="18"
          :r="RADIUS"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          class="text-outline_variant/25"
        />
        <circle
          cx="18"
          cy="18"
          :r="RADIUS"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          :stroke-dasharray="dashArray"
          class="hud-motion-target hud-anim-ring-fill text-primary"
        />
      </svg>
      <div class="absolute inset-0 flex items-center justify-center font-mono text-[10px] text-primary">
        {{ percent }}%
      </div>
    </div>
    <span
      v-if="label"
      class="font-mono text-[10px] uppercase tracking-widest text-primary/40"
    >{{ label }}</span>
  </div>
</template>
