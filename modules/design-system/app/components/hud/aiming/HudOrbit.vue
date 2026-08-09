<script setup lang="ts">
interface HudOrbitNode {
  /** Ring index, 0 (innermost) to `orbits - 1` (outermost). */
  orbit: number
  /** Starting angle in degrees, 0 = top (12 o'clock). */
  angle: number
}

interface Props {
  /** Number of concentric rings; the outermost ring is the component's own border. */
  orbits?: number
  nodes?: HudOrbitNode[]
  /** Revolve each node around its ring (still gated by the global HUD motion switch). */
  spin?: boolean
}

const MIN_ORBITS = 2
const MAX_ORBITS = 4
const BASE_DURATION_MS = 3000
const DURATION_STEP_MS = 1800

const props = withDefaults(defineProps<Props>(), {
  orbits: 3,
  spin: true,
})

const clampedOrbits = computed(() => Math.min(Math.max(Math.round(props.orbits), MIN_ORBITS), MAX_ORBITS))

const resolvedNodes = computed(() => props.nodes ?? Array.from({ length: clampedOrbits.value }, (_, index) => ({
  orbit: index,
  angle: index * (360 / clampedOrbits.value),
})))

function orbitInsetPercent(orbit: number): number {
  const clampedOrbit = Math.min(Math.max(Math.round(orbit), 0), clampedOrbits.value - 1)
  return Math.round((((clampedOrbits.value - 1 - clampedOrbit) * 50) / clampedOrbits.value) * 100) / 100
}

// Inner ring borders only — the outermost ring is drawn by the container's own border.
const innerRingInsets = computed(() =>
  Array.from({ length: clampedOrbits.value - 1 }, (_, index) => orbitInsetPercent(index)),
)

const positionedNodes = computed(() => resolvedNodes.value.map((node, index) => ({
  key: `${node.orbit}-${index}`,
  insetPercent: orbitInsetPercent(node.orbit),
  angle: node.angle,
  durationMs: BASE_DURATION_MS + node.orbit * DURATION_STEP_MS,
})))
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
      v-for="node in positionedNodes"
      :key="node.key"
      class="absolute rounded-full"
      :class="spin ? 'hud-motion-target hud-anim-orbit-spin' : ''"
      :style="{
        inset: `${node.insetPercent}%`,
        transform: `rotate(${node.angle}deg)`,
        '--hud-orbit-start': `${node.angle}deg`,
        animationDuration: `${node.durationMs}ms`,
      }"
    >
      <span class="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
    </div>

    <span class="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary_fixed_dim" />
  </div>
</template>
