<script setup lang="ts">
import HudScatter from './HudScatter.vue'

const state = reactive({
  seed: 'HUD-SCATTER',
  points: 32,
  outlierThreshold: 0.88,
})
</script>

<template>
  <Story title="HUD / CHARTS / HudScatter">
    <Variant title="Default">
      <div class="w-80 bg-background p-8">
        <HudScatter
          :seed="state.seed"
          :points="state.points"
          :outlier-threshold="state.outlierThreshold"
        />
      </div>

      <template #controls>
        <HstText
          v-model="state.seed"
          title="Seed"
        />
        <HstNumber
          v-model="state.points"
          title="Points"
          :min="4"
          :max="80"
        />
        <HstNumber
          v-model="state.outlierThreshold"
          title="Outlier threshold"
          :min="0"
          :max="1"
          :step="0.01"
        />
      </template>
    </Variant>

    <Variant title="Cluster">
      <div class="flex w-80 flex-col gap-4 bg-background p-8">
        <HudScatter seed="ALPHA-01" />
        <HudScatter
          seed="BRAVO-02"
          :points="16"
        />
      </div>
    </Variant>
  </Story>
</template>
