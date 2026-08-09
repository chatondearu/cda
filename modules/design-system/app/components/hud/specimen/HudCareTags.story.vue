<script setup lang="ts">
import HudCareTags from './HudCareTags.vue'

const tags = [
  { kind: 'fragile' as const, label: 'HANDLING', value: 'FRAGILE' },
  { kind: 'temp' as const, label: 'STORAGE TEMP', value: '-18C' },
  { kind: 'orientation' as const, label: 'ORIENTATION', value: 'UP' },
  { kind: 'hazard' as const, label: 'HAZARD', value: 'CLASS-2' },
  { kind: 'custody' as const, label: 'CUSTODY', value: 'CHAIN-04' },
]
</script>

<template>
  <Story title="HUD / SPECIMEN / HudCareTags">
    <Variant title="Default">
      <div class="bg-background p-8">
        <HudCareTags
          serial="TAG-0042"
          :tags="tags"
        />
      </div>
    </Variant>

    <Variant title="Minimal">
      <div class="bg-background p-8">
        <HudCareTags
          :tags="[
            { kind: 'fragile', label: 'HANDLING', value: 'FRAGILE' },
            { kind: 'custody', label: 'CUSTODY', value: 'CHAIN-01' },
          ]"
        />
      </div>
    </Variant>
  </Story>
</template>
