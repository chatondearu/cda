<script setup lang="ts">
import HudBarcodeStrip from './HudBarcodeStrip.vue'

const state = reactive({
  seed: 'HUD-BARCODE',
  bars: 32,
})
</script>

<template>
  <Story title="HUD / CODES / HudBarcodeStrip">
    <Variant title="Default">
      <div class="bg-background p-8">
        <HudBarcodeStrip
          :seed="state.seed"
          :bars="state.bars"
        />
      </div>

      <template #controls>
        <HstText
          v-model="state.seed"
          title="Seed"
        />
        <HstNumber
          v-model="state.bars"
          title="Bars"
          :min="4"
          :max="64"
        />
      </template>
    </Variant>

    <Variant title="Seed comparison">
      <div class="flex flex-col gap-2 bg-background p-8">
        <HudBarcodeStrip seed="ALPHA-01" />
        <HudBarcodeStrip seed="BRAVO-02" />
        <HudBarcodeStrip
          seed="CHARLIE-03"
          :bars="16"
        />
      </div>
    </Variant>
  </Story>
</template>
