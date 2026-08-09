<script setup lang="ts">
import HudPacketLoss from './HudPacketLoss.vue'

const state = reactive({
  percent: 1.2,
  label: 'PACKET LOSS',
})
</script>

<template>
  <Story title="HUD / SPECIMEN / HudPacketLoss">
    <Variant title="Default">
      <div class="w-64 bg-background p-8">
        <HudPacketLoss
          :percent="state.percent"
          :label="state.label"
        />
      </div>

      <template #controls>
        <HstNumber
          v-model="state.percent"
          title="Percent"
          :min="0"
          :max="100"
          :step="0.1"
        />
        <HstText
          v-model="state.label"
          title="Label"
        />
      </template>
    </Variant>

    <Variant title="Thresholds">
      <div class="flex w-64 flex-col gap-3 bg-background p-8">
        <HudPacketLoss
          :percent="0.4"
          label="LINK A"
        />
        <HudPacketLoss
          :percent="6.8"
          label="LINK B"
        />
        <HudPacketLoss
          :percent="23.5"
          label="LINK C"
        />
      </div>
    </Variant>
  </Story>
</template>
