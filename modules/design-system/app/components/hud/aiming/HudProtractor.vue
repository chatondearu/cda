<script setup lang="ts">
interface Props {
  degrees: number
  label?: string
  /** Degree interval between major (longer) ticks. */
  majorStep?: number
}

const props = withDefaults(defineProps<Props>(), {
  majorStep: 30,
})

const TICK_STEP = 15
const TICK_COUNT = 360 / TICK_STEP

const normalizedDegrees = computed(() => ((Math.round(props.degrees) % 360) + 360) % 360)
const degreesLabel = computed(() => `${String(normalizedDegrees.value).padStart(3, '0')}\u00B0`)

const ticks = computed(() => Array.from({ length: TICK_COUNT }, (_, index) => {
  const angle = index * TICK_STEP
  return {
    angle,
    isMajor: angle % props.majorStep === 0,
  }
}))
</script>

<template>
  <div class="flex flex-col items-center gap-2">
    <div class="relative h-28 w-28 rounded-full border border-primary_fixed_dim/35 bg-surface_container_lowest">
      <svg
        viewBox="0 0 100 100"
        class="absolute inset-0 h-full w-full"
      >
        <line
          v-for="tick in ticks"
          :key="tick.angle"
          x1="50"
          :y1="tick.isMajor ? 3 : 5"
          x2="50"
          y2="10"
          :transform="`rotate(${tick.angle} 50 50)`"
          :class="tick.isMajor ? 'stroke-primary_fixed_dim/60' : 'stroke-outline_variant/30'"
          :stroke-width="tick.isMajor ? 1.5 : 1"
        />
      </svg>

      <span class="absolute left-1/2 top-1 -translate-x-1/2 font-mono text-[8px] text-primary/40">0</span>
      <span class="absolute right-1 top-1/2 -translate-y-1/2 font-mono text-[8px] text-primary/40">90</span>
      <span class="absolute bottom-1 left-1/2 -translate-x-1/2 font-mono text-[8px] text-primary/40">180</span>
      <span class="absolute left-1 top-1/2 -translate-y-1/2 font-mono text-[8px] text-primary/40">270</span>

      <div
        class="hud-motion-target hud-anim-protractor-sweep absolute left-1/2 top-1/2 h-1/2 w-px origin-bottom bg-primary"
        :style="{ transform: `translateX(-50%) translateY(-100%) rotate(${normalizedDegrees}deg)` }"
      />
      <span class="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary_fixed_dim" />
    </div>

    <div class="flex flex-col items-center gap-0.5">
      <span
        v-if="label"
        class="font-mono text-[9px] uppercase tracking-widest text-primary/40"
      >{{ label }}</span>
      <span class="font-mono text-sm text-primary">{{ degreesLabel }}</span>
    </div>
  </div>
</template>
