<script setup lang="ts">
interface Props {
  orientation?: 'h' | 'v'
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  orientation: 'h',
})

const isHorizontal = computed(() => props.orientation === 'h')
</script>

<template>
  <div
    class="relative flex items-center justify-center"
    :class="isHorizontal ? 'h-5 w-full' : 'h-full w-5 flex-col'"
  >
    <span
      class="absolute bg-outline_variant/40"
      :class="isHorizontal ? 'left-0 top-1/2 h-px w-full -translate-y-1/2' : 'left-1/2 top-0 h-full w-px -translate-x-1/2'"
    />

    <span
      class="absolute bg-primary"
      :class="isHorizontal ? 'left-0 top-1/2 h-0.5 w-1.5 -translate-y-1/2' : 'left-1/2 top-0 h-1.5 w-0.5 -translate-x-1/2'"
    />
    <span
      class="absolute bg-primary"
      :class="isHorizontal ? 'right-0 top-1/2 h-0.5 w-1.5 -translate-y-1/2' : 'bottom-0 left-1/2 h-1.5 w-0.5 -translate-x-1/2'"
    />

    <span
      v-if="label"
      class="relative z-10 bg-surface_container_lowest px-1 font-mono text-[8px] uppercase tracking-widest text-primary/50"
    >{{ label }}</span>
  </div>
</template>
