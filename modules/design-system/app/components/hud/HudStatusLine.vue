<script setup lang="ts">
interface Props {
  label: string
  status?: 'active' | 'standby' | 'offline' | 'pending' | 'locked'
}

const props = withDefaults(defineProps<Props>(), {
  status: 'active',
})

const statusToneMap: Record<Required<Props>['status'], string> = {
  active: 'text-primary',
  standby: 'text-secondary',
  offline: 'text-error/70',
  pending: 'text-secondary/50',
  locked: 'text-error',
}

const statusTone = computed(() => statusToneMap[props.status])
</script>

<template>
  <div class="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest">
    <span class="text-primary/40">{{ label }} &gt;</span>
    <span :class="statusTone">{{ status }}</span>
  </div>
</template>
