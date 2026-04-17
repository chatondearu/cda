<script setup lang="ts">
interface LinkItem {
  label: string
  to: string
}

interface Props {
  links: LinkItem[]
}

defineProps<Props>()
</script>

<template>
  <footer class="flex w-full flex-col gap-8 border-t border-primary_fixed_dim/10 bg-background px-8 py-8 text-primary_fixed_dim md:flex-row md:justify-between">
    <div>
      <div class="mb-4 font-sans text-lg font-black tracking-widest text-primary_fixed_dim">
        THE_LAB
      </div>
      <p class="font-sans text-[10px] tracking-widest opacity-60">
        ©2122 WEYLAND-YUTANI // LOGICAL_MACHINE_OS
      </p>
    </div>
    <div class="flex flex-col gap-4">
      <div class="grid grid-cols-2 gap-x-8 gap-y-2 font-sans text-[10px] uppercase tracking-widest">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="text-primary/40 transition-colors hover:text-primary_fixed_dim"
        >
          {{ link.label }}
        </NuxtLink>
      </div>
      <div class="flex items-center gap-4 font-mono text-xs opacity-30">
        <span>LAT: 34.0522 N</span>
        <span>LON: 118.2437 W</span>
      </div>
    </div>
  </footer>
</template>
