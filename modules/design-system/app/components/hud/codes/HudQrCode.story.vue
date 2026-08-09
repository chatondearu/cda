<script setup lang="ts">
import HudQrCode from './HudQrCode.vue'

const state = reactive({
  payload: '',
  seed: 'HUD-QR',
  size: 96,
})
</script>

<template>
  <Story title="HUD / CODES / HudQrCode">
    <Variant title="Default">
      <div class="bg-background p-8">
        <HudQrCode
          :payload="state.payload"
          :seed="state.seed"
          :size="state.size"
        />
      </div>

      <template #controls>
        <HstText
          v-model="state.payload"
          title="Payload"
        />
        <HstText
          v-model="state.seed"
          title="Seed (fallback)"
        />
        <HstNumber
          v-model="state.size"
          title="Size (px)"
          :min="48"
          :max="240"
        />
      </template>
    </Variant>

    <Variant title="Payload comparison">
      <div class="flex flex-wrap gap-4 bg-background p-8">
        <HudQrCode payload="https://chatondearu.dev/archive/001" />
        <HudQrCode payload="ACCESS-TOKEN-7F3A" />
        <HudQrCode
          seed="HUD-QR-FALLBACK"
          :size="64"
        />
      </div>
    </Variant>
  </Story>
</template>
