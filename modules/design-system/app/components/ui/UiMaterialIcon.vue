<script setup lang="ts">
interface Props {
  name: string
  /** Tailwind text size class */
  sizeClass?: string
  filled?: boolean
}

withDefaults(defineProps<Props>(), {
  sizeClass: 'text-2xl',
  filled: false,
})
</script>

<template>
  <span
    class="material-symbols-outlined inline-block leading-none"
    :class="sizeClass"
    :style="
      filled
        ? { fontVariationSettings: '\'FILL\' 1, \'wght\' 400, \'GRAD\' 0, \'opsz\' 24' }
        : undefined
    "
  >{{ name }}</span>
</template>
