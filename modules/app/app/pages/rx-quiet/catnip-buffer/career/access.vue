<script setup lang="ts">
definePageMeta({
  middleware: ['career-access'],
})

const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const tokenInput = ref(typeof route.query.cv_token === 'string' ? route.query.cv_token : '')
const errorMessage = ref('')
const submitting = ref(false)

useSeoMeta({
  title: () => t('career.access.seoTitle'),
  description: () => t('career.access.seoDescription'),
  robots: 'noindex, nofollow',
})

useHead({
  meta: [
    { name: 'robots', content: 'noindex, nofollow' },
  ],
})

async function submitToken(): Promise<void> {
  errorMessage.value = ''
  const token = tokenInput.value.trim()
  if (!token) {
    errorMessage.value = t('career.access.tokenRequired')
    return
  }

  submitting.value = true
  try {
    await redeemCareerAccessToken(token)
    const redirect = typeof route.query.redirect === 'string'
      ? route.query.redirect
      : localePath('/rx-quiet/catnip-buffer/career')
    await navigateTo(redirect, { replace: true })
  }
  catch {
    errorMessage.value = t('career.access.tokenInvalid')
  }
  finally {
    submitting.value = false
  }
}
</script>

<template>
  <div>
    <UiHeroCommand icon="hub">
      <template #title>
        {{ t('career.access.titleLine1') }}<br>
        <span class="bg-primary px-2 text-background">[ CV_GATE ]</span><br>
        {{ t('career.access.titleLine3') }}
      </template>

      <template #description>
        {{ t('career.access.description') }}
      </template>

      <template #actions>
        <UiButton :href="localePath('/')">
          {{ t('career.access.backHome') }}
        </UiButton>
      </template>
    </UiHeroCommand>

    <section class="border-b border-primary_fixed_dim/10 bg-surface_container_lowest p-8 md:p-16">
      <UiSectionHeader
        code="MODULE_00A"
        :title="t('career.access.tokenSection')"
      >
        <template #right>
          <span class="text-[10px] text-primary/40 font-mono">{{ t('career.access.tokenHint') }}</span>
        </template>
      </UiSectionHeader>

      <p class="mt-4 max-w-2xl text-sm text-primary/70 font-mono">
        {{ t('career.access.communityNotEnough') }}
      </p>

      <form
        class="mt-8 max-w-xl flex flex-col gap-6"
        @submit.prevent="submitToken"
      >
        <UiCommandInput
          v-model="tokenInput"
          input-id="career-access-token"
          :label="t('career.access.tokenLabel')"
          type="password"
          autocomplete="one-time-code"
          :placeholder="t('career.access.tokenPlaceholder')"
          required
        />

        <p
          v-if="errorMessage"
          class="border border-error/40 bg-error_container/20 px-4 py-3 text-xs text-error font-mono"
          role="alert"
        >
          {{ errorMessage }}
        </p>

        <div class="flex flex-wrap gap-3">
          <UiButton
            type="submit"
            :disabled="submitting"
            :aria-busy="submitting"
          >
            {{ submitting ? t('career.access.tokenSubmitting') : t('career.access.tokenSubmit') }}
          </UiButton>
        </div>
      </form>
    </section>
  </div>
</template>
