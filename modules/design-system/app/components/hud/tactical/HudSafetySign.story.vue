<script setup lang="ts">
import HudSafetySign from './HudSafetySign.vue'

const state = reactive({
  kind: 'warning' as 'mandatory' | 'prohibition' | 'warning' | 'info',
  text: 'HIGH VOLTAGE',
  code: 'SGN-04',
})
</script>

<template>
  <Story title="HUD / TACTICAL / HudSafetySign">
    <Variant title="Default">
      <div class="w-64 bg-background p-8">
        <HudSafetySign
          :kind="state.kind"
          :text="state.text"
          :code="state.code"
        />
      </div>

      <template #controls>
        <HstSelect
          v-model="state.kind"
          title="Kind"
          :options="{ mandatory: 'mandatory', prohibition: 'prohibition', warning: 'warning', info: 'info' }"
        />
        <HstText
          v-model="state.text"
          title="Text"
        />
        <HstText
          v-model="state.code"
          title="Code"
        />
      </template>
    </Variant>

    <Variant title="All kinds">
      <div class="flex w-96 flex-wrap items-start gap-4 bg-background p-8">
        <HudSafetySign
          kind="mandatory"
          text="WEAR PPE"
        />
        <HudSafetySign
          kind="prohibition"
          text="NO ACCESS"
        />
        <HudSafetySign
          kind="warning"
          text="HIGH VOLTAGE"
        />
        <HudSafetySign
          kind="info"
          text="MUSTER POINT"
        />
      </div>
    </Variant>
  </Story>
</template>
