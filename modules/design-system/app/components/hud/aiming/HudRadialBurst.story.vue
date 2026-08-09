<script setup lang="ts">
import HudRadialBurst from './HudRadialBurst.vue'

const state = reactive({
  spokes: 16,
  highlightIndex: 2,
  pulse: true,
})
</script>

<template>
  <Story title="HUD / AIMING / HudRadialBurst">
    <Variant title="Default">
      <div class="bg-background p-8">
        <HudRadialBurst
          :spokes="state.spokes"
          :highlight-index="state.highlightIndex"
          :pulse="state.pulse"
        />
      </div>

      <template #controls>
        <HstNumber
          v-model="state.spokes"
          title="Spokes"
          :min="4"
          :max="32"
        />
        <HstNumber
          v-model="state.highlightIndex"
          title="Highlight index"
          :min="-1"
          :max="31"
        />
        <HstCheckbox
          v-model="state.pulse"
          title="Pulse"
        />
      </template>
    </Variant>

    <Variant title="Cluster">
      <div class="flex gap-6 bg-background p-8">
        <HudRadialBurst
          :spokes="8"
          :highlight-index="0"
        />
        <HudRadialBurst
          :spokes="24"
          :highlight-index="6"
        />
        <HudRadialBurst
          :spokes="16"
          :highlight-index="-1"
          :pulse="false"
        />
      </div>
    </Variant>
  </Story>
</template>
