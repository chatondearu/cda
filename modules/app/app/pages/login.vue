<script setup lang="ts">
const { t } = useI18n({ useScope: 'local' })
const localePath = useLocalePath()
const route = useRoute()
const auth = useAuth()
const session = auth.useSession()

/** Only allow internal absolute paths to prevent open redirects. */
function sanitizeRedirect(value: unknown): string | null {
  if (typeof value !== 'string' || !value.startsWith('/') || value.startsWith('//'))
    return null
  return value
}

const email = ref('')
const password = ref('')
const pending = ref(false)
const errorMessage = ref('')
/** Email/password is secondary — collapsed until the operator opts in. */
const showEmailForm = ref(false)

const currentUser = computed(() => session.value?.data?.user ?? null)
const callbackURL = computed(() => sanitizeRedirect(route.query.redirect) ?? localePath('/'))

async function onSocial(provider: 'discord' | 'twitch') {
  errorMessage.value = ''
  await auth.signIn.social({ provider, callbackURL: callbackURL.value })
}

async function onSubmit() {
  errorMessage.value = ''
  pending.value = true

  await auth.signIn.email(
    { email: email.value, password: password.value },
    {
      onError: (ctx: { error: { message?: string } }) => {
        errorMessage.value = ctx.error.message ?? t('genericError')
      },
      onSuccess: () => {
        navigateTo(callbackURL.value)
      },
    },
  )

  pending.value = false
}

async function onSignOut() {
  await auth.signOut()
}

useSeoMeta({
  title: () => t('seoTitle'),
  description: () => t('seoDescription'),
  robots: 'noindex, nofollow',
})
</script>

<template>
  <div>
    <section class="border-b border-primary_fixed_dim/10 bg-surface_container_lowest p-8 md:p-16">
      <div class="mx-auto max-w-xl">
        <UiSectionHeader
          code="MODULE_AUTH_01"
          :title="t('title')"
        >
          <template #right>
            <span class="text-[10px] text-primary/40 font-mono">{{ t('secureLine') }}</span>
          </template>
        </UiSectionHeader>

        <!-- Authenticated state -->
        <div
          v-if="currentUser"
          class="mt-8 border border-outline_variant/20 bg-surface p-6"
        >
          <p class="text-[10px] text-primary/60 tracking-widest font-mono uppercase">
            {{ t('signedInAs') }}
          </p>
          <p class="mt-2 break-all text-sm text-primary font-mono">
            {{ currentUser.email }}
          </p>
          <div class="mt-6 flex flex-wrap gap-4">
            <UiButton
              variant="secondary"
              to="/"
            >
              {{ t('backHome') }}
            </UiButton>
            <UiButton @click="onSignOut">
              {{ t('signOutAction') }}
            </UiButton>
          </div>
        </div>

        <!-- Unauthenticated state — Twitch-first community gateway -->
        <div
          v-else
          class="mt-8"
        >
          <p class="mb-6 text-sm text-primary/70 font-light leading-relaxed">
            {{ t('subtitle') }}
          </p>

          <!-- Primary identity: Twitch -->
          <UiButton
            class="w-full justify-center"
            @click="onSocial('twitch')"
          >
            {{ t('oauthTwitch') }}
          </UiButton>

          <p class="mt-3 text-[10px] text-primary/40 tracking-widest font-mono uppercase">
            {{ t('twitchPrimaryHint') }}
          </p>

          <!-- Optional Discord -->
          <div class="mt-6">
            <UiButton
              variant="secondary"
              class="w-full justify-center"
              @click="onSocial('discord')"
            >
              {{ t('oauthDiscord') }}
            </UiButton>
          </div>

          <div class="my-8 flex items-center gap-4">
            <span class="h-px flex-1 bg-primary_fixed_dim/20" />
            <span class="text-[10px] text-primary/40 tracking-widest font-mono uppercase">
              {{ t('orSeparator') }}
            </span>
            <span class="h-px flex-1 bg-primary_fixed_dim/20" />
          </div>

          <!-- Gated email/password (sign-in only; signup disabled server-side) -->
          <button
            type="button"
            class="text-[11px] text-primary/60 tracking-widest font-mono uppercase transition-none hover:text-primary"
            :aria-expanded="showEmailForm"
            @click="showEmailForm = !showEmailForm"
          >
            {{ showEmailForm ? t('hideEmailForm') : t('showEmailForm') }}
          </button>

          <form
            v-if="showEmailForm"
            class="mt-6 flex flex-col gap-6"
            @submit.prevent="onSubmit"
          >
            <p class="text-xs text-primary/50 font-light leading-relaxed">
              {{ t('emailGateHint') }}
            </p>
            <UiCommandInput
              v-model="email"
              input-id="auth-email"
              :label="t('emailLabel')"
              type="email"
              autocomplete="email"
              required
            />
            <UiCommandInput
              v-model="password"
              input-id="auth-password"
              :label="t('passwordLabel')"
              type="password"
              autocomplete="current-password"
              required
            />

            <p
              v-if="errorMessage"
              class="border border-error/40 bg-error_container/20 px-4 py-3 text-xs text-error font-mono"
              role="alert"
            >
              {{ errorMessage }}
            </p>

            <UiButton
              class="w-full justify-center"
              type="submit"
              :aria-busy="pending"
            >
              {{ t('signInAction') }}
            </UiButton>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<i18n lang="yaml">
fr:
  seoTitle: 'CONNEXION // CDA_LAB'
  seoDescription: "Accès au terminal d'authentification CDA_LAB."
  title: 'AUTHENTIFICATION'
  subtitle: 'Porte d’entrée communauté : connectez-vous avec Twitch pour accéder aux modules restreints.'
  secureLine: 'SECURE_LINE'
  oauthTwitch: 'CONTINUER AVEC TWITCH'
  oauthDiscord: 'CONTINUER AVEC DISCORD (OPTIONNEL)'
  twitchPrimaryHint: 'IDENTITÉ PRIMAIRE — COMMUNAUTÉ STREAM'
  orSeparator: 'OU'
  showEmailForm: 'UTILISER UN EMAIL / MOT DE PASSE'
  hideEmailForm: 'MASQUER EMAIL / MOT DE PASSE'
  emailGateHint: 'Réservé aux comptes existants. Les nouvelles inscriptions passent par Twitch.'
  emailLabel: 'EMAIL'
  passwordLabel: 'MOT DE PASSE'
  signInAction: 'SE CONNECTER'
  signedInAs: 'SESSION ACTIVE'
  signOutAction: 'SE DÉCONNECTER'
  backHome: "RETOUR À L'ACCUEIL"
  genericError: 'Échec de la requête. Réessayez.'
en:
  seoTitle: 'LOGIN // CDA_LAB'
  seoDescription: 'Access to the CDA_LAB authentication terminal.'
  title: 'AUTHENTICATION'
  subtitle: 'Community gateway: sign in with Twitch to access restricted modules.'
  secureLine: 'SECURE_LINE'
  oauthTwitch: 'CONTINUE WITH TWITCH'
  oauthDiscord: 'CONTINUE WITH DISCORD (OPTIONAL)'
  twitchPrimaryHint: 'PRIMARY IDENTITY — STREAM COMMUNITY'
  orSeparator: 'OR'
  showEmailForm: 'USE EMAIL / PASSWORD'
  hideEmailForm: 'HIDE EMAIL / PASSWORD'
  emailGateHint: 'For existing accounts only. New sign-ups go through Twitch.'
  emailLabel: 'EMAIL'
  passwordLabel: 'PASSWORD'
  signInAction: 'SIGN IN'
  signedInAs: 'ACTIVE SESSION'
  signOutAction: 'SIGN OUT'
  backHome: 'BACK TO HOME'
  genericError: 'Request failed. Please retry.'
zh:
  seoTitle: '登录 // CDA_LAB'
  seoDescription: '访问 CDA_LAB 身份验证终端。'
  title: '身份验证'
  subtitle: '社区入口：使用 Twitch 登录以访问受限模块。'
  secureLine: 'SECURE_LINE'
  oauthTwitch: '使用 TWITCH 继续'
  oauthDiscord: '使用 DISCORD 继续（可选）'
  twitchPrimaryHint: '主要身份 — 直播社区'
  orSeparator: '或'
  showEmailForm: '使用电子邮件 / 密码'
  hideEmailForm: '隐藏电子邮件 / 密码'
  emailGateHint: '仅限现有账户。新注册请通过 Twitch。'
  emailLabel: '电子邮件'
  passwordLabel: '密码'
  signInAction: '登录'
  signedInAs: '活动会话'
  signOutAction: '退出登录'
  backHome: '返回首页'
  genericError: '请求失败，请重试。'
ja:
  seoTitle: 'ログイン // CDA_LAB'
  seoDescription: 'CDA_LAB 認証ターミナルへのアクセス。'
  title: '認証'
  subtitle: 'コミュニティゲートウェイ：Twitch でサインインして制限付きモジュールにアクセスします。'
  secureLine: 'SECURE_LINE'
  oauthTwitch: 'TWITCH で続行'
  oauthDiscord: 'DISCORD で続行（任意）'
  twitchPrimaryHint: 'プライマリ ID — ストリームコミュニティ'
  orSeparator: 'または'
  showEmailForm: 'メール / パスワードを使う'
  hideEmailForm: 'メール / パスワードを隠す'
  emailGateHint: '既存アカウント専用です。新規登録は Twitch 経由です。'
  emailLabel: 'メール'
  passwordLabel: 'パスワード'
  signInAction: 'サインイン'
  signedInAs: 'アクティブセッション'
  signOutAction: 'サインアウト'
  backHome: 'ホームに戻る'
  genericError: 'リクエストに失敗しました。再試行してください。'
</i18n>
