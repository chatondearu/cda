<script setup lang="ts">
const { t } = useI18n()
const { data: archiveRows } = await useArchiveList()

function sortByGithubPinnedPriority(a: { github_pinned?: boolean, order: number }, b: { github_pinned?: boolean, order: number }) {
  return Number(b.github_pinned ?? false) - Number(a.github_pinned ?? false) || a.order - b.order
}

const featuredArchiveItems = computed(() =>
  (archiveRows.value ?? [])
    .filter(row => row.tier === 'featured')
    .toSorted(sortByGithubPinnedPriority)
    .map(mapArchiveDocumentToItem),
)

const secondaryArchiveItems = computed(() =>
  (archiveRows.value ?? [])
    .filter(row => row.tier === 'other')
    .toSorted(sortByGithubPinnedPriority)
    .map(mapArchiveDocumentToItem),
)
</script>

<template>
  <section class="p-8 md:p-16">
    <UiArchiveRepositoryHeader />
    <div class="mb-8 mt-6 flex items-center justify-between border-y border-primary/10 py-3">
      <h3 class="text-xs text-primary/70 tracking-[0.1em] font-mono">
        {{ t('archive.featuredTitle') }}
      </h3>
      <span class="text-[10px] text-primary/50 font-mono">{{ t('archive.featuredTag') }}</span>
    </div>
    <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
      <UiArchiveCard
        v-for="item in featuredArchiveItems"
        :key="item.slug"
        :item="item"
      />
    </div>
    <div class="mb-8 mt-10 flex items-center justify-between border-y border-primary/10 py-3">
      <h3 class="text-xs text-primary/70 tracking-[0.1em] font-mono">
        {{ t('archive.otherTitle') }}
      </h3>
      <span class="text-[10px] text-primary/50 font-mono">{{ t('archive.otherTag') }}</span>
    </div>
    <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
      <UiArchiveCard
        v-for="item in secondaryArchiveItems"
        :key="item.slug"
        :item="item"
      />
    </div>
  </section>
</template>
