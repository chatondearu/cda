<script setup lang="ts">
const { timelineItems, archiveItems } = useSystemData()
</script>

<template>
  <div>
    <UiHeroCommand />
    <UiTimeline :items="timelineItems" />
    <section class="p-8 md:p-16">
      <UiArchiveRepositoryHeader />
      <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
        <UiArchiveCard
          v-for="item in archiveItems"
          :key="item.slug"
          :item="item"
        />
      </div>
    </section>
    <UiCassetteDeck />
  </div>
</template>
