<script setup lang="ts">
const config = useRuntimeConfig()
const { locale, t } = useI18n()
const siteUrl = String(config.public.siteUrl ?? 'https://chatondearu.fr').replace(/\/+$/, '')
const contactUrl = `${siteUrl}/contact`
const localePath = useLocalePath()

const mailtoHref = computed(() => {
  const templates: Record<string, { subject: string, body: string }> = {
    fr: {
      subject: 'Demande d\'acces au CV',
      body: 'Bonjour,\n\nJe souhaite demander l\'acces au CV.\n\nPrenom Nom :\nSociete :\nContexte de la demande :\n\nMerci.',
    },
    en: {
      subject: 'Resume access request',
      body: 'Hello,\n\nI would like to request access to the resume.\n\nFull name:\nCompany:\nRequest context:\n\nThank you.',
    },
    zh: {
      subject: '申请访问简历',
      body: '你好，\n\n我希望申请访问简历。\n\n姓名：\n公司：\n申请背景：\n\n谢谢。',
    },
    ja: {
      subject: '履歴書アクセス申請',
      body: 'こんにちは。\n\n履歴書へのアクセスを申請したいです。\n\n氏名：\n会社名：\n依頼の背景：\n\nよろしくお願いします。',
    },
  }
  const selected = templates[locale.value] ?? templates.en ?? { subject: '', body: '' }
  return `mailto:contact@chatondearu.fr?subject=${encodeURIComponent(selected.subject)}&body=${encodeURIComponent(selected.body)}`
})
</script>

<template>
  <UiHeroCommand icon="hub">
    <template #title>
      IDENTITY_GATE:<br>
      <span class="bg-primary px-2 text-background">[ RLienard ]</span><br>
      ACCESS_REQUEST
    </template>

    <template #description>
      {{ t('home.meSeoDescription') }}
    </template>

    <template #actions>
      <UiButton :href="mailtoHref">
        {{ t('career.requestAccess') }}
      </UiButton>
      <UiButton
        variant="secondary"
        :href="localePath('/contact') || contactUrl"
      >
        {{ t('career.openContact') }}
      </UiButton>
    </template>
  </UiHeroCommand>
</template>
