<script setup lang="ts">
import HudSpectrum from './HudSpectrum.vue'

const state = reactive({
  seed: 'HUD-SPECTRUM',
  bands: 20,
  segments: 8,
})
</script>

<template>
  <Story title="HUD / CHARTS / HudSpectrum">
    <Variant title="Default">
      <div class="w-72 bg-background p-8">
        <HudSpectrum
          :seed="state.seed"
          :bands="state.bands"
          :segments="state.segments"
        />
      </div>

      <template #controls>
        <HstText
          v-model="state.seed"
          title="Seed"
        />
        <HstNumber
          v-model="state.bands"
          title="Bands"
          :min="4"
          :max="48"
        />
        <HstNumber
          v-model="state.segments"
          title="Segments"
          :min="3"
          :max="16"
        />
      </template>
    </Variant>

    <Variant title="Seed comparison">
      <div class="flex w-72 flex-col gap-3 bg-background p-8">
        <HudSpectrum seed="ALPHA-01" />
        <HudSpectrum seed="BRAVO-02" />
        <HudSpectrum
          seed="CHARLIE-03"
          :bands="12"
          :segments="6"
        />
      </div>
    </Variant>
  </Story>
</template>
