<script setup lang="ts">
interface Props {
  text: string
}

defineProps<Props>()
</script>

<template>
  <span class="inline-flex border border-primary_fixed_dim/30 bg-surface_container_low px-2 py-1 text-[10px] tracking-[0.14em] text-primary">
    {{ text }}
  </span>
</template>
