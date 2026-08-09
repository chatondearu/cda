<script setup lang="ts">
interface Props {
  /** Horizontal offset, -1 (left) to 1 (right). */
  x: number
  /** Vertical offset, -1 (down) to 1 (up). */
  y: number
  label?: string
}

const props = defineProps<Props>()

const TRAVEL_PERCENT = 45

const clampedX = computed(() => Math.min(Math.max(props.x, -1), 1))
const clampedY = computed(() => Math.min(Math.max(props.y, -1), 1))

const dotLeft = computed(() => 50 + clampedX.value * TRAVEL_PERCENT)
const dotTop = computed(() => 50 - clampedY.value * TRAVEL_PERCENT)

const xLabel = computed(() => `X ${clampedX.value.toFixed(2)}`)
const yLabel = computed(() => `Y ${clampedY.value.toFixed(2)}`)
</script>

<template>
  <div class="flex flex-col items-center gap-2">
    <div class="relative h-16 w-16 border border-primary_fixed_dim/35 bg-surface_container_lowest">
      <span class="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-primary_fixed_dim/15" />
      <span class="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-primary_fixed_dim/15" />

      <span
        class="hud-motion-target hud-anim-axis-drift absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
        :style="{ left: `${dotLeft}%`, top: `${dotTop}%` }"
      />
    </div>

    <div class="flex flex-col items-center gap-0.5">
      <span
        v-if="label"
        class="font-mono text-[9px] uppercase tracking-widest text-primary/40"
      >{{ label }}</span>
      <div class="flex gap-3 font-mono text-[9px] text-primary/60">
        <span>{{ xLabel }}</span>
        <span>{{ yLabel }}</span>
      </div>
    </div>
  </div>
</template>
