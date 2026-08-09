<script setup lang="ts">
interface Props {
  label: string
  value: string
  hint?: string
}

defineProps<Props>()
</script>

<template>
  <div class="relative inline-flex min-w-32 flex-col gap-1 border border-primary/30 bg-surface_container_lowest px-3 pb-2 pt-3">
    <span class="absolute -top-2 left-2 bg-background px-1 font-mono text-[8px] uppercase tracking-widest text-primary/50">
      {{ label }}
    </span>
    <span class="font-mono text-sm font-bold uppercase tracking-widest text-primary">{{ value }}</span>
    <span
      v-if="hint"
      class="font-mono text-[9px] uppercase tracking-widest text-primary/40"
    >{{ hint }}</span>
  </div>
</template>
