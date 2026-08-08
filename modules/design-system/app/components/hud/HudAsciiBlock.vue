<script setup lang="ts">
interface Props {
  seed?: string
  rows?: number
  cols?: number
}

const props = withDefaults(defineProps<Props>(), {
  seed: 'HUD-ASCII',
  rows: 4,
  cols: 24,
})

const GLYPHS = ['.', ':', '#', '%', '+', '-', '*', '=', '0', '1']

const rows = computed(() => {
  const base = hashSeed(props.seed)

  return Array.from({ length: props.rows }, (_, rowIndex) => {
    return Array.from({ length: props.cols }, (_, colIndex) => {
      const cellIndex = rowIndex * props.cols + colIndex
      const unit = seededUnit(base, cellIndex)
      return GLYPHS[Math.floor(unit * GLYPHS.length) % GLYPHS.length]
    }).join('')
  })
})
</script>

<template>
  <pre class="whitespace-pre border border-primary/20 bg-surface_container_lowest px-2 py-1 font-mono text-[10px] leading-tight text-primary/40">{{ rows.join('\n') }}</pre>
</template>
