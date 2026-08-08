<script setup lang="ts">
interface Props {
  rev?: string
  build?: string
}

withDefaults(defineProps<Props>(), {
  rev: '—',
  build: '—',
})
</script>

<template>
  <div class="inline-flex items-stretch divide-x divide-outline_variant/30 border border-outline_variant/30 bg-surface_container_lowest font-mono text-[9px] uppercase tracking-widest">
    <span class="flex items-center gap-1 px-2 py-1">
      <span class="text-primary/40">REV</span>
      <span class="text-primary">{{ rev }}</span>
    </span>
    <span class="flex items-center gap-1 px-2 py-1">
      <span class="text-primary/40">BUILD</span>
      <span class="text-primary">{{ build }}</span>
    </span>
  </div>
</template>
