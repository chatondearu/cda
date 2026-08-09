<script setup lang="ts">
import HudFileTree from './HudFileTree.vue'

const nodes = [
  {
    name: 'archive',
    type: 'folder' as const,
    children: [
      { name: 'lot-01.md', type: 'file' as const },
      { name: 'lot-02.md', type: 'file' as const },
    ],
  },
  {
    name: 'specimen',
    type: 'folder' as const,
    children: [
      { name: 'globe.vue', type: 'file' as const },
      { name: 'window.vue', type: 'file' as const },
    ],
  },
  { name: 'README.md', type: 'file' as const },
]
</script>

<template>
  <Story title="HUD / SPECIMEN / HudFileTree">
    <Variant title="Default">
      <div class="bg-background p-8">
        <HudFileTree
          root="hud/"
          :nodes="nodes"
        />
      </div>
    </Variant>

    <Variant title="Flat list">
      <div class="bg-background p-8">
        <HudFileTree
          :nodes="[
            { name: 'a.txt', type: 'file' },
            { name: 'b.txt', type: 'file' },
            { name: 'c.txt', type: 'file' },
          ]"
        />
      </div>
    </Variant>
  </Story>
</template>
