<script setup lang="ts">
interface Props {
  glyph: string
  reading?: string
  meaning?: string
}

defineProps<Props>()
</script>

<template>
  <div class="inline-flex flex-col items-center gap-1 border border-primary/30 bg-surface_container_lowest px-3 py-2">
    <span class="font-sans text-3xl leading-none text-primary">{{ glyph }}</span>
    <span
      v-if="reading"
      class="font-mono text-[9px] uppercase tracking-widest text-primary/50"
    >{{ reading }}</span>
    <span
      v-if="meaning"
      class="text-[9px] uppercase tracking-widest text-primary/30"
    >{{ meaning }}</span>
  </div>
</template>
