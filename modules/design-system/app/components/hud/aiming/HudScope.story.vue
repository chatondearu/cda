<script setup lang="ts">
import HudScope from './HudScope.vue'

const state = reactive({
  magnification: 4,
  milDots: 3,
  rotateRing: true,
})
</script>

<template>
  <Story title="HUD / AIMING / HudScope">
    <Variant title="Default">
      <div class="bg-background p-8">
        <HudScope
          :magnification="state.magnification"
          :mil-dots="state.milDots"
          :rotate-ring="state.rotateRing"
        />
      </div>

      <template #controls>
        <HstNumber
          v-model="state.magnification"
          title="Magnification"
          :min="1"
          :max="20"
        />
        <HstNumber
          v-model="state.milDots"
          title="Mil-dots"
          :min="1"
          :max="5"
        />
        <HstCheckbox
          v-model="state.rotateRing"
          title="Rotate ring"
        />
      </template>
    </Variant>

    <Variant title="Cluster">
      <div class="flex gap-6 bg-background p-8">
        <HudScope :magnification="2" />
        <HudScope
          :magnification="8"
          :mil-dots="5"
        />
        <HudScope
          :magnification="4"
          :rotate-ring="false"
        />
      </div>
    </Variant>
  </Story>
</template>
