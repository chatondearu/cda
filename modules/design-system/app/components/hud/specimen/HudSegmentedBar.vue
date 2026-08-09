<script setup lang="ts">
interface Props {
  segments: number
  active: number
  label?: string
}

const props = defineProps<Props>()

const clampedActive = computed(() => Math.min(Math.max(props.active, 0), props.segments))

const cells = computed(() => Array.from({ length: props.segments }, (_, index) => ({
  index,
  tick: `T${index + 1}`,
  isActive: index < clampedActive.value,
})))
</script>

<template>
  <div class="flex flex-col gap-1">
    <div
      v-if="label"
      class="flex justify-between font-mono text-[10px] uppercase tracking-widest text-primary/60"
    >
      <span>{{ label }}</span>
      <span>{{ clampedActive }}/{{ segments }}</span>
    </div>
    <div class="flex gap-0.5">
      <div
        v-for="cell in cells"
        :key="cell.index"
        class="flex flex-1 flex-col items-center gap-0.5"
      >
        <span
          class="hud-motion-target hud-anim-segment-fill h-3 w-full border"
          :class="cell.isActive ? 'border-primary bg-primary' : 'border-outline_variant/30 bg-transparent'"
        />
        <span class="font-mono text-[8px] uppercase tracking-widest text-primary/30">{{ cell.tick }}</span>
      </div>
    </div>
  </div>
</template>
