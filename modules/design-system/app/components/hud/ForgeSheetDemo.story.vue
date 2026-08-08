<script setup lang="ts">
import HudAngleReadout from './HudAngleReadout.vue'
import HudBracketFrame from './HudBracketFrame.vue'
import HudBuildStamp from './HudBuildStamp.vue'
import HudChecksumStamp from './HudChecksumStamp.vue'
import HudConduit from './HudConduit.vue'
import HudCoordReadout from './HudCoordReadout.vue'
import HudDualBus from './HudDualBus.vue'
import HudHotZone from './HudHotZone.vue'
import HudNodeGraph from './HudNodeGraph.vue'
import HudPacketLoss from './HudPacketLoss.vue'
import HudPulseReadout from './HudPulseReadout.vue'
import HudRadarRing from './HudRadarRing.vue'
import HudRingGauge from './HudRingGauge.vue'
import HudSegmentedBar from './HudSegmentedBar.vue'
import HudSheet from './HudSheet.vue'
import HudTickLadder from './HudTickLadder.vue'
import HudWarningPlate from './HudWarningPlate.vue'
import HudWaveform from './HudWaveform.vue'

const structureNodes = [
  { id: 'n1', label: 'CORE-04' },
  { id: 'n2', label: 'RELAY-A' },
  { id: 'n3', label: 'EDGE-11' },
]
</script>

<template>
  <Story title="HUD / ForgeSheetDemo">
    <Variant title="Dense sheet">
      <div class="relative w-full overflow-auto border border-outline_variant/20 bg-background">
        <HudSheet label="FORGE SHEET // DEMO-01">
          <template #tl>
            <div class="flex w-full max-w-xs flex-col gap-2">
              <HudBracketFrame variant="corners">
                <HudNodeGraph
                  :nodes="structureNodes"
                  active-id="n2"
                />
              </HudBracketFrame>
              <HudRingGauge
                :value="72"
                label="CORE"
              />
              <HudSegmentedBar
                :segments="6"
                :active="4"
                label="LOAD"
              />
            </div>
          </template>

          <template #tr>
            <div class="flex w-full max-w-xs flex-col gap-2">
              <HudWaveform
                seed="FORGE-04"
                :bars="20"
              />
              <div class="flex flex-wrap items-center gap-3">
                <HudRadarRing
                  :rings="3"
                  :blip-angle="120"
                />
                <HudTickLadder
                  :active="3"
                  :total="5"
                />
              </div>
            </div>
          </template>

          <template #center>
            <div class="flex w-full max-w-xs flex-col items-center gap-2">
              <HudBracketFrame variant="rails">
                <HudDualBus
                  :left="{ label: 'BUS A', value: '24.1V' }"
                  :right="{ label: 'BUS B', value: '23.8V' }"
                />
              </HudBracketFrame>
              <div class="h-6 w-24">
                <HudConduit
                  orientation="h"
                  label="CORE"
                />
              </div>
            </div>
          </template>

          <template #bl>
            <div class="flex w-full max-w-xs flex-col gap-2">
              <HudWarningPlate
                level="warning"
                text="THERMAL DRIFT DETECTED"
              />
              <div class="flex flex-wrap gap-2">
                <HudChecksumStamp
                  ok
                  code="9F21"
                />
                <HudBuildStamp
                  rev="R-042"
                  build="2026.08"
                />
              </div>
              <HudHotZone
                label="REACTOR BAY"
                active
              />
            </div>
          </template>

          <template #br>
            <div class="flex w-full max-w-xs flex-col gap-2">
              <HudCoordReadout
                x="128"
                y="-44"
                z="09"
              />
              <div class="flex flex-wrap gap-2">
                <HudAngleReadout
                  :degrees="215"
                  label="HEADING"
                />
                <HudPacketLoss :percent="3.2" />
              </div>
              <HudPulseReadout :bpm="82" />
            </div>
          </template>
        </HudSheet>
      </div>
    </Variant>

    <Variant title="Narrow (mobile stack)">
      <div class="relative mx-auto w-[360px] max-w-full overflow-auto border border-outline_variant/20 bg-background">
        <HudSheet label="FORGE SHEET // DEMO-01">
          <template #tl>
            <div class="flex w-full max-w-xs flex-col gap-2">
              <HudBracketFrame variant="corners">
                <HudNodeGraph
                  :nodes="structureNodes"
                  active-id="n2"
                />
              </HudBracketFrame>
              <HudRingGauge
                :value="72"
                label="CORE"
              />
              <HudSegmentedBar
                :segments="6"
                :active="4"
                label="LOAD"
              />
            </div>
          </template>

          <template #tr>
            <div class="flex w-full max-w-xs flex-col gap-2">
              <HudWaveform
                seed="FORGE-04"
                :bars="20"
              />
              <div class="flex flex-wrap items-center gap-3">
                <HudRadarRing
                  :rings="3"
                  :blip-angle="120"
                />
                <HudTickLadder
                  :active="3"
                  :total="5"
                />
              </div>
            </div>
          </template>

          <template #center>
            <div class="flex w-full max-w-xs flex-col items-center gap-2">
              <HudBracketFrame variant="rails">
                <HudDualBus
                  :left="{ label: 'BUS A', value: '24.1V' }"
                  :right="{ label: 'BUS B', value: '23.8V' }"
                />
              </HudBracketFrame>
              <div class="h-6 w-24">
                <HudConduit
                  orientation="h"
                  label="CORE"
                />
              </div>
            </div>
          </template>

          <template #bl>
            <div class="flex w-full max-w-xs flex-col gap-2">
              <HudWarningPlate
                level="warning"
                text="THERMAL DRIFT DETECTED"
              />
              <div class="flex flex-wrap gap-2">
                <HudChecksumStamp
                  ok
                  code="9F21"
                />
                <HudBuildStamp
                  rev="R-042"
                  build="2026.08"
                />
              </div>
              <HudHotZone
                label="REACTOR BAY"
                active
              />
            </div>
          </template>

          <template #br>
            <div class="flex w-full max-w-xs flex-col gap-2">
              <HudCoordReadout
                x="128"
                y="-44"
                z="09"
              />
              <div class="flex flex-wrap gap-2">
                <HudAngleReadout
                  :degrees="215"
                  label="HEADING"
                />
                <HudPacketLoss :percent="3.2" />
              </div>
              <HudPulseReadout :bpm="82" />
            </div>
          </template>
        </HudSheet>
      </div>
    </Variant>
  </Story>
</template>
