<script setup lang="ts">
import HudDualBus from './HudDualBus.vue'

const state = reactive({
  left: { label: 'BUS A', value: '24.6V' },
  right: { label: 'BUS B', value: '11.9V' },
})
</script>

<template>
  <Story title="HUD / HudDualBus">
    <Variant title="Default">
      <div class="w-72 bg-background p-8">
        <HudDualBus
          :left="state.left"
          :right="state.right"
        />
      </div>

      <template #controls>
        <HstText
          v-model="state.left.label"
          title="Left label"
        />
        <HstText
          v-model="state.left.value"
          title="Left value"
        />
        <HstText
          v-model="state.right.label"
          title="Right label"
        />
        <HstText
          v-model="state.right.value"
          title="Right value"
        />
      </template>
    </Variant>

    <Variant title="Stack">
      <div class="flex w-72 flex-col gap-3 bg-background p-8">
        <HudDualBus
          :left="{ label: 'BUS A', value: '24.6V' }"
          :right="{ label: 'BUS B', value: '11.9V' }"
        />
        <HudDualBus
          :left="{ label: 'IN', value: '412 kb/s' }"
          :right="{ label: 'OUT', value: '108 kb/s' }"
        />
      </div>
    </Variant>
  </Story>
</template>
