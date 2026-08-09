<script setup lang="ts">
import HudCompliance from './HudCompliance.vue'

const state = reactive({
  standard: 'ISO-9001',
  status: 'pass' as 'pass' | 'fail' | 'pending',
  code: 'REV.04',
})
</script>

<template>
  <Story title="HUD / SPECIMEN / HudCompliance">
    <Variant title="Default">
      <div class="w-64 bg-background p-8">
        <HudCompliance
          :standard="state.standard"
          :status="state.status"
          :code="state.code"
        />
      </div>

      <template #controls>
        <HstText
          v-model="state.standard"
          title="Standard"
        />
        <HstSelect
          v-model="state.status"
          title="Status"
          :options="{ pass: 'pass', fail: 'fail', pending: 'pending' }"
        />
        <HstText
          v-model="state.code"
          title="Code"
        />
      </template>
    </Variant>

    <Variant title="All statuses">
      <div class="flex w-64 flex-col gap-2 bg-background p-8">
        <HudCompliance
          standard="ISO-9001"
          status="pass"
          code="REV.04"
        />
        <HudCompliance
          standard="CE-MARK"
          status="pending"
        />
        <HudCompliance
          standard="RoHS-3"
          status="fail"
          code="LOT.12"
        />
      </div>
    </Variant>
  </Story>
</template>
