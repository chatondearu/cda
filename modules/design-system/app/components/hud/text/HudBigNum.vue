<script setup lang="ts">
interface Props {
  value: string | number
  label?: string
  unit?: string
}

defineProps<Props>()
</script>

<template>
  <div class="inline-flex flex-col gap-1">
    <div class="flex items-baseline gap-1 font-mono text-4xl font-black leading-none tracking-tight text-primary">
      {{ value }}
      <span
        v-if="unit"
        class="text-xs font-normal uppercase tracking-widest text-primary/40"
      >{{ unit }}</span>
    </div>
    <span
      v-if="label"
      class="text-[9px] uppercase tracking-widest text-primary/40"
    >{{ label }}</span>
  </div>
</template>
