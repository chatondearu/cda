<script setup lang="ts">
import type { NavItem } from '../../composables/useSystemData'

interface Props {
  items: NavItem[]
}

defineProps<Props>()
const { t } = useI18n()
const localePath = useLocalePath()
const { telemetry } = useSystemData()
</script>

<template>
  <aside class="sticky top-16 hidden h-[calc(100dvh-4rem)] w-64 shrink-0 flex-col border-r border-primary_fixed_dim/20 bg-surface_container_lowest py-8 md:flex">
    <div class="mb-10 px-6">
      <h2 class="font-sans text-xs font-black uppercase tracking-widest text-primary_fixed_dim">
        {{ t('ui.diagnosticVersion') }}
      </h2>
      <div class="mt-2 h-px w-full bg-primary_fixed_dim/20" />
    </div>
    <nav class="flex flex-1 flex-col">
      <NuxtLink
        v-for="item in items"
        :key="item.to"
        :to="localePath(item.to)"
        class="flex items-center gap-4 px-6 py-4 font-sans text-xs font-bold uppercase tracking-widest text-primary_fixed_dim/70 transition-none hover:bg-surface_container_highest"
        active-class="!bg-primary_fixed_dim !text-background hover:!bg-primary_fixed_dim hover:!text-background"
      >
        <UiMaterialIcon
          :name="item.icon"
          size-class="text-sm text-inherit"
        />
        {{ item.label }}
      </NuxtLink>
    </nav>
    <div class="mt-auto px-6">
      <div class="font-mono text-[10px] text-primary_fixed_dim/40">
        {{ telemetry.coordText }}<br>
        {{ telemetry.memLoadText }}
      </div>
    </div>
  </aside>
</template>
