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
    <div class="hidden items-center gap-8 font-sans text-xs tracking-widest md:flex">
      <span class="flex items-center gap-2">
        <span class="h-2 w-2 animate-pulse bg-primary_fixed_dim" />
        SECURE_LINE
      </span>
      <span class="opacity-60">USER: ADMIN_01</span>
      <UiMaterialIcon
        name="settings_input_component"
        size-class="cursor-pointer p-1 text-primary_fixed_dim transition-none hover:bg-primary_fixed_dim hover:text-background"
      />
    </div>
  </header>
</template>
