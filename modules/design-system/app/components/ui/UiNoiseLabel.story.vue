<script setup lang="ts">
import UiNoiseLabel from './UiNoiseLabel.vue'

const state = reactive({
  label: 'Signal noise',
})
</script>

<template>
  <Story title="Foundations / UiNoiseLabel">
    <Variant title="Default">
      <div class="bg-background p-8">
        <UiNoiseLabel :label="state.label" />
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
