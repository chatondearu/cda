<script setup lang="ts">
import HudMeterBar from './HudMeterBar.vue'

const state = reactive({
  label: 'CORE TEMP',
  value: '72%',
  progress: 72,
})
</script>

<template>
  <Story title="HUD / SPECIMEN / HudMeterBar">
    <Variant title="Default">
      <div class="w-64 bg-background p-8">
        <HudMeterBar
          :label="state.label"
          :value="state.value"
          :progress="state.progress"
        />
      </div>

      <template #controls>
        <HstText
          v-model="state.label"
          title="Label"
        />
        <HstText
          v-model="state.value"
          title="Value"
        />
        <HstNumber
          v-model="state.progress"
          title="Progress"
          :min="0"
          :max="100"
        />
      </template>
    </Variant>

    <Variant title="Stack">
      <div class="flex w-64 flex-col gap-3 bg-background p-8">
        <HudMeterBar
          label="CORE TEMP"
          value="72%"
          :progress="72"
        />
        <HudMeterBar
          label="SIGNAL"
          value="18%"
          :progress="18"
        />
        <HudMeterBar
          label="SYNC"
          value="100%"
          :progress="120"
        />
      </div>
    </Variant>
  </Story>
</template>
