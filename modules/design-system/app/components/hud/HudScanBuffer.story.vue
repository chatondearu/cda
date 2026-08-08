<script setup lang="ts">
import HudScanBuffer from './HudScanBuffer.vue'

const state = reactive({
  lines: [
    'SYS/KERNEL_LOAD.......OK',
    'MEM/ALLOC_TABLE.......OK',
    'NET/UPLINK_HANDSHAKE...OK',
    'SENSOR/ARRAY_CAL......OK',
    'AUTH/TOKEN_VERIFY.....OK',
    'AWAITING NEXT CYCLE',
  ],
})
</script>

<template>
  <Story title="HUD / HudScanBuffer">
    <Variant title="Default">
      <div class="w-72 bg-background p-8">
        <HudScanBuffer :lines="state.lines" />
      </div>
    </Variant>

    <Variant title="Short buffer">
      <div class="w-72 bg-background p-8">
        <HudScanBuffer :lines="['BOOT SEQUENCE START', 'SYSTEM NOMINAL']" />
      </div>
    </Variant>

    <Variant title="Overflowing buffer">
      <div class="w-72 bg-background p-8">
        <HudScanBuffer
          :lines="[
            'T+000 BOOT',
            'T+014 UPLINK',
            'T+032 TELEMETRY',
            'T+051 STANDBY',
            'T+069 SCAN CYCLE',
            'T+084 SYNC',
            'T+102 IDLE',
            'T+119 AWAITING COMMAND',
          ]"
        />
      </div>
    </Variant>
  </Story>
</template>
