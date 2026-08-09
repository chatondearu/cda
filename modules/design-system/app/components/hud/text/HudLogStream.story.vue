<script setup lang="ts">
import HudLogStream from './HudLogStream.vue'

const state = reactive({
  lines: [
    { t: '000', message: 'SYSTEM BOOT' },
    { t: '014', message: 'UPLINK ESTABLISHED' },
    { t: '032', message: 'TELEMETRY SYNC OK' },
    { t: '051', message: 'AWAITING COMMAND' },
  ],
})
</script>

<template>
  <Story title="HUD / TEXT / HudLogStream">
    <Variant title="Timed lines">
      <div class="bg-background p-8">
        <HudLogStream :lines="state.lines" />
      </div>
    </Variant>

    <Variant title="Entries fallback">
      <div class="bg-background p-8">
        <HudLogStream :entries="['SYSTEM BOOT', 'UPLINK ESTABLISHED', 'AWAITING COMMAND']" />
      </div>
    </Variant>
  </Story>
</template>
