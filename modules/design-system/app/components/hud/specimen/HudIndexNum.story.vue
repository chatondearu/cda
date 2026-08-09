<script setup lang="ts">
import HudIndexNum from './HudIndexNum.vue'

const state = reactive({
  index: 14,
  digits: 3,
  total: 24,
  label: 'CATALOG ENTRY',
})
</script>

<template>
  <Story title="HUD / SPECIMEN / HudIndexNum">
    <Variant title="Default">
      <div class="bg-background p-8">
        <HudIndexNum
          :index="state.index"
          :digits="state.digits"
          :total="state.total"
          :label="state.label"
        />
      </div>

      <template #controls>
        <HstNumber
          v-model="state.index"
          title="Index"
          :min="0"
        />
        <HstNumber
          v-model="state.digits"
          title="Digits"
          :min="1"
          :max="6"
        />
        <HstNumber
          v-model="state.total"
          title="Total"
          :min="0"
        />
        <HstText
          v-model="state.label"
          title="Label"
        />
      </template>
    </Variant>

    <Variant title="Without total">
      <div class="bg-background p-8">
        <HudIndexNum
          :index="7"
          label="SAMPLE"
        />
      </div>
    </Variant>
  </Story>
</template>
