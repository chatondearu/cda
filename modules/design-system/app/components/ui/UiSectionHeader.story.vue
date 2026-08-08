<script setup lang="ts">
import UiSectionHeader from './UiSectionHeader.vue'

const state = reactive({
  title: 'Archive index',
  code: 'SEC.01',
})
</script>

<template>
  <Story title="Foundations / UiSectionHeader">
    <Variant title="Default">
      <div class="bg-background p-8 text-primary">
        <UiSectionHeader
          :title="state.title"
          :code="state.code"
        />
      </div>

      <template #controls>
        <HstText
          v-model="state.title"
          title="Title"
        />
        <HstText
          v-model="state.code"
          title="Code"
        />
      </template>
    </Variant>
  </Story>
</template>
