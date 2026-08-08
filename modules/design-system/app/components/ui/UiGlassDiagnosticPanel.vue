<script setup lang="ts">
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from 'reka-ui'
const { t } = useI18n()
const { telemetry } = useSystemData()
</script>

<template>
  <section class="border border-outline/30 bg-surface_container/80 p-6 backdrop-blur-[10px]">
    <TabsRoot default-value="core">
      <TabsList class="mb-4 flex border-b border-primary_fixed_dim/20 pb-2">
        <TabsTrigger
          value="core"
          class="mr-2 border border-primary_fixed_dim/20 px-3 py-1 text-[10px] tracking-[0.18em] text-primary data-[state=active]:bg-primary_fixed_dim data-[state=active]:text-background"
        >
          {{ t('system.panel.core') }}
        </TabsTrigger>
        <TabsTrigger
          value="memory"
          class="border border-primary_fixed_dim/20 px-3 py-1 text-[10px] tracking-[0.18em] text-primary data-[state=active]:bg-primary_fixed_dim data-[state=active]:text-background"
        >
          {{ t('system.panel.memory') }}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="core">
        <UiProgressReadout
          :label="t('system.panel.coreLatency')"
          :value="telemetry.latencyText.replace('LATENCY: ', '')"
          :progress="Math.min(99, Math.max(5, Math.round(telemetry.latencyMs * 8)))"
        />
      </TabsContent>
      <TabsContent value="memory">
        <UiProgressReadout
          :label="t('system.panel.memoryLoad')"
          :value="`${telemetry.memLoadPercent}%`"
          :progress="telemetry.memLoadPercent"
        />
      </TabsContent>
    </TabsRoot>
  </section>
</template>
