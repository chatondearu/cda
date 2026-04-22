<script setup lang="ts">
import type { TimelineItem } from '../../composables/useSystemData'

interface Props {
  items: TimelineItem[]
}

defineProps<Props>()
const { t } = useI18n()
</script>

<template>
  <section class="relative bg-surface_container_lowest p-8 md:p-16">
    <UiSectionHeader
      code="MODULE_02"
      :title="t('timeline.sectionTitle')"
    >
      <template #right>
        <span class="font-mono text-[10px] text-primary/40">{{ t('timeline.totalUptime') }}</span>
      </template>
    </UiSectionHeader>
    <div class="relative space-y-0">
      <div class="absolute bottom-0 left-0 top-0 hidden w-px bg-primary/20 md:left-1/2 md:block" />
      <UiTimelineItem
        v-for="item in items"
        :key="`${item.period}-${item.title}`"
        v-bind="item"
      />
    </div>
  </section>
</template>
