<script setup lang="ts">
import HudGlobe from './HudGlobe.vue'

const state = reactive({
  lat: 35,
  lon: -12,
  label: 'UPLINK',
  spin: true,
})
</script>

<template>
  <Story title="HUD / SPECIMEN / HudGlobe">
    <Variant title="Default">
      <div class="bg-background p-8">
        <HudGlobe
          :lat="state.lat"
          :lon="state.lon"
          :label="state.label"
          :spin="state.spin"
        />
      </div>

      <template #controls>
        <HstNumber
          v-model="state.lat"
          title="Latitude"
          :min="-90"
          :max="90"
        />
        <HstNumber
          v-model="state.lon"
          title="Longitude"
          :min="-180"
          :max="180"
        />
        <HstText
          v-model="state.label"
          title="Label"
        />
        <HstCheckbox
          v-model="state.spin"
          title="Spin"
        />
      </template>
    </Variant>

    <Variant title="Markers">
      <div class="flex gap-6 bg-background p-8">
        <HudGlobe
          :lat="0"
          :lon="0"
          label="EQUATOR"
        />
        <HudGlobe
          :lat="60"
          :lon="30"
          label="NORTH"
        />
        <HudGlobe
          :lat="-40"
          :lon="150"
          label="FAR SIDE"
        />
      </div>
    </Variant>
  </Story>
</template>
