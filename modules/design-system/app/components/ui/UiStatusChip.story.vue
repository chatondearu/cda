<script setup lang="ts">
import UiStatusChip from './UiStatusChip.vue'

const state = reactive({
  label: 'NOMINAL',
  variant: 'secondary' as 'error' | 'secondary',
})
</script>

<template>
  <Story title="Actions / UiStatusChip">
    <Variant title="Default">
      <div class="bg-background p-8">
        <UiStatusChip
          :label="state.label"
          :variant="state.variant"
        />
      </div>

      <template #controls>
        <HstText
          v-model="state.label"
          title="Label"
        />
        <HstSelect
          v-model="state.variant"
          title="Variant"
          :options="{ secondary: 'secondary', error: 'error' }"
        />
      </template>
    </Variant>
  </Story>
</template>
