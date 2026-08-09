<script setup lang="ts">
import HudNoiseLabel from './HudNoiseLabel.vue'

const state = reactive({
  label: 'Signal noise',
})
</script>

<template>
  <Story title="HUD / TEXT / HudNoiseLabel">
    <Variant title="Default">
      <div class="bg-background p-8">
        <HudNoiseLabel :label="state.label" />
      </div>

      <template #controls>
        <HstText
          v-model="state.label"
          title="Label"
        />
      </template>
    </Variant>
  </Story>
</template>
