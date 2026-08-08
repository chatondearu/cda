<script setup lang="ts">
import UiButton from './UiButton.vue'

const state = reactive({
  label: 'Execute',
  variant: 'primary' as 'primary' | 'secondary' | 'tertiary',
})
</script>

<template>
  <Story title="Actions / UiButton">
    <Variant title="Button">
      <div class="flex flex-wrap gap-4 bg-background p-8">
        <UiButton :variant="state.variant">
          {{ state.label }}
        </UiButton>
      </div>

      <template #controls>
        <HstText
          v-model="state.label"
          title="Label"
        />
        <HstSelect
          v-model="state.variant"
          title="Variant"
          :options="{
            primary: 'primary',
            secondary: 'secondary',
            tertiary: 'tertiary',
          }"
        />
      </template>
    </Variant>

    <Variant title="Link">
      <div class="flex flex-wrap gap-4 bg-background p-8">
        <UiButton
          :variant="state.variant"
          to="/archive"
        >
          {{ state.label }}
        </UiButton>
      </div>

      <template #controls>
        <HstText
          v-model="state.label"
          title="Label"
        />
        <HstSelect
          v-model="state.variant"
          title="Variant"
          :options="{
            primary: 'primary',
            secondary: 'secondary',
            tertiary: 'tertiary',
          }"
        />
      </template>
    </Variant>
  </Story>
</template>
