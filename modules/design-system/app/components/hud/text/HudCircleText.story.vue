<script setup lang="ts">
import HudCircleText from './HudCircleText.vue'

const state = reactive({
  text: 'SYSTEM ONLINE • SYSTEM ONLINE • ',
  size: 96,
})
</script>

<template>
  <Story title="HUD / TEXT / HudCircleText">
    <Variant title="Default">
      <div class="bg-background p-8">
        <HudCircleText
          :text="state.text"
          :size="state.size"
        />
      </div>

      <template #controls>
        <HstText
          v-model="state.text"
          title="Text"
        />
        <HstNumber
          v-model="state.size"
          title="Size"
        />
      </template>
    </Variant>

    <Variant title="Sizes">
      <div class="flex items-center gap-6 bg-background p-8">
        <HudCircleText
          text="CDA LAB • CDA LAB • "
          :size="64"
        />
        <HudCircleText
          text="ARCHIVE UNIT 07 • ARCHIVE UNIT 07 • "
          :size="120"
        />
      </div>
    </Variant>
  </Story>
</template>
