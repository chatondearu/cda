import { addImports, createResolver, defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'histoire-stubs',
  },
  setup() {
    const { resolve } = createResolver(import.meta.url)
    addImports({
      name: 'useLocalePath',
      from: resolve('./runtime/useLocalePath.ts'),
    })
  },
})
