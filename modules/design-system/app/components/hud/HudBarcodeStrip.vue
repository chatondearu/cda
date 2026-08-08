<script setup lang="ts">
interface Props {
  seed?: string
  bars?: number
}

const props = withDefaults(defineProps<Props>(), {
  seed: 'HUD-BARCODE',
  bars: 32,
})

const MIN_BAR_WIDTH_PX = 1
const MAX_BAR_WIDTH_PX = 3

const barWidths = computed(() => {
  const base = hashSeed(props.seed)

  return Array.from({ length: props.bars }, (_, index) => {
    const unit = seededUnit(base, index)
    return MIN_BAR_WIDTH_PX + Math.round(unit * (MAX_BAR_WIDTH_PX - MIN_BAR_WIDTH_PX))
  })
})
</script>

<template>
  <div class="flex h-8 items-stretch gap-0.5 border border-primary/20 bg-surface_container_lowest px-2 py-1">
    <span
      v-for="(width, index) in barWidths"
      :key="index"
      class="bg-primary/60"
      :style="{ width: `${width}px` }"
    />
  </div>
</template>
