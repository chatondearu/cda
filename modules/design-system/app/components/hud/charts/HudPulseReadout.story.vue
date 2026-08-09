<script setup lang="ts">
import HudPulseReadout from './HudPulseReadout.vue'

const state = reactive({
  bpm: 72,
  label: 'PULSE',
})
</script>

<template>
  <Story title="HUD / CHARTS / HudPulseReadout">
    <Variant title="Default">
      <div class="bg-background p-8">
        <HudPulseReadout
          :bpm="state.bpm"
          :label="state.label"
        />
      </div>

      <template #controls>
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
      </template>
    </Variant>

    <Variant title="Range">
      <div class="flex flex-col gap-3 bg-background p-8">
        <HudPulseReadout
          :bpm="48"
          label="RESTING"
        />
        <HudPulseReadout
          :bpm="96"
          label="ELEVATED"
        />
        <HudPulseReadout
          :bpm="168"
          label="CRITICAL"
        />
      </div>
    </Variant>
  </Story>
</template>
