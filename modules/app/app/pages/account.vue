<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const { t, locale } = useI18n({ useScope: 'local' })
const localePath = useLocalePath()
const auth = useAuth()
const session = auth.useSession()
const { data: hub, pending, error } = useCommunityAccount()

const currentUser = computed(() => hub.value?.user ?? session.value?.data?.user ?? null)
const providers = computed(() => hub.value?.providers ?? {
  twitch: false,
  discord: false,
  credential: false,
})
const profile = computed(() => hub.value?.profile ?? null)
const clan = computed(() => hub.value?.clan ?? null)

const displayName = computed(() =>
  profile.value?.displayName
  || profile.value?.username
  || currentUser.value?.name
  || '—',
)

const clanLabel = computed(() => {
  if (!clan.value)
    return null
  if (locale.value === 'fr' && clan.value.displayNameFr)
    return clan.value.displayNameFr
  return clan.value.displayName || clan.value.name || clan.value.id
})

const identityRows = computed(() => [
  { key: t('identity.displayName'), value: displayName.value },
  { key: t('identity.email'), value: currentUser.value?.email || '—' },
  { key: t('identity.username'), value: profile.value?.username || '—' },
  {
    key: t('identity.twitch'),
    value: providers.value.twitch ? t('link.linked') : t('link.unlinked'),
  },
  {
    key: t('identity.discord'),
    value: providers.value.discord
      ? (profile.value?.discordUsername || profile.value?.discordTag || t('link.linked'))
      : t('link.unlinked'),
  },
])

const clanRows = computed(() => {
  if (!clan.value) {
    return [
      { key: t('clan.status'), value: t('clan.none') },
    ]
  }
  return [
    { key: t('clan.name'), value: clanLabel.value || '—' },
    {
      key: t('clan.members'),
      value: clan.value.totalMembers != null ? String(clan.value.totalMembers) : '—',
    },
    {
      key: t('clan.sub'),
      value: profile.value?.isSubscribed ? t('clan.subActive') : t('clan.subInactive'),
    },
  ]
})

const clansDeepLink = computed(() =>
  clan.value?.id ? `/clans/${clan.value.id}` : '/clans',
)

const communityLinks = computed(() => [
  { key: 'clan', to: clansDeepLink.value, label: t('cta.clan') },
  { key: 'lab', to: '/cda-lab', label: t('cta.lab') },
  { key: 'cassette', to: '/cassette', label: t('cta.cassette') },
  { key: 'timeline', to: '/timeline', label: t('cta.timeline') },
])

async function onSignOut() {
  await auth.signOut()
  await navigateTo(localePath('/login'))
}

useSeoMeta({
  title: () => t('seoTitle'),
  robots: 'noindex, nofollow',
})
</script>

<template>
  <div>
    <section class="border-b border-primary_fixed_dim/10 bg-surface_container_lowest p-8 md:p-16">
      <div class="mx-auto max-w-3xl">
        <UiSectionHeader
          code="MODULE_ACCOUNT_01"
          :title="t('title')"
        >
          <template #right>
            <HudStatusLine
              label="SESSION"
              status="active"
            />
          </template>
        </UiSectionHeader>

        <p class="mt-2 max-w-2xl text-sm text-primary/70 font-light leading-relaxed">
          {{ t('subtitle') }}
        </p>

        <div
          v-if="pending"
          class="mt-8 border border-outline_variant/20 bg-surface p-6"
        >
          <HudNoiseLabel :label="t('loading')" />
        </div>

        <template v-else>
          <div
            v-if="error"
            class="mt-8 border border-outline_variant/20 bg-surface p-6"
          >
            <HudNoiseLabel :label="t('loadError')" />
            <p class="mt-4 text-[10px] text-primary/50 tracking-widest font-mono uppercase">
              {{ t('loadErrorHint') }}
            </p>
          </div>

          <div class="grid mt-8 gap-6 md:grid-cols-2">
            <HudSpecLabel
              :title="t('identity.title')"
              code="ID.01"
              :rows="identityRows"
            />
            <HudSpecLabel
              :title="t('clan.title')"
              code="CLAN.RO"
              :rows="clanRows"
            />
          </div>

          <div class="mt-8 border border-outline_variant/20 bg-surface p-6">
            <div class="mb-4 flex items-end justify-between gap-4 border-b border-primary/20 pb-3">
              <div>
                <p class="text-[10px] text-primary/40 tracking-widest font-mono uppercase">
                  {{ t('cta.code') }}
                </p>
                <h3 class="mt-1 text-sm text-primary font-bold tracking-widest uppercase">
                  {{ t('cta.title') }}
                </h3>
              </div>
              <HudCodeReadout code="NAV" />
            </div>

            <div class="flex flex-wrap gap-3">
              <UiButton
                v-for="link in communityLinks"
                :key="link.key"
                variant="secondary"
                :to="link.to"
              >
                {{ link.label }}
              </UiButton>
            </div>
          </div>

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
        </template>
      </div>
    </section>
  </div>
</template>

<i18n lang="yaml">
fr:
  seoTitle: 'HUB COMMUNAUTÉ // CDA_LAB'
  title: 'HUB COMMUNAUTÉ'
  subtitle: 'Identités liées, résumé de clan (lecture seule) et accès aux surfaces communautaires.'
  loading: 'SYNC_PROFIL // EN COURS'
  loadError: 'SYNC_PROFIL // ÉCHEC'
  loadErrorHint: 'Profil ou base indisponible. Réessayez après reconnexion.'
  identity:
    title: 'IDENTITÉ'
    displayName: 'NOM'
    email: 'EMAIL'
    username: 'PSEUDO'
    twitch: 'TWITCH'
    discord: 'DISCORD'
  link:
    linked: 'LIÉ'
    unlinked: 'NON LIÉ'
  clan:
    title: 'CLAN'
    status: 'STATUT'
    none: 'AUCUN CLAN'
    name: 'NOM'
    members: 'MEMBRES'
    sub: 'ABO'
    subActive: 'ACTIF'
    subInactive: 'INACTIF'
  cta:
    code: 'MODULE_NAV_01'
    title: 'SURFACES COMMUNAUTAIRES'
    clan: 'CLANS'
    lab: 'CDA_LAB'
    cassette: 'CASSETTE'
    timeline: 'TIMELINE'
  signOutAction: 'SE DÉCONNECTER'
  backHome: "RETOUR À L'ACCUEIL"
en:
  seoTitle: 'COMMUNITY HUB // CDA_LAB'
  title: 'COMMUNITY HUB'
  subtitle: 'Linked identities, read-only clan summary, and entry points into community surfaces.'
  loading: 'PROFILE_SYNC // PENDING'
  loadError: 'PROFILE_SYNC // FAILED'
  loadErrorHint: 'Profile or database unavailable. Retry after reconnecting.'
  identity:
    title: 'IDENTITY'
    displayName: 'NAME'
    email: 'EMAIL'
    username: 'USERNAME'
    twitch: 'TWITCH'
    discord: 'DISCORD'
  link:
    linked: 'LINKED'
    unlinked: 'UNLINKED'
  clan:
    title: 'CLAN'
    status: 'STATUS'
    none: 'NO CLAN'
    name: 'NAME'
    members: 'MEMBERS'
    sub: 'SUB'
    subActive: 'ACTIVE'
    subInactive: 'INACTIVE'
  cta:
    code: 'MODULE_NAV_01'
    title: 'COMMUNITY SURFACES'
    clan: 'CLANS'
    lab: 'CDA_LAB'
    cassette: 'CASSETTE'
    timeline: 'TIMELINE'
  signOutAction: 'SIGN OUT'
  backHome: 'BACK TO HOME'
zh:
  seoTitle: '社区中枢 // CDA_LAB'
  title: '社区中枢'
  subtitle: '已关联身份、只读氏族摘要，以及通往社区界面的入口。'
  loading: 'PROFILE_SYNC // 同步中'
  loadError: 'PROFILE_SYNC // 失败'
  loadErrorHint: '资料或数据库不可用。请重新连接后再试。'
  identity:
    title: '身份'
    displayName: '名称'
    email: '电子邮件'
    username: '用户名'
    twitch: 'TWITCH'
    discord: 'DISCORD'
  link:
    linked: '已关联'
    unlinked: '未关联'
  clan:
    title: '氏族'
    status: '状态'
    none: '暂无氏族'
    name: '名称'
    members: '成员'
    sub: '订阅'
    subActive: '有效'
    subInactive: '无效'
  cta:
    code: 'MODULE_NAV_01'
    title: '社区界面'
    clan: '氏族'
    lab: 'CDA_LAB'
    cassette: '卡带'
    timeline: '时间线'
  signOutAction: '退出登录'
  backHome: '返回首页'
ja:
  seoTitle: 'コミュニティハブ // CDA_LAB'
  title: 'コミュニティハブ'
  subtitle: '連携済みアイデンティティ、読み取り専用クラン要約、コミュニティ導線。'
  loading: 'PROFILE_SYNC // 同期中'
  loadError: 'PROFILE_SYNC // 失敗'
  loadErrorHint: 'プロフィールまたはDBに到達できません。再接続後に再試行してください。'
  identity:
    title: 'アイデンティティ'
    displayName: '名前'
    email: 'メール'
    username: 'ユーザー名'
    twitch: 'TWITCH'
    discord: 'DISCORD'
  link:
    linked: '連携済'
    unlinked: '未連携'
  clan:
    title: 'クラン'
    status: '状態'
    none: 'クランなし'
    name: '名前'
    members: 'メンバー'
    sub: 'サブスク'
    subActive: '有効'
    subInactive: '無効'
  cta:
    code: 'MODULE_NAV_01'
    title: 'コミュニティ導線'
    clan: 'クラン'
    lab: 'CDA_LAB'
    cassette: 'カセット'
    timeline: 'タイムライン'
  signOutAction: 'サインアウト'
  backHome: 'ホームに戻る'
</i18n>
