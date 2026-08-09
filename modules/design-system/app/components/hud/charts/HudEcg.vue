<script setup lang="ts">
interface Props {
  seed?: string
  beats?: number
  bpm?: number
  label?: string
  /** Render the animated scan overlay (still gated by the global HUD motion switch). */
  sweep?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  seed: 'HUD-ECG',
  beats: 4,
  bpm: 72,
  label: 'ECG',
  sweep: true,
})

const VIEW_WIDTH = 100
const VIEW_HEIGHT = 32
const CENTER_Y = VIEW_HEIGHT / 2
const AMPLITUDE = VIEW_HEIGHT / 2 - 3
const MIN_BPM = 30
const MAX_BPM = 220
const MS_PER_MINUTE = 60000

// Fixed PQRST cycle shape as [fraction-of-beat, amplitude(-1..1)] keypoints;
// starts and ends at baseline so consecutive beats connect smoothly.
const BEAT_KEYPOINTS: Array<[number, number]> = [
  [0, 0],
  [0.08, 0],
  [0.14, 0.15],
  [0.2, 0],
  [0.26, 0],
  [0.28, -0.1],
  [0.32, 1],
  [0.36, -0.35],
  [0.42, 0],
  [0.55, 0],
  [0.65, 0.25],
  [0.75, 0],
  [1, 0],
]

const clampedBpm = computed(() => Math.min(Math.max(Math.round(props.bpm), MIN_BPM), MAX_BPM))
const beatDurationMs = computed(() => Math.round(MS_PER_MINUTE / clampedBpm.value))
const sweepDurationMs = computed(() => beatDurationMs.value * props.beats)

const linePoints = computed(() => {
  const base = hashSeed(props.seed)
  const beatWidth = VIEW_WIDTH / props.beats

  const points: string[] = []

  for (let beatIndex = 0; beatIndex < props.beats; beatIndex++) {
    const jitter = 0.9 + seededUnit(base, beatIndex) * 0.2

    for (const [fraction, amplitude] of BEAT_KEYPOINTS) {
      const x = Math.round((beatIndex * beatWidth + fraction * beatWidth) * 100) / 100
      const y = Math.round((CENTER_Y - amplitude * jitter * AMPLITUDE) * 100) / 100
      points.push(`${x},${y}`)
    }
  }

  return points.join(' ')
})
</script>

<template>
  <div class="flex flex-col gap-1">
    <div class="relative h-16 overflow-hidden border border-primary/20 bg-surface_container_lowest">
      <svg
        :viewBox="`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`"
        preserveAspectRatio="none"
        class="h-full w-full"
      >
        <line
          x1="0"
          :x2="VIEW_WIDTH"
          :y1="CENTER_Y"
          :y2="CENTER_Y"
          class="stroke-outline_variant/15"
          stroke-width="0.4"
        />
        <polyline
          :points="linePoints"
          fill="none"
          stroke-width="1.25"
          stroke-linejoin="round"
          stroke-linecap="round"
          class="stroke-primary"
        />
      </svg>

      <span
        v-if="sweep"
        class="hud-motion-target hud-anim-waveform-sweep pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-primary/15"
        :style="{ animationDuration: `${sweepDurationMs}ms` }"
      />
    </div>

    <div
      v-if="label"
      class="flex items-baseline justify-between font-mono text-[9px] uppercase tracking-widest text-primary/40"
    >
      <span>{{ label }}</span>
      <span class="text-primary/60">{{ clampedBpm }} BPM</span>
    </div>
  </div>
</template>
