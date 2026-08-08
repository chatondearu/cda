<script setup lang="ts">
import HudAngleReadout from './HudAngleReadout.vue'

const state = reactive({
  degrees: 45,
  label: 'HDG',
})
</script>

<template>
  <Story title="HUD / HudAngleReadout">
    <Variant title="Default">
      <div class="bg-background p-8">
        <HudAngleReadout
          :degrees="state.degrees"
          :label="state.label"
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
      </template>
    </Variant>

    <Variant title="Quadrants">
      <div class="flex flex-wrap gap-4 bg-background p-8">
        <HudAngleReadout
          :degrees="0"
          label="THETA"
        />
        <HudAngleReadout
          :degrees="90"
          label="THETA"
        />
        <HudAngleReadout
          :degrees="180"
          label="THETA"
        />
        <HudAngleReadout
          :degrees="270"
          label="THETA"
        />
      </div>
    </Variant>

    <Variant title="No label">
      <div class="bg-background p-8">
        <HudAngleReadout :degrees="132" />
      </div>
    </Variant>
  </Story>
</template>
