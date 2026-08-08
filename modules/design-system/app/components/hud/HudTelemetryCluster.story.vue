<script setup lang="ts">
import HudTelemetryCluster from './HudTelemetryCluster.vue'

const state = reactive({
  title: 'CORE CLUSTER',
  meter: { label: 'CORE TEMP', value: '72%', progress: 72 },
  status: { label: 'LINK', status: 'active' as 'active' | 'standby' | 'offline' | 'pending' | 'locked' },
  code: { code: '4F2A', prefix: '0X' },
})
</script>

<template>
  <Story title="HUD / HudTelemetryCluster">
    <Variant title="Default">
      <div class="w-full max-w-72 bg-background p-8">
        <HudTelemetryCluster
          :title="state.title"
          :meter="state.meter"
          :status="state.status"
          :code="state.code"
        />
      </div>

      <template #controls>
        <HstText
          v-model="state.title"
          title="Title"
        />
        <HstText
          v-model="state.meter.label"
          title="Meter label"
        />
        <HstText
          v-model="state.meter.value"
          title="Meter value"
        />
        <HstNumber
          v-model="state.meter.progress"
          title="Meter progress"
          :min="0"
          :max="100"
        />
        <HstSelect
          v-model="state.status.status"
          title="Status"
          :options="{
            active: 'active',
            standby: 'standby',
            offline: 'offline',
            pending: 'pending',
            locked: 'locked',
          }"
        />
        <HstText
          v-model="state.code.code"
          title="Code"
        />
      </template>
    </Variant>

    <Variant title="Grid">
      <div class="grid grid-cols-1 gap-3 bg-background p-8 sm:grid-cols-2">
        <HudTelemetryCluster
          title="CORE CLUSTER"
          :meter="{ label: 'CORE TEMP', value: '72%', progress: 72 }"
          :status="{ label: 'LINK', status: 'active' }"
          :code="{ code: '4F2A' }"
        />
        <HudTelemetryCluster
          title="AUX CLUSTER"
          :meter="{ label: 'SIGNAL', value: '18%', progress: 18 }"
          :status="{ label: 'UPLINK', status: 'pending' }"
          :code="{ code: '0091', prefix: '0X' }"
        />
        <HudTelemetryCluster
          title="RELAY CLUSTER"
          :meter="{ label: 'THROUGHPUT', value: '0%', progress: 0 }"
          :status="{ label: 'RELAY', status: 'offline' }"
          :code="{ code: 'DEAD' }"
        />
        <HudTelemetryCluster
          title="VAULT CLUSTER"
          :meter="{ label: 'INTEGRITY', value: '100%', progress: 100 }"
          :status="{ label: 'VAULT', status: 'locked' }"
          :code="{ code: 'FF00' }"
        />
      </div>
    </Variant>
  </Story>
</template>
