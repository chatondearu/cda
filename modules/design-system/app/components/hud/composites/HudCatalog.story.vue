<script setup lang="ts">
import HudBadge from '../boxes/HudBadge.vue'
import HudChips from '../boxes/HudChips.vue'
import HudStatusBox from '../boxes/HudStatusBox.vue'
import HudBarcodeStrip from '../codes/HudBarcodeStrip.vue'
import HudQrCode from '../codes/HudQrCode.vue'
import HudRingGauge from '../charts/HudRingGauge.vue'
import HudSparkline from '../charts/HudSparkline.vue'
import HudCornerStack from './HudCornerStack.vue'
import HudGlyph from '../icons/HudGlyph.vue'
import HudIcon from '../icons/HudIcon.vue'
import HudEmblems from '../specimen/HudEmblems.vue'
import HudWindow from '../specimen/HudWindow.vue'
import HudComms from '../tactical/HudComms.vue'
import HudPlacard from '../tactical/HudPlacard.vue'
import HudBigNum from '../text/HudBigNum.vue'
import HudCircleText from '../text/HudCircleText.vue'
import HudCompass from '../aiming/HudCompass.vue'
import HudScope from '../aiming/HudScope.vue'

interface ForgeGroup {
  id: string
  folder: string
  title: string
  names: string[]
}

const groups: ForgeGroup[] = [
  {
    id: 'text',
    folder: 'hud/text/',
    title: 'TEXT',
    names: ['HudNoiseLabel', 'HudOrgLabel', 'HudCodeReadout', 'HudLogStream', 'HudRefCode', 'HudHeader', 'HudBigNum', 'HudKanji', 'HudBracketWord', 'HudLetterChips', 'HudCircleText'],
  },
  {
    id: 'boxes',
    folder: 'hud/boxes/',
    title: 'BOXES',
    names: ['HudStatusLine', 'HudAccessBanner', 'HudCornerMarks', 'HudBracketFrame', 'HudBadge', 'HudSerialBlock', 'HudStatusBox', 'HudTable', 'HudChips', 'HudLabelBox'],
  },
  {
    id: 'codes',
    folder: 'hud/codes/',
    title: 'CODES',
    names: ['HudBarcodeStrip', 'HudAsciiBlock', 'HudScanBuffer', 'HudDenseBar', 'HudQrCode', 'HudBlockArt'],
  },
  {
    id: 'icons',
    folder: 'hud/icons/',
    title: 'ICONS',
    names: ['HudIcon', 'HudGlyph', 'HudIconLabel'],
  },
  {
    id: 'charts',
    folder: 'hud/charts/',
    title: 'CHARTS',
    names: ['HudWaveform', 'HudRingGauge', 'HudPulseReadout', 'HudSparkline', 'HudGraph', 'HudHistogram', 'HudSpectrum', 'HudOscilloscope', 'HudScatter', 'HudGantt', 'HudEcg'],
  },
  {
    id: 'aiming',
    folder: 'hud/aiming/',
    title: 'AIMING',
    names: ['HudTargetLock', 'HudCrosshair', 'HudCompass', 'HudRadarRing', 'HudWarningPlate', 'HudNodeGraph', 'HudAngleReadout', 'HudReticle', 'HudTickLadder', 'HudConduit', 'HudArrow', 'HudMeasure', 'HudAxis', 'HudScope', 'HudProtractor', 'HudRadialBurst', 'HudKnobs', 'HudOrbit'],
  },
  {
    id: 'specimen',
    folder: 'hud/specimen/',
    title: 'SPECIMEN',
    names: ['HudChecksumStamp', 'HudBuildStamp', 'HudMeterBar', 'HudSegmentedBar', 'HudDualBus', 'HudCoordReadout', 'HudPacketLoss', 'HudGlobe', 'HudCompliance', 'HudBigArrow', 'HudSpecLabel', 'HudWindow', 'HudFileTree', 'HudEmblems', 'HudIndexNum', 'HudCallout', 'HudCareTags'],
  },
  {
    id: 'tactical',
    folder: 'hud/tactical/',
    title: 'TACTICAL',
    names: ['HudHotZone', 'HudMilSymbol', 'HudPlacard', 'HudSafetySign', 'HudMilGrid', 'HudThreatPanel', 'HudComms'],
  },
  {
    id: 'composites',
    folder: 'hud/composites/',
    title: 'COMPOSITES',
    names: ['HudTelemetryCluster', 'HudCornerStack', 'HudDiagPanel', 'HudSheet', 'ForgeSheetDemo', 'HudMotion (story-only)'],
  },
]
</script>

<template>
  <Story title="HUD / Catalog">
    <Variant title="Index">
      <div class="flex flex-col gap-px bg-background">
        <div class="flex items-baseline justify-between border border-outline_variant/20 bg-surface_container_lowest px-4 py-3">
          <span class="font-mono text-sm font-bold uppercase tracking-[0.3em] text-primary">FORGE // CATALOG INDEX</span>
          <span class="font-mono text-[9px] uppercase tracking-widest text-primary/40">{{ groups.length }} GROUPS</span>
        </div>

        <div
          v-for="group in groups"
          :key="group.id"
          class="flex flex-col gap-2 border border-t-0 border-outline_variant/20 bg-surface_container_lowest px-4 py-3"
        >
          <div class="flex items-baseline justify-between">
            <span class="font-mono text-xs font-bold uppercase tracking-[0.2em] text-primary">{{ group.title }}</span>
            <span class="font-mono text-[9px] uppercase tracking-widest text-primary/40">{{ group.folder }} — {{ group.names.length }}</span>
          </div>

          <div
            v-if="group.id === 'text'"
            class="flex flex-wrap items-center gap-4 py-1"
          >
            <HudBigNum
              value="11"
              label="MODULES"
            />
            <HudCircleText
              text="TEXT • TEXT • "
              :size="48"
            />
          </div>
          <div
            v-else-if="group.id === 'boxes'"
            class="flex flex-wrap items-center gap-3 py-1"
          >
            <HudStatusBox
              title="AUX"
              status="nominal"
            />
            <HudChips :chips="[{ label: 'Uplink', status: 'active' }, { label: 'Aux', status: 'idle' }]" />
            <HudBadge
              id="X-04"
              label="UNIT"
            />
          </div>
          <div
            v-else-if="group.id === 'codes'"
            class="flex flex-wrap items-center gap-3 py-1"
          >
            <HudQrCode
              payload="CDA-CATALOG-24"
              :size="56"
            />
            <HudBarcodeStrip
              seed="CATALOG-24"
              :bars="24"
            />
          </div>
          <div
            v-else-if="group.id === 'icons'"
            class="flex flex-wrap items-center gap-4 py-1"
          >
            <HudIcon
              variant="hash"
              size="lg"
            />
            <HudIcon
              variant="ring"
              size="lg"
              tone="warning"
            />
            <HudGlyph
              variant="circuit"
              size="lg"
            />
          </div>
          <div
            v-else-if="group.id === 'charts'"
            class="flex flex-wrap items-center gap-3 py-1"
          >
            <HudSparkline seed="CATALOG-24" />
            <HudRingGauge
              :value="64"
              label="IDX"
            />
          </div>
          <div
            v-else-if="group.id === 'aiming'"
            class="flex flex-wrap items-center gap-4 py-1"
          >
            <HudCompass
              :heading="220"
              label="HDG"
            />
            <HudScope :magnification="2" />
          </div>
          <div
            v-else-if="group.id === 'specimen'"
            class="flex flex-wrap items-center gap-3 py-1"
          >
            <HudWindow
              title="CATALOG.SYS"
              status="active"
            >
              <span class="font-mono text-[9px] uppercase tracking-widest text-primary/50">Index ready</span>
            </HudWindow>
            <HudEmblems :emblems="[{ variant: 'seal', label: 'SEAL', active: true }, { variant: 'node', label: 'NODE' }]" />
          </div>
          <div
            v-else-if="group.id === 'tactical'"
            class="flex flex-wrap items-center gap-3 py-1"
          >
            <HudPlacard
              title="CATALOG UNIT"
              code="REF.024-A"
              spec="LOT 24 // FINAL"
            />
            <HudComms
              channel="CH.24 CAT"
              :signal="4"
              status="link"
            />
          </div>
          <div
            v-else-if="group.id === 'composites'"
            class="flex flex-wrap items-center gap-3 py-1"
          >
            <HudCornerStack
              :org="{ name: 'FORGE CATALOG', meta: 'LOT 24' }"
              :serial="{ serial: 'CAT-2026-24' }"
            />
          </div>

          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="name in group.names"
              :key="name"
              class="border border-outline_variant/25 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wide text-primary/60"
            >{{ name }}</span>
          </div>
        </div>
      </div>
    </Variant>
  </Story>
</template>
