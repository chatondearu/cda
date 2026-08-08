<script setup lang="ts">
interface HudDiagPanelAccess {
  granted: boolean
  detail?: string
}

interface HudDiagPanelLog {
  entries?: string[]
  lines?: { t: string, message: string }[]
}

interface HudDiagPanelAscii {
  seed?: string
  rows?: number
  cols?: number
}

interface Props {
  access: HudDiagPanelAccess
  log: HudDiagPanelLog
  ascii?: HudDiagPanelAscii
}

defineProps<Props>()
</script>

<template>
  <div class="flex flex-col gap-2 border border-primary/20 bg-surface_container_lowest px-3 py-2">
    <HudAccessBanner
      :granted="access.granted"
      :detail="access.detail"
    />
    <HudLogStream
      :entries="log.entries"
      :lines="log.lines"
    />
    <HudAsciiBlock
      v-if="ascii"
      :seed="ascii.seed"
      :rows="ascii.rows"
      :cols="ascii.cols"
    />
  </div>
</template>
