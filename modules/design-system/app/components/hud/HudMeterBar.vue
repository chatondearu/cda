<script setup lang="ts">
interface Props {
  label: string
  value: string
  progress: number
}

const props = defineProps<Props>()

const clampedProgress = computed(() => Math.min(Math.max(props.progress, 0), 100))
</script>

<template>
  <div class="flex flex-col gap-1">
    <div class="flex justify-between font-mono text-[10px] uppercase tracking-widest text-primary/60">
      <span>{{ label }}</span>
      <span>{{ value }}</span>
    </div>
    <div class="relative h-px w-full bg-primary/10">
      <div
        class="absolute left-0 top-0 h-full bg-primary"
        :style="{ width: `${clampedProgress}%` }"
      />
    </div>
  </div>
</template>
