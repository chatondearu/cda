<script setup lang="ts">
interface Props {
  seed?: string
  rows?: number
  cols?: number
}

const props = withDefaults(defineProps<Props>(), {
  seed: 'HUD-DENSEBAR',
  rows: 3,
  cols: 48,
})

const ROW_SEED_STEP = 733

const rowStates = computed(() => {
  const base = hashSeed(props.seed)

  return Array.from({ length: props.rows }, (_, rowIndex) => {
    const rowBase = (base + rowIndex * ROW_SEED_STEP) >>> 0

    return Array.from({ length: props.cols }, (_, colIndex) => {
      return seededUnit(rowBase, colIndex) > 0.5
    })
  })
})
</script>

<template>
  <div class="relative flex flex-col gap-0.5 overflow-hidden border border-primary/20 bg-surface_container_lowest px-2 py-1">
    <div
      v-for="(cells, rowIndex) in rowStates"
      :key="rowIndex"
      class="flex items-stretch gap-px"
    >
      <span
        v-for="(filled, colIndex) in cells"
        :key="colIndex"
        class="h-1.5 flex-1"
        :class="filled ? 'bg-primary/70' : 'bg-primary/15'"
      />
    </div>

    <span class="hud-motion-target hud-anim-barcode-sweep pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-primary/10" />
  </div>
</template>
