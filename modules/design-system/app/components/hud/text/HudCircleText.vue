<script setup lang="ts">
interface Props {
  text: string
  size?: number
}

const props = withDefaults(defineProps<Props>(), {
  size: 96,
})

const pathId = `hud-circle-text-${useId()}`

const radius = computed(() => props.size / 2 - 8)
const center = computed(() => props.size / 2)
const arcPath = computed(() => {
  const c = center.value
  const r = radius.value
  return `M ${c},${c} m -${r},0 a ${r},${r} 0 1,1 ${r * 2},0 a ${r},${r} 0 1,1 -${r * 2},0`
})
</script>

<template>
  <svg
    :width="size"
    :height="size"
    :viewBox="`0 0 ${size} ${size}`"
    class="text-primary"
  >
    <path
      :id="pathId"
      :d="arcPath"
      fill="none"
    />
    <text
      font-family="monospace"
      font-size="9"
      letter-spacing="2"
      fill="currentColor"
    >
      <textPath :href="`#${pathId}`">{{ text }}</textPath>
    </text>
  </svg>
</template>
