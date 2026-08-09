<script setup lang="ts">
interface HudKnobValue {
  label: string
  /** Click offset from center, signed; clamped to [-max, max]. */
  value: number
  max?: number
}

interface Props {
  knobs?: HudKnobValue[]
}

const props = withDefaults(defineProps<Props>(), {
  knobs: () => [
    { label: 'ELEV', value: 4, max: 12 },
    { label: 'WIND', value: -2, max: 12 },
  ],
})

const SWEEP_DEGREES = 150
const TICK_COUNT = 8

const tickAngles = Array.from({ length: TICK_COUNT }, (_, index) => index * (360 / TICK_COUNT))

const resolvedKnobs = computed(() => props.knobs.map((knob) => {
  const max = knob.max ?? 10
  const clampedValue = Math.min(Math.max(Math.round(knob.value), -max), max)
  const angle = max === 0 ? 0 : (clampedValue / max) * SWEEP_DEGREES

  return {
    label: knob.label,
    max,
    value: clampedValue,
    angle,
    valueLabel: `${clampedValue > 0 ? '+' : ''}${clampedValue}`,
  }
}))
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <div
      v-for="knob in resolvedKnobs"
      :key="knob.label"
      class="flex flex-col items-center gap-1.5"
    >
      <div class="relative h-12 w-12 rounded-full border border-primary_fixed_dim/35 bg-surface_container_lowest">
        <svg
          viewBox="0 0 100 100"
          class="absolute inset-0 h-full w-full"
        >
          <line
            v-for="angle in tickAngles"
            :key="angle"
            x1="50"
            y1="4"
            x2="50"
            y2="12"
            :transform="`rotate(${angle} 50 50)`"
            class="stroke-outline_variant/30"
            stroke-width="1.5"
          />
        </svg>

        <div
          class="hud-motion-target hud-anim-knob-turn absolute left-1/2 top-1/2 h-1/2 w-px origin-bottom bg-primary"
          :style="{ transform: `translateX(-50%) translateY(-100%) rotate(${knob.angle}deg)` }"
        />
        <span class="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary_fixed_dim" />
      </div>

      <div class="flex flex-col items-center gap-0.5">
        <span class="font-mono text-[9px] uppercase tracking-widest text-primary/40">{{ knob.label }}</span>
        <span class="font-mono text-xs text-primary">{{ knob.valueLabel }}</span>
      </div>
    </div>
  </div>
</template>
