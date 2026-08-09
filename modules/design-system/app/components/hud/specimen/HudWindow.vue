<script setup lang="ts">
export type HudWindowStatus = 'active' | 'idle' | 'error'

interface Props {
  title: string
  status?: HudWindowStatus
}

const props = withDefaults(defineProps<Props>(), {
  status: 'active',
})

const statusDotClassMap: Record<HudWindowStatus, string> = {
  active: 'bg-primary',
  idle: 'bg-outline_variant/50',
  error: 'bg-error',
}

const statusDotClass = computed(() => statusDotClassMap[props.status])
</script>

<template>
  <div class="flex flex-col border border-outline_variant/30 bg-surface_container_lowest">
    <div class="flex items-center justify-between gap-2 border-b border-outline_variant/20 bg-surface_container_low px-2 py-1">
      <div class="flex items-center gap-1.5">
        <span
          class="h-1.5 w-1.5 rounded-full"
          :class="statusDotClass"
        />
        <span class="h-1.5 w-1.5 rounded-full bg-outline_variant/25" />
        <span class="h-1.5 w-1.5 rounded-full bg-outline_variant/25" />
      </div>
      <span class="font-mono text-[9px] uppercase tracking-widest text-primary/50">{{ title }}</span>
      <span class="font-mono text-[10px] text-primary/30">&times;</span>
    </div>
    <div class="p-3">
      <slot />
    </div>
  </div>
</template>
