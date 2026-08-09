<script setup lang="ts">
import HudPlacard from './HudPlacard.vue'

const state = reactive({
  title: 'AUX POWER UNIT',
  code: 'REF.774-A',
  spec: '28V DC / 400HZ',
  tone: 'default' as 'default' | 'caution' | 'critical',
})
</script>

<template>
  <Story title="HUD / TACTICAL / HudPlacard">
    <Variant title="Default">
      <div class="w-72 bg-background p-8">
        <HudPlacard
          :title="state.title"
          :code="state.code"
          :spec="state.spec"
          :tone="state.tone"
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
        <HstText
          v-model="state.spec"
          title="Spec"
        />
        <HstSelect
          v-model="state.tone"
          title="Tone"
          :options="{ default: 'default', caution: 'caution', critical: 'critical' }"
        />
      </template>
    </Variant>

    <Variant title="All tones">
      <div class="flex w-72 flex-col gap-3 bg-background p-8">
        <HudPlacard
          title="COOLANT LOOP"
          code="REF.112-C"
          spec="MAINTAIN < 40C"
          tone="default"
        />
        <HudPlacard
          title="HIGH VOLTAGE"
          code="REF.209-B"
          spec="LOCKOUT BEFORE SERVICE"
          tone="caution"
        />
        <HudPlacard
          title="REACTOR CORE"
          code="REF.001-A"
          spec="AUTHORIZED PERSONNEL ONLY"
          tone="critical"
        />
      </div>
    </Variant>
  </Story>
</template>
