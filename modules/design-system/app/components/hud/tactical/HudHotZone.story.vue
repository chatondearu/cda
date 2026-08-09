<script setup lang="ts">
import HudHotZone from './HudHotZone.vue'

const state = reactive({
  label: 'HOT ZONE',
  active: true,
})
</script>

<template>
  <Story title="HUD / TACTICAL / HudHotZone">
    <Variant title="Default">
      <div class="w-96 bg-background p-8">
        <HudHotZone
          :label="state.label"
          :active="state.active"
        />
      </div>

      <template #controls>
        <HstText
          v-model="state.label"
          title="Label"
        />
        <HstCheckbox
          v-model="state.active"
          title="Active"
        />
      </template>
    </Variant>

    <Variant title="Active vs Standby">
      <div class="flex w-96 flex-col gap-3 bg-background p-8">
        <HudHotZone
          label="RESTRICTED SECTOR"
          :active="true"
        />
        <HudHotZone
          label="MAINTENANCE BAY"
          :active="false"
        />
      </div>
    </Variant>
  </Story>
</template>
