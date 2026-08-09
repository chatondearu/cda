<script setup lang="ts">
import HudGantt from './HudGantt.vue'

const state = reactive({
  seed: 'HUD-GANTT',
  rows: 6,
})
</script>

<template>
  <Story title="HUD / CHARTS / HudGantt">
    <Variant title="Default">
      <div class="w-80 bg-background p-8">
        <HudGantt
          :seed="state.seed"
          :rows="state.rows"
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
          :min="2"
          :max="12"
        />
      </template>
    </Variant>

    <Variant title="Seed comparison">
      <div class="flex w-80 flex-col gap-4 bg-background p-8">
        <HudGantt seed="ALPHA-01" />
        <HudGantt
          seed="BRAVO-02"
          :rows="4"
        />
      </div>
    </Variant>
  </Story>
</template>
