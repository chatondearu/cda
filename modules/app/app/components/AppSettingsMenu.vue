<script setup lang="ts">
const { t, locale, locales, setLocale } = useI18n()
const { isDark, toggleMode } = useThemeMode()
const isMenuOpen = ref(false)

type AppLocale = 'fr' | 'en' | 'zh' | 'ja'

const localeOptions = computed(() =>
  locales.value.map((entry: string | { code: string, name?: string }) => {
    if (typeof entry === 'string') {
      return { code: entry as AppLocale, label: entry.toUpperCase() }
    }

    return {
      code: entry.code as AppLocale,
      label: entry.name || entry.code.toUpperCase(),
    }
  }),
)

async function changeLocale(nextLocale: AppLocale) {
  if (nextLocale === locale.value)
    return
  await setLocale(nextLocale)
  isMenuOpen.value = false
}

function onThemeToggle(close: () => void) {
  toggleMode()
  close()
}
</script>

<template>
  <UiFloatingDropdown v-model:open="isMenuOpen">
    <template #trigger="{ open, toggle }">
      <UiButton
        variant="tertiary"
        class="!p-1 !text-primary_fixed_dim transition-none hover:!bg-primary_fixed_dim hover:!text-background"
        :aria-expanded="open"
        aria-haspopup="menu"
        :aria-label="t('common.settings')"
        @click="toggle"
      >
        <UiMaterialIcon
          name="settings_input_component"
          size-class="text-2xl text-current"
        />
      </UiButton>
    </template>
    <template #default="{ close }">
      <div
        class="w-56 max-w-[calc(100vw-1rem)] border border-primary_fixed_dim/30 bg-surface_container p-3 sm:w-64"
        role="menu"
      >
        <p class="mb-2 text-[10px] text-primary/70 font-mono uppercase tracking-widest">
          {{ t('common.language') }}
        </p>
        <div class="mb-3 grid grid-cols-2 gap-2">
          <UiButton
            v-for="option in localeOptions"
            :key="option.code"
            :variant="option.code === locale ? 'primary' : 'secondary'"
            class="w-full justify-center !px-2 !py-1 !text-[10px] !font-mono uppercase tracking-widest"
            @click="changeLocale(option.code)"
          >
            {{ option.label }}
          </UiButton>
        </div>
        <UiButton
          variant="secondary"
          class="w-full justify-center !px-2 !py-1 !text-[10px] uppercase tracking-widest"
          @click="onThemeToggle(close)"
        >
          <span class="inline-flex items-center gap-2">
            <UiMaterialIcon
              name="wb_sunny"
              filled
              size-class="text-sm"
            />
            <span>{{ isDark ? t('common.themeLight') : t('common.themeDark') }}</span>
          </span>
        </UiButton>
      </div>
    </template>
  </UiFloatingDropdown>
</template>
