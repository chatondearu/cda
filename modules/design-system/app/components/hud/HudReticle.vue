<script setup lang="ts">
interface Props {
  size?: 'sm' | 'md'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
})

const sizeClass = computed(() => (props.size === 'sm' ? 'h-10 w-10' : 'h-16 w-16'))
</script>

<template>
  <div
    class="relative border border-primary_fixed_dim/35"
    :class="sizeClass"
  >
    <span class="absolute left-1/2 top-0 h-[35%] w-px -translate-x-1/2 bg-primary_fixed_dim/40" />
    <span class="absolute bottom-0 left-1/2 h-[35%] w-px -translate-x-1/2 bg-primary_fixed_dim/40" />
    <span class="absolute left-0 top-1/2 h-px w-[35%] -translate-y-1/2 bg-primary_fixed_dim/40" />
    <span class="absolute right-0 top-1/2 h-px w-[35%] -translate-y-1/2 bg-primary_fixed_dim/40" />
  </div>
</template>
