<script setup lang="ts">
const streamerItems = useStreamerTimeline()
const { data: archiveRows } = await useArchiveList()

const sortByGithubPinnedPriority = (a: { github_pinned?: boolean, order: number }, b: { github_pinned?: boolean, order: number }) =>
  Number(b.github_pinned ?? false) - Number(a.github_pinned ?? false) || a.order - b.order

const featuredArchiveItems = computed(() =>
  (archiveRows.value ?? [])
    .filter(row => row.tier === 'featured')
    .toSorted(sortByGithubPinnedPriority)
    .map(mapArchiveDocumentToItem),
)
</script>

<template>
  <div>
    <UiHeroCommand>
      <template #title>
        MISSION BRIEF:<br>
        <span class="bg-primary px-2 text-background">[ FULLSTACK ]</span><br>
        ENGINEERING_
      </template>

      <template #description>
        DÉPLOIEMENT D'ARCHITECTURES SCALABLES (VUE.JS/NUXT) ET ORCHESTRATION DE COMMUNAUTÉS. OPÉRANT À L'INTERSECTION DU DÉVELOPPEMENT LOGICIEL COMPLEXE ET DU BROADCAST INTERACTIF.
      </template>

      <template #actions>
        <UiButton to="/contact">
          INITIALIZE_PROTOCOL
        </UiButton>
        <UiButton variant="secondary" to="/timeline">
          VIEW_RAW_DATA
        </UiButton>
      </template>
    </UiHeroCommand>
    <UiTimeline :items="[...streamerItems]" />
    <section class="p-8 md:p-16">
      <UiArchiveRepositoryHeader />
      <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
        <UiArchiveCard
          v-for="item in featuredArchiveItems.slice(0, 3)"
          :key="item.slug"
          :item="item"
        />
      </div>
    </section>
    <UiCassetteDeck />
  </div>
</template>
