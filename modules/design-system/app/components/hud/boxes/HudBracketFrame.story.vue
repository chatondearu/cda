<script setup lang="ts">
import HudBracketFrame from './HudBracketFrame.vue'

const state = reactive({
  variant: 'corners' as 'corners' | 'chevrons' | 'rails',
})
</script>

<template>
  <Story title="HUD / BOXES / HudBracketFrame">
    <Variant title="Default">
      <div class="bg-background p-8">
        <HudBracketFrame :variant="state.variant">
          <span class="font-mono text-xs uppercase tracking-widest text-primary">FRAMED CONTENT</span>
        </HudBracketFrame>
      </div>

      <template #controls>
        <HstSelect
          v-model="state.variant"
          title="Variant"
          :options="{ corners: 'corners', chevrons: 'chevrons', rails: 'rails' }"
        />
      </template>
    </Variant>

    <Variant title="All variants">
      <div class="flex flex-wrap gap-4 bg-background p-8">
        <HudBracketFrame variant="corners">
          <span class="font-mono text-xs uppercase tracking-widest text-primary">CORNERS</span>
        </HudBracketFrame>
        <HudBracketFrame variant="chevrons">
          <span class="font-mono text-xs uppercase tracking-widest text-primary">CHEVRONS</span>
        </HudBracketFrame>
        <HudBracketFrame variant="rails">
          <span class="font-mono text-xs uppercase tracking-widest text-primary">RAILS</span>
        </HudBracketFrame>
      </div>
    </Variant>
  </Story>
</template>
