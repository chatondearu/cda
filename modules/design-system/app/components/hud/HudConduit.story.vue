<script setup lang="ts">
import HudConduit from './HudConduit.vue'

const state = reactive({
  label: 'BUS-04',
})
</script>

<template>
  <Story title="HUD / HudConduit">
    <Variant title="Horizontal">
      <div class="bg-background p-8">
        <div class="w-64">
          <HudConduit
            orientation="h"
            :label="state.label"
          />
        </div>
      </div>

      <template #controls>
        <HstText
          v-model="state.label"
          title="Label"
        />
      </template>
    </Variant>

    <Variant title="Horizontal, no label">
      <div class="bg-background p-8">
        <div class="w-64">
          <HudConduit orientation="h" />
        </div>
      </div>
    </Variant>

    <Variant title="Vertical">
      <div class="bg-background p-8">
        <div class="h-40">
          <HudConduit
            orientation="v"
            label="LINK"
          />
        </div>
      </div>
    </Variant>
  </Story>
</template>
