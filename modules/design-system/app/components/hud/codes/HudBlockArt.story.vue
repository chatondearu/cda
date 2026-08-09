<script setup lang="ts">
import HudBlockArt from './HudBlockArt.vue'

const state = reactive({
  seed: 'HUD-BLOCKART',
  rows: 6,
  cols: 7,
  symmetric: true,
})
</script>

<template>
  <Story title="HUD / CODES / HudBlockArt">
    <Variant title="Default">
      <div class="bg-background p-8">
        <HudBlockArt
          :seed="state.seed"
          :rows="state.rows"
          :cols="state.cols"
          :symmetric="state.symmetric"
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
          :min="2"
          :max="12"
        />
        <HstNumber
          v-model="state.cols"
          title="Cols"
          :min="2"
          :max="12"
        />
        <HstCheckbox
          v-model="state.symmetric"
          title="Symmetric"
        />
      </template>
    </Variant>

    <Variant title="Seed comparison">
      <div class="flex flex-wrap gap-4 bg-background p-8">
        <HudBlockArt seed="ALPHA-01" />
        <HudBlockArt seed="BRAVO-02" />
        <HudBlockArt
          seed="CHARLIE-03"
          :symmetric="false"
        />
      </div>
    </Variant>
  </Story>
</template>
