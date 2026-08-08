<script setup lang="ts">
import UiRefCode from './UiRefCode.vue'

const state = reactive({
  code: 'REF.CDA.001',
  tone: 'muted' as 'muted' | 'emphasis',
})
</script>

<template>
  <Story title="Foundations / UiRefCode">
    <Variant title="Default">
      <div class="bg-background p-8">
        <UiRefCode
          :code="state.code"
          :tone="state.tone"
        />
      </div>

      <template #controls>
        <HstText
          v-model="state.code"
          title="Code"
        />
        <HstSelect
          v-model="state.tone"
          title="Tone"
          :options="{ muted: 'muted', emphasis: 'emphasis' }"
        />
      </template>
    </Variant>
  </Story>
</template>
