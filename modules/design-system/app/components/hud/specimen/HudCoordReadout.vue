<script setup lang="ts">
interface HudCoordAxis {
  key: string
  value: string | number
}

interface Props {
  x: string | number
  y: string | number
  z?: string | number
}

const props = defineProps<Props>()

const axes = computed<HudCoordAxis[]>(() => {
  const base: HudCoordAxis[] = [
    { key: 'X', value: props.x },
    { key: 'Y', value: props.y },
  ]

  if (props.z !== undefined) {
    base.push({ key: 'Z', value: props.z })
  }

  return base
})
</script>

<template>
  <div class="flex items-stretch divide-x divide-outline_variant/20 border border-outline_variant/20 bg-surface_container_lowest">
    <div
      v-for="axis in axes"
      :key="axis.key"
      class="flex flex-1 flex-col items-center gap-1 px-3 py-2"
    >
      <span class="font-mono text-[9px] uppercase tracking-widest text-primary/40">{{ axis.key }}</span>
      <span class="font-mono text-sm text-primary">{{ axis.value }}</span>
    </div>
  </div>
</template>
