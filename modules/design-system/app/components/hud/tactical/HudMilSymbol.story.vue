<script setup lang="ts">
import HudMilSymbol from './HudMilSymbol.vue'

const state = reactive({
  affiliation: 'friend' as 'friend' | 'hostile' | 'neutral' | 'unknown',
  designation: 'INF',
  echelon: 'PLT',
})
</script>

<template>
  <Story title="HUD / TACTICAL / HudMilSymbol">
    <Variant title="Default">
      <div class="w-64 bg-background p-8">
        <HudMilSymbol
          :affiliation="state.affiliation"
          :designation="state.designation"
          :echelon="state.echelon"
        />
      </div>

      <template #controls>
        <HstSelect
          v-model="state.affiliation"
          title="Affiliation"
          :options="{ friend: 'friend', hostile: 'hostile', neutral: 'neutral', unknown: 'unknown' }"
        />
        <HstText
          v-model="state.designation"
          title="Designation"
        />
        <HstText
          v-model="state.echelon"
          title="Echelon"
        />
      </template>
    </Variant>

    <Variant title="All affiliations">
      <div class="flex w-96 items-start gap-6 bg-background p-8">
        <HudMilSymbol
          affiliation="friend"
          designation="INF"
          echelon="PLT"
        />
        <HudMilSymbol
          affiliation="hostile"
          designation="ARM"
          echelon="COY"
        />
        <HudMilSymbol
          affiliation="neutral"
          designation="LOG"
        />
        <HudMilSymbol
          affiliation="unknown"
        />
      </div>
    </Variant>
  </Story>
</template>
