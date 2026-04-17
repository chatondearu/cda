<script setup lang="ts">
interface Props {
  text: string
}

defineProps<Props>()
</script>

<template>
  <span class="inline-flex border border-[#ffba20]/30 bg-[#1c1b1b] px-2 py-1 text-[10px] tracking-[0.14em] text-[#ffdca1]">
    {{ text }}
  </span>
</template>
