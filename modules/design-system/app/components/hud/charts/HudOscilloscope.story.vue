<script setup lang="ts">
import HudOscilloscope from './HudOscilloscope.vue'

const state = reactive({
  seed: 'HUD-OSCILLOSCOPE',
  points: 48,
  sweep: true,
})
</script>

<template>
  <Story title="HUD / CHARTS / HudOscilloscope">
    <Variant title="Default">
      <div class="w-80 bg-background p-8">
        <HudOscilloscope
          :seed="state.seed"
          :points="state.points"
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
          :min="8"
          :max="96"
        />
        <HstCheckbox
          v-model="state.sweep"
          title="Sweep"
        />
      </template>
    </Variant>

    <Variant title="Cluster">
      <div class="flex w-80 flex-col gap-4 bg-background p-8">
        <HudOscilloscope seed="ALPHA-01" />
        <HudOscilloscope
          seed="BRAVO-02"
          :sweep="false"
        />
      </div>
    </Variant>
  </Story>
</template>
