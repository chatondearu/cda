<script setup lang="ts">
interface Props {
  gridRef: string
  size?: number
  activeRow?: number
  activeCol?: number
}

const props = withDefaults(defineProps<Props>(), {
  size: 6,
  activeRow: 2,
  activeCol: 3,
})

const rows = computed(() => Array.from({ length: props.size }, (_, index) => index))
const columns = computed(() => Array.from({ length: props.size }, (_, index) => String.fromCharCode(65 + index)))
</script>

<template>
  <div class="inline-flex flex-col gap-1.5 border border-outline_variant/25 bg-surface_container_lowest p-2">
    <div class="flex gap-0.5 pl-4">
      <span
        v-for="col in columns"
        :key="col"
        class="flex w-4 items-center justify-center font-mono text-[7px] text-primary/40"
      >{{ col }}</span>
    </div>

    <div
      v-for="row in rows"
      :key="row"
      class="flex items-center gap-0.5"
    >
      <span class="w-3.5 font-mono text-[7px] text-primary/40">{{ row + 1 }}</span>
      <span
        v-for="(col, colIndex) in columns"
        :key="`${row}-${col}`"
        class="h-4 w-4 border"
        :class="row === activeRow && colIndex === activeCol
          ? 'hud-motion-target hud-anim-crosshair-breathe-subtle border-primary bg-primary/30'
          : 'border-outline_variant/15'"
      />
    </div>

    <span class="mt-1 font-mono text-[10px] uppercase tracking-widest text-primary">{{ gridRef }}</span>
  </div>
</template>
