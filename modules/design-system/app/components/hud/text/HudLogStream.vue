<script setup lang="ts">
interface HudLogLine {
  t: string
  message: string
}

interface Props {
  entries?: string[]
  lines?: HudLogLine[]
}

const props = defineProps<Props>()

const resolvedLines = computed<HudLogLine[]>(() => {
  if (props.lines?.length)
    return props.lines

  return (props.entries ?? []).map((message, index) => ({
    t: String(index).padStart(3, '0'),
    message,
  }))
})
</script>

<template>
  <div class="flex flex-col gap-0.5 font-mono text-[10px] text-primary/50">
    <div
      v-for="(line, index) in resolvedLines"
      :key="`${line.t}-${index}`"
      class="hud-motion-target hud-anim-log-line"
      :style="{ '--hud-line-index': index }"
    >
      T+{{ line.t }} {{ line.message }}
    </div>
  </div>
</template>
