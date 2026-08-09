<script setup lang="ts">
interface Props {
  code: string
  tone?: 'muted' | 'emphasis'
}

withDefaults(defineProps<Props>(), {
  tone: 'muted',
})
</script>

<template>
  <span
    class="font-mono text-[10px] uppercase tracking-widest"
    :class="tone === 'emphasis' ? 'text-primary' : 'text-primary/40'"
  >{{ code }}</span>
</template>
