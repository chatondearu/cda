<script setup lang="ts">
interface Props {
  label?: string
  active?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  label: 'HOT ZONE',
  active: false,
})

const STRIPE_COUNT = 16

const stripeCells = computed(() => Array.from({ length: STRIPE_COUNT }, (_, index) => index))

const toneClass = computed(() => (props.active ? 'border-error text-error' : 'border-outline_variant/40 text-primary/40'))
const stripeToneClass = computed(() => (props.active ? 'bg-error' : 'bg-outline_variant/30'))
const statusLabel = computed(() => (props.active ? 'RESTRICTED' : 'STANDBY'))
</script>

<template>
  <div
    class="flex flex-col border-y-2"
    :class="toneClass"
  >
    <div class="flex h-1.5 w-full">
      <span
        v-for="cell in stripeCells"
        :key="`top-${cell}`"
        class="flex-1"
        :class="cell % 2 === 0 ? stripeToneClass : 'bg-surface_container_lowest'"
      />
    </div>
    <div class="flex items-center justify-between gap-3 px-3 py-2 font-mono text-[10px] uppercase tracking-widest">
      <span>{{ label }}</span>
      <span>{{ statusLabel }}</span>
    </div>
    <div class="flex h-1.5 w-full">
      <span
        v-for="cell in stripeCells"
        :key="`bottom-${cell}`"
        class="flex-1"
        :class="cell % 2 === 0 ? 'bg-surface_container_lowest' : stripeToneClass"
      />
    </div>
  </div>
</template>
