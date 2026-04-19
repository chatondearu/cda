<script setup lang="ts">
import type { NavItem } from '../../composables/useSystemData'

interface Props {
  items: NavItem[]
}

defineProps<Props>()
</script>

<template>
  <nav class="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t-2 border-primary_fixed_dim bg-background px-4 md:hidden">
    <NuxtLink
      v-for="item in items.slice(0, 5)"
      :key="item.to"
      :to="item.to"
      class="flex flex-col items-center text-primary_fixed_dim/40 transition-colors"
      active-class="!text-primary_fixed_dim"
    >
      <UiMaterialIcon
        :name="item.icon"
        size-class="text-2xl"
      />
      <span class="mt-1 text-[8px] font-bold uppercase tracking-widest">{{ item.dockLabel }}</span>
    </NuxtLink>
  </nav>
</template>
