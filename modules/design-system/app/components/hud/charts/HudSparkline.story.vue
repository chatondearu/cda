<script setup lang="ts">
import HudSparkline from './HudSparkline.vue'

const state = reactive({
  seed: 'HUD-SPARKLINE',
  points: 16,
  filled: false,
})
</script>

<template>
  <Story title="HUD / CHARTS / HudSparkline">
    <Variant title="Default">
      <div class="bg-background p-8">
        <HudSparkline
          :seed="state.seed"
          :points="state.points"
          :filled="state.filled"
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
          :max="48"
        />
        <HstCheckbox
          v-model="state.filled"
          title="Filled"
        />
      </template>
    </Variant>

    <Variant title="Cluster">
      <div class="flex flex-col gap-2 bg-background p-8">
        <HudSparkline seed="ALPHA-01" />
        <HudSparkline
          seed="BRAVO-02"
          filled
        />
        <HudSparkline
          seed="CHARLIE-03"
          :points="8"
        />
      </div>
    </Variant>
  </Story>
</template>
