<script setup lang="ts">
import HudEcg from './HudEcg.vue'

const state = reactive({
  seed: 'HUD-ECG',
  beats: 4,
  bpm: 72,
  label: 'ECG',
  sweep: true,
})
</script>

<template>
  <Story title="HUD / CHARTS / HudEcg">
    <Variant title="Default">
      <div class="w-80 bg-background p-8">
        <HudEcg
          :seed="state.seed"
          :beats="state.beats"
          :bpm="state.bpm"
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
          v-model="state.beats"
          title="Beats"
          :min="1"
          :max="8"
        />
        <HstNumber
          v-model="state.bpm"
          title="BPM"
          :min="30"
          :max="220"
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

    <Variant title="Range">
      <div class="flex w-80 flex-col gap-4 bg-background p-8">
        <HudEcg
          seed="ALPHA-01"
          :bpm="48"
          label="RESTING"
        />
        <HudEcg
          seed="BRAVO-02"
          :bpm="168"
          label="CRITICAL"
        />
      </div>
    </Variant>
  </Story>
</template>
