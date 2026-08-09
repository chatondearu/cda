<script setup lang="ts">
import HudTickLadder from './HudTickLadder.vue'

const state = reactive({
  active: 3,
  total: 5,
  orientation: 'vertical' as 'vertical' | 'horizontal',
})
</script>

<template>
  <Story title="HUD / AIMING / HudTickLadder">
    <Variant title="Default">
      <div class="bg-background p-8">
        <HudTickLadder
          :active="state.active"
          :total="state.total"
          :orientation="state.orientation"
        />
      </div>

      <template #controls>
        <HstNumber
          v-model="state.active"
          title="Active"
          :min="0"
          :max="state.total"
        />
        <HstNumber
          v-model="state.total"
          title="Total"
          :min="1"
          :max="9"
        />
        <HstSelect
          v-model="state.orientation"
          title="Orientation"
          :options="{ vertical: 'vertical', horizontal: 'horizontal' }"
        />
      </template>
    </Variant>

    <Variant title="Orientations">
      <div class="flex flex-col gap-6 bg-background p-8">
        <HudTickLadder
          :active="4"
          :total="5"
          orientation="vertical"
        />
        <HudTickLadder
          :active="2"
          :total="5"
          orientation="horizontal"
        />
      </div>
    </Variant>
  </Story>
</template>
