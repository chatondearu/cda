<script setup lang="ts">
interface Props {
  period: string
  title: string
  reference: string
  description: string
  tags: string[]
  layout: 'a' | 'b'
  detailsPath?: string
}

const props = defineProps<Props>()
const { t } = useI18n()
const localePath = useLocalePath()
const detailsUrl = computed(() =>
  props.detailsPath ? localePath(props.detailsPath) : null,
)
</script>

<template>
  <article
    v-if="layout === 'a'"
    class="group relative grid grid-cols-1 gap-8 py-12 md:grid-cols-2 md:gap-16"
  >
    <div class="md:text-right">
      <span class="mb-2 block font-mono text-xs text-primary_container">{{ period }}</span>
      <h4 class="text-xl font-bold uppercase text-primary">
        {{ title }}
      </h4>
      <p class="font-mono text-xs text-primary/60">
        {{ reference }}
      </p>
    </div>
    <div class="relative">
      <div class="absolute -left-[33px] top-1 hidden h-4 w-4 rotate-45 bg-primary transition-transform group-hover:scale-125 md:block" />
      <p class="text-sm leading-relaxed text-on_surface_variant">
        {{ description }}
      </p>
      <div class="mt-4 flex gap-2">
        <span
          v-for="tag in tags"
          :key="tag"
          class="bg-secondary_container px-2 py-1 text-[10px] uppercase text-on_secondary_container"
        >
          {{ tag }}
        </span>
      </div>
      <div v-if="detailsUrl" class="mt-5">
        <UiButton
          size="sm"
          variant="secondary"
          :to="detailsUrl"
        >
          {{ t('common.seeMore') }}
        </UiButton>
      </div>
    </div>
  </article>
  <article
    v-else
    class="group relative grid grid-cols-1 gap-8 border-t border-primary/5 py-12 md:grid-cols-2 md:gap-16"
  >
    <div class="md:order-2">
      <span class="mb-2 block font-mono text-xs text-primary_container">{{ period }}</span>
      <h4 class="text-xl font-bold uppercase text-primary">
        {{ title }}
      </h4>
      <p class="font-mono text-xs text-primary/60">
        {{ reference }}
      </p>
    </div>
    <div class="relative md:text-right">
      <div class="absolute -right-[33px] top-1 hidden h-4 w-4 rotate-45 border-2 border-primary transition-colors group-hover:bg-primary md:block" />
      <p class="text-sm leading-relaxed text-on_surface_variant">
        {{ description }}
      </p>
      <div class="mt-4 flex gap-2 md:justify-end">
        <span
          v-for="tag in tags"
          :key="tag"
          class="bg-secondary_container px-2 py-1 text-[10px] uppercase text-on_secondary_container"
        >
          {{ tag }}
        </span>
      </div>
      <div v-if="detailsUrl" class="mt-5 md:text-right">
        <UiButton
          size="sm"
          variant="secondary"
          :to="detailsUrl"
        >
          {{ t('common.seeMore') }}
        </UiButton>
      </div>
    </div>
  </article>
</template>
