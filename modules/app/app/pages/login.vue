<script setup lang="ts">
const { t } = useI18n({ useScope: 'local' })
const localePath = useLocalePath()
const auth = useAuth()
const session = auth.useSession()

type Mode = 'signin' | 'signup'
const mode = ref<Mode>('signin')
const name = ref('')
const email = ref('')
const password = ref('')
const pending = ref(false)
const errorMessage = ref('')

const currentUser = computed(() => session.value?.data?.user ?? null)
const callbackURL = computed(() => localePath('/'))

function toggleMode() {
  mode.value = mode.value === 'signin' ? 'signup' : 'signin'
  errorMessage.value = ''
}

async function onSocial(provider: 'discord' | 'twitch') {
  errorMessage.value = ''
  await auth.signIn.social({ provider, callbackURL: callbackURL.value })
}

async function onSubmit() {
  errorMessage.value = ''
  pending.value = true

  const handlers = {
    onError: (ctx: { error: { message?: string } }) => {
      errorMessage.value = ctx.error.message ?? t('genericError')
    },
    onSuccess: () => {
      navigateTo(callbackURL.value)
    },
  }

  if (mode.value === 'signin') {
    await auth.signIn.email({ email: email.value, password: password.value }, handlers)
  }
  else {
    const fallbackName = email.value.split('@')[0] ?? email.value
    await auth.signUp.email(
      { email: email.value, password: password.value, name: name.value.trim() || fallbackName },
      handlers,
    )
  }

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

        <!-- Unauthenticated state -->
        <div
          v-else
          class="mt-8"
        >
          <p class="mb-6 text-sm text-primary/70 font-light leading-relaxed">
            {{ t('subtitle') }}
          </p>

          <!-- OAuth providers -->
          <div class="grid gap-3 sm:grid-cols-2">
            <UiButton
              variant="secondary"
              class="w-full justify-center"
              @click="onSocial('discord')"
            >
              {{ t('oauthDiscord') }}
            </UiButton>
            <UiButton
              variant="secondary"
              class="w-full justify-center"
              @click="onSocial('twitch')"
            >
              {{ t('oauthTwitch') }}
            </UiButton>
          </div>

          <div class="my-8 flex items-center gap-4">
            <span class="h-px flex-1 bg-primary_fixed_dim/20" />
            <span class="text-[10px] text-primary/40 tracking-widest font-mono uppercase">
              {{ t('orSeparator') }}
            </span>
            <span class="h-px flex-1 bg-primary_fixed_dim/20" />
          </div>

          <!-- Email / password -->
          <form
            class="flex flex-col gap-6"
            @submit.prevent="onSubmit"
          >
            <UiCommandInput
              v-if="mode === 'signup'"
              v-model="name"
              input-id="auth-name"
              :label="t('nameLabel')"
              autocomplete="name"
            />
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
              :autocomplete="mode === 'signup' ? 'new-password' : 'current-password'"
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
              {{ mode === 'signin' ? t('signInAction') : t('signUpAction') }}
            </UiButton>
          </form>

          <button
            type="button"
            class="mt-6 text-[11px] text-primary/60 tracking-widest font-mono uppercase transition-none hover:text-primary"
            @click="toggleMode"
          >
            {{ mode === 'signin' ? t('toggleToSignUp') : t('toggleToSignIn') }}
          </button>
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
  subtitle: 'Identifiez-vous via un fournisseur externe ou vos identifiants pour accéder aux modules restreints.'
  secureLine: 'SECURE_LINE'
  oauthDiscord: 'CONTINUER AVEC DISCORD'
  oauthTwitch: 'CONTINUER AVEC TWITCH'
  orSeparator: 'OU'
  nameLabel: 'NOM AFFICHÉ'
  emailLabel: 'EMAIL'
  passwordLabel: 'MOT DE PASSE'
  signInAction: 'SE CONNECTER'
  signUpAction: 'CRÉER UN COMPTE'
  toggleToSignUp: "PAS DE COMPTE ? S'INSCRIRE"
  toggleToSignIn: 'DÉJÀ UN COMPTE ? SE CONNECTER'
  signedInAs: 'SESSION ACTIVE'
  signOutAction: 'SE DÉCONNECTER'
  backHome: "RETOUR À L'ACCUEIL"
  genericError: 'Échec de la requête. Réessayez.'
en:
  seoTitle: 'LOGIN // CDA_LAB'
  seoDescription: 'Access to the CDA_LAB authentication terminal.'
  title: 'AUTHENTICATION'
  subtitle: 'Sign in with an external provider or your credentials to access restricted modules.'
  secureLine: 'SECURE_LINE'
  oauthDiscord: 'CONTINUE WITH DISCORD'
  oauthTwitch: 'CONTINUE WITH TWITCH'
  orSeparator: 'OR'
  nameLabel: 'DISPLAY NAME'
  emailLabel: 'EMAIL'
  passwordLabel: 'PASSWORD'
  signInAction: 'SIGN IN'
  signUpAction: 'CREATE ACCOUNT'
  toggleToSignUp: 'NO ACCOUNT? SIGN UP'
  toggleToSignIn: 'ALREADY REGISTERED? SIGN IN'
  signedInAs: 'ACTIVE SESSION'
  signOutAction: 'SIGN OUT'
  backHome: 'BACK TO HOME'
  genericError: 'Request failed. Please retry.'
zh:
  seoTitle: '登录 // CDA_LAB'
  seoDescription: '访问 CDA_LAB 身份验证终端。'
  title: '身份验证'
  subtitle: '使用外部提供商或您的凭据登录以访问受限模块。'
  secureLine: 'SECURE_LINE'
  oauthDiscord: '使用 DISCORD 继续'
  oauthTwitch: '使用 TWITCH 继续'
  orSeparator: '或'
  nameLabel: '显示名称'
  emailLabel: '电子邮件'
  passwordLabel: '密码'
  signInAction: '登录'
  signUpAction: '创建账户'
  toggleToSignUp: '没有账户？注册'
  toggleToSignIn: '已有账户？登录'
  signedInAs: '活动会话'
  signOutAction: '退出登录'
  backHome: '返回首页'
  genericError: '请求失败，请重试。'
ja:
  seoTitle: 'ログイン // CDA_LAB'
  seoDescription: 'CDA_LAB 認証ターミナルへのアクセス。'
  title: '認証'
  subtitle: '外部プロバイダーまたは認証情報でサインインして、制限付きモジュールにアクセスします。'
  secureLine: 'SECURE_LINE'
  oauthDiscord: 'DISCORD で続行'
  oauthTwitch: 'TWITCH で続行'
  orSeparator: 'または'
  nameLabel: '表示名'
  emailLabel: 'メール'
  passwordLabel: 'パスワード'
  signInAction: 'サインイン'
  signUpAction: 'アカウント作成'
  toggleToSignUp: 'アカウントがない？登録'
  toggleToSignIn: 'すでに登録済み？サインイン'
  signedInAs: 'アクティブセッション'
  signOutAction: 'サインアウト'
  backHome: 'ホームに戻る'
  genericError: 'リクエストに失敗しました。再試行してください。'
</i18n>
