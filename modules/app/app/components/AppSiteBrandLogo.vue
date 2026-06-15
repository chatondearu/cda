<script setup lang="ts">
interface Props {
  sizeClass?: string
}

withDefaults(defineProps<Props>(), {
  sizeClass: 'h-9 w-9',
})

const localePath = useLocalePath()
const { t } = useI18n()
</script>

<template>
  <NuxtLink
    :to="localePath('/')"
    class="block shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary_fixed_dim"
    :aria-label="t('nav.home')"
  >
    <img
      src="/images/logo_base.svg"
      alt=""
      class="object-contain"
      :class="sizeClass"
      width="36"
      height="36"
    >
  </NuxtLink>
</template>
