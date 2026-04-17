<script setup lang="ts">
import type { ArchiveItem } from '../../composables/useSystemData'

interface Props {
  item: ArchiveItem
}

defineProps<Props>()
</script>

<template>
  <article class="group relative border border-primary/10 bg-surface_container_high p-6 transition-colors hover:border-primary/50">
    <UiCornerMarks />
    <div class="mb-4 flex items-start justify-between">
      <UiRefCode :code="item.capsule" />
      <UiStatusChip
        :label="item.status === 'unfinished' ? 'UNFINISHED' : 'NOMINAL'"
        :variant="item.status === 'unfinished' ? 'error' : 'secondary'"
      />
    </div>
    <img
      :src="item.image"
      :alt="item.title"
      class="mb-4 h-40 w-full object-cover brightness-50 grayscale transition-all duration-500 group-hover:grayscale-0"
    >
    <h4 class="mb-2 text-lg font-bold uppercase text-primary">
      {{ item.title }}
    </h4>
    <p class="mb-6 line-clamp-3 text-xs text-on_surface_variant">
      {{ item.description }}
    </p>
    <div class="flex items-center justify-between">
      <UiRefCode
        tone="emphasis"
        :code="`TECH: ${item.tech}`"
      />
      <NuxtLink
        :to="`/archive/${item.slug}`"
        class="text-primary"
        aria-label="Open capsule"
      >
        <UiMaterialIcon
          name="open_in_new"
          size-class="text-sm text-primary"
        />
      </NuxtLink>
    </div>
  </article>
</template>
