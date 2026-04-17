<script setup lang="ts">
interface Props {
  /** Capsule status label from prototype (e.g. UNFINISHED, NOMINAL) */
  label: string
  variant: 'error' | 'secondary'
}

defineProps<Props>()
</script>

<template>
  <span
    class="px-2 py-0.5 text-[8px] font-bold uppercase tracking-wide"
    :class="
      variant === 'error'
        ? 'bg-error_container text-on_error_container'
        : 'bg-secondary_container text-on_secondary_container'
    "
  >
    {{ label }}
  </span>
</template>
