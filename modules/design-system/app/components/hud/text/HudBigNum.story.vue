<script setup lang="ts">
import HudBigNum from './HudBigNum.vue'

const state = reactive({
  value: '042',
  label: 'Active units',
  unit: 'PCS',
})
</script>

<template>
  <Story title="HUD / TEXT / HudBigNum">
    <Variant title="Default">
      <div class="bg-background p-8">
        <HudBigNum
          :value="state.value"
          :label="state.label"
          :unit="state.unit"
        />
      </div>

      <template #controls>
        <HstText
          v-model="state.value"
          title="Value"
        />
        <HstText
          v-model="state.label"
          title="Label"
        />
        <HstText
          v-model="state.unit"
          title="Unit"
        />
      </template>
    </Variant>

    <Variant title="Stack">
      <div class="flex gap-8 bg-background p-8">
        <HudBigNum
          value="97.2"
          unit="%"
          label="Uptime"
        />
        <HudBigNum
          value="12"
          label="Alerts"
        />
      </div>
    </Variant>
  </Story>
</template>
