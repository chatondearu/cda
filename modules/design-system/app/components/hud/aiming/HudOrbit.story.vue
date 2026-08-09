<script setup lang="ts">
import HudOrbit from './HudOrbit.vue'

const state = reactive({
  orbits: 3,
  spin: true,
})
</script>

<template>
  <Story title="HUD / AIMING / HudOrbit">
    <Variant title="Default">
      <div class="bg-background p-8">
        <HudOrbit
          :orbits="state.orbits"
          :spin="state.spin"
        />
      </div>

      <template #controls>
        <HstNumber
          v-model="state.orbits"
          title="Orbits"
          :min="2"
          :max="4"
        />
        <HstCheckbox
          v-model="state.spin"
          title="Spin"
        />
      </template>
    </Variant>

    <Variant title="Custom nodes">
      <div class="bg-background p-8">
        <HudOrbit
          :orbits="3"
          :nodes="[
            { orbit: 0, angle: 30 },
            { orbit: 1, angle: 160 },
            { orbit: 2, angle: 280 },
            { orbit: 2, angle: 40 },
          ]"
        />
      </div>
    </Variant>

    <Variant title="No spin">
      <div class="bg-background p-8">
        <HudOrbit
          :orbits="4"
          :spin="false"
        />
      </div>
    </Variant>
  </Story>
</template>
