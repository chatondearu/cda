<script setup lang="ts">
import { autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/vue'

const props = withDefaults(defineProps<{
  placement?: 'bottom-end' | 'bottom-start' | 'top-end' | 'top-start'
  /** Extra padding for shift middleware (viewport edges) */
  shiftPadding?: number
}>(), {
  placement: 'bottom-end',
  shiftPadding: 8,
})

const isOpen = defineModel<boolean>('open', { default: false })

const referenceEl = ref<HTMLElement | null>(null)
const floatingEl = ref<HTMLElement | null>(null)

const { floatingStyles } = useFloating(referenceEl, floatingEl, {
  placement: props.placement,
  whileElementsMounted: autoUpdate,
  middleware: [offset(10), flip(), shift({ padding: props.shiftPadding })],
})

function toggle() {
  isOpen.value = !isOpen.value
}

function close() {
  isOpen.value = false
}

function onPointerDownCapture(event: PointerEvent) {
  if (!isOpen.value)
    return
  const target = event.target as Node | null
  if (referenceEl.value?.contains(target) || floatingEl.value?.contains(target))
    return
  close()
}

function onEscape(event: KeyboardEvent) {
  if (event.key === 'Escape')
    close()
}

onMounted(() => {
  document.addEventListener('pointerdown', onPointerDownCapture, true)
  document.addEventListener('keydown', onEscape)
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onPointerDownCapture, true)
  document.removeEventListener('keydown', onEscape)
})
</script>

<template>
  <span
    ref="referenceEl"
    class="inline-flex"
  >
    <slot
      name="trigger"
      :open="isOpen"
      :toggle="toggle"
      :close="close"
    />
  </span>
  <Teleport to="body">
    <div
      v-if="isOpen"
      ref="floatingEl"
      :style="floatingStyles"
      class="z-[70]"
    >
      <slot
        :open="isOpen"
        :close="close"
      />
    </div>
  </Teleport>
</template>
