<script setup lang="ts">
import { useHudMotion } from '../../composables/useHudMotion'
import HudBarcodeStrip from './HudBarcodeStrip.vue'
import HudCrosshair from './HudCrosshair.vue'
import HudLogStream from './HudLogStream.vue'
import HudMeterBar from './HudMeterBar.vue'
import HudScanBuffer from './HudScanBuffer.vue'
import HudTargetLock from './HudTargetLock.vue'

const { enabled, toggle } = useHudMotion()

const state = reactive({
  locked: true,
})
</script>

<template>
  <Story title="HUD / Motion">
    <Variant title="Global toggle + demo strip">
      <div class="flex w-full max-w-xl flex-col gap-6 bg-background p-8">
        <div class="flex items-center justify-between border border-outline_variant/20 px-3 py-2">
          <span class="font-mono text-[10px] uppercase tracking-widest text-primary/50">
            useHudMotion() — reduced-motion always wins
          </span>
          <button
            type="button"
            class="border border-outline_variant/40 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-primary"
            @click="toggle"
          >
            {{ enabled ? 'HUD MOTION' : 'MOTION OFF' }}
          </button>
        </div>

        <p class="font-mono text-[10px] leading-relaxed text-primary/40">
          The floating <strong>HUD MOTION</strong> / <strong>MOTION OFF</strong> control (bottom-right of
          the Histoire sandbox) drives the same `hud-motion` / `hud-motion-off` class on
          `document.documentElement` and persists globally across every story via
          `localStorage['cda-hud-motion']`. The button above is a second, local demonstration of the
          same composable.
        </p>

        <HudMeterBar
          label="CORE TEMP"
          value="72%"
          :progress="72"
        />

        <HudLogStream
          :lines="[
            { t: '000', message: 'SYSTEM BOOT' },
            { t: '014', message: 'UPLINK ESTABLISHED' },
            { t: '032', message: 'TELEMETRY SYNC OK' },
            { t: '051', message: 'AWAITING COMMAND' },
          ]"
        />

        <HudScanBuffer
          :lines="[
            'SYS/KERNEL_LOAD.......OK',
            'MEM/ALLOC_TABLE.......OK',
            'NET/UPLINK_HANDSHAKE...OK',
          ]"
        />

        <div class="flex items-center gap-8">
          <HudTargetLock
            :locked="state.locked"
            label="TGT-04"
          />

          <div class="flex gap-4">
            <div class="h-20 w-20 border border-outline_variant/20">
              <HudCrosshair variant="circle" />
            </div>
            <div class="h-20 w-20 border border-outline_variant/20">
              <HudCrosshair variant="brackets" />
            </div>
            <div class="h-20 w-20 border border-outline_variant/20">
              <HudCrosshair variant="dot" />
            </div>
          </div>
        </div>

        <HudBarcodeStrip seed="HUD-MOTION-DEMO" />
      </div>

      <template #controls>
        <HstCheckbox
          v-model="state.locked"
          title="Target locked (pulse)"
        />
      </template>
    </Variant>
  </Story>
</template>
