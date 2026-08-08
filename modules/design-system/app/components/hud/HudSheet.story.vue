<script setup lang="ts">
import HudSheet from './HudSheet.vue'

const state = reactive({
  label: 'SHEET // OVERWATCH-04',
})
</script>

<template>
  <Story title="HUD / HudSheet">
    <Variant title="Void with composites">
      <div class="relative w-full overflow-auto border border-outline_variant/20 bg-background">
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
      <div class="relative w-full overflow-auto border border-outline_variant/20 bg-background">
        <HudSheet
          label="SHEET // IDLE"
          min-height-class="min-h-[min(100dvh,280px)]"
        >
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

    <Variant title="Narrow (stack mode)">
      <div class="relative mx-auto w-[360px] max-w-full overflow-auto border border-outline_variant/20 bg-background">
        <HudSheet label="SHEET // NARROW">
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
    </Variant>

    <Variant title="Forced overlay layout">
      <div class="relative w-full overflow-auto border border-outline_variant/20 bg-background">
        <HudSheet
          label="SHEET // OVERLAY-FORCED"
          layout="overlay"
        >
          <template #tl>
            <HudBadge
              id="X-04"
              label="TL"
            />
          </template>

          <template #br>
            <HudBadge
              id="X-05"
              label="BR"
            />
          </template>
        </HudSheet>
      </div>
    </Variant>
  </Story>
</template>
