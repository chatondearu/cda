<script setup lang="ts">
interface Props {
  label?: string
}

defineProps<Props>()
</script>

<template>
  <div class="relative h-full w-full">
    <slot />

    <span
      v-if="label"
      class="pointer-events-none absolute left-1/2 top-2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-primary/30"
    >{{ label }}</span>

    <div
      v-if="$slots.tl"
      class="absolute left-4 top-4"
    >
      <slot name="tl" />
    </div>

    <div
      v-if="$slots.tr"
      class="absolute right-4 top-4"
    >
      <slot name="tr" />
    </div>

    <div
      v-if="$slots.center"
      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <slot name="center" />
    </div>

    <div
      v-if="$slots.bl"
      class="absolute bottom-4 left-4"
    >
      <slot name="bl" />
    </div>

    <div
      v-if="$slots.br"
      class="absolute bottom-4 right-4"
    >
      <slot name="br" />
    </div>
  </div>
</template>
