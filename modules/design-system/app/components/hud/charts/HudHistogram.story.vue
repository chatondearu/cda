<script setup lang="ts">
import HudHistogram from './HudHistogram.vue'

const state = reactive({
  seed: 'HUD-HISTOGRAM',
  bins: 20,
  sweep: true,
})
</script>

<template>
  <Story title="HUD / CHARTS / HudHistogram">
    <Variant title="Default">
      <div class="w-72 bg-background p-8">
        <HudHistogram
          :seed="state.seed"
          :bins="state.bins"
          :sweep="state.sweep"
        />
      </div>

      <template #controls>
        <HstText
          v-model="state.seed"
          title="Seed"
        />
        <HstNumber
          v-model="state.bins"
          title="Bins"
          :min="4"
          :max="64"
        />
        <HstCheckbox
          v-model="state.sweep"
          title="Sweep"
        />
      </template>
    </Variant>

    <Variant title="Seed comparison">
      <div class="flex w-72 flex-col gap-3 bg-background p-8">
        <HudHistogram seed="ALPHA-01" />
        <HudHistogram seed="BRAVO-02" />
        <HudHistogram
          seed="CHARLIE-03"
          :bins="10"
          :sweep="false"
        />
      </div>
    </Variant>
  </Story>
</template>
