<script setup lang="ts">
import HudHeader from './HudHeader.vue'

const state = reactive({
  title: 'System diagnostics',
  code: 'SEC-04',
  index: '01',
})
</script>

<template>
  <Story title="HUD / TEXT / HudHeader">
    <Variant title="Default">
      <div class="bg-background p-8">
        <HudHeader
          :title="state.title"
          :code="state.code"
          :index="state.index"
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
        <HstText
          v-model="state.index"
          title="Index"
        />
      </template>
    </Variant>

    <Variant title="Minimal">
      <div class="bg-background p-8">
        <HudHeader title="Archive log" />
      </div>
    </Variant>
  </Story>
</template>
