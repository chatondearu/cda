<script setup lang="ts">
import HudReticle from './HudReticle.vue'

const state = reactive({
  size: 'md' as 'sm' | 'md',
})
</script>

<template>
  <Story title="HUD / HudReticle">
    <Variant title="Default">
      <div class="bg-background p-8">
        <HudReticle :size="state.size" />
      </div>

      <template #controls>
        <HstSelect
          v-model="state.size"
          title="Size"
          :options="{ sm: 'sm', md: 'md' }"
        />
      </template>
    </Variant>

    <Variant title="Sizes">
      <div class="flex items-center gap-6 bg-background p-8">
        <HudReticle size="sm" />
        <HudReticle size="md" />
      </div>
    </Variant>
  </Story>
</template>
