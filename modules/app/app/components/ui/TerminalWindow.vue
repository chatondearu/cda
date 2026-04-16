<template>
  <section class="relative bg-surface_container_highest ui-ghost-border px-4 py-4">
    <div class="absolute -top-2 left-3 bg-surface px-2 ui-micro text-primary_amber/70">
      {{ label }}
    </div>

    <div class="pointer-events-none absolute left-2 top-2 ui-micro text-primary_amber/30">
      +
    </div>
    <div class="pointer-events-none absolute right-2 top-2 ui-micro text-primary_amber/30">
      +
    </div>
    <div class="pointer-events-none absolute bottom-2 left-2 ui-micro text-primary_amber/30">
      +
    </div>
    <div class="pointer-events-none absolute bottom-2 right-2 ui-micro text-primary_amber/30">
      +
    </div>

    <div class="absolute right-3 top-1 ui-micro text-primary_amber/25">
      {{ refCode }}
    </div>

    <div class="pt-4">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  refCode?: string
}>()
</script>

