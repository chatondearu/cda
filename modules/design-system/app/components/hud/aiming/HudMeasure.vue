<script setup lang="ts">
interface Props {
  value: number
  min?: number
  max?: number
  unit?: string
  label?: string
  /** Number of minor tick segments across the strip. */
  ticks?: number
}

const props = withDefaults(defineProps<Props>(), {
  min: 0,
  max: 100,
  unit: '',
  ticks: 10,
})

const MIN_TICKS = 2
const MAX_TICKS = 40
const MAJOR_INTERVAL = 5

const clampedTicks = computed(() => Math.min(Math.max(Math.round(props.ticks), MIN_TICKS), MAX_TICKS))
const clampedValue = computed(() => Math.min(Math.max(props.value, props.min), props.max))
const valuePercent = computed(() => ((clampedValue.value - props.min) / (props.max - props.min)) * 100)

const tickMarks = computed(() => Array.from({ length: clampedTicks.value + 1 }, (_, index) => ({
  percent: (index / clampedTicks.value) * 100,
  isMajor: index % MAJOR_INTERVAL === 0,
})))

const valueLabel = computed(() => `${Math.round(clampedValue.value * 100) / 100}${props.unit}`)
const minLabel = computed(() => `${props.min}${props.unit}`)
const maxLabel = computed(() => `${props.max}${props.unit}`)
</script>

<template>
  <div class="flex flex-col gap-2 border border-outline_variant/20 bg-surface_container_lowest px-3 py-2">
    <div class="flex items-baseline justify-between gap-2">
      <span
        v-if="label"
        class="font-mono text-[9px] uppercase tracking-widest text-primary/40"
      >{{ label }}</span>
      <span class="font-mono text-sm text-primary">{{ valueLabel }}</span>
    </div>

    <div class="relative h-4 border-b border-outline_variant/30">
      <span
        v-for="tick in tickMarks"
        :key="tick.percent"
        class="absolute bottom-0 w-px -translate-x-1/2"
        :class="tick.isMajor ? 'h-2.5 bg-primary_fixed_dim/50' : 'h-1.5 bg-outline_variant/30'"
        :style="{ left: `${tick.percent}%` }"
      />

      <span
        class="hud-motion-target hud-anim-measure-slide absolute -top-1 h-2 w-2 -translate-x-1/2 rotate-45 bg-primary"
        :style="{ left: `${valuePercent}%` }"
      />
    </div>

    <div class="flex justify-between font-mono text-[8px] uppercase tracking-widest text-primary/30">
      <span>{{ minLabel }}</span>
      <span>{{ maxLabel }}</span>
    </div>
  </div>
</template>
