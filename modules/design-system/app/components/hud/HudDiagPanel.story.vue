<script setup lang="ts">
import HudDiagPanel from './HudDiagPanel.vue'

const state = reactive({
  access: { granted: true, detail: 'CLEARANCE LVL 3' },
  log: {
    lines: [
      { t: '000', message: 'SYSTEM BOOT' },
      { t: '014', message: 'UPLINK ESTABLISHED' },
      { t: '032', message: 'TELEMETRY SYNC OK' },
      { t: '051', message: 'AWAITING COMMAND' },
    ],
  },
  ascii: { seed: 'HUD-DIAG', rows: 3, cols: 20 } as { seed: string, rows: number, cols: number } | undefined,
})
</script>

<template>
  <Story title="HUD / HudDiagPanel">
    <Variant title="Default">
      <div class="w-96 bg-background p-8">
        <HudDiagPanel
          :access="state.access"
          :log="state.log"
          :ascii="state.ascii"
        />
      </div>

      <template #controls>
        <HstCheckbox
          v-model="state.access.granted"
          title="Granted"
        />
        <HstText
          v-model="state.access.detail"
          title="Access detail"
        />
      </template>
    </Variant>

    <Variant title="Denied, no ASCII">
      <div class="w-96 bg-background p-8">
        <HudDiagPanel
          :access="{ granted: false, detail: 'INVALID CREDENTIALS' }"
          :log="{ entries: ['SYSTEM BOOT', 'ACCESS ATTEMPT', 'LOCKOUT ARMED'] }"
        />
      </div>
    </Variant>

    <Variant title="Stack">
      <div class="flex w-96 flex-col gap-3 bg-background p-8">
        <HudDiagPanel
          :access="{ granted: true, detail: 'CLEARANCE LVL 3' }"
          :log="{ lines: [{ t: '000', message: 'SYSTEM BOOT' }, { t: '014', message: 'UPLINK ESTABLISHED' }] }"
          :ascii="{ seed: 'ALPHA-01', rows: 2, cols: 20 }"
        />
        <HudDiagPanel
          :access="{ granted: false, detail: 'SECTOR LOCKED' }"
          :log="{ entries: ['SECTOR LOCKDOWN', 'AWAITING OVERRIDE'] }"
        />
      </div>
    </Variant>
  </Story>
</template>
