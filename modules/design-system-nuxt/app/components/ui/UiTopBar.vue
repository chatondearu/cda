<script setup lang="ts">
interface Props {
  title: string
}

defineProps<Props>()
</script>

<template>
  <header class="fixed top-0 z-50 flex h-16 w-full items-center justify-between border-b-2 border-primary_fixed_dim bg-background px-6 text-primary_fixed_dim">
    <div class="flex items-center gap-3">
      <UiMaterialIcon
        name="terminal"
        size-class="text-2xl text-primary_fixed_dim"
      />
      <h1 class="font-sans text-xl font-bold uppercase tracking-widest">
        {{ title }}
      </h1>
    </div>
    <div class="flex items-center gap-3 font-sans text-xs tracking-widest md:gap-8">
      <slot name="actions" />
    </div>
  </header>
</template>
