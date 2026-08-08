<script setup lang="ts">
interface LinkItem {
  label: string
  to: string
}

interface Props {
  links: LinkItem[]
}

defineProps<Props>()

const { isDark, toggleMode } = useThemeMode()
const { t } = useI18n()
const localePath = useLocalePath()
const { telemetry } = useSystemData()
</script>

<template>
  <footer class="flex w-full flex-col gap-8 border-t border-primary_fixed_dim/10 bg-background px-8 py-8 text-primary_fixed_dim md:flex-row md:justify-between">
    <div>
      <div class="mb-4 font-sans text-lg font-black tracking-widest text-primary_fixed_dim">
        CDA_LAB
      </div>
      <p class="font-sans text-[10px] tracking-widest opacity-60">
        {{ t('ui.copyright') }}
      </p>
    </div>
    <div class="flex flex-col gap-4">
      <div class="grid grid-cols-2 gap-x-8 gap-y-2 font-sans text-[10px] uppercase tracking-widest">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="localePath(link.to)"
          class="text-primary/40 transition-colors hover:text-primary_fixed_dim"
        >
          {{ link.label }}
        </NuxtLink>
      </div>
      <div class="flex items-center gap-4 font-mono text-xs opacity-30">
        <span>{{ telemetry.latText }}</span>
        <span>{{ telemetry.lonText }}</span>
      </div>
      <button
        type="button"
        class="inline-flex w-fit items-center gap-2 border border-primary/30 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary/10"
        @click="toggleMode"
      >
        <UiMaterialIcon
          name="wb_sunny"
          filled
          size-class="text-sm"
        />
        <span>{{ isDark ? t('common.themeLight') : t('common.themeDark') }}</span>
      </button>
    </div>
  </footer>
</template>
