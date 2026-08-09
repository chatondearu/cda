<script setup lang="ts">
interface Props {
  /** Displayed magnification factor, e.g. `4` renders `4X`. */
  magnification?: number
  /** Mil-dot ticks per half-axis (each of the 4 crosshair arms). */
  milDots?: number
  /** Render the slow-rotating outer ring (still gated by the global HUD motion switch). */
  rotateRing?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  magnification: 4,
  milDots: 3,
  rotateRing: true,
})

const MIN_DOTS = 1
const MAX_DOTS = 5

const clampedDots = computed(() => Math.min(Math.max(Math.round(props.milDots), MIN_DOTS), MAX_DOTS))

// Even spacing from center to edge, excluding the center itself.
const dotOffsets = computed(() =>
  Array.from({ length: clampedDots.value }, (_, index) => ((index + 1) * 50) / (clampedDots.value + 1)),
)

const magnificationLabel = computed(() => `${Math.round(props.magnification)}X`)
</script>

<template>
  <div class="relative h-28 w-28 overflow-hidden rounded-full border-2 border-primary_fixed_dim/40 bg-surface_container_lowest">
    <span class="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-primary_fixed_dim/30" />
    <span class="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-primary_fixed_dim/30" />

    <template
      v-for="offset in dotOffsets"
      :key="offset"
    >
      <span
        class="absolute h-1 w-1 -translate-x-1/2 -translate-y-1/2 bg-primary_fixed_dim/50"
        :style="{ left: `${50 + offset}%`, top: '50%' }"
      />
      <span
        class="absolute h-1 w-1 -translate-x-1/2 -translate-y-1/2 bg-primary_fixed_dim/50"
        :style="{ left: `${50 - offset}%`, top: '50%' }"
      />
      <span
        class="absolute h-1 w-1 -translate-x-1/2 -translate-y-1/2 bg-primary_fixed_dim/50"
        :style="{ left: '50%', top: `${50 + offset}%` }"
      />
      <span
        class="absolute h-1 w-1 -translate-x-1/2 -translate-y-1/2 bg-primary_fixed_dim/50"
        :style="{ left: '50%', top: `${50 - offset}%` }"
      />
    </template>

    <div
      v-if="rotateRing"
      class="hud-motion-target hud-anim-crosshair-rotate absolute inset-1 rounded-full border border-dashed border-outline_variant/25"
    />

    <span class="absolute left-1/2 top-0.5 h-1.5 w-px -translate-x-1/2 bg-primary/60" />
    <span class="absolute bottom-0.5 left-1/2 h-1.5 w-px -translate-x-1/2 bg-primary/60" />
    <span class="absolute left-0.5 top-1/2 h-px w-1.5 -translate-y-1/2 bg-primary/60" />
    <span class="absolute right-0.5 top-1/2 h-px w-1.5 -translate-y-1/2 bg-primary/60" />

    <span class="absolute bottom-1 right-1.5 font-mono text-[8px] text-primary/50">{{ magnificationLabel }}</span>
  </div>
</template>
