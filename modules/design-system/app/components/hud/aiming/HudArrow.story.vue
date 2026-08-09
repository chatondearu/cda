<script setup lang="ts">
import HudArrow from './HudArrow.vue'

const state = reactive({
  bearing: 45,
  label: 'VEC',
  magnitude: 1,
})
</script>

<template>
  <Story title="HUD / AIMING / HudArrow">
    <Variant title="Default">
      <div class="bg-background p-8">
        <HudArrow
          :bearing="state.bearing"
          :label="state.label"
          :magnitude="state.magnitude"
        />
      </div>

      <template #controls>
        <HstNumber
          v-model="state.bearing"
          title="Bearing"
          :min="0"
          :max="359"
        />
        <HstText
          v-model="state.label"
          title="Label"
        />
        <HstNumber
          v-model="state.magnitude"
          title="Magnitude"
          :min="0.2"
          :max="1"
          :step="0.05"
        />
      </template>
    </Variant>

    <Variant title="Compass points">
      <div class="flex gap-6 bg-background p-8">
        <HudArrow
          :bearing="0"
          label="N"
        />
        <HudArrow
          :bearing="90"
          label="E"
        />
        <HudArrow
          :bearing="180"
          label="S"
        />
        <HudArrow
          :bearing="270"
          label="W"
        />
      </div>
    </Variant>

    <Variant title="Magnitude range">
      <div class="flex gap-6 bg-background p-8">
        <HudArrow
          :bearing="30"
          :magnitude="0.3"
          label="WEAK"
        />
        <HudArrow
          :bearing="30"
          :magnitude="0.65"
          label="MID"
        />
        <HudArrow
          :bearing="30"
          :magnitude="1"
          label="FULL"
        />
      </div>
    </Variant>
  </Story>
</template>
