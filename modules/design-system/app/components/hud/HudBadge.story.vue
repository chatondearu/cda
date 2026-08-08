<script setup lang="ts">
import HudBadge from './HudBadge.vue'

const state = reactive({
  id: 'X-4471',
  label: 'OPERATOR',
})
</script>

<template>
  <Story title="HUD / HudBadge">
    <Variant title="Default">
      <div class="bg-background p-8">
        <HudBadge
          :id="state.id"
          :label="state.label"
        />
      </div>

      <template #controls>
        <HstText
          v-model="state.id"
          title="Id"
        />
        <HstText
          v-model="state.label"
          title="Label"
        />
      </template>
    </Variant>

    <Variant title="Stack">
      <div class="flex flex-col items-start gap-2 bg-background p-8">
        <HudBadge
          id="X-4471"
          label="OPERATOR"
        />
        <HudBadge
          id="A-0012"
          label="ADMIN"
        />
        <HudBadge id="00-0000" />
      </div>
    </Variant>
  </Story>
</template>
