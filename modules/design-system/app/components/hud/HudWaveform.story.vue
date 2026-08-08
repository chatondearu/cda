<script setup lang="ts">
import HudWaveform from './HudWaveform.vue'

const state = reactive({
  seed: 'HUD-WAVEFORM',
  bars: 24,
  sweep: true,
})
</script>

<template>
  <Story title="HUD / HudWaveform">
    <Variant title="Default">
      <div class="w-72 bg-background p-8">
        <HudWaveform
          :seed="state.seed"
          :bars="state.bars"
          :sweep="state.sweep"
        />
      </div>

      <template #controls>
        <HstText
          v-model="state.seed"
          title="Seed"
        />
        <HstNumber
          v-model="state.bars"
          title="Bars"
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
        <HudWaveform seed="ALPHA-01" />
        <HudWaveform seed="BRAVO-02" />
        <HudWaveform
          seed="CHARLIE-03"
          :bars="12"
          :sweep="false"
        />
      </div>
    </Variant>
  </Story>
</template>
