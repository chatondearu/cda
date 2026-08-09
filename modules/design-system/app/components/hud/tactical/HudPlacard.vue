<script setup lang="ts">
export type HudPlacardTone = 'default' | 'caution' | 'critical'

interface Props {
  title: string
  code?: string
  spec?: string
  tone?: HudPlacardTone
}

const props = withDefaults(defineProps<Props>(), {
  tone: 'default',
})

function resolveBorderClass(tone: HudPlacardTone): string {
  switch (tone) {
    case 'default':
      return 'border-outline_variant/40'
    case 'caution':
      return 'border-tertiary/60'
    case 'critical':
      return 'border-error/60'
    default: {
      const exhaustiveCheck: never = tone
      return exhaustiveCheck
    }
  }
}

const borderClass = computed(() => resolveBorderClass(props.tone))

const RIVET_CORNERS = ['tl', 'tr', 'bl', 'br'] as const
</script>

<template>
  <div
    class="relative inline-flex w-56 flex-col gap-1 border-2 bg-surface_container_lowest px-4 py-3"
    :class="borderClass"
  >
    <span
      v-for="corner in RIVET_CORNERS"
      :key="corner"
      class="absolute h-1.5 w-1.5 bg-on_surface_variant/40"
      :class="{
        'left-1 top-1': corner === 'tl',
        'right-1 top-1': corner === 'tr',
        'bottom-1 left-1': corner === 'bl',
        'bottom-1 right-1': corner === 'br',
      }"
    />

    <span
      v-if="code"
      class="font-mono text-[9px] uppercase tracking-widest text-primary/40"
    >{{ code }}</span>
    <span class="font-mono text-sm font-bold uppercase tracking-widest text-primary">{{ title }}</span>
    <span
      v-if="spec"
      class="font-mono text-[10px] uppercase tracking-wide text-on_surface_variant/60"
    >{{ spec }}</span>
  </div>
</template>
