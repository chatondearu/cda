<script setup lang="ts">
import HudAxis from './HudAxis.vue'

const state = reactive({
  x: 0.4,
  y: -0.2,
  label: 'GIMBAL',
})
</script>

<template>
  <Story title="HUD / AIMING / HudAxis">
    <Variant title="Default">
      <div class="bg-background p-8">
        <HudAxis
          :x="state.x"
          :y="state.y"
          :label="state.label"
        />
      </div>

      <template #controls>
        <HstNumber
          v-model="state.x"
          title="X"
          :min="-1"
          :max="1"
          :step="0.05"
        />
        <HstNumber
          v-model="state.y"
          title="Y"
          :min="-1"
          :max="1"
          :step="0.05"
        />
        <HstText
          v-model="state.label"
          title="Label"
        />
      </template>
    </Variant>

    <Variant title="Extremes">
      <div class="flex gap-6 bg-background p-8">
        <HudAxis
          :x="-1"
          :y="1"
          label="TOP-LEFT"
        />
        <HudAxis
          :x="1"
          :y="1"
          label="TOP-RIGHT"
        />
        <HudAxis
          :x="0"
          :y="0"
          label="CENTER"
        />
        <HudAxis
          :x="-1"
          :y="-1"
          label="BOTTOM-LEFT"
        />
      </div>
    </Variant>
  </Story>
</template>
