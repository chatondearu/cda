<script setup lang="ts">
const { data: archiveDoc } = await useArchiveDetail()

const currentItem = computed(() =>
  archiveDoc.value ? mapArchiveDocumentToItem(archiveDoc.value) : null,
)
</script>

<template>
  <section class="px-8 py-12 md:px-14">
    <UiSectionHeader
      code="MODULE_03A"
      title="ARCHIVE_DETAIL"
    />
    <div
      v-if="currentItem"
      class="max-w-3xl border border-primary_fixed_dim/20 bg-surface_container p-6"
    >
      <UiCornerMarks />
      <h1 class="text-2xl text-primary font-black tracking-[0.1em] uppercase">
        {{ currentItem.title }}
      </h1>
      <p class="mt-4 text-sm text-on_surface_variant leading-relaxed">
        {{ currentItem.description }}
      </p>
      <div class="mt-5 flex items-center gap-4">
        <UiRefCode :code="currentItem.capsule" />
        <UiRefCode
          tone="emphasis"
          :code="`TECH: ${currentItem.tech}`"
        />
      </div>
      <div class="mt-8">
        <div class="flex flex-wrap gap-3">
          <UiButton
            v-if="currentItem.projectUrl !== currentItem.repoUrl"
            as="a"
            :href="currentItem.projectUrl"
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
          >
            OPEN_PROJECT
          </UiButton>
          <UiButton
            as="a"
            :href="currentItem.repoUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            OPEN_REPOSITORY
          </UiButton>
          <UiButton
            as="a"
            href="/archive"
            variant="secondary"
          >
            RETURN_ARCHIVE
          </UiButton>
        </div>
      </div>
    </div>
    <div
      v-else
      class="border border-error_container bg-surface_container_high p-6 text-on_error_container"
    >
      DATA CAPSULE NOT FOUND
    </div>
  </section>
</template>
