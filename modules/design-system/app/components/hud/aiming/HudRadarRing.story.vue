<script setup lang="ts">
import HudRadarRing from './HudRadarRing.vue'

const state = reactive({
  rings: 3,
  blipAngle: 45,
  sweep: true,
})
</script>

<template>
  <Story title="HUD / AIMING / HudRadarRing">
    <Variant title="Default">
      <div class="bg-background p-8">
        <HudRadarRing
          :rings="state.rings"
          :blip-angle="state.blipAngle"
          :sweep="state.sweep"
        />
      </div>

      <template #controls>
        <HstNumber
          v-model="state.rings"
          title="Rings"
          :min="1"
          :max="5"
        />
        <HstNumber
          v-model="state.blipAngle"
          title="Blip angle"
          :min="0"
          :max="359"
        />
        <HstCheckbox
          v-model="state.sweep"
          title="Sweep"
        />
      </template>
    </Variant>

    <Variant title="Cluster">
      <div class="flex gap-6 bg-background p-8">
        <HudRadarRing
          :rings="2"
          :blip-angle="0"
        />
        <HudRadarRing
          :rings="4"
          :blip-angle="120"
        />
        <HudRadarRing
          :rings="3"
          :blip-angle="260"
          :sweep="false"
        />
      </div>
    </Variant>
  </Story>
</template>
