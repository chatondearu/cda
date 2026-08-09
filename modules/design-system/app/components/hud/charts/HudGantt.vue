<script setup lang="ts">
interface Props {
  seed?: string
  rows?: number
}

const props = withDefaults(defineProps<Props>(), {
  seed: 'HUD-GANTT',
  rows: 6,
})

const MIN_LENGTH_PERCENT = 15
const MAX_LENGTH_PERCENT = 55
const ROW_SEED_STEP = 227

const tracks = computed(() => {
  const base = hashSeed(props.seed)

  return Array.from({ length: props.rows }, (_, rowIndex) => {
    const rowBase = (base + rowIndex * ROW_SEED_STEP) >>> 0
    const lengthPercent = MIN_LENGTH_PERCENT + Math.round(seededUnit(rowBase, 0) * (MAX_LENGTH_PERCENT - MIN_LENGTH_PERCENT))
    const startPercent = Math.round(seededUnit(rowBase, 1) * (100 - lengthPercent))

    return {
      id: `T${rowIndex + 1}`,
      startPercent,
      lengthPercent,
    }
  })
})

const gridMarks = [25, 50, 75]
</script>

<template>
  <div class="flex flex-col gap-1 border border-primary/20 bg-surface_container_lowest px-2 py-1.5">
    <div
      v-for="track in tracks"
      :key="track.id"
      class="flex h-3 items-center gap-2"
    >
      <span class="w-6 shrink-0 font-mono text-[7px] uppercase tracking-widest text-primary/40">
        {{ track.id }}
      </span>

      <span class="relative h-full flex-1">
        <span
          v-for="mark in gridMarks"
          :key="mark"
          class="absolute inset-y-0 w-px bg-outline_variant/15"
          :style="{ left: `${mark}%` }"
        />

        <span
          class="absolute h-full bg-primary/60"
          :style="{ left: `${track.startPercent}%`, width: `${track.lengthPercent}%` }"
        />
      </span>
    </div>
  </div>
</template>
