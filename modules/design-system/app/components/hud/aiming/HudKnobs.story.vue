<script setup lang="ts">
import HudKnobs from './HudKnobs.vue'

const state = reactive({
  elevation: 4,
  windage: -2,
})

const knobs = computed(() => [
  { label: 'ELEV', value: state.elevation, max: 12 },
  { label: 'WIND', value: state.windage, max: 12 },
])
</script>

<template>
  <Story title="HUD / AIMING / HudKnobs">
    <Variant title="Default">
      <div class="bg-background p-8">
        <HudKnobs :knobs="knobs" />
      </div>

      <template #controls>
        <HstNumber
          v-model="state.elevation"
          title="Elevation"
          :min="-12"
          :max="12"
        />
        <HstNumber
          v-model="state.windage"
          title="Windage"
          :min="-12"
          :max="12"
        />
      </template>
    </Variant>

    <Variant title="Default knobs">
      <div class="bg-background p-8">
        <HudKnobs />
      </div>
    </Variant>

    <Variant title="Extended cluster">
      <div class="bg-background p-8">
        <HudKnobs
          :knobs="[
            { label: 'ELEV', value: 10, max: 12 },
            { label: 'WIND', value: -8, max: 12 },
            { label: 'FOCUS', value: 0, max: 6 },
            { label: 'ZOOM', value: 3, max: 5 },
          ]"
        />
      </div>
    </Variant>
  </Story>
</template>
