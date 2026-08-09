<script setup lang="ts">
export type HudMilSymbolAffiliation = 'friend' | 'hostile' | 'neutral' | 'unknown'

interface HudMilSymbolFrame {
  tone: string
  dashArray?: string
}

interface Props {
  affiliation?: HudMilSymbolAffiliation
  designation?: string
  echelon?: string
}

const props = withDefaults(defineProps<Props>(), {
  affiliation: 'unknown',
})

function resolveFrame(affiliation: HudMilSymbolAffiliation): HudMilSymbolFrame {
  switch (affiliation) {
    case 'friend':
      return { tone: 'text-primary' }
    case 'hostile':
      return { tone: 'text-error' }
    case 'neutral':
      return { tone: 'text-tertiary' }
    case 'unknown':
      return { tone: 'text-on_surface_variant/60', dashArray: '3 2' }
    default: {
      const exhaustiveCheck: never = affiliation
      return exhaustiveCheck
    }
  }
}

const frame = computed(() => resolveFrame(props.affiliation))
</script>

<template>
  <div class="inline-flex flex-col items-center gap-1 font-mono text-[9px] uppercase tracking-widest">
    <span
      v-if="echelon"
      class="text-primary/40"
    >{{ echelon }}</span>

    <svg
      viewBox="0 0 40 40"
      class="h-10 w-10"
      :class="frame.tone"
    >
      <rect
        v-if="affiliation === 'friend'"
        x="3"
        y="8"
        width="34"
        height="24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      />
      <polygon
        v-else-if="affiliation === 'hostile'"
        points="20,3 37,20 20,37 3,20"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linejoin="miter"
      />
      <rect
        v-else-if="affiliation === 'neutral'"
        x="6"
        y="6"
        width="28"
        height="28"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      />
      <polygon
        v-else
        points="20,4 36,20 20,36 4,20"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linejoin="miter"
        :stroke-dasharray="frame.dashArray"
      />
      <text
        v-if="designation"
        x="20"
        y="24"
        text-anchor="middle"
        font-size="10"
        font-family="monospace"
        fill="currentColor"
      >{{ designation }}</text>
    </svg>
  </div>
</template>
