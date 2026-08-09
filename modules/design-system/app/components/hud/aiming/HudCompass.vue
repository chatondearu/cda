<script setup lang="ts">
interface Props {
  heading: number
  label?: string
}

const props = defineProps<Props>()

const clampedHeading = computed(() => Math.min(Math.max(Math.round(props.heading), 0), 359))

const headingLabel = computed(() => `${String(clampedHeading.value).padStart(3, '0')}\u00B0`)
</script>

<template>
  <div class="flex flex-col items-center gap-2">
    <div class="relative h-20 w-20 rounded-full border border-primary_fixed_dim/35">
      <span class="absolute left-1/2 top-0.5 -translate-x-1/2 font-mono text-[9px] text-primary/50">N</span>
      <span class="absolute right-0.5 top-1/2 -translate-y-1/2 font-mono text-[9px] text-primary/50">E</span>
      <span class="absolute bottom-0.5 left-1/2 -translate-x-1/2 font-mono text-[9px] text-primary/50">S</span>
      <span class="absolute left-0.5 top-1/2 -translate-y-1/2 font-mono text-[9px] text-primary/50">W</span>

      <div
        class="absolute left-1/2 top-1/2 h-8 w-px origin-bottom bg-primary_fixed_dim"
        :style="{ transform: `translateX(-50%) translateY(-100%) rotate(${clampedHeading}deg)` }"
      />
      <span class="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 bg-primary_fixed_dim" />
    </div>

    <div class="flex flex-col items-center gap-0.5 font-mono text-[10px] uppercase tracking-widest">
      <span class="text-primary">{{ headingLabel }}</span>
      <span
        v-if="label"
        class="text-primary/40"
      >{{ label }}</span>
    </div>
  </div>
</template>
