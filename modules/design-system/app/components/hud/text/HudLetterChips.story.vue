<script setup lang="ts">
import HudLetterChips from './HudLetterChips.vue'

const state = reactive({
  text: 'CDA LAB',
})
</script>

<template>
  <Story title="HUD / TEXT / HudLetterChips">
    <Variant title="Default">
      <div class="bg-background p-8">
        <HudLetterChips :text="state.text" />
      </div>

      <template #controls>
        <HstText
          v-model="state.text"
          title="Text"
        />
      </template>
    </Variant>

    <Variant title="Stack">
      <div class="flex flex-col gap-2 bg-background p-8">
        <HudLetterChips text="SIGNAL" />
        <HudLetterChips text="R 04" />
      </div>
    </Variant>
  </Story>
</template>
