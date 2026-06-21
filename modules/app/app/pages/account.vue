<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const { t } = useI18n({ useScope: 'local' })
const auth = useAuth()
const session = auth.useSession()

const currentUser = computed(() => session.value?.data?.user ?? null)

async function onSignOut() {
  await auth.signOut()
  await navigateTo(useLocalePath()('/login'))
}

useSeoMeta({
  title: () => t('seoTitle'),
  robots: 'noindex, nofollow',
})
</script>

<template>
  <div>
    <section class="border-b border-primary_fixed_dim/10 bg-surface_container_lowest p-8 md:p-16">
      <div class="mx-auto max-w-xl">
        <UiSectionHeader
          code="MODULE_ACCOUNT_01"
          :title="t('title')"
        >
          <template #right>
            <span class="text-[10px] text-primary/40 font-mono">SESSION_OK</span>
          </template>
        </UiSectionHeader>

        <div class="mt-8 border border-outline_variant/20 bg-surface p-6">
          <dl class="flex flex-col gap-4">
            <div>
              <dt class="text-[10px] text-primary/60 tracking-widest font-mono uppercase">
                {{ t('nameLabel') }}
              </dt>
              <dd class="mt-1 text-sm text-primary font-mono">
                {{ currentUser?.name }}
              </dd>
            </div>
            <div>
              <dt class="text-[10px] text-primary/60 tracking-widest font-mono uppercase">
                {{ t('emailLabel') }}
              </dt>
              <dd class="mt-1 break-all text-sm text-primary font-mono">
                {{ currentUser?.email }}
              </dd>
            </div>
          </dl>

          <div class="mt-8 flex flex-wrap gap-4">
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
      </div>
    </section>
  </div>
</template>

<i18n lang="yaml">
fr:
  seoTitle: 'COMPTE // CDA_LAB'
  title: 'COMPTE'
  nameLabel: 'NOM AFFICHÉ'
  emailLabel: 'EMAIL'
  signOutAction: 'SE DÉCONNECTER'
  backHome: "RETOUR À L'ACCUEIL"
en:
  seoTitle: 'ACCOUNT // CDA_LAB'
  title: 'ACCOUNT'
  nameLabel: 'DISPLAY NAME'
  emailLabel: 'EMAIL'
  signOutAction: 'SIGN OUT'
  backHome: 'BACK TO HOME'
zh:
  seoTitle: '账户 // CDA_LAB'
  title: '账户'
  nameLabel: '显示名称'
  emailLabel: '电子邮件'
  signOutAction: '退出登录'
  backHome: '返回首页'
ja:
  seoTitle: 'アカウント // CDA_LAB'
  title: 'アカウント'
  nameLabel: '表示名'
  emailLabel: 'メール'
  signOutAction: 'サインアウト'
  backHome: 'ホームに戻る'
</i18n>
