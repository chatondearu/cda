<script setup lang="ts">
import HudRingGauge from './HudRingGauge.vue'

const state = reactive({
  value: 72,
  max: 100,
  label: 'CORE TEMP',
})
</script>

<template>
  <Story title="HUD / HudRingGauge">
    <Variant title="Default">
      <div class="bg-background p-8">
        <HudRingGauge
          :value="state.value"
          :max="state.max"
          :label="state.label"
        />
      </div>

      <template #controls>
        <HstNumber
          v-model="state.value"
          title="Value"
          :min="0"
          :max="state.max"
        />
        <HstNumber
          v-model="state.max"
          title="Max"
          :min="1"
        />
        <HstText
          v-model="state.label"
          title="Label"
        />
      </template>
    </Variant>

    <Variant title="Cluster">
      <div class="flex gap-6 bg-background p-8">
        <HudRingGauge
          :value="18"
          label="SIGNAL"
        />
        <HudRingGauge
          :value="72"
          label="CORE TEMP"
        />
        <HudRingGauge
          :value="100"
          label="SYNC"
        />
        <HudRingGauge
          :value="4"
          :max="10"
          label="FUEL"
        />
      </div>
    </Variant>
  </Story>
</template>
