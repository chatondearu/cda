<script setup lang="ts">
interface Props {
  title: string
  code?: string
}

withDefaults(defineProps<Props>(), {
  code: '',
})
</script>

<template>
  <header class="mb-12 flex items-end justify-between gap-6 border-b border-primary/30 pb-4">
    <div>
      <span
        v-if="code"
        class="mb-1 block font-mono text-[10px] text-primary/40"
      >{{ code }}</span>
      <h2 class="font-sans text-2xl font-black uppercase tracking-widest text-primary">
        {{ title }}
      </h2>
    </div>
    <slot name="right" />
  </header>
</template>
