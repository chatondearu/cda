<script setup lang="ts">
import HudCoordReadout from './HudCoordReadout.vue'

const state = reactive({
  x: '042.6',
  y: '-118.2',
  z: '009.4',
})
</script>

<template>
  <Story title="HUD / SPECIMEN / HudCoordReadout">
    <Variant title="Default">
      <div class="w-72 bg-background p-8">
        <HudCoordReadout
          :x="state.x"
          :y="state.y"
          :z="state.z"
        />
      </div>

      <template #controls>
        <HstText
          v-model="state.x"
          title="X"
        />
        <HstText
          v-model="state.y"
          title="Y"
        />
        <HstText
          v-model="state.z"
          title="Z"
        />
      </template>
    </Variant>

    <Variant title="XY only">
      <div class="w-64 bg-background p-8">
        <HudCoordReadout
          x="512"
          y="288"
        />
      </div>
    </Variant>

    <Variant title="Stack">
      <div class="flex w-72 flex-col gap-3 bg-background p-8">
        <HudCoordReadout
          x="042.6"
          y="-118.2"
          z="009.4"
        />
        <HudCoordReadout
          x="000.0"
          y="000.0"
          z="000.0"
        />
      </div>
    </Variant>
  </Story>
</template>
