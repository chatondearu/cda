<script setup lang="ts">
import HudProtractor from './HudProtractor.vue'

const state = reactive({
  degrees: 60,
  label: 'AZ',
  majorStep: 30,
})
</script>

<template>
  <Story title="HUD / AIMING / HudProtractor">
    <Variant title="Default">
      <div class="bg-background p-8">
        <HudProtractor
          :degrees="state.degrees"
          :label="state.label"
          :major-step="state.majorStep"
        />
      </div>

      <template #controls>
        <HstNumber
          v-model="state.degrees"
          title="Degrees"
          :min="-360"
          :max="720"
        />
        <HstText
          v-model="state.label"
          title="Label"
        />
        <HstNumber
          v-model="state.majorStep"
          title="Major step"
          :min="15"
          :max="90"
          :step="15"
        />
      </template>
    </Variant>

    <Variant title="Quadrants">
      <div class="flex flex-wrap gap-6 bg-background p-8">
        <HudProtractor
          :degrees="0"
          label="THETA"
        />
        <HudProtractor
          :degrees="90"
          label="THETA"
        />
        <HudProtractor
          :degrees="180"
          label="THETA"
        />
        <HudProtractor
          :degrees="270"
          label="THETA"
        />
      </div>
    </Variant>
  </Story>
</template>
