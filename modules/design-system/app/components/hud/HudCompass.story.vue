<script setup lang="ts">
import HudCompass from './HudCompass.vue'

const state = reactive({
  heading: 42,
  label: 'HDG',
})
</script>

<template>
  <Story title="HUD / HudCompass">
    <Variant title="Default">
      <div class="bg-background p-8">
        <HudCompass
          :heading="state.heading"
          :label="state.label"
        />
      </div>

      <template #controls>
        <HstNumber
          v-model="state.heading"
          title="Heading"
          :min="0"
          :max="359"
        />
        <HstText
          v-model="state.label"
          title="Label"
        />
      </template>
    </Variant>

    <Variant title="Cardinal points">
      <div class="flex gap-6 bg-background p-8">
        <HudCompass
          :heading="0"
          label="N"
        />
        <HudCompass
          :heading="90"
          label="E"
        />
        <HudCompass
          :heading="180"
          label="S"
        />
        <HudCompass
          :heading="270"
          label="W"
        />
      </div>
    </Variant>
  </Story>
</template>
