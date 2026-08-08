<script setup lang="ts">
type WarningLevel = 'caution' | 'warning' | 'critical'

interface WarningLevelClasses {
  border: string
  headerBg: string
  text: string
}

interface Props {
  level?: WarningLevel
  text: string
}

const props = withDefaults(defineProps<Props>(), {
  level: 'warning',
})

function resolveLevelClasses(level: WarningLevel): WarningLevelClasses {
  switch (level) {
    case 'caution':
      return { border: 'border-primary/60', headerBg: 'bg-primary text-on_primary', text: 'text-primary' }
    case 'warning':
      return { border: 'border-tertiary/60', headerBg: 'bg-tertiary text-on_tertiary', text: 'text-tertiary' }
    case 'critical':
      return { border: 'border-error/60', headerBg: 'bg-error text-on_error', text: 'text-error' }
    default: {
      const exhaustiveCheck: never = level
      return exhaustiveCheck
    }
  }
}

const levelClasses = computed(() => resolveLevelClasses(props.level))
</script>

<template>
  <div
    class="border-2 bg-surface_container_lowest"
    :class="levelClasses.border"
  >
    <div
      class="flex items-center gap-2 px-2 py-1 font-mono text-[9px] uppercase tracking-widest"
      :class="levelClasses.headerBg"
    >
      <span>[!]</span>
      <span>{{ level }}</span>
    </div>
    <p
      class="px-3 py-2 font-mono text-xs uppercase tracking-wide"
      :class="levelClasses.text"
    >
      {{ text }}
    </p>
  </div>
</template>
