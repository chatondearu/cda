<script setup lang="ts">
import UiCommandInput from './UiCommandInput.vue'

const state = reactive({
  label: 'SYS_MSG: ENTER COMMAND',
  modelValue: '',
  placeholder: 'type a command…',
})
</script>

<template>
  <Story title="Actions / UiCommandInput">
    <Variant title="Default">
      <div class="max-w-md bg-background p-8">
        <UiCommandInput
          v-model="state.modelValue"
          :label="state.label"
          :placeholder="state.placeholder"
        />
      </div>

      <template #controls>
        <HstText
          v-model="state.label"
          title="Label"
        />
        <HstText
          v-model="state.modelValue"
          title="Value"
        />
        <HstText
          v-model="state.placeholder"
          title="Placeholder"
        />
      </template>
    </Variant>
  </Story>
</template>
