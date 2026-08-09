<script setup lang="ts">
interface HudCornerStackOrg {
  name: string
  meta?: string
}

interface HudCornerStackSerial {
  serial: string
  caption?: string
}

interface Props {
  org: HudCornerStackOrg
  serial: HudCornerStackSerial
}

defineProps<Props>()
</script>

<template>
  <div class="relative flex min-h-24 min-w-48 flex-col justify-between gap-3 p-4">
    <HudCornerMarks />
    <HudOrgLabel
      :name="org.name"
      :meta="org.meta"
    />
    <HudSerialBlock
      class="self-end"
      :serial="serial.serial"
      :caption="serial.caption"
    />
  </div>
</template>
