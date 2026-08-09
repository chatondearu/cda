<script setup lang="ts">
interface Props {
  text: string
}

const props = defineProps<Props>()

const letters = computed(() => props.text.split(''))
</script>

<template>
  <div class="inline-flex gap-1 font-mono text-xs font-bold uppercase">
    <span
      v-for="(letter, index) in letters"
      :key="index"
      class="flex h-6 w-6 items-center justify-center border"
      :class="letter.trim() ? 'border-primary/30 bg-surface_container_lowest text-primary' : 'border-transparent'"
    >{{ letter.trim() ? letter : '' }}</span>
  </div>
</template>
