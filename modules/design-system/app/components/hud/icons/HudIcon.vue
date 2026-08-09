<script setup lang="ts">
export type HudIconVariant = 'diamond' | 'chevron' | 'hash' | 'triangle' | 'cross' | 'ring'
export type HudIconDirection = 'up' | 'right' | 'down' | 'left'
export type HudIconTone = 'active' | 'warning' | 'error' | 'idle'
export type HudIconSize = 'sm' | 'md' | 'lg'

interface Props {
  variant: HudIconVariant
  size?: HudIconSize
  direction?: HudIconDirection
  tone?: HudIconTone
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  direction: 'right',
  tone: 'active',
})

const sizeClassMap: Record<HudIconSize, string> = {
  sm: 'h-3 w-3',
  md: 'h-4 w-4',
  lg: 'h-6 w-6',
}

const toneClassMap: Record<HudIconTone, string> = {
  active: 'text-primary',
  warning: 'text-tertiary',
  error: 'text-error',
  idle: 'text-on_surface_variant/50',
}

// Chevron is the only directional variant; direction rotates the whole glyph
// around its center rather than swapping polyline points.
const directionRotationMap: Record<HudIconDirection, string> = {
  up: '-rotate-90',
  right: 'rotate-0',
  down: 'rotate-90',
  left: 'rotate-180',
}

const svgClass = computed(() => [
  sizeClassMap[props.size],
  toneClassMap[props.tone],
  props.variant === 'chevron' ? directionRotationMap[props.direction] : '',
])
</script>

<template>
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="square"
    stroke-linejoin="miter"
    class="shrink-0 origin-center"
    :class="svgClass"
  >
    <polygon
      v-if="variant === 'diamond'"
      points="12,2 22,12 12,22 2,12"
    />
    <polyline
      v-else-if="variant === 'chevron'"
      points="8,5 17,12 8,19"
    />
    <g v-else-if="variant === 'hash'">
      <line
        x1="9"
        y1="3"
        x2="9"
        y2="21"
      />
      <line
        x1="15"
        y1="3"
        x2="15"
        y2="21"
      />
      <line
        x1="3"
        y1="9"
        x2="21"
        y2="9"
      />
      <line
        x1="3"
        y1="15"
        x2="21"
        y2="15"
      />
    </g>
    <polygon
      v-else-if="variant === 'triangle'"
      points="12,3 21,20 3,20"
    />
    <g v-else-if="variant === 'cross'">
      <line
        x1="12"
        y1="3"
        x2="12"
        y2="21"
      />
      <line
        x1="3"
        y1="12"
        x2="21"
        y2="12"
      />
    </g>
    <circle
      v-else-if="variant === 'ring'"
      cx="12"
      cy="12"
      r="8"
    />
  </svg>
</template>
