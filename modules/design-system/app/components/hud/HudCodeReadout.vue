<script setup lang="ts">
interface Props {
  code: string
  prefix?: string
}

withDefaults(defineProps<Props>(), {
  prefix: '0X',
})
</script>

<template>
  <span class="font-mono text-[10px] uppercase tracking-widest text-primary/40">{{ prefix }}+{{ code }}</span>
</template>
