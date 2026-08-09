<script setup lang="ts">
interface HudChipItem {
  label: string
  status?: 'active' | 'warning' | 'error' | 'idle'
}

interface Props {
  chips: HudChipItem[]
}

defineProps<Props>()

const statusToneMap: Record<Required<HudChipItem>['status'], string> = {
  active: 'border-primary/50 text-primary',
  warning: 'border-tertiary/50 text-tertiary',
  error: 'border-error/50 text-error',
  idle: 'border-outline_variant/40 text-on_surface_variant/50',
}

function toneFor(status?: HudChipItem['status']) {
  return statusToneMap[status ?? 'idle']
}
</script>

<template>
  <div class="flex flex-wrap items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest">
    <span
      v-for="(chip, index) in chips"
      :key="`${chip.label}-${index}`"
      class="inline-flex items-center gap-1.5 border bg-surface_container_lowest px-1.5 py-0.5"
      :class="toneFor(chip.status)"
    >
      <span class="h-1.5 w-1.5 shrink-0 bg-current" />
      {{ chip.label }}
    </span>
  </div>
</template>
