<script setup lang="ts">
import HudCrosshair from './HudCrosshair.vue'
</script>

<template>
  <Story title="HUD / HudCrosshair">
    <Variant title="Default">
      <div class="bg-background p-8">
        <div class="h-40 border border-outline_variant/20">
          <HudCrosshair />
        </div>
      </div>
    </Variant>
  </Story>
</template>
