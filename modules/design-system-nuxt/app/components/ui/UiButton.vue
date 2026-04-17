<script setup lang="ts">

interface Props {
  variant?: 'primary' | 'secondary' | 'tertiary'
  to?: string
  href?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  to: undefined,
  href: undefined,
})

const attrs = useAttrs()

const nuxtLinkAttrKeys = new Set([
  'to',
  'href',
  'external',
  'target',
  'rel',
  'replace',
  'noRel',
  'prefetch',
  'noPrefetch',
  'prefetchedClass',
  'activeClass',
  'exactActiveClass',
  'ariaCurrentValue',
])

const isLink = computed(() => {
  if (props.to || props.href)
    return true

  return Object.keys(attrs).some(key => nuxtLinkAttrKeys.has(key))
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
    v-if="isLink"
    v-bind="attrs"
    :to="props.to ?? attrs.to"
    :href="props.href ?? attrs.href"
    :class="classes[props.variant]"
  >
    <slot />
  </NuxtLink>
  <button
    v-else
    v-bind="attrs"
    type="button"
    :class="classes[props.variant]"
  >
    <slot />
  </button>
</template>
