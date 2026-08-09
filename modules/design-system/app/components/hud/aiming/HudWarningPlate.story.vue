<script setup lang="ts">
import HudWarningPlate from './HudWarningPlate.vue'

const levelOptions = ['caution', 'warning', 'critical']

const state = reactive({
  level: 'warning' as 'caution' | 'warning' | 'critical',
  text: 'DO NOT REMOVE PANEL UNDER LOAD',
})
</script>

<template>
  <Story title="HUD / AIMING / HudWarningPlate">
    <Variant title="Default">
      <div class="w-72 bg-background p-8">
        <HudWarningPlate
          :level="state.level"
          :text="state.text"
        />
      </div>

      <template #controls>
        <HstSelect
          v-model="state.level"
          title="Level"
          :options="levelOptions"
        />
        <HstText
          v-model="state.text"
          title="Text"
        />
      </template>
    </Variant>

    <Variant title="Levels">
      <div class="flex w-72 flex-col gap-3 bg-background p-8">
        <HudWarningPlate
          level="caution"
          text="LOW LUBRICANT LEVEL"
        />
        <HudWarningPlate
          level="warning"
          text="THERMAL DRIFT DETECTED"
        />
        <HudWarningPlate
          level="critical"
          text="CONTAINMENT BREACH IMMINENT"
        />
      </div>
    </Variant>
  </Story>
</template>
