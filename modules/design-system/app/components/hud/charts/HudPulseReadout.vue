<script setup lang="ts">
interface Props {
  bpm: number
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: 'PULSE',
})

const MIN_BPM = 30
const MAX_BPM = 220
const MS_PER_MINUTE = 60000

const clampedBpm = computed(() => Math.min(Math.max(Math.round(props.bpm), MIN_BPM), MAX_BPM))

// Beat cadence follows the reported BPM; the CSS keyframe stays fixed and
// only its duration is overridden per-instance via inline style.
const beatDurationMs = computed(() => Math.round(MS_PER_MINUTE / clampedBpm.value))
</script>

<template>
  <div class="flex items-center gap-3 border border-outline_variant/20 bg-surface_container_lowest px-3 py-2">
    <span
      class="hud-motion-target hud-anim-pulse-blip h-2 w-2 shrink-0 rounded-full bg-primary"
      :style="{ animationDuration: `${beatDurationMs}ms` }"
    />

    <div class="flex flex-col gap-0.5">
      <span
        v-if="label"
        class="font-mono text-[9px] uppercase tracking-widest text-primary/40"
      >{{ label }}</span>
      <span class="font-mono text-sm text-primary">{{ clampedBpm }} BPM</span>
    </div>
  </div>
</template>
