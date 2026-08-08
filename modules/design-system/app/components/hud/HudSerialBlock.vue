<script setup lang="ts">
interface Props {
  serial: string
  caption?: string
}

defineProps<Props>()
</script>

<template>
  <div class="inline-flex flex-col gap-0.5 border border-primary/30 bg-surface_container_lowest px-2 py-1 font-mono text-[10px] uppercase tracking-widest">
    <span class="text-primary">SN {{ serial }}</span>
    <span
      v-if="caption"
      class="text-primary/40"
    >{{ caption }}</span>
  </div>
</template>
