<script setup lang="ts">
import UiPageFrame from './UiPageFrame.vue'
</script>

<template>
  <Story
    title="Foundations / UiPageFrame"
    :layout="{ type: 'single', iframe: true }"
  >
    <Variant title="Default">
      <UiPageFrame>
        <div class="p-8">
          <p class="font-mono text-sm uppercase tracking-widest text-primary">
            Page frame slot content
          </p>
        </div>
      </UiPageFrame>
    </Variant>
  </Story>
</template>
