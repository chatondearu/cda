<script setup lang="ts">
import HudMilGrid from './HudMilGrid.vue'

const state = reactive({
  gridRef: '18TWL 84001 43002',
  size: 6,
  activeRow: 2,
  activeCol: 3,
})
</script>

<template>
  <Story title="HUD / TACTICAL / HudMilGrid">
    <Variant title="Default">
      <div class="w-72 bg-background p-8">
        <HudMilGrid
          :grid-ref="state.gridRef"
          :size="state.size"
          :active-row="state.activeRow"
          :active-col="state.activeCol"
        />
      </div>

      <template #controls>
        <HstText
          v-model="state.gridRef"
          title="Grid ref"
        />
        <HstNumber
          v-model="state.size"
          title="Size"
          :min="4"
          :max="8"
        />
        <HstNumber
          v-model="state.activeRow"
          title="Active row"
          :min="0"
          :max="state.size - 1"
        />
        <HstNumber
          v-model="state.activeCol"
          title="Active col"
          :min="0"
          :max="state.size - 1"
        />
      </template>
    </Variant>

    <Variant title="Compact grid">
      <div class="w-72 bg-background p-8">
        <HudMilGrid
          grid-ref="14SPG 22047 71190"
          :size="4"
          :active-row="0"
          :active-col="2"
        />
      </div>
    </Variant>
  </Story>
</template>
