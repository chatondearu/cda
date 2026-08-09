<script setup lang="ts">
import HudBuildStamp from './HudBuildStamp.vue'

const state = reactive({
  rev: 'R042',
  build: 'B1187',
})
</script>

<template>
  <Story title="HUD / SPECIMEN / HudBuildStamp">
    <Variant title="Default">
      <div class="w-64 bg-background p-8">
        <HudBuildStamp
          :rev="state.rev"
          :build="state.build"
        />
      </div>

      <template #controls>
        <HstText
          v-model="state.rev"
          title="Rev"
        />
        <HstText
          v-model="state.build"
          title="Build"
        />
      </template>
    </Variant>

    <Variant title="Fallback">
      <div class="bg-background p-8">
        <HudBuildStamp />
      </div>
    </Variant>
  </Story>
</template>
