<script setup lang="ts">
interface Props {
  lines: string[]
}

defineProps<Props>()
</script>

<template>
  <div class="flex max-h-32 flex-col gap-0.5 overflow-hidden border border-primary/20 bg-surface_container_lowest px-2 py-1 font-mono text-[10px] text-primary/45">
    <div
      v-for="(line, index) in lines"
      :key="`${index}-${line}`"
      class="truncate"
    >
      {{ String(index).padStart(2, '0') }} {{ line }}
    </div>

    <div class="hud-motion-target hud-anim-scan-cursor mt-0.5 h-2.5 w-1.5 bg-primary/60" />
  </div>
</template>
