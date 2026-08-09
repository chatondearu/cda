<script setup lang="ts">
import type { HudIconVariant } from './HudIcon.vue'
import type { HudIconLabelTone } from './HudIconLabel.vue'
import HudIconLabel from './HudIconLabel.vue'

const state = reactive({
  icon: 'diamond' as HudIconVariant,
  label: 'Uplink',
  value: 'ACTIVE',
  tone: 'active' as HudIconLabelTone,
})
</script>

<template>
  <Story title="HUD / ICONS / HudIconLabel">
    <Variant title="Default">
      <div class="bg-background p-8">
        <HudIconLabel
          :icon="state.icon"
          :label="state.label"
          :value="state.value"
          :tone="state.tone"
        />
      </div>

      <template #controls>
        <HstSelect
          v-model="state.icon"
          title="Icon"
          :options="{ diamond: 'diamond', chevron: 'chevron', hash: 'hash', triangle: 'triangle', cross: 'cross', ring: 'ring' }"
        />
        <HstText
          v-model="state.label"
          title="Label"
        />
        <HstText
          v-model="state.value"
          title="Value"
        />
        <HstSelect
          v-model="state.tone"
          title="Tone"
          :options="{ active: 'active', warning: 'warning', error: 'error', idle: 'idle' }"
        />
      </template>
    </Variant>

    <Variant title="Stack">
      <div class="flex flex-col items-start gap-2 bg-background p-8">
        <HudIconLabel
          icon="diamond"
          label="Uplink"
          value="ACTIVE"
          tone="active"
        />
        <HudIconLabel
          icon="triangle"
          label="Coolant"
          value="WARN"
          tone="warning"
        />
        <HudIconLabel
          icon="cross"
          label="Backup"
          value="FAULT"
          tone="error"
        />
        <HudIconLabel
          icon="ring"
          label="Aux"
          tone="idle"
        />
      </div>
    </Variant>
  </Story>
</template>
