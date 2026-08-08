/**
 * Global HUD animation switch.
 *
 * Source of truth: `hud-motion` (on) / `hud-motion-off` (off) class on
 * `document.documentElement`, mirroring `useThemeMode`'s persistence pattern.
 *
 * Decision: `prefers-reduced-motion: reduce` always wins. Even if the user
 * explicitly stored `'on'` in a previous session, the OS-level reduced-motion
 * preference forces HUD animations off — `enabled` reflects the resulting
 * *effective* state, not the raw stored preference.
 */

type HudMotionPreference = 'on' | 'off'

const STORAGE_KEY = 'cda-hud-motion'

function prefersReducedMotion(): boolean {
  // Story collection runs client code against a partial DOM shim (no `matchMedia`);
  // treat that as "no reduced-motion preference" rather than throwing.
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function')
    return false

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function applyMotionClass(active: boolean) {
  document.documentElement.classList.toggle('hud-motion', active)
  document.documentElement.classList.toggle('hud-motion-off', !active)
}

function readStoredPreference(): HudMotionPreference {
  return localStorage.getItem(STORAGE_KEY) === 'off' ? 'off' : 'on'
}

export function useHudMotion() {
  const enabled = useState<boolean>('hud-motion-enabled', () => true)

  function sync(preference: HudMotionPreference) {
    const active = preference === 'on' && !prefersReducedMotion()
    enabled.value = active

    if (import.meta.client)
      applyMotionClass(active)
  }

  function setEnabled(value: boolean) {
    if (import.meta.client)
      localStorage.setItem(STORAGE_KEY, value ? 'on' : 'off')

    sync(value ? 'on' : 'off')
  }

  function toggle() {
    setEnabled(!enabled.value)
  }

  if (import.meta.client) {
    onMounted(() => {
      sync(readStoredPreference())
    })
  }

  return {
    enabled: readonly(enabled),
    setEnabled,
    toggle,
  }
}
