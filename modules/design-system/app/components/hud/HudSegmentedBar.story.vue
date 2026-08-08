<script setup lang="ts">
import HudSegmentedBar from './HudSegmentedBar.vue'

const state = reactive({
  segments: 8,
  active: 5,
  label: 'THRUST',
})
</script>

<template>
  <Story title="HUD / HudSegmentedBar">
    <Variant title="Default">
      <div class="w-64 bg-background p-8">
        <HudSegmentedBar
          :segments="state.segments"
          :active="state.active"
          :label="state.label"
        />
      </div>

      <template #controls>
        <HstNumber
          v-model="state.segments"
          title="Segments"
          :min="1"
          :max="16"
        />
        <HstNumber
          v-model="state.active"
          title="Active"
          :min="0"
          :max="state.segments"
        />
        <HstText
          v-model="state.label"
          title="Label"
        />
      </template>
    </Variant>

    <Variant title="Stack">
      <div class="flex w-64 flex-col gap-3 bg-background p-8">
        <HudSegmentedBar
          :segments="5"
          :active="5"
          label="PWR"
        />
        <HudSegmentedBar
          :segments="10"
          :active="3"
          label="SIGNAL"
        />
        <HudSegmentedBar
          :segments="6"
          :active="0"
          label="RESERVE"
        />
      </div>
    </Variant>
  </Story>
</template>
