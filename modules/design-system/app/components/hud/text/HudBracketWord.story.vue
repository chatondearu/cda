<script setup lang="ts">
import HudBracketWord from './HudBracketWord.vue'

const state = reactive({
  word: 'ACTIVE',
  bracket: 'square' as 'square' | 'angle' | 'lenticular',
})
</script>

<template>
  <Story title="HUD / TEXT / HudBracketWord">
    <Variant title="Default">
      <div class="bg-background p-8">
        <HudBracketWord
          :word="state.word"
          :bracket="state.bracket"
        />
      </div>

      <template #controls>
        <HstText
          v-model="state.word"
          title="Word"
        />
        <HstSelect
          v-model="state.bracket"
          title="Bracket"
          :options="{ square: 'square', angle: 'angle', lenticular: 'lenticular' }"
        />
      </template>
    </Variant>

    <Variant title="Bracket styles">
      <div class="flex gap-4 bg-background p-8">
        <HudBracketWord
          word="ONLINE"
          bracket="square"
        />
        <HudBracketWord
          word="STANDBY"
          bracket="angle"
        />
        <HudBracketWord
          word="LOCKED"
          bracket="lenticular"
        />
      </div>
    </Variant>
  </Story>
</template>
