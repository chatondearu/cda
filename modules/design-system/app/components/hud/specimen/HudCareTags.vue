<script setup lang="ts">
export type HudCareTagKind = 'fragile' | 'temp' | 'orientation' | 'hazard' | 'custody'

interface HudCareTagItem {
  kind: HudCareTagKind
  label: string
  value?: string
}

interface Props {
  tags: HudCareTagItem[]
  serial?: string
}

defineProps<Props>()
</script>

<template>
  <div class="inline-flex min-w-52 flex-col border border-outline_variant/30 bg-surface_container_lowest">
    <div class="flex items-center justify-between gap-3 border-b border-outline_variant/20 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-primary/50">
      <span>CARE / CUSTODY</span>
      <span v-if="serial">{{ serial }}</span>
    </div>

    <div class="flex flex-col divide-y divide-outline_variant/15">
      <div
        v-for="(tag, index) in tags"
        :key="`${tag.kind}-${index}`"
        class="flex items-center gap-2 px-2 py-1"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.25"
          stroke-linecap="square"
          stroke-linejoin="miter"
          class="h-4 w-4 shrink-0 text-primary/60"
        >
          <template v-if="tag.kind === 'fragile'">
            <polygon points="12,3 20,12 12,21 4,12" />
            <line
              x1="9"
              y1="10"
              x2="12"
              y2="14"
            />
            <line
              x1="12"
              y1="14"
              x2="10"
              y2="18"
            />
          </template>
          <template v-else-if="tag.kind === 'temp'">
            <rect
              x="10"
              y="3"
              width="4"
              height="12"
              rx="2"
            />
            <circle
              cx="12"
              cy="18"
              r="3"
            />
          </template>
          <template v-else-if="tag.kind === 'orientation'">
            <line
              x1="12"
              y1="20"
              x2="12"
              y2="5"
            />
            <polyline points="6,11 12,5 18,11" />
          </template>
          <template v-else-if="tag.kind === 'hazard'">
            <polygon points="12,4 21,20 3,20" />
            <line
              x1="12"
              y1="10"
              x2="12"
              y2="15"
            />
            <circle
              cx="12"
              cy="17.5"
              r="0.75"
              fill="currentColor"
            />
          </template>
          <template v-else-if="tag.kind === 'custody'">
            <circle
              cx="8"
              cy="12"
              r="4"
            />
            <circle
              cx="16"
              cy="12"
              r="4"
            />
          </template>
        </svg>

        <span class="flex-1 font-mono text-[9px] uppercase tracking-widest text-primary/50">{{ tag.label }}</span>
        <span
          v-if="tag.value"
          class="font-mono text-[9px] uppercase tracking-widest text-primary"
        >{{ tag.value }}</span>
      </div>
    </div>
  </div>
</template>
