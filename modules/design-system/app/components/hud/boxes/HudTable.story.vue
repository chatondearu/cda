<script setup lang="ts">
import HudTable from './HudTable.vue'

const state = reactive({
  caption: 'Node telemetry',
})

const columns = ['ID', 'STATE', 'LAT']

const rows = [
  ['N-01', 'OK', '4ms'],
  ['N-02', 'OK', '6ms'],
  ['N-03', 'WARN', '112ms'],
  ['N-04', 'DOWN', '—'],
]
</script>

<template>
  <Story title="HUD / BOXES / HudTable">
    <Variant title="Default">
      <div class="bg-background p-8">
        <HudTable
          :caption="state.caption"
          :columns="columns"
          :rows="rows"
        />
      </div>

      <template #controls>
        <HstText
          v-model="state.caption"
          title="Caption"
        />
      </template>
    </Variant>

    <Variant title="No header">
      <div class="bg-background p-8">
        <HudTable :rows="rows" />
      </div>
    </Variant>
  </Story>
</template>
