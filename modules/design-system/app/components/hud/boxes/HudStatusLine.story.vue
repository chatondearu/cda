<script setup lang="ts">
import HudStatusLine from './HudStatusLine.vue'

const state = reactive({
  label: 'LINK',
  status: 'active' as 'active' | 'standby' | 'offline' | 'pending' | 'locked',
})
</script>

<template>
  <Story title="HUD / BOXES / HudStatusLine">
    <Variant title="Default">
      <div class="bg-background p-8">
        <HudStatusLine
          :label="state.label"
          :status="state.status"
        />
      </div>

      <template #controls>
        <HstText
          v-model="state.label"
          title="Label"
        />
        <HstSelect
          v-model="state.status"
          title="Status"
          :options="{
            active: 'active',
            standby: 'standby',
            offline: 'offline',
            pending: 'pending',
            locked: 'locked',
          }"
        />
      </template>
    </Variant>

    <Variant title="All statuses">
      <div class="flex flex-col gap-1 bg-background p-8">
        <HudStatusLine label="LINK" status="active" />
        <HudStatusLine label="UPLINK" status="standby" />
        <HudStatusLine label="RELAY" status="offline" />
        <HudStatusLine label="SYNC" status="pending" />
        <HudStatusLine label="VAULT" status="locked" />
      </div>
    </Variant>
  </Story>
</template>
