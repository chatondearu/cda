<script setup lang="ts">
import HudAsciiBlock from './HudAsciiBlock.vue'

const state = reactive({
  seed: 'HUD-ASCII',
  rows: 4,
  cols: 24,
})
</script>

<template>
  <Story title="HUD / CODES / HudAsciiBlock">
    <Variant title="Default">
      <div class="bg-background p-8">
        <HudAsciiBlock
          :seed="state.seed"
          :rows="state.rows"
          :cols="state.cols"
        />
      </div>

      <template #controls>
        <HstText
          v-model="state.seed"
          title="Seed"
        />
        <HstNumber
          v-model="state.rows"
          title="Rows"
          :min="1"
          :max="12"
        />
        <HstNumber
          v-model="state.cols"
          title="Cols"
          :min="4"
          :max="48"
        />
      </template>
    </Variant>

    <Variant title="Seed comparison">
      <div class="flex flex-col gap-2 bg-background p-8">
        <HudAsciiBlock seed="ALPHA-01" />
        <HudAsciiBlock seed="BRAVO-02" />
        <HudAsciiBlock
          seed="ALPHA-01"
          :rows="2"
          :cols="12"
        />
      </div>
    </Variant>
  </Story>
</template>
