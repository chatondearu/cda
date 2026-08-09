<script setup lang="ts">
interface HudStatusBoxMetric {
  label: string
  value: string | number
}

interface Props {
  title: string
  status?: 'nominal' | 'standby' | 'warning' | 'critical' | 'offline'
  metrics?: HudStatusBoxMetric[]
}

const props = withDefaults(defineProps<Props>(), {
  status: 'nominal',
})

const statusToneMap: Record<Required<Props>['status'], { border: string, text: string }> = {
  nominal: { border: 'border-primary/50', text: 'text-primary' },
  standby: { border: 'border-secondary/50', text: 'text-secondary' },
  warning: { border: 'border-tertiary/50', text: 'text-tertiary' },
  critical: { border: 'border-error/50', text: 'text-error' },
  offline: { border: 'border-outline_variant/40', text: 'text-on_surface_variant/50' },
}

const tone = computed(() => statusToneMap[props.status])
</script>

<template>
  <div
    class="w-56 border bg-surface_container_lowest font-mono text-[10px] uppercase tracking-widest"
    :class="tone.border"
  >
    <div
      class="flex items-center justify-between gap-2 border-b px-2 py-1"
      :class="tone.border"
    >
      <span class="text-primary">{{ title }}</span>
      <span :class="tone.text">{{ status }}</span>
    </div>
    <ul
      v-if="metrics?.length"
      class="flex flex-col gap-1 px-2 py-1.5"
    >
      <li
        v-for="metric in metrics"
        :key="metric.label"
        class="flex items-center justify-between gap-3 text-primary/40"
      >
        <span>{{ metric.label }}</span>
        <span class="text-primary">{{ metric.value }}</span>
      </li>
    </ul>
  </div>
</template>
