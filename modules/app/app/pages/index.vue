<script setup lang="ts">
const { timelineItems, archiveItems } = useSystemData()
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
        <UiButton to="/contact">INITIALIZE_PROTOCOL</UiButton>
        <UiButton variant="secondary" to="/resume">
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
