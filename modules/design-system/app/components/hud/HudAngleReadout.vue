<script setup lang="ts">
interface Props {
  degrees: number
  label?: string
}

const props = defineProps<Props>()

const normalizedDegrees = computed(() => ((Math.round(props.degrees) % 360) + 360) % 360)

const degreesLabel = computed(() => `\u03B8 ${String(normalizedDegrees.value).padStart(3, '0')}\u00B0`)
</script>

<template>
  <div class="flex items-center gap-3 border border-outline_variant/20 bg-surface_container_lowest px-3 py-2">
    <div class="relative h-8 w-8 shrink-0 rounded-full border border-primary_fixed_dim/35">
      <div
        class="absolute left-1/2 top-1/2 h-1/2 w-px origin-bottom bg-primary_fixed_dim"
        :style="{ transform: `translateX(-50%) translateY(-100%) rotate(${normalizedDegrees}deg)` }"
      />
      <span class="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 bg-primary_fixed_dim" />
    </div>

    <div class="flex flex-col gap-0.5">
      <span
        v-if="label"
        class="font-mono text-[9px] uppercase tracking-widest text-primary/40"
      >{{ label }}</span>
      <span class="font-mono text-sm text-primary">{{ degreesLabel }}</span>
    </div>
  </div>
</template>
