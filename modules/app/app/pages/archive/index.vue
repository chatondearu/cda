<script setup lang="ts">
const { data: archiveRows } = await useArchiveList()

const featuredArchiveItems = computed(() =>
  (archiveRows.value ?? [])
    .filter(row => row.tier === 'featured')
    .map(mapArchiveDocumentToItem),
)

const secondaryArchiveItems = computed(() =>
  (archiveRows.value ?? [])
    .filter(row => row.tier === 'other')
    .map(mapArchiveDocumentToItem),
)
</script>

<template>
  <section class="p-8 md:p-16">
    <UiArchiveRepositoryHeader />
    <div class="mb-8 mt-6 flex items-center justify-between border-y border-primary/10 py-3">
      <h3 class="text-xs text-primary/70 tracking-[0.1em] font-mono">
        PRIORITY CAPSULES
      </h3>
      <span class="text-[10px] text-primary/50 font-mono">FEATURED_SET</span>
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
        OTHER PUBLIC REPOSITORIES
      </h3>
      <span class="text-[10px] text-primary/50 font-mono">SECONDARY_SET</span>
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
