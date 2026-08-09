<script setup lang="ts">
import HudDenseBar from './HudDenseBar.vue'

const state = reactive({
  seed: 'HUD-DENSEBAR',
  rows: 3,
  cols: 48,
})
</script>

<template>
  <Story title="HUD / CODES / HudDenseBar">
    <Variant title="Default">
      <div class="bg-background p-8">
        <HudDenseBar
          :seed="state.seed"
          :rows="state.rows"
          :cols="state.cols"
        />
      </div>

      <template #controls>
        <HstText
          v-model="state.seed"
          title="Seed"
        />
        <HstNumber
          v-model="state.rows"
          title="Rows"
          :min="1"
          :max="8"
        />
        <HstNumber
          v-model="state.cols"
          title="Cols"
          :min="8"
          :max="96"
        />
      </template>
    </Variant>

    <Variant title="Seed comparison">
      <div class="flex flex-col gap-2 bg-background p-8">
        <HudDenseBar seed="ALPHA-01" />
        <HudDenseBar seed="BRAVO-02" />
        <HudDenseBar
          seed="CHARLIE-03"
          :rows="1"
          :cols="24"
        />
      </div>
    </Variant>
  </Story>
</template>
