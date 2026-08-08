<script setup lang="ts">
interface Props {
  active?: number
  total?: number
  orientation?: 'vertical' | 'horizontal'
}

const props = withDefaults(defineProps<Props>(), {
  active: 0,
  total: 5,
  orientation: 'vertical',
})

const clampedActive = computed(() => Math.min(Math.max(props.active, 0), props.total))

const rungs = computed(() => Array.from({ length: props.total }, (_, index) => ({
  tick: `T${index + 1}`,
  isActive: index < clampedActive.value,
})))

const isVertical = computed(() => props.orientation === 'vertical')
</script>

<template>
  <div
    class="flex gap-2"
    :class="isVertical ? 'flex-col items-start border-l border-outline_variant/20 pl-2' : 'flex-row items-start border-b border-outline_variant/20 pb-2'"
  >
    <div
      v-for="rung in rungs"
      :key="rung.tick"
      class="flex gap-1.5"
      :class="isVertical ? 'flex-row items-center' : 'flex-col items-center'"
    >
      <span
        class="hud-motion-target hud-anim-tick-active"
        :class="[
          isVertical ? 'h-px w-3' : 'h-3 w-px',
          rung.isActive ? 'bg-primary' : 'bg-outline_variant/30',
        ]"
      />
      <span
        class="font-mono text-[9px] uppercase tracking-widest"
        :class="rung.isActive ? 'text-primary' : 'text-primary/30'"
      >{{ rung.tick }}</span>
    </div>
  </div>
</template>
