<script setup lang="ts">
interface Props {
  seed?: string
  rows?: number
  cols?: number
  /** Mirror each row left-right for an identicon-style symmetric pattern. */
  symmetric?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  seed: 'HUD-BLOCKART',
  rows: 6,
  cols: 7,
  symmetric: true,
})

const ROW_SEED_STEP = 1301

const TIER_CLASSES = [
  'bg-primary/10',
  'bg-primary/28',
  'bg-primary/46',
  'bg-primary/64',
  'bg-primary/85',
]

function tierClass(unit: number): string {
  const index = Math.min(TIER_CLASSES.length - 1, Math.floor(unit * TIER_CLASSES.length))
  return TIER_CLASSES[index] ?? TIER_CLASSES[0]!
}

const grid = computed(() => {
  const base = hashSeed(props.seed)
  const halfCount = props.symmetric ? Math.ceil(props.cols / 2) : props.cols
  const mirrorCount = props.symmetric ? props.cols - halfCount : 0

  return Array.from({ length: props.rows }, (_, rowIndex) => {
    const rowBase = (base + rowIndex * ROW_SEED_STEP) >>> 0
    const half = Array.from({ length: halfCount }, (_, colIndex) => tierClass(seededUnit(rowBase, colIndex)))
    const mirror = half.slice(0, mirrorCount).reverse()
    return [...half, ...mirror]
  })
})
</script>

<template>
  <div class="inline-flex flex-col gap-0.5 border border-primary/20 bg-surface_container_lowest p-1">
    <div
      v-for="(cells, rowIndex) in grid"
      :key="rowIndex"
      class="flex gap-0.5"
    >
      <span
        v-for="(cellClass, colIndex) in cells"
        :key="colIndex"
        class="h-3 w-3"
        :class="cellClass"
      />
    </div>
  </div>
</template>
