<script setup lang="ts">
import type { HudIconVariant } from './HudIcon.vue'

export type HudIconLabelTone = 'active' | 'warning' | 'error' | 'idle'

interface Props {
  icon: HudIconVariant
  label: string
  value?: string
  tone?: HudIconLabelTone
}

const props = withDefaults(defineProps<Props>(), {
  tone: 'active',
})

const toneClassMap: Record<HudIconLabelTone, { border: string, text: string }> = {
  active: { border: 'border-primary/40', text: 'text-primary' },
  warning: { border: 'border-tertiary/40', text: 'text-tertiary' },
  error: { border: 'border-error/40', text: 'text-error' },
  idle: { border: 'border-outline_variant/40', text: 'text-on_surface_variant/50' },
}

const toneClasses = computed(() => toneClassMap[props.tone])
</script>

<template>
  <div
    class="inline-flex items-center gap-2 border bg-surface_container_lowest px-2 py-1 font-mono text-[9px] uppercase tracking-widest"
    :class="toneClasses.border"
  >
    <HudIcon
      :variant="icon"
      size="sm"
      :tone="tone"
    />
    <span
      class="opacity-50"
      :class="toneClasses.text"
    >{{ label }}</span>
    <span
      v-if="value"
      :class="toneClasses.text"
    >{{ value }}</span>
  </div>
</template>
