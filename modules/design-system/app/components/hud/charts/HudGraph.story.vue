<script setup lang="ts">
import HudGraph from './HudGraph.vue'

const state = reactive({
  seed: 'HUD-GRAPH',
  points: 20,
  label: 'THROUGHPUT',
  sweep: true,
})
</script>

<template>
  <Story title="HUD / CHARTS / HudGraph">
    <Variant title="Default">
      <div class="w-80 bg-background p-8">
        <HudGraph
          :seed="state.seed"
          :points="state.points"
          :label="state.label"
          :sweep="state.sweep"
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
          :max="64"
        />
        <HstText
          v-model="state.label"
          title="Label"
        />
        <HstCheckbox
          v-model="state.sweep"
          title="Sweep"
        />
      </template>
    </Variant>

    <Variant title="Cluster">
      <div class="flex w-80 flex-col gap-4 bg-background p-8">
        <HudGraph
          seed="ALPHA-01"
          label="UPLINK"
        />
        <HudGraph
          seed="BRAVO-02"
          label="LATENCY"
          :sweep="false"
        />
      </div>
    </Variant>
  </Story>
</template>
