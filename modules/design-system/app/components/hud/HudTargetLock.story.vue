<script setup lang="ts">
import HudTargetLock from './HudTargetLock.vue'

const state = reactive({
  locked: false,
  label: 'TGT-04',
})
</script>

<template>
  <Story title="HUD / HudTargetLock">
    <Variant title="Default">
      <div class="bg-background p-8">
        <HudTargetLock
          :locked="state.locked"
          :label="state.label"
        />
      </div>

      <template #controls>
        <HstCheckbox
          v-model="state.locked"
          title="Locked"
        />
        <HstText
          v-model="state.label"
          title="Label"
        />
      </template>
    </Variant>

    <Variant title="Acquiring vs Locked">
      <div class="flex gap-8 bg-background p-8">
        <HudTargetLock
          :locked="false"
          label="TGT-01"
        />
        <HudTargetLock
          :locked="true"
          label="TGT-02"
        />
      </div>
    </Variant>
  </Story>
</template>
