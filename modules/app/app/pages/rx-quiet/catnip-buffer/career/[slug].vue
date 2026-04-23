<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const { data: careerDoc } = await useCareerTimelineDetail()
</script>

<template>
  <section class="px-8 py-12 md:px-14">
    <UiSectionHeader
      code="MODULE_02B"
      :title="t('career.detailTitle')"
    />

    <article
      v-if="careerDoc"
      class="max-w-3xl border border-primary_fixed_dim/20 bg-surface_container p-6"
    >
      <UiCornerMarks />
      <h1 class="text-2xl text-primary font-black tracking-[0.1em] uppercase">
        {{ careerDoc.title }}
      </h1>
      <p class="mt-2 text-xs text-primary_container font-mono">
        {{ careerDoc.period }}
      </p>
      <p class="mt-1 text-xs text-primary/60 font-mono">
        {{ careerDoc.reference }}
      </p>
      <div class="prose prose-invert mt-6 max-w-none text-on_surface_variant">
        <ContentRenderer :value="careerDoc" />
      </div>
      <div class="mt-8">
        <UiButton :to="localePath('/rx-quiet/catnip-buffer/career')" variant="secondary">
          {{ t('common.returnCareer') }}
        </UiButton>
      </div>
    </article>

    <div
      v-else
      class="border border-error_container bg-surface_container_high p-6 text-on_error_container"
    >
      {{ t('career.missing') }}
    </div>
  </section>
</template>
