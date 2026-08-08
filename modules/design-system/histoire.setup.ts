import { defineSetupVue3 } from '@histoire/plugin-vue'
import { isDark } from 'histoire/client'

function applyDesignSystemTheme() {
  const dark = isDark()
  document.documentElement.classList.toggle('dark', dark)
  document.documentElement.classList.toggle('light', !dark)
}

let observer: MutationObserver | null = null

export const setupVue3 = defineSetupVue3(() => {
  applyDesignSystemTheme()

  if (observer)
    observer.disconnect()

  observer = new MutationObserver(applyDesignSystemTheme)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })
})
