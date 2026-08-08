<template>
  <section class="relative flex min-h-[530px] flex-col justify-center overflow-hidden border-b border-primary_fixed_dim/10 p-8 md:p-16">
    <span
      class="material-symbols-outlined pointer-events-none absolute bottom-0 right-0 hidden text-primary opacity-10 lg:block text-[400px]"
      style="font-variation-settings: 'FILL' 0, 'wght' 100, 'GRAD' 0, 'opsz' 24"
    >{{ icon }}</span>
    <div class="absolute left-4 top-4 font-mono text-[10px] text-primary_fixed_dim/20">
      {{ bootLabel }}
    </div>
    <div class="max-w-4xl">
      <div class="mb-6 flex items-center gap-2 text-primary_container">
        <span class="font-mono text-xs">&gt;&gt;</span>
        <span class="text-xs font-bold uppercase tracking-[0.3em]">
          <slot name="status">
            {{ t('ui.initializingDeepSystems') }}
          </slot>
        </span>
      </div>
      <UiTerminalTyping
        as="h2"
        class="mb-8 text-4xl font-black uppercase leading-tight tracking-tighter text-primary md:text-7xl"
      >
        <slot name="title" />
      </UiTerminalTyping>
      <p class="max-w-2xl text-lg font-light leading-relaxed text-primary/70 md:text-xl">
        <slot name="description" />
      </p>
      <div class="mt-12 flex flex-wrap gap-4">
        <slot name="actions" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  icon?: string
  bootLabel?: string
}

withDefaults(defineProps<Props>(), {
  icon: 'grid_view',
  bootLabel: 'NOST-0034-X // BOOT_SEQUENCE',
})
const { t } = useI18n()
</script>
