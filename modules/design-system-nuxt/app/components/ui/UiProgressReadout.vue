<script setup lang="ts">
interface Props {
  label: string
  value: string
  progress: number
}

defineProps<Props>()
</script>

<template>
  <div class="border border-primary/30 bg-surface_container_lowest p-4">
    <div class="mb-2 flex justify-between font-mono text-[10px] text-primary">
      <span>{{ label }}</span>
      <span>{{ value }}</span>
    </div>
    <div class="relative h-1 w-full bg-primary/10">
      <div
        class="absolute left-0 top-0 h-full bg-primary"
        :style="{ width: `${Math.min(Math.max(progress, 0), 100)}%` }"
      />
    </div>
  </div>
</template>
