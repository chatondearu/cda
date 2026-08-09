<script setup lang="ts">
export type HudCalloutDirection = 'up' | 'right' | 'down' | 'left'

interface Props {
  label: string
  detail?: string
  direction?: HudCalloutDirection
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'right',
})

const containerDirectionClassMap: Record<HudCalloutDirection, string> = {
  right: 'flex-row',
  left: 'flex-row-reverse',
  down: 'flex-col',
  up: 'flex-col-reverse',
}

const leaderClassMap: Record<HudCalloutDirection, string> = {
  right: 'h-px w-6',
  left: 'h-px w-6',
  down: 'w-px h-6',
  up: 'w-px h-6',
}

const containerDirectionClass = computed(() => containerDirectionClassMap[props.direction])
const leaderClass = computed(() => leaderClassMap[props.direction])
</script>

<template>
  <div
    class="inline-flex items-center gap-0"
    :class="containerDirectionClass"
  >
    <span class="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
    <span
      class="shrink-0 bg-primary/40"
      :class="leaderClass"
    />
    <div class="flex flex-col gap-0.5 border border-primary/30 bg-surface_container_lowest px-2 py-1">
      <span class="font-mono text-[9px] uppercase tracking-widest text-primary">{{ label }}</span>
      <span
        v-if="detail"
        class="font-mono text-[8px] uppercase tracking-widest text-primary/40"
      >{{ detail }}</span>
    </div>
  </div>
</template>
