<script setup lang="ts">
interface Props {
  variant?: 'circle' | 'brackets' | 'dot'
}

withDefaults(defineProps<Props>(), {
  variant: 'circle',
})
</script>

<template>
  <div class="flex h-full w-full items-center justify-center">
    <div
      v-if="variant === 'circle'"
      class="relative h-14 w-14 rounded-full border border-primary_fixed_dim/35"
    >
      <span class="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-primary_fixed_dim/25" />
      <span class="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-primary_fixed_dim/25" />
    </div>

    <div
      v-else-if="variant === 'brackets'"
      class="relative h-14 w-14"
    >
      <span class="absolute left-0 top-0 h-3 w-3 border-l border-t border-primary_fixed_dim/35" />
      <span class="absolute right-0 top-0 h-3 w-3 border-r border-t border-primary_fixed_dim/35" />
      <span class="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-primary_fixed_dim/35" />
      <span class="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-primary_fixed_dim/35" />
      <span class="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 border border-primary_fixed_dim/35" />
    </div>

    <div
      v-else
      class="relative h-14 w-14"
    >
      <span class="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 bg-primary_fixed_dim/60" />
      <span class="absolute left-1/2 top-1/2 h-full w-px -translate-x-1/2 -translate-y-1/2 bg-primary_fixed_dim/15" />
      <span class="absolute left-1/2 top-1/2 h-px w-full -translate-x-1/2 -translate-y-1/2 bg-primary_fixed_dim/15" />
    </div>
  </div>
</template>
