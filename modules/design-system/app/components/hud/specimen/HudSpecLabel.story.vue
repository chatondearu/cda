<script setup lang="ts">
import HudSpecLabel from './HudSpecLabel.vue'

const state = reactive({
  title: 'SPECIMEN',
  code: 'NO. 014',
  rows: [
    { key: 'MASS', value: '4.2 KG' },
    { key: 'ORIGIN', value: 'SECTOR-9' },
    { key: 'CLASS', value: 'ALLOY-C' },
  ],
})
</script>

<template>
  <Story title="HUD / SPECIMEN / HudSpecLabel">
    <Variant title="Default">
      <div class="bg-background p-8">
        <HudSpecLabel
          :title="state.title"
          :code="state.code"
          :rows="state.rows"
        />
      </div>

      <template #controls>
        <HstText
          v-model="state.title"
          title="Title"
        />
        <HstText
          v-model="state.code"
          title="Code"
        />
      </template>
    </Variant>

    <Variant title="Long spec sheet">
      <div class="bg-background p-8">
        <HudSpecLabel
          title="ARTIFACT"
          code="NO. 219"
          :rows="[
            { key: 'AGE', value: '~2400 YRS' },
            { key: 'MATERIAL', value: 'CERAMIC-STEEL' },
            { key: 'CONDITION', value: 'STABLE' },
            { key: 'HANDLING', value: 'RESTRICTED' },
          ]"
        />
      </div>
    </Variant>
  </Story>
</template>
