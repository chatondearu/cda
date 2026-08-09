<script setup lang="ts">
import HudNodeGraph from './HudNodeGraph.vue'

const state = reactive({
  activeId: 'n2',
})

const nodes = [
  { id: 'n1', label: 'CORE-04' },
  { id: 'n2', label: 'RELAY-A' },
  { id: 'n3', label: 'RELAY-B' },
  { id: 'n4', label: 'EDGE-11' },
]
</script>

<template>
  <Story title="HUD / AIMING / HudNodeGraph">
    <Variant title="Default">
      <div class="bg-background p-8">
        <HudNodeGraph
          :nodes="nodes"
          :active-id="state.activeId"
        />
      </div>

      <template #controls>
        <HstSelect
          v-model="state.activeId"
          title="Active node"
          :options="{ n1: 'n1', n2: 'n2', n3: 'n3', n4: 'n4' }"
        />
      </template>
    </Variant>

    <Variant title="No active node">
      <div class="bg-background p-8">
        <HudNodeGraph :nodes="nodes" />
      </div>
    </Variant>

    <Variant title="Narrow (overflow-x)">
      <div class="w-[280px] max-w-full overflow-auto bg-background p-8">
        <HudNodeGraph
          :nodes="nodes"
          active-id="n3"
        />
      </div>
    </Variant>
  </Story>
</template>
