<script setup lang="ts">
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
          v-for="entry in groups"
          :key="entry.id"
          class="flex flex-col gap-2 border border-t-0 border-outline_variant/20 bg-surface_container_lowest px-4 py-3"
        >
          <div class="flex items-baseline justify-between">
            <span class="font-mono text-xs font-bold uppercase tracking-[0.2em] text-primary">{{ entry.title }}</span>
            <span class="font-mono text-[9px] uppercase tracking-widest text-primary/40">{{ entry.folder }} — {{ entry.names.length }}</span>
          </div>

          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="chipName in entry.names"
              :key="chipName"
              class="border border-outline_variant/25 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wide text-primary/60"
            >{{ chipName }}</span>
          </div>
        </div>
      </div>
    </Variant>
  </Story>
</template>
