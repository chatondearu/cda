<script setup lang="ts">
interface Props {
  seed?: string
  bands?: number
  segments?: number
}

const props = withDefaults(defineProps<Props>(), {
  seed: 'HUD-SPECTRUM',
  bands: 20,
  segments: 8,
})

const HIGH_TIER_RATIO = 0.85
const MID_TIER_RATIO = 0.6

const columns = computed(() => {
  const base = hashSeed(props.seed)

  return Array.from({ length: props.bands }, (_, bandIndex) => {
    const unit = seededUnit(base, bandIndex)
    const litCount = Math.max(1, Math.round(unit * props.segments))

    const cells = Array.from({ length: props.segments }, (_, segmentIndexFromBottom) => {
      const rowFromTop = props.segments - 1 - segmentIndexFromBottom
      const lit = rowFromTop < litCount
      const heightRatio = (rowFromTop + 1) / props.segments

      let tone = 'bg-primary/70'
      if (heightRatio > HIGH_TIER_RATIO)
        tone = 'bg-error/70'
      else if (heightRatio > MID_TIER_RATIO)
        tone = 'bg-tertiary/70'

      return { lit, tone }
    })

    return cells
  })
})
</script>

<template>
  <div class="flex h-16 items-end gap-0.5 border border-primary/20 bg-surface_container_lowest px-2 py-1.5">
    <div
      v-for="(cells, bandIndex) in columns"
      :key="bandIndex"
      class="flex flex-1 flex-col-reverse gap-px"
    >
      <span
        v-for="(cell, cellIndex) in cells"
        :key="cellIndex"
        class="w-full flex-1"
        :class="cell.lit ? cell.tone : 'bg-primary/10'"
      />
    </div>
  </div>
</template>
