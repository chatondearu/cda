<script setup lang="ts">
interface HudDualBusChannel {
  label: string
  value: string
}

interface Props {
  left: HudDualBusChannel
  right: HudDualBusChannel
}

defineProps<Props>()
</script>

<template>
  <div class="flex items-stretch border border-outline_variant/20 bg-surface_container_lowest">
    <div class="flex flex-1 flex-col items-center gap-1 px-3 py-2">
      <span class="font-mono text-[9px] uppercase tracking-widest text-primary/40">{{ left.label }}</span>
      <span class="font-mono text-sm text-primary">{{ left.value }}</span>
    </div>
    <div class="w-px bg-outline_variant/20" />
    <div class="flex flex-1 flex-col items-center gap-1 px-3 py-2">
      <span class="font-mono text-[9px] uppercase tracking-widest text-primary/40">{{ right.label }}</span>
      <span class="font-mono text-sm text-primary">{{ right.value }}</span>
    </div>
  </div>
</template>
