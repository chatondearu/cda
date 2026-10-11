<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const { t, locale } = useI18n({ useScope: 'local' })
const localePath = useLocalePath()
const { data, pending, error } = useClansSurface()

const clans = computed(() => data.value?.clans ?? [])
const membership = computed(() => data.value?.membership ?? {
  clanId: null,
  isMember: false,
  isBoughtClanAccess: null,
})

function clanLabel(clan: { displayName: string | null, displayNameFr: string | null, name: string | null, id: string }) {
  if (locale.value === 'fr' && clan.displayNameFr)
    return clan.displayNameFr
  return clan.displayName || clan.name || clan.id
}

const membershipRows = computed(() => {
  const status = membership.value.isMember ? t('membership.active') : t('membership.none')
  const access = membership.value.isBoughtClanAccess == null
    ? '—'
    : (membership.value.isBoughtClanAccess ? t('membership.accessYes') : t('membership.accessNo'))
  return [
    { key: t('membership.status'), value: status },
    { key: t('membership.clanId'), value: membership.value.clanId || '—' },
    { key: t('membership.access'), value: access },
  ]
})

useSeoMeta({
  title: () => t('seoTitle'),
  robots: 'noindex, nofollow',
})
</script>

<template>
  <div>
    <section class="border-b border-primary_fixed_dim/10 bg-surface_container_lowest p-8 md:p-16">
      <div class="mx-auto max-w-4xl">
        <UiSectionHeader
          code="MODULE_CLANS_01"
          :title="t('title')"
        >
          <template #right>
            <HudStatusLine
              label="ROSTER"
              :status="pending ? 'pending' : 'active'"
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

          <template v-else>
            <div class="mt-8">
              <HudSpecLabel
                :title="t('membership.title')"
                code="MEM.RO"
                :rows="membershipRows"
              />
            </div>

            <div
              v-if="clans.length === 0"
              class="mt-8 border border-outline_variant/20 bg-surface p-6"
            >
              <HudNoiseLabel :label="t('empty')" />
              <p class="mt-4 text-[10px] text-primary/50 tracking-widest font-mono uppercase">
                {{ t('emptyHint') }}
              </p>
            </div>

            <ul
              v-else
              class="grid mt-8 gap-4 md:grid-cols-2"
            >
              <li
                v-for="clan in clans"
                :key="clan.id"
              >
                <NuxtLink
                  :to="localePath(`/clans/${clan.id}`)"
                  class="block border border-outline_variant/20 bg-surface p-5 transition-colors hover:border-primary/40"
                >
                  <div class="flex items-start justify-between gap-3 border-b border-primary/20 pb-3">
                    <div>
                      <p class="text-[10px] text-primary/40 tracking-widest font-mono uppercase">
                        {{ clan.id }}
                      </p>
                      <h3 class="mt-1 text-sm text-primary font-bold tracking-widest uppercase">
                        {{ clanLabel(clan) }}
                      </h3>
                    </div>
                    <HudCodeReadout
                      v-if="membership.clanId === clan.id"
                      :code="t('badge.yours')"
                    />
                  </div>
                  <dl class="grid mt-3 gap-2 text-[9px] tracking-widest font-mono uppercase">
                    <div class="flex justify-between gap-3">
                      <dt class="text-primary/40">
                        {{ t('fields.members') }}
                      </dt>
                      <dd class="text-primary">
                        {{ clan.totalMembers != null ? String(clan.totalMembers) : '—' }}
                      </dd>
                    </div>
                    <div class="flex justify-between gap-3">
                      <dt class="text-primary/40">
                        {{ t('fields.points') }}
                      </dt>
                      <dd class="text-primary">
                        {{ clan.totalPoints ?? '—' }}
                      </dd>
                    </div>
                  </dl>
                  <p
                    v-if="clan.description"
                    class="line-clamp-2 mt-3 text-xs text-primary/60 font-light tracking-normal normal-case"
                  >
                    {{ clan.description }}
                  </p>
                </NuxtLink>
              </li>
            </ul>
          </template>
        </template>

        <div class="mt-8 flex flex-wrap gap-4">
          <UiButton
            variant="secondary"
            to="/account"
          >
            {{ t('backAccount') }}
          </UiButton>
          <UiButton
            variant="tertiary"
            to="/"
          >
            {{ t('backHome') }}
          </UiButton>
        </div>
      </div>
    </section>
  </div>
</template>

<i18n lang="yaml">
fr:
  seoTitle: 'CLANS // CDA_LAB'
  title: 'CLANS'
  subtitle: 'Roster lecture seule des clans enregistrés. Statut d’appartenance de la session courante.'
  loading: 'SYNC_CLANS // EN COURS'
  loadError: 'SYNC_CLANS // ÉCHEC'
  loadErrorHint: 'Base indisponible. Réessayez après reconnexion.'
  empty: 'ROSTER // VIDE'
  emptyHint: 'Aucun clan indexé dans la base.'
  membership:
    title: 'APPARTENANCE'
    status: 'STATUT'
    active: 'MEMBRE'
    none: 'AUCUN CLAN'
    clanId: 'CLAN_ID'
    access: 'ACCÈS ACHETÉ'
    accessYes: 'OUI'
    accessNo: 'NON'
  fields:
    members: 'MEMBRES'
    points: 'POINTS'
  badge:
    yours: 'VÔTRE'
  backAccount: 'HUB COMMUNAUTÉ'
  backHome: "RETOUR À L'ACCUEIL"
en:
  seoTitle: 'CLANS // CDA_LAB'
  title: 'CLANS'
  subtitle: 'Read-only roster of registered clans. Current session membership status.'
  loading: 'CLAN_SYNC // PENDING'
  loadError: 'CLAN_SYNC // FAILED'
  loadErrorHint: 'Database unavailable. Retry after reconnecting.'
  empty: 'ROSTER // EMPTY'
  emptyHint: 'No clans indexed in the database.'
  membership:
    title: 'MEMBERSHIP'
    status: 'STATUS'
    active: 'MEMBER'
    none: 'NO CLAN'
    clanId: 'CLAN_ID'
    access: 'BOUGHT ACCESS'
    accessYes: 'YES'
    accessNo: 'NO'
  fields:
    members: 'MEMBERS'
    points: 'POINTS'
  badge:
    yours: 'YOURS'
  backAccount: 'COMMUNITY HUB'
  backHome: 'BACK TO HOME'
zh:
  seoTitle: '氏族 // CDA_LAB'
  title: '氏族'
  subtitle: '只读氏族名册。显示当前会话的归属状态。'
  loading: 'CLAN_SYNC // 同步中'
  loadError: 'CLAN_SYNC // 失败'
  loadErrorHint: '数据库不可用。请重新连接后再试。'
  empty: '名册 // 空'
  emptyHint: '数据库中尚未索引任何氏族。'
  membership:
    title: '归属'
    status: '状态'
    active: '成员'
    none: '暂无氏族'
    clanId: 'CLAN_ID'
    access: '已购访问'
    accessYes: '是'
    accessNo: '否'
  fields:
    members: '成员'
    points: '积分'
  badge:
    yours: '你的'
  backAccount: '社区中枢'
  backHome: '返回首页'
ja:
  seoTitle: 'クラン // CDA_LAB'
  title: 'クラン'
  subtitle: '登録クランの読み取り専用ロスター。現在セッションの所属ステータス。'
  loading: 'CLAN_SYNC // 同期中'
  loadError: 'CLAN_SYNC // 失敗'
  loadErrorHint: 'DBに到達できません。再接続後に再試行してください。'
  empty: 'ロスター // 空'
  emptyHint: 'DBにインデックスされたクランはありません。'
  membership:
    title: '所属'
    status: '状態'
    active: 'メンバー'
    none: 'クランなし'
    clanId: 'CLAN_ID'
    access: '購入アクセス'
    accessYes: 'あり'
    accessNo: 'なし'
  fields:
    members: 'メンバー'
    points: 'ポイント'
  badge:
    yours: '所属'
  backAccount: 'コミュニティハブ'
  backHome: 'ホームに戻る'
</i18n>
