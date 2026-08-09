<script setup lang="ts">
import HudKanji from './HudKanji.vue'

const state = reactive({
  glyph: '機',
  reading: 'KI',
  meaning: 'Machine',
})
</script>

<template>
  <Story title="HUD / TEXT / HudKanji">
    <Variant title="Default">
      <div class="bg-background p-8">
        <HudKanji
          :glyph="state.glyph"
          :reading="state.reading"
          :meaning="state.meaning"
        />
      </div>

      <template #controls>
        <HstText
          v-model="state.glyph"
          title="Glyph"
        />
        <HstText
          v-model="state.reading"
          title="Reading"
        />
        <HstText
          v-model="state.meaning"
          title="Meaning"
        />
      </template>
    </Variant>

    <Variant title="Stack">
      <div class="flex gap-2 bg-background p-8">
        <HudKanji
          glyph="機"
          reading="KI"
          meaning="Machine"
        />
        <HudKanji
          glyph="律"
          reading="RITSU"
          meaning="Order"
        />
        <HudKanji glyph="猫" />
      </div>
    </Variant>
  </Story>
</template>
