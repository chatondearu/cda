<script setup lang="ts">
interface Props {
  ok?: boolean
  code?: string
}

const props = withDefaults(defineProps<Props>(), {
  ok: true,
})

const toneClass = computed(() => (props.ok ? 'border-primary/60 text-primary' : 'border-error/60 text-error'))
const statusLabel = computed(() => (props.ok ? 'CHECKSUM VERIFIED' : 'CHECKSUM FAILED'))
</script>

<template>
  <div
    class="flex items-center justify-between gap-4 border-2 bg-surface_container_lowest px-3 py-2 font-mono text-[10px] uppercase tracking-widest"
    :class="toneClass"
  >
    <span>{{ statusLabel }}</span>
    <span
      v-if="code"
      class="text-primary/40"
    >{{ code }}</span>
  </div>
</template>
