<script setup lang="ts">
import HudCornerMarks from './HudCornerMarks.vue'
</script>

<template>
  <Story title="HUD / HudCornerMarks">
    <Variant title="Default">
      <div class="bg-background p-8">
        <div class="relative h-32 w-64 border border-outline_variant/20">
          <HudCornerMarks />
        </div>
      </div>
    </Variant>
  </Story>
</template>
