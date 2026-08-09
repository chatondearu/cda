<script setup lang="ts">
interface Props {
  id: string
  label?: string
}

defineProps<Props>()
</script>

<template>
  <div class="inline-flex items-center gap-2 border border-primary/30 bg-surface_container_lowest px-2 py-1 font-mono text-[10px] uppercase tracking-widest">
    <span class="text-primary/40">BADGE</span>
    <span class="text-primary">{{ id }}</span>
    <span
      v-if="label"
      class="text-primary/50"
    >{{ label }}</span>
  </div>
</template>
