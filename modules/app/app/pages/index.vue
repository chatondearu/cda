<script setup lang="ts">
const { timelineItems, archiveItems } = useSystemData()
</script>

<template>
  <div>
    <UiHeroCommand>
      <template #title>
        MISSION BRIEF:<br>
        <span class="bg-primary px-2 text-background">ARCHITECTING</span> SYSTEM<br>
        INTEGRATION_
      </template>

      <template #description>
        DEPLOYING SCALABLE ARCHITECTURES ACROSS NEURAL NETWORKS AND DISTRIBUTED LEDGERS. OPERATING AT THE INTERSECTION OF RAW LOGIC AND HUMAN INTERFACE.
      </template>

      <template #actions>
        <UiButton>INITIALIZE_PROTOCOL</UiButton>
        <UiButton variant="secondary">
          VIEW_RAW_DATA
        </UiButton>
      </template>
    </UiHeroCommand>
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
