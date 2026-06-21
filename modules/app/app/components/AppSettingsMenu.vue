<script setup lang="ts">
const { t, locale, locales, setLocale } = useI18n()
const { isDark, toggleMode } = useThemeMode()
const localePath = useLocalePath()
const auth = useAuth()
const session = auth.useSession()
const isMenuOpen = ref(false)

const currentUser = computed(() => session.value?.data?.user ?? null)

async function onSignOut(close: () => void) {
  await auth.signOut()
  close()
}

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
        class="transition-none !p-1 !text-primary_fixed_dim hover:!bg-primary_fixed_dim hover:!text-background"
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
        class="max-w-[calc(100vw-1rem)] w-56 border border-primary_fixed_dim/30 bg-surface_container p-3 sm:w-64"
        role="menu"
      >
        <p class="mb-2 text-[10px] text-primary/70 tracking-widest font-mono uppercase">
          {{ t('common.language') }}
        </p>
        <div class="grid grid-cols-2 mb-3 gap-2">
          <UiButton
            v-for="option in localeOptions"
            :key="option.code"
            :variant="option.code === locale ? 'primary' : 'secondary'"
            class="w-full justify-center tracking-widest uppercase !px-2 !py-1 !text-[10px] !font-mono"
            @click="changeLocale(option.code)"
          >
            {{ option.label }}
          </UiButton>
        </div>
        <UiButton
          variant="secondary"
          class="w-full justify-center tracking-widest uppercase !px-2 !py-1 !text-[10px]"
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

        <div class="mt-3 border-t border-primary_fixed_dim/20 pt-3">
          <p class="mb-2 text-[10px] text-primary/70 tracking-widest font-mono uppercase">
            {{ t('auth.session') }}
          </p>
          <p
            v-if="currentUser"
            class="mb-2 break-all text-[10px] text-primary/60 font-mono"
          >
            {{ currentUser.email }}
          </p>
          <UiButton
            v-if="currentUser"
            variant="secondary"
            class="w-full justify-center tracking-widest uppercase !px-2 !py-1 !text-[10px]"
            @click="onSignOut(close)"
          >
            {{ t('auth.logout') }}
          </UiButton>
          <UiButton
            v-else
            variant="secondary"
            class="w-full justify-center tracking-widest uppercase !px-2 !py-1 !text-[10px]"
            :to="localePath('/login')"
            @click="close"
          >
            {{ t('auth.login') }}
          </UiButton>
        </div>
      </div>
    </template>
  </UiFloatingDropdown>
</template>
