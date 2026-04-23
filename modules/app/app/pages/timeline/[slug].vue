<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const { data: timelineDoc } = await useStreamerTimelineDetail()
</script>

<template>
  <section class="px-8 py-12 md:px-14">
    <UiSectionHeader
      code="MODULE_02A"
      :title="t('timeline.detailTitle')"
    />

    <article
      v-if="timelineDoc"
      class="max-w-3xl border border-primary_fixed_dim/20 bg-surface_container p-6"
    >
      <UiCornerMarks />
      <h1 class="text-2xl text-primary font-black tracking-[0.1em] uppercase">
        {{ timelineDoc.title }}
      </h1>
      <p class="mt-2 text-xs text-primary_container font-mono">
        {{ timelineDoc.period }}
      </p>
      <p class="mt-1 text-xs text-primary/60 font-mono">
        {{ timelineDoc.reference }}
      </p>
      <div class="prose prose-invert mt-6 max-w-none text-on_surface_variant">
        <ContentRenderer :value="timelineDoc" />
      </div>
      <div class="mt-8">
        <UiButton :to="localePath('/timeline')" variant="secondary">
          {{ t('common.returnTimeline') }}
        </UiButton>
      </div>
    </article>

    <div
      v-else
      class="border border-error_container bg-surface_container_high p-6 text-on_error_container"
    >
      {{ t('timeline.missing') }}
    </div>
  </section>
</template>
