<script setup lang="ts">
import HudMeasure from './HudMeasure.vue'

const state = reactive({
  label: 'RANGE',
  value: 62,
  min: 0,
  max: 100,
  unit: 'm',
  ticks: 10,
})
</script>

<template>
  <Story title="HUD / AIMING / HudMeasure">
    <Variant title="Default">
      <div class="w-72 bg-background p-8">
        <HudMeasure
          :label="state.label"
          :value="state.value"
          :min="state.min"
          :max="state.max"
          :unit="state.unit"
          :ticks="state.ticks"
        />
      </div>

      <template #controls>
        <HstText
          v-model="state.label"
          title="Label"
        />
        <HstNumber
          v-model="state.value"
          title="Value"
          :min="state.min"
          :max="state.max"
        />
        <HstNumber
          v-model="state.min"
          title="Min"
        />
        <HstNumber
          v-model="state.max"
          title="Max"
        />
        <HstText
          v-model="state.unit"
          title="Unit"
        />
        <HstNumber
          v-model="state.ticks"
          title="Ticks"
          :min="2"
          :max="40"
        />
      </template>
    </Variant>

    <Variant title="Stack">
      <div class="flex w-72 flex-col gap-3 bg-background p-8">
        <HudMeasure
          label="RANGE"
          :value="18"
          :max="50"
          unit="m"
        />
        <HudMeasure
          label="ELEVATION"
          :value="-120"
          :min="-200"
          :max="200"
          unit="ft"
        />
        <HudMeasure
          label="DRIFT"
          :value="4.2"
          :max="10"
          unit="mrad"
        />
      </div>
    </Variant>
  </Story>
</template>
