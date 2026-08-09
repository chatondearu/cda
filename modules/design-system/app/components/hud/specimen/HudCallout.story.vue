<script setup lang="ts">
import HudCallout from './HudCallout.vue'

const state = reactive({
  label: 'ANOMALY',
  detail: 'SEE FIG. 3',
  direction: 'right' as 'up' | 'right' | 'down' | 'left',
})
</script>

<template>
  <Story title="HUD / SPECIMEN / HudCallout">
    <Variant title="Default">
      <div class="bg-background p-8">
        <HudCallout
          :label="state.label"
          :detail="state.detail"
          :direction="state.direction"
        />
      </div>

      <template #controls>
        <HstText
          v-model="state.label"
          title="Label"
        />
        <HstText
          v-model="state.detail"
          title="Detail"
        />
        <HstSelect
          v-model="state.direction"
          title="Direction"
          :options="{ up: 'up', right: 'right', down: 'down', left: 'left' }"
        />
      </template>
    </Variant>

    <Variant title="Directions">
      <div class="flex flex-wrap gap-8 bg-background p-8">
        <HudCallout
          label="UP"
          direction="up"
        />
        <HudCallout
          label="RIGHT"
          direction="right"
        />
        <HudCallout
          label="DOWN"
          direction="down"
        />
        <HudCallout
          label="LEFT"
          direction="left"
        />
      </div>
    </Variant>
  </Story>
</template>
