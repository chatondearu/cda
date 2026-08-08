<script setup lang="ts">
import HudSheet from './HudSheet.vue'

const state = reactive({
  label: 'SHEET // OVERWATCH-04',
})
</script>

<template>
  <Story title="HUD / HudSheet">
    <Variant title="Void with composites">
      <div class="relative min-h-[420px] w-full overflow-hidden border border-outline_variant/20 bg-background">
        <HudSheet :label="state.label">
          <template #tl>
            <HudTelemetryCluster
              title="CORE CLUSTER"
              :meter="{ label: 'CORE TEMP', value: '72%', progress: 72 }"
              :status="{ label: 'LINK', status: 'active' }"
              :code="{ code: '4F2A' }"
            />
          </template>

          <template #tr>
            <HudCornerStack
              :org="{ name: 'LOGICAL MACHINE DIV.', meta: 'SECTOR 7' }"
              :serial="{ serial: 'LM-2984-XX', caption: 'ISSUED 2026' }"
            />
          </template>

          <template #center>
            <HudTargetLock
              locked
              label="TRACK 04"
            />
          </template>

          <template #bl>
            <HudDiagPanel
              :access="{ granted: true, detail: 'CLEARANCE LVL 3' }"
              :log="{ lines: [{ t: '000', message: 'SYSTEM BOOT' }, { t: '032', message: 'TELEMETRY SYNC OK' }] }"
            />
          </template>

          <template #br>
            <HudCornerStack
              :org="{ name: 'ARCHIVE OPS', meta: 'SECTOR 3' }"
              :serial="{ serial: 'AO-1102-QZ' }"
            />
          </template>
        </HudSheet>
      </div>

      <template #controls>
        <HstText
          v-model="state.label"
          title="Sheet label"
        />
      </template>
    </Variant>

    <Variant title="Sparse">
      <div class="relative min-h-[280px] w-full overflow-hidden border border-outline_variant/20 bg-background">
        <HudSheet label="SHEET // IDLE">
          <template #tl>
            <HudBadge
              id="X-04"
              label="IDLE UNIT"
            />
          </template>

          <template #center>
            <div class="h-32 w-32">
              <HudCrosshair variant="brackets" />
            </div>
          </template>
        </HudSheet>
      </div>
    </Variant>
  </Story>
</template>
