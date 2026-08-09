<script setup lang="ts">
import HudLabelBox from './HudLabelBox.vue'

const state = reactive({
  label: 'Sector',
  value: '07-ALPHA',
  hint: 'Restricted',
})
</script>

<template>
  <Story title="HUD / BOXES / HudLabelBox">
    <Variant title="Default">
      <div class="bg-background p-8">
        <HudLabelBox
          :label="state.label"
          :value="state.value"
          :hint="state.hint"
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
        <HstText
          v-model="state.hint"
          title="Hint"
        />
      </template>
    </Variant>

    <Variant title="Stack">
      <div class="flex flex-wrap items-start gap-3 bg-background p-8">
        <HudLabelBox
          label="Unit"
          value="X-71"
        />
        <HudLabelBox
          label="Status"
          value="ACTIVE"
          hint="Since 04:12"
        />
        <HudLabelBox
          label="Zone"
          value="C-4"
        />
      </div>
    </Variant>
  </Story>
</template>
