<script setup lang="ts">
import HudBigArrow from './HudBigArrow.vue'

const state = reactive({
  direction: 'right' as 'up' | 'right' | 'down' | 'left',
  label: 'EXIT',
  tone: 'active' as 'active' | 'warning' | 'error' | 'idle',
})
</script>

<template>
  <Story title="HUD / SPECIMEN / HudBigArrow">
    <Variant title="Default">
      <div class="bg-background p-8">
        <HudBigArrow
          :direction="state.direction"
          :label="state.label"
          :tone="state.tone"
        />
      </div>

      <template #controls>
        <HstSelect
          v-model="state.direction"
          title="Direction"
          :options="{ up: 'up', right: 'right', down: 'down', left: 'left' }"
        />
        <HstText
          v-model="state.label"
          title="Label"
        />
        <HstSelect
          v-model="state.tone"
          title="Tone"
          :options="{ active: 'active', warning: 'warning', error: 'error', idle: 'idle' }"
        />
      </template>
    </Variant>

    <Variant title="Directions">
      <div class="flex gap-6 bg-background p-8">
        <HudBigArrow
          direction="up"
          label="UP"
        />
        <HudBigArrow
          direction="right"
          label="RIGHT"
        />
        <HudBigArrow
          direction="down"
          label="DOWN"
        />
        <HudBigArrow
          direction="left"
          label="LEFT"
        />
      </div>
    </Variant>

    <Variant title="Tones">
      <div class="flex gap-6 bg-background p-8">
        <HudBigArrow
          direction="right"
          tone="active"
          label="ACTIVE"
        />
        <HudBigArrow
          direction="right"
          tone="warning"
          label="WARNING"
        />
        <HudBigArrow
          direction="right"
          tone="error"
          label="ERROR"
        />
        <HudBigArrow
          direction="right"
          tone="idle"
          label="IDLE"
        />
      </div>
    </Variant>
  </Story>
</template>
