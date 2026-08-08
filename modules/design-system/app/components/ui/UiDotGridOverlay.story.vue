<script setup lang="ts">
import UiDotGridOverlay from './UiDotGridOverlay.vue'
</script>

<template>
  <Story title="Foundations / UiDotGridOverlay">
    <Variant title="Default">
      <div class="relative h-48 bg-background">
        <UiDotGridOverlay />
        <p class="relative z-10 p-8 font-mono text-xs uppercase tracking-widest text-primary">
          Dot grid overlay
        </p>
      </div>
    </Variant>
  </Story>
</template>
