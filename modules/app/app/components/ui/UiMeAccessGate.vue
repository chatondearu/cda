<script setup lang="ts">
const config = useRuntimeConfig()
const { locale, t } = useI18n({ useScope: 'local' })
const siteUrl = String(config.public.siteUrl ?? 'https://chatondearu.fr').replace(/\/+$/, '')
const contactUrl = `${siteUrl}/contact`
const localePath = useLocalePath()

const mailtoHref = computed(() => {
  void locale.value
  const subject = t('mailtoSubject')
  const body = t('mailtoBody')
  return `mailto:contact@chatondearu.fr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
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
      {{ t('description') }}
    </template>

    <template #actions>
      <UiButton :href="mailtoHref">
        {{ t('requestAccess') }}
      </UiButton>
      <UiButton
        variant="secondary"
        :href="localePath('/contact') || contactUrl"
      >
        {{ t('openContact') }}
      </UiButton>
    </template>
  </UiHeroCommand>
</template>

<i18n lang="yaml">
fr:
  description: Page de passerelle pour demander un accès au CV professionnel.
  requestAccess: REQUEST_CV_ACCESS
  openContact: OPEN_CONTACT_CHANNEL
  mailtoSubject: Demande d'acces au CV
  mailtoBody: |
    Bonjour,

    Je souhaite demander l'acces au CV.

    Prenom Nom :
    Societe :
    Contexte de la demande :

    Merci.
en:
  description: Gateway page to request access to the professional resume.
  requestAccess: REQUEST_CV_ACCESS
  openContact: OPEN_CONTACT_CHANNEL
  mailtoSubject: Resume access request
  mailtoBody: |
    Hello,

    I would like to request access to the resume.

    Full name:
    Company:
    Request context:

    Thank you.
zh:
  description: 用于申请访问职业履历的入口页面。
  requestAccess: 申请访问简历
  openContact: 打开联系渠道
  mailtoSubject: 申请访问简历
  mailtoBody: |
    你好，

    我希望申请访问简历。

    姓名：
    公司：
    申请背景：

    谢谢。
ja:
  description: 職務経歴書へのアクセスを申請するためのゲートウェイページ。
  requestAccess: CVアクセスを申請
  openContact: 連絡チャネルを開く
  mailtoSubject: 履歴書アクセス申請
  mailtoBody: |
    こんにちは。

    履歴書へのアクセスを申請したいです。

    氏名：
    会社名：
    依頼の背景：

    よろしくお願いします。
</i18n>
