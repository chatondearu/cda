<script setup lang="ts">
const { archiveItems } = useSystemData()
</script>

<template>
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
</template>
