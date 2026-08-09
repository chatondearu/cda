<script setup lang="ts">
import type { HudGlyphSize, HudGlyphTone, HudGlyphVariant } from './HudGlyph.vue'
import HudGlyph from './HudGlyph.vue'

const state = reactive({
  variant: 'sigil' as HudGlyphVariant,
  size: 'md' as HudGlyphSize,
  tone: 'active' as HudGlyphTone,
})

const variants: HudGlyphVariant[] = ['sigil', 'rune', 'circuit', 'node', 'fracture']
</script>

<template>
  <Story title="HUD / ICONS / HudGlyph">
    <Variant title="Default">
      <div class="bg-background p-8">
        <HudGlyph
          :variant="state.variant"
          :size="state.size"
          :tone="state.tone"
        />
      </div>

      <template #controls>
        <HstSelect
          v-model="state.variant"
          title="Variant"
          :options="{ sigil: 'sigil', rune: 'rune', circuit: 'circuit', node: 'node', fracture: 'fracture' }"
        />
        <HstSelect
          v-model="state.size"
          title="Size"
          :options="{ sm: 'sm', md: 'md', lg: 'lg' }"
        />
        <HstSelect
          v-model="state.tone"
          title="Tone"
          :options="{ active: 'active', warning: 'warning', error: 'error', idle: 'idle' }"
        />
      </template>
    </Variant>

    <Variant title="All variants">
      <div class="flex flex-wrap items-center gap-6 bg-background p-8">
        <HudGlyph
          v-for="variant in variants"
          :key="variant"
          :variant="variant"
          size="lg"
        />
      </div>
    </Variant>
  </Story>
</template>
