<script setup lang="ts">
import HudRefCode from './HudRefCode.vue'

const state = reactive({
  code: 'REF.CDA.001',
  tone: 'muted' as 'muted' | 'emphasis',
})
</script>

<template>
  <Story title="HUD / TEXT / HudRefCode">
    <Variant title="Default">
      <div class="bg-background p-8">
        <HudRefCode
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
