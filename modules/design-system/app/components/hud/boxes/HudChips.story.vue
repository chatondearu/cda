<script setup lang="ts">
import HudChips from './HudChips.vue'

const chips = [
  { label: 'Uplink', status: 'active' as const },
  { label: 'Sensors', status: 'active' as const },
  { label: 'Coolant', status: 'warning' as const },
  { label: 'Backup', status: 'error' as const },
  { label: 'Aux', status: 'idle' as const },
]
</script>

<template>
  <Story title="HUD / BOXES / HudChips">
    <Variant title="Default">
      <div class="bg-background p-8">
        <HudChips :chips="chips" />
      </div>
    </Variant>

    <Variant title="Single tone">
      <div class="flex flex-col gap-2 bg-background p-8">
        <HudChips :chips="[{ label: 'active' }, { label: 'active', status: 'active' }]" />
        <HudChips :chips="[{ label: 'warning', status: 'warning' }]" />
        <HudChips :chips="[{ label: 'error', status: 'error' }]" />
        <HudChips :chips="[{ label: 'idle', status: 'idle' }]" />
      </div>
    </Variant>
  </Story>
</template>
