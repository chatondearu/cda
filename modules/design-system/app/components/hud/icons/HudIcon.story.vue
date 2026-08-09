<script setup lang="ts">
import type { HudIconDirection, HudIconSize, HudIconTone, HudIconVariant } from './HudIcon.vue'
import HudIcon from './HudIcon.vue'

const state = reactive({
  variant: 'diamond' as HudIconVariant,
  size: 'md' as HudIconSize,
  direction: 'right' as HudIconDirection,
  tone: 'active' as HudIconTone,
})

const variants: HudIconVariant[] = ['diamond', 'chevron', 'hash', 'triangle', 'cross', 'ring']
const tones: HudIconTone[] = ['active', 'warning', 'error', 'idle']
</script>

<template>
  <Story title="HUD / ICONS / HudIcon">
    <Variant title="Default">
      <div class="bg-background p-8">
        <HudIcon
          :variant="state.variant"
          :size="state.size"
          :direction="state.direction"
          :tone="state.tone"
        />
      </div>

      <template #controls>
        <HstSelect
          v-model="state.variant"
          title="Variant"
          :options="{ diamond: 'diamond', chevron: 'chevron', hash: 'hash', triangle: 'triangle', cross: 'cross', ring: 'ring' }"
        />
        <HstSelect
          v-model="state.size"
          title="Size"
          :options="{ sm: 'sm', md: 'md', lg: 'lg' }"
        />
        <HstSelect
          v-model="state.direction"
          title="Direction (chevron)"
          :options="{ up: 'up', right: 'right', down: 'down', left: 'left' }"
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
        <HudIcon
          v-for="variant in variants"
          :key="variant"
          :variant="variant"
          size="lg"
        />
      </div>
    </Variant>

    <Variant title="Chevron directions">
      <div class="flex items-center gap-6 bg-background p-8">
        <HudIcon
          variant="chevron"
          size="lg"
          direction="up"
        />
        <HudIcon
          variant="chevron"
          size="lg"
          direction="right"
        />
        <HudIcon
          variant="chevron"
          size="lg"
          direction="down"
        />
        <HudIcon
          variant="chevron"
          size="lg"
          direction="left"
        />
      </div>
    </Variant>

    <Variant title="Tones">
      <div class="flex items-center gap-6 bg-background p-8">
        <HudIcon
          v-for="tone in tones"
          :key="tone"
          variant="diamond"
          size="lg"
          :tone="tone"
        />
      </div>
    </Variant>
  </Story>
</template>
