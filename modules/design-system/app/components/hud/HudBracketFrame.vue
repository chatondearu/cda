<script setup lang="ts">
type BracketVariant = 'corners' | 'chevrons' | 'rails'

interface Props {
  variant?: BracketVariant
}

withDefaults(defineProps<Props>(), {
  variant: 'corners',
})
</script>

<template>
  <div class="relative">
    <span
      v-if="variant === 'corners'"
      class="pointer-events-none absolute inset-0"
    >
      <span class="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-primary" />
      <span class="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-primary" />
      <span class="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-primary" />
      <span class="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-primary" />
    </span>

    <span
      v-else-if="variant === 'chevrons'"
      class="pointer-events-none absolute inset-0"
    >
      <span class="absolute left-1 top-1 h-2.5 w-2.5 rotate-45 border-l-2 border-t-2 border-primary" />
      <span class="absolute right-1 top-1 h-2.5 w-2.5 -rotate-45 border-r-2 border-t-2 border-primary" />
      <span class="absolute bottom-1 left-1 h-2.5 w-2.5 -rotate-45 border-b-2 border-l-2 border-primary" />
      <span class="absolute bottom-1 right-1 h-2.5 w-2.5 rotate-45 border-b-2 border-r-2 border-primary" />
    </span>

    <span
      v-else
      class="pointer-events-none absolute inset-0"
    >
      <span class="absolute inset-y-0 left-0 w-0.5 bg-primary/60" />
      <span class="absolute inset-y-0 right-0 w-0.5 bg-primary/60" />
      <span class="absolute left-0 top-0 h-px w-2 bg-primary" />
      <span class="absolute right-0 top-0 h-px w-2 bg-primary" />
      <span class="absolute bottom-0 left-0 h-px w-2 bg-primary" />
      <span class="absolute bottom-0 right-0 h-px w-2 bg-primary" />
    </span>

    <div class="relative px-3 py-2">
      <slot />
    </div>
  </div>
</template>
