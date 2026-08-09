<script setup lang="ts">
type SlotKey = 'tl' | 'tr' | 'center' | 'bl' | 'br'

interface Props {
  label?: string
  /** Override the default minimum height utility class. */
  minHeightClass?: string
  /**
   * `auto` (default) stacks slots <md and switches to absolute corners md+.
   * `overlay` always forces absolute corner layout.
   * `stack` always forces the vertical stacked layout.
   */
  layout?: 'auto' | 'overlay' | 'stack'
}

const props = withDefaults(defineProps<Props>(), {
  minHeightClass: 'min-h-[min(100dvh,720px)]',
  layout: 'auto',
})

const shrinkBase = 'max-w-full min-w-0 shrink'

// Full literal class strings (no runtime concatenation) so UnoCSS's
// static extractor can pick up every variant, including the `md:` ones.
const overlaySlotClass: Record<SlotKey, string> = {
  tl: `${shrinkBase} absolute left-4 top-4`,
  tr: `${shrinkBase} absolute right-4 top-4`,
  center: `${shrinkBase} absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`,
  bl: `${shrinkBase} absolute bottom-4 left-4`,
  br: `${shrinkBase} absolute bottom-4 right-4`,
}

const autoSlotClass: Record<SlotKey, string> = {
  tl: `${shrinkBase} md:absolute md:left-4 md:top-4`,
  tr: `${shrinkBase} md:absolute md:right-4 md:top-4`,
  center: `${shrinkBase} md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2`,
  bl: `${shrinkBase} md:absolute md:bottom-4 md:left-4`,
  br: `${shrinkBase} md:absolute md:bottom-4 md:right-4`,
}

const wrapperClass = computed(() => {
  if (props.layout === 'overlay')
    return 'contents'
  if (props.layout === 'stack')
    return 'flex flex-col gap-4 p-4'
  return 'flex flex-col gap-4 p-4 md:contents'
})

function slotClass(key: SlotKey): string {
  if (props.layout === 'overlay')
    return overlaySlotClass[key]
  if (props.layout === 'stack')
    return shrinkBase
  return autoSlotClass[key]
}
</script>

<template>
  <div
    class="relative w-full"
    :class="minHeightClass"
  >
    <slot />

    <span
      v-if="label"
      class="pointer-events-none absolute left-1/2 top-2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-primary/30"
    >{{ label }}</span>

    <div :class="wrapperClass">
      <div
        v-if="$slots.tl"
        :class="slotClass('tl')"
      >
        <slot name="tl" />
      </div>

      <div
        v-if="$slots.tr"
        :class="slotClass('tr')"
      >
        <slot name="tr" />
      </div>

      <div
        v-if="$slots.center"
        :class="slotClass('center')"
      >
        <slot name="center" />
      </div>

      <div
        v-if="$slots.bl"
        :class="slotClass('bl')"
      >
        <slot name="bl" />
      </div>

      <div
        v-if="$slots.br"
        :class="slotClass('br')"
      >
        <slot name="br" />
      </div>
    </div>
  </div>
</template>
