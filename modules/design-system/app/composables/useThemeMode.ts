type ThemeMode = 'dark' | 'light'

const STORAGE_KEY = 'design-system-theme-mode'

function applyThemeClass(mode: ThemeMode) {
  document.documentElement.classList.toggle('dark', mode === 'dark')
  document.documentElement.classList.toggle('light', mode === 'light')
}

export function useThemeMode() {
  const mode = useState<ThemeMode>('design-system-theme-mode', () => 'dark')
  const isDark = computed(() => mode.value === 'dark')

  function setMode(value: ThemeMode) {
    mode.value = value

    if (import.meta.client) {
      applyThemeClass(value)
      localStorage.setItem(STORAGE_KEY, value)
    }
  }

  function toggleMode() {
    setMode(isDark.value ? 'light' : 'dark')
  }

  if (import.meta.client) {
    onMounted(() => {
      const storedMode = localStorage.getItem(STORAGE_KEY)
      const nextMode = storedMode === 'light' || storedMode === 'dark'
        ? storedMode
        : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')

      mode.value = nextMode
      applyThemeClass(nextMode)
    })
  }

  return {
    mode: readonly(mode),
    isDark,
    setMode,
    toggleMode,
  }
}
