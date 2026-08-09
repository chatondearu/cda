<script setup lang="ts">
import HudOrgLabel from './HudOrgLabel.vue'

const state = reactive({
  name: 'LOGICAL MACHINE DIV.',
  meta: 'SECTOR 7',
})
</script>

<template>
  <Story title="HUD / TEXT / HudOrgLabel">
    <Variant title="Default">
      <div class="bg-background p-8">
        <HudOrgLabel
          :name="state.name"
          :meta="state.meta"
        />
      </div>

      <template #controls>
        <HstText
          v-model="state.name"
          title="Name"
        />
        <HstText
          v-model="state.meta"
          title="Meta"
        />
      </template>
    </Variant>

    <Variant title="Stack">
      <div class="flex flex-col items-start gap-3 bg-background p-8">
        <HudOrgLabel
          name="LOGICAL MACHINE DIV."
          meta="SECTOR 7"
        />
        <HudOrgLabel name="CHATONDEARU LABS" />
      </div>
    </Variant>
  </Story>
</template>
