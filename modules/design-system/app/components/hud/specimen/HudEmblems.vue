<script setup lang="ts">
export type HudEmblemVariant = 'seal' | 'sigil' | 'bar' | 'node'

interface HudEmblemItem {
  variant: HudEmblemVariant
  label?: string
  active?: boolean
}

interface Props {
  emblems: HudEmblemItem[]
}

defineProps<Props>()
</script>

<template>
  <div class="inline-flex items-start gap-2">
    <div
      v-for="(emblem, index) in emblems"
      :key="`${emblem.variant}-${index}`"
      class="flex flex-col items-center gap-1"
    >
      <div
        class="flex h-9 w-9 items-center justify-center border bg-surface_container_lowest"
        :class="emblem.active ? 'border-primary/70' : 'border-outline_variant/25'"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.25"
          stroke-linecap="square"
          stroke-linejoin="miter"
          class="h-5 w-5"
          :class="[emblem.active ? 'text-primary' : 'text-on_surface_variant/40', emblem.active ? 'hud-motion-target hud-anim-crosshair-breathe-subtle' : '']"
        >
          <template v-if="emblem.variant === 'seal'">
            <circle
              cx="12"
              cy="12"
              r="9"
            />
            <circle
              cx="12"
              cy="12"
              r="3.5"
            />
          </template>
          <template v-else-if="emblem.variant === 'sigil'">
            <polygon points="12,3 21,12 12,21 3,12" />
            <line
              x1="12"
              y1="7"
              x2="12"
              y2="17"
            />
            <line
              x1="7"
              y1="12"
              x2="17"
              y2="12"
            />
          </template>
          <template v-else-if="emblem.variant === 'bar'">
            <line
              x1="4"
              y1="7"
              x2="20"
              y2="7"
            />
            <line
              x1="6"
              y1="12"
              x2="18"
              y2="12"
            />
            <line
              x1="8"
              y1="17"
              x2="16"
              y2="17"
            />
          </template>
          <template v-else-if="emblem.variant === 'node'">
            <circle
              cx="12"
              cy="4.5"
              r="1.75"
            />
            <circle
              cx="5"
              cy="18"
              r="1.75"
            />
            <circle
              cx="19"
              cy="18"
              r="1.75"
            />
            <line
              x1="12"
              y1="4.5"
              x2="5"
              y2="18"
            />
            <line
              x1="12"
              y1="4.5"
              x2="19"
              y2="18"
            />
            <line
              x1="5"
              y1="18"
              x2="19"
              y2="18"
            />
          </template>
        </svg>
      </div>
      <span
        v-if="emblem.label"
        class="font-mono text-[8px] uppercase tracking-widest text-primary/40"
      >{{ emblem.label }}</span>
    </div>
  </div>
</template>
