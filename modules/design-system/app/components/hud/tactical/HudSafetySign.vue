<script setup lang="ts">
export type HudSafetySignKind = 'mandatory' | 'prohibition' | 'warning' | 'info'

interface HudSafetySignConfig {
  tone: string
  glyph: string
}

interface Props {
  kind?: HudSafetySignKind
  text: string
  code?: string
}

const props = withDefaults(defineProps<Props>(), {
  kind: 'warning',
})

function resolveConfig(kind: HudSafetySignKind): HudSafetySignConfig {
  switch (kind) {
    case 'mandatory':
      return { tone: 'text-primary', glyph: '\u25CF' }
    case 'prohibition':
      return { tone: 'text-error', glyph: '' }
    case 'warning':
      return { tone: 'text-tertiary', glyph: '!' }
    case 'info':
      return { tone: 'text-secondary', glyph: 'i' }
    default: {
      const exhaustiveCheck: never = kind
      return exhaustiveCheck
    }
  }
}

const config = computed(() => resolveConfig(props.kind))
</script>

<template>
  <div class="inline-flex w-40 flex-col items-center gap-2 border border-outline_variant/25 bg-surface_container_lowest px-3 py-3">
    <svg
      viewBox="0 0 40 40"
      class="h-10 w-10"
      :class="config.tone"
    >
      <polygon
        v-if="kind === 'warning'"
        points="20,4 36,34 4,34"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linejoin="miter"
      />
      <circle
        v-else-if="kind === 'mandatory'"
        cx="20"
        cy="20"
        r="17"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      />
      <rect
        v-else-if="kind === 'info'"
        x="5"
        y="5"
        width="30"
        height="30"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      />
      <template v-else>
        <circle
          cx="20"
          cy="20"
          r="17"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        />
        <line
          x1="7"
          y1="33"
          x2="33"
          y2="7"
          stroke="currentColor"
          stroke-width="2"
        />
      </template>
      <text
        v-if="config.glyph"
        x="20"
        y="25"
        text-anchor="middle"
        font-size="12"
        font-weight="700"
        font-family="monospace"
        fill="currentColor"
      >{{ config.glyph }}</text>
    </svg>
    <span
      class="text-center font-mono text-[9px] uppercase tracking-widest"
      :class="config.tone"
    >{{ text }}</span>
    <span
      v-if="code"
      class="font-mono text-[8px] uppercase tracking-widest text-on_surface_variant/40"
    >{{ code }}</span>
  </div>
</template>
