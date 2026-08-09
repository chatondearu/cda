<script setup lang="ts">
import HudAngleReadout from '../aiming/HudAngleReadout.vue'
import HudScope from '../aiming/HudScope.vue'
import HudBracketFrame from '../boxes/HudBracketFrame.vue'
import HudEcg from '../charts/HudEcg.vue'
import HudRingGauge from '../charts/HudRingGauge.vue'
import HudCallout from '../specimen/HudCallout.vue'
import HudCoordReadout from '../specimen/HudCoordReadout.vue'
import HudDualBus from '../specimen/HudDualBus.vue'
import HudSegmentedBar from '../specimen/HudSegmentedBar.vue'
import HudThreatPanel from '../tactical/HudThreatPanel.vue'
import HudBigNum from '../text/HudBigNum.vue'
import HudCircleText from '../text/HudCircleText.vue'
import HudSheet from './HudSheet.vue'

const structureNodes = [
  { id: 'n1', label: 'CORE-04' },
  { id: 'n2', label: 'RELAY-A' },
  { id: 'n3', label: 'EDGE-11' },
]
</script>

<template>
  <Story title="HUD / COMPOSITES / ForgeSheetDemo">
    <Variant title="Dense sheet">
      <div class="relative w-full overflow-auto border border-outline_variant/20 bg-background">
        <HudSheet label="FORGE SHEET // DEMO-01">
          <template #tl>
            <div class="flex w-full max-w-xs flex-col gap-2">
              <HudBigNum
                value="72"
                unit="%"
                label="CORE LOAD"
              />
              <HudBracketFrame variant="corners">
                <HudNodeGraph
                  :nodes="structureNodes"
                  active-id="n2"
                />
              </HudBracketFrame>
              <div class="flex flex-wrap gap-2">
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
            </div>
          </template>

          <template #tr>
            <div class="flex w-full max-w-xs flex-col gap-2">
              <HudEcg
                seed="FORGE-04"
                :bpm="96"
                label="PULSE"
              />
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
              <div class="flex flex-wrap items-center justify-center gap-3">
                <div class="h-6 w-24">
                  <HudConduit
                    orientation="h"
                    label="CORE"
                  />
                </div>
                <HudScope
                  :magnification="4"
                  :mil-dots="3"
                />
                <HudCircleText
                  text="FORGE-04 • FORGE-04 • "
                  :size="56"
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
              <HudThreatPanel
                level="high"
                designation="SEC-07"
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
              <HudCallout
                label="ANOMALY"
                detail="SEE LOG 032"
                direction="left"
              />
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
              <HudBigNum
                value="72"
                unit="%"
                label="CORE LOAD"
              />
              <HudBracketFrame variant="corners">
                <HudNodeGraph
                  :nodes="structureNodes"
                  active-id="n2"
                />
              </HudBracketFrame>
              <div class="flex flex-wrap gap-2">
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
            </div>
          </template>

          <template #tr>
            <div class="flex w-full max-w-xs flex-col gap-2">
              <HudEcg
                seed="FORGE-04"
                :bpm="96"
                label="PULSE"
              />
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
              <div class="flex flex-wrap items-center justify-center gap-3">
                <div class="h-6 w-24">
                  <HudConduit
                    orientation="h"
                    label="CORE"
                  />
                </div>
                <HudScope
                  :magnification="4"
                  :mil-dots="3"
                />
                <HudCircleText
                  text="FORGE-04 • FORGE-04 • "
                  :size="56"
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
              <HudThreatPanel
                level="high"
                designation="SEC-07"
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
              <HudCallout
                label="ANOMALY"
                detail="SEE LOG 032"
                direction="left"
              />
            </div>
          </template>
        </HudSheet>
      </div>
    </Variant>
  </Story>
</template>
