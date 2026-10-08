<script setup lang="ts">
defineOptions({ inheritAttrs: false })

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
const localePath = useLocalePath()

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

const localizedTo = computed(() => {
  const rawTo = props.to ?? attrs.to
  if (typeof rawTo !== 'string')
    return rawTo
  if (!rawTo.startsWith('/'))
    return rawTo
  return localePath(rawTo)
})

const classes: Record<string, string> = {
  primary:
    'border-2 border-primary bg-primary px-8 py-3 font-bold uppercase tracking-widest text-on_primary transition-none hover:bg-background hover:text-primary',
  secondary:
    'border-2 border-primary bg-transparent px-8 py-3 font-bold uppercase tracking-widest text-primary transition-none hover:bg-primary hover:text-on_primary',
  tertiary:
    'bg-transparent px-2 py-2 text-[11px] font-bold uppercase tracking-widest text-primary transition-none hover:text-primary_fixed_dim',
}

const mergedClass = computed(() => [classes[props.variant], attrs.class].filter(Boolean))

const passthroughAttrs = computed(() => {
  const { class: _drop, ...rest } = attrs as Record<string, unknown>
  return rest
})

// Resolve href in script — template attrs access is typed as unknown under vue-tsc 3
const linkHref = computed(() => {
  if (props.href)
    return props.href
  const fromAttrs = (attrs as Record<string, unknown>).href
  return typeof fromAttrs === 'string' ? fromAttrs : undefined
})
</script>

<template>
  <NuxtLink
    v-if="isLink"
    v-bind="passthroughAttrs"
    :to="localizedTo"
    :href="linkHref"
    :class="mergedClass"
  >
    <slot />
  </NuxtLink>
  <button
    v-else
    v-bind="passthroughAttrs"
    type="button"
    :class="mergedClass"
  >
    <slot />
  </button>
</template>
