<script setup lang="ts">
interface Props {
  index: number
  /** Zero-pads the index to this width, e.g. `3` renders `007`. */
  digits?: number
  total?: number
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  digits: 3,
})

const paddedIndex = computed(() => String(Math.max(props.index, 0)).padStart(props.digits, '0'))
const totalLabel = computed(() => (props.total !== undefined ? `OF ${String(props.total).padStart(props.digits, '0')}` : undefined))
</script>

<template>
  <div class="inline-flex flex-col gap-1">
    <div class="flex items-baseline gap-2 font-mono leading-none">
      <span class="text-[10px] uppercase tracking-widest text-primary/40">NO.</span>
      <span class="text-3xl font-black tracking-tight text-primary">{{ paddedIndex }}</span>
      <span
        v-if="totalLabel"
        class="text-[10px] uppercase tracking-widest text-primary/40"
      >{{ totalLabel }}</span>
    </div>
    <span
      v-if="label"
      class="font-mono text-[9px] uppercase tracking-widest text-primary/40"
    >{{ label }}</span>
  </div>
</template>
