<script setup lang="ts">
interface Props {
  name: string
  meta?: string
}

defineProps<Props>()
</script>

<template>
  <div class="flex flex-col gap-0.5 font-mono text-[10px] uppercase tracking-widest">
    <span class="text-primary">{{ name }}</span>
    <span
      v-if="meta"
      class="text-primary/40"
    >{{ meta }}</span>
  </div>
</template>
