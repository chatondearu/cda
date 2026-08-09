<script setup lang="ts">
interface Props {
  /** Value to derive the matrix from. Takes priority over `seed` when set. */
  payload?: string
  seed?: string
  size?: number
  /** Module grid dimension (QR-ish; odd counts keep the finder patterns symmetric). */
  modules?: number
}

const props = withDefaults(defineProps<Props>(), {
  payload: '',
  seed: 'HUD-QR',
  size: 96,
  modules: 21,
})

const DATA_THRESHOLD = 0.52
const FINDER_SPAN = 6

/** Standard QR finder pattern: 7x7 dark ring, 1-module light gap, 3x3 dark core. */
function resolveFinderState(dr: number, dc: number): boolean {
  const isOuterRing = dr === 0 || dr === FINDER_SPAN || dc === 0 || dc === FINDER_SPAN
  const isInnerCore = dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4
  return isOuterRing || isInnerCore
}

function finderAnchors(modules: number): Array<[number, number]> {
  return [
    [0, 0],
    [0, modules - 7],
    [modules - 7, 0],
  ]
}

const darkCells = computed(() => {
  const source = props.payload.trim() || props.seed
  const base = hashSeed(source)
  const anchors = finderAnchors(props.modules)
  const cells: Array<{ row: number, col: number }> = []

  for (let row = 0; row < props.modules; row++) {
    for (let col = 0; col < props.modules; col++) {
      const anchor = anchors.find(([anchorRow, anchorCol]) => {
        const dr = row - anchorRow
        const dc = col - anchorCol
        return dr >= 0 && dr <= FINDER_SPAN && dc >= 0 && dc <= FINDER_SPAN
      })

      const isDark = anchor
        ? resolveFinderState(row - anchor[0], col - anchor[1])
        : seededUnit(base, row * props.modules + col) > DATA_THRESHOLD

      if (isDark)
        cells.push({ row, col })
    }
  }

  return cells
})
</script>

<template>
  <div class="inline-flex border border-primary/20 bg-surface_container_lowest p-2">
    <svg
      :width="size"
      :height="size"
      :viewBox="`0 0 ${modules} ${modules}`"
      shape-rendering="crispEdges"
      class="text-primary"
    >
      <rect
        v-for="cell in darkCells"
        :key="`${cell.row}-${cell.col}`"
        :x="cell.col"
        :y="cell.row"
        width="1"
        height="1"
        fill="currentColor"
      />
    </svg>
  </div>
</template>
