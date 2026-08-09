<script setup lang="ts">
export type HudGlyphVariant = 'sigil' | 'rune' | 'circuit' | 'node' | 'fracture'
export type HudGlyphTone = 'active' | 'warning' | 'error' | 'idle'
export type HudGlyphSize = 'sm' | 'md' | 'lg'

interface Props {
  variant: HudGlyphVariant
  size?: HudGlyphSize
  tone?: HudGlyphTone
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  tone: 'active',
})

const sizeClassMap: Record<HudGlyphSize, string> = {
  sm: 'h-5 w-5',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
}

const toneClassMap: Record<HudGlyphTone, string> = {
  active: 'text-primary',
  warning: 'text-tertiary',
  error: 'text-error',
  idle: 'text-on_surface_variant/50',
}

const svgClass = computed(() => [sizeClassMap[props.size], toneClassMap[props.tone]])
</script>

<template>
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.25"
    stroke-linecap="square"
    class="shrink-0"
    :class="svgClass"
  >
    <g v-if="variant === 'sigil'">
      <path d="M4 4 H15 L4 15 H20" />
      <path d="M14 20 H20 V14" />
    </g>

    <g v-else-if="variant === 'rune'">
      <line
        x1="12"
        y1="2"
        x2="12"
        y2="22"
      />
      <path d="M12 7 L19 3" />
      <path d="M12 13 L5 17" />
      <circle
        cx="12"
        cy="20"
        r="1.4"
        fill="currentColor"
        stroke="none"
      />
    </g>

    <g v-else-if="variant === 'circuit'">
      <path d="M3 7 H10 V17 H21" />
      <circle
        cx="3"
        cy="7"
        r="1.4"
        fill="currentColor"
        stroke="none"
      />
      <circle
        cx="21"
        cy="17"
        r="1.4"
        fill="currentColor"
        stroke="none"
      />
      <circle
        cx="10"
        cy="12"
        r="1.4"
        fill="currentColor"
        stroke="none"
      />
    </g>

    <g v-else-if="variant === 'node'">
      <path d="M12 3 L20 18 H4 Z" />
      <circle
        cx="12"
        cy="3"
        r="1.4"
        fill="currentColor"
        stroke="none"
      />
      <circle
        cx="20"
        cy="18"
        r="1.4"
        fill="currentColor"
        stroke="none"
      />
      <circle
        cx="4"
        cy="18"
        r="1.4"
        fill="currentColor"
        stroke="none"
      />
      <circle
        cx="12"
        cy="13"
        r="1.4"
        fill="currentColor"
        stroke="none"
      />
    </g>

    <g v-else-if="variant === 'fracture'">
      <line
        x1="4"
        y1="4"
        x2="20"
        y2="20"
      />
      <path d="M4 13 L11 6" />
      <path d="M13 20 L20 13" />
    </g>
  </svg>
</template>
