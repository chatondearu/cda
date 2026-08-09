<script setup lang="ts">
interface Props {
  title: string
  code?: string
  index?: string
}

defineProps<Props>()
</script>

<template>
  <div class="flex items-center gap-3 border-b border-primary/30 pb-2">
    <span
      v-if="index"
      class="font-mono text-[10px] text-primary/40"
    >{{ index }}</span>
    <div class="flex flex-1 flex-col gap-0.5">
      <span
        v-if="code"
        class="font-mono text-[9px] uppercase tracking-widest text-primary/40"
      >{{ code }}</span>
      <h3 class="font-sans text-sm font-black uppercase tracking-widest text-primary">
        {{ title }}
      </h3>
    </div>
  </div>
</template>
