<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'tertiary'
  as?: 'button' | 'a'
  href?: string
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  as: 'button',
  href: '',
})

const classes: Record<string, string> = {
  primary:
    'border-2 border-primary bg-primary px-8 py-3 font-bold uppercase tracking-widest text-on_primary transition-none hover:bg-background hover:text-primary',
  secondary:
    'border-2 border-primary bg-transparent px-8 py-3 font-bold uppercase tracking-widest text-primary transition-none hover:bg-primary hover:text-on_primary',
  tertiary:
    'bg-transparent px-2 py-2 text-[11px] font-bold uppercase tracking-widest text-primary transition-none hover:text-primary_fixed_dim',
}
</script>

<template>
  <NuxtLink
    v-if="as === 'a'"
    :to="href"
    :class="classes[variant]"
  >
    <slot />
  </NuxtLink>
  <button
    v-else
    type="button"
    :class="classes[variant]"
  >
    <slot />
  </button>
</template>
