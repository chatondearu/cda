import { defineSetupVue3 } from '@histoire/plugin-vue'
import { isDark } from 'histoire/client'

function applyDesignSystemTheme() {
  const dark = isDark()
  document.documentElement.classList.toggle('dark', dark)
  document.documentElement.classList.toggle('light', !dark)
}

// Mirrors `useHudMotion`'s contract (localStorage key, class names, reduced-motion
// always wins) but stays a plain DOM helper: this setup file runs outside a
// Vue component tree, so it can't rely on Nuxt's `useState`/`onMounted` auto-imports.
type HudMotionPreference = 'on' | 'off'

const HUD_MOTION_STORAGE_KEY = 'cda-hud-motion'
const HUD_MOTION_TOGGLE_ID = 'hud-motion-toggle'

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function')
    return false

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function readHudMotionPreference(): HudMotionPreference {
  return localStorage.getItem(HUD_MOTION_STORAGE_KEY) === 'off' ? 'off' : 'on'
}

/** Applies the `hud-motion` / `hud-motion-off` classes and returns the effective state. */
function applyHudMotionClass(preference: HudMotionPreference): boolean {
  const active = preference === 'on' && !prefersReducedMotion()
  document.documentElement.classList.toggle('hud-motion', active)
  document.documentElement.classList.toggle('hud-motion-off', !active)
  return active
}

function syncHudMotionToggleLabel(button: HTMLButtonElement, preference: HudMotionPreference) {
  const active = applyHudMotionClass(preference)
  button.textContent = active ? 'HUD MOTION' : 'MOTION OFF'
  button.setAttribute('aria-pressed', String(active))
}

/** Persistent floating control, mounted once per sandbox document, working across all stories. */
function mountHudMotionToggle() {
  if (document.getElementById(HUD_MOTION_TOGGLE_ID))
    return

  const button = document.createElement('button')
  button.id = HUD_MOTION_TOGGLE_ID
  button.type = 'button'
  Object.assign(button.style, {
    position: 'fixed',
    right: '12px',
    bottom: '12px',
    zIndex: '2147483647',
    padding: '6px 10px',
    fontFamily: 'monospace',
    fontSize: '10px',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    border: '1px solid rgb(var(--outline-variant) / 0.6)',
    background: 'rgb(var(--surface-container-highest))',
    color: 'rgb(var(--primary))',
    cursor: 'pointer',
  })

  let preference = readHudMotionPreference()
  syncHudMotionToggleLabel(button, preference)

  button.addEventListener('click', () => {
    preference = preference === 'on' ? 'off' : 'on'
    localStorage.setItem(HUD_MOTION_STORAGE_KEY, preference)
    syncHudMotionToggleLabel(button, preference)
  })

  document.body.append(button)
}

let observer: MutationObserver | null = null

export const setupVue3 = defineSetupVue3(() => {
  applyDesignSystemTheme()
  applyHudMotionClass(readHudMotionPreference())
  mountHudMotionToggle()

  if (observer)
    observer.disconnect()

  observer = new MutationObserver(applyDesignSystemTheme)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })
})
