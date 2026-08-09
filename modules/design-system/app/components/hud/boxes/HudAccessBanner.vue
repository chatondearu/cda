<script setup lang="ts">
interface Props {
  granted: boolean
  detail?: string
}

const props = defineProps<Props>()

const toneClass = computed(() => (props.granted ? 'border-primary/60 text-primary' : 'border-error/60 text-error'))
const statusLabel = computed(() => (props.granted ? 'ACCESS GRANTED' : 'ACCESS DENIED'))
</script>

<template>
  <div
    class="flex items-center justify-between gap-4 border-l-2 bg-surface_container_lowest px-3 py-2 font-mono text-[10px] uppercase tracking-widest"
    :class="toneClass"
  >
    <span>{{ statusLabel }}</span>
    <span
      v-if="detail"
      class="text-primary/40"
    >{{ detail }}</span>
  </div>
</template>
