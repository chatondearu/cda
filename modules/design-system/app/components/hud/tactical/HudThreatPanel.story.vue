<script setup lang="ts">
import HudThreatPanel from './HudThreatPanel.vue'

const state = reactive({
  level: 'moderate' as 'low' | 'moderate' | 'high' | 'critical',
  designation: 'SEC-07',
})
</script>

<template>
  <Story title="HUD / TACTICAL / HudThreatPanel">
    <Variant title="Default">
      <div class="w-64 bg-background p-8">
        <HudThreatPanel
          :level="state.level"
          :designation="state.designation"
        />
      </div>

      <template #controls>
        <HstSelect
          v-model="state.level"
          title="Level"
          :options="{ low: 'low', moderate: 'moderate', high: 'high', critical: 'critical' }"
        />
        <HstText
          v-model="state.designation"
          title="Designation"
        />
      </template>
    </Variant>

    <Variant title="All levels">
      <div class="flex w-64 flex-col gap-3 bg-background p-8">
        <HudThreatPanel
          level="low"
          designation="SEC-01"
        />
        <HudThreatPanel
          level="moderate"
          designation="SEC-04"
        />
        <HudThreatPanel
          level="high"
          designation="SEC-06"
        />
        <HudThreatPanel
          level="critical"
          designation="SEC-09"
        />
      </div>
    </Variant>
  </Story>
</template>
