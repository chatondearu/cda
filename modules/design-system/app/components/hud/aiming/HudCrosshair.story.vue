<script setup lang="ts">
import HudCrosshair from './HudCrosshair.vue'

const state = reactive({
  variant: 'circle' as 'circle' | 'brackets' | 'dot',
})
</script>

<template>
  <Story title="HUD / AIMING / HudCrosshair">
    <Variant title="Default">
      <div class="bg-background p-8">
        <div class="h-40 border border-outline_variant/20">
          <HudCrosshair :variant="state.variant" />
        </div>
      </div>

      <template #controls>
        <HstSelect
          v-model="state.variant"
          title="Variant"
          :options="{ circle: 'circle', brackets: 'brackets', dot: 'dot' }"
        />
      </template>
    </Variant>

    <Variant title="All variants">
      <div class="flex gap-4 bg-background p-8">
        <div class="h-40 w-40 border border-outline_variant/20">
          <HudCrosshair variant="circle" />
        </div>
        <div class="h-40 w-40 border border-outline_variant/20">
          <HudCrosshair variant="brackets" />
        </div>
        <div class="h-40 w-40 border border-outline_variant/20">
          <HudCrosshair variant="dot" />
        </div>
      </div>
    </Variant>
  </Story>
</template>
