<script setup lang="ts">
interface Props {
  locked?: boolean
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  locked: false,
})

const borderTone = computed(() => (props.locked ? 'border-error' : 'border-secondary/70'))
const textTone = computed(() => (props.locked ? 'text-error' : 'text-secondary/70'))
const statusLabel = computed(() => (props.locked ? 'LOCK ON' : 'ACQUIRING'))
</script>

<template>
  <div class="flex flex-col items-center gap-2">
    <div class="relative h-20 w-20">
      <span
        class="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2"
        :class="borderTone"
      />
      <span
        class="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2"
        :class="borderTone"
      />
      <span
        class="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2"
        :class="borderTone"
      />
      <span
        class="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2"
        :class="borderTone"
      />
      <span
        class="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2"
        :class="props.locked ? 'bg-error' : 'bg-secondary/70'"
      />
    </div>

    <div class="flex flex-col items-center gap-0.5 font-mono text-[10px] uppercase tracking-widest">
      <span :class="textTone">{{ statusLabel }}</span>
      <span
        v-if="label"
        class="text-primary/40"
      >{{ label }}</span>
    </div>
  </div>
</template>
