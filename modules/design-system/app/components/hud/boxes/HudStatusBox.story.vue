<script setup lang="ts">
import HudStatusBox from './HudStatusBox.vue'

const state = reactive({
  title: 'Reactor core',
  status: 'nominal' as 'nominal' | 'standby' | 'warning' | 'critical' | 'offline',
})

const statusOptions = {
  nominal: 'nominal',
  standby: 'standby',
  warning: 'warning',
  critical: 'critical',
  offline: 'offline',
}

const metrics = [
  { label: 'Temp', value: '312K' },
  { label: 'Pressure', value: '4.2 BAR' },
  { label: 'Output', value: '87%' },
]
</script>

<template>
  <Story title="HUD / BOXES / HudStatusBox">
    <Variant title="Default">
      <div class="bg-background p-8">
        <HudStatusBox
          :title="state.title"
          :status="state.status"
          :metrics="metrics"
        />
      </div>

      <template #controls>
        <HstText
          v-model="state.title"
          title="Title"
        />
        <HstSelect
          v-model="state.status"
          title="Status"
          :options="statusOptions"
        />
      </template>
    </Variant>

    <Variant title="All statuses">
      <div class="flex flex-wrap gap-3 bg-background p-8">
        <HudStatusBox
          title="Core"
          status="nominal"
          :metrics="metrics"
        />
        <HudStatusBox
          title="Coolant"
          status="standby"
          :metrics="metrics"
        />
        <HudStatusBox
          title="Shield"
          status="warning"
          :metrics="metrics"
        />
        <HudStatusBox
          title="Containment"
          status="critical"
          :metrics="metrics"
        />
        <HudStatusBox
          title="Backup"
          status="offline"
        />
      </div>
    </Variant>
  </Story>
</template>
