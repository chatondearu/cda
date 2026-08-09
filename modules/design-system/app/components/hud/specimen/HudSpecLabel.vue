<script setup lang="ts">
interface HudSpecLabelRow {
  key: string
  value: string
}

interface Props {
  title: string
  rows: HudSpecLabelRow[]
  /** Specimen/reference code shown top-right, e.g. `NO. 014`. */
  code?: string
}

defineProps<Props>()
</script>

<template>
  <div class="inline-flex min-w-48 flex-col border border-primary/30 bg-surface_container_lowest">
    <div class="flex items-center justify-between gap-3 border-b border-primary/30 px-2 py-1">
      <span class="font-mono text-[10px] font-bold uppercase tracking-widest text-primary">{{ title }}</span>
      <span
        v-if="code"
        class="font-mono text-[9px] uppercase tracking-widest text-primary/40"
      >{{ code }}</span>
    </div>
    <div class="flex flex-col divide-y divide-outline_variant/15">
      <div
        v-for="row in rows"
        :key="row.key"
        class="flex items-baseline justify-between gap-3 px-2 py-1 font-mono text-[9px] uppercase tracking-widest"
      >
        <span class="text-primary/40">{{ row.key }}</span>
        <span class="text-primary">{{ row.value }}</span>
      </div>
    </div>
  </div>
</template>
