<script setup lang="ts">
interface Props {
  label: string
}

defineProps<Props>()
</script>

<template>
  <span class="text-[10px] uppercase tracking-[0.24em] text-primary/35">{{ label }}</span>
</template>
