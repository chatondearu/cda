<script setup lang="ts">
import HudEmblems from './HudEmblems.vue'

const emblems = [
  { variant: 'seal' as const, label: 'SEAL', active: true },
  { variant: 'sigil' as const, label: 'SIGIL', active: false },
  { variant: 'bar' as const, label: 'RANK', active: false },
  { variant: 'node' as const, label: 'NODE', active: true },
]
</script>

<template>
  <Story title="HUD / SPECIMEN / HudEmblems">
    <Variant title="Default">
      <div class="bg-background p-8">
        <HudEmblems :emblems="emblems" />
      </div>
    </Variant>

    <Variant title="All inactive">
      <div class="bg-background p-8">
        <HudEmblems
          :emblems="[
            { variant: 'seal', label: 'SEAL' },
            { variant: 'sigil', label: 'SIGIL' },
            { variant: 'bar', label: 'RANK' },
            { variant: 'node', label: 'NODE' },
          ]"
        />
      </div>
    </Variant>
  </Story>
</template>
