<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const { t, locale } = useI18n({ useScope: 'local' })
const route = useRoute()
const clanId = computed(() => String(route.params.id))
const { data, pending, error } = useClanDetail(clanId)

const clan = computed(() => data.value?.clan ?? null)
const membership = computed(() => data.value?.membership ?? null)

const clanLabel = computed(() => {
  if (!clan.value)
    return '—'
  if (locale.value === 'fr' && clan.value.displayNameFr)
    return clan.value.displayNameFr
  return clan.value.displayName || clan.value.name || clan.value.id
})

const detailRows = computed(() => {
  if (!clan.value)
    return []
  return [
    { key: t('fields.id'), value: clan.value.id },
    { key: t('fields.name'), value: clanLabel.value },
    {
      key: t('fields.members'),
      value: clan.value.totalMembers != null ? String(clan.value.totalMembers) : '—',
    },
    { key: t('fields.points'), value: clan.value.totalPoints ?? '—' },
  ]
})

const membershipRows = computed(() => {
  if (!membership.value) {
    return [{ key: t('membership.status'), value: '—' }]
  }
  return [
    {
      key: t('membership.status'),
      value: membership.value.isThisClan ? t('membership.thisClan') : t('membership.other'),
    },
    {
      key: t('membership.access'),
      value: membership.value.isBoughtClanAccess == null
        ? '—'
        : (membership.value.isBoughtClanAccess ? t('membership.accessYes') : t('membership.accessNo')),
    },
  ]
})

useSeoMeta({
  title: () => `${t('seoTitle')} // ${clanLabel.value}`,
  robots: 'noindex, nofollow',
})
</script>

<template>
  <div>
    <section class="border-b border-primary_fixed_dim/10 bg-surface_container_lowest p-8 md:p-16">
      <div class="mx-auto max-w-3xl">
        <UiSectionHeader
          code="MODULE_CLANS_02"
          :title="clanLabel"
        >
          <template #right>
            <HudStatusLine
              label="CLAN"
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
            v-if="error || !clan"
            class="mt-8 border border-outline_variant/20 bg-surface p-6"
          >
            <HudNoiseLabel :label="t('loadError')" />
            <p class="mt-4 text-[10px] text-primary/50 tracking-widest font-mono uppercase">
              {{ t('loadErrorHint') }}
            </p>
          </div>

          <template v-else>
            <div class="grid mt-8 gap-6 md:grid-cols-2">
              <HudSpecLabel
                :title="t('fields.title')"
                code="CLAN.RO"
                :rows="detailRows"
              />
              <HudSpecLabel
                :title="t('membership.title')"
                code="MEM.RO"
                :rows="membershipRows"
              />
            </div>

            <div
              v-if="clan.description"
              class="mt-8 border border-outline_variant/20 bg-surface p-6"
            >
              <p class="text-[10px] text-primary/40 tracking-widest font-mono uppercase">
                {{ t('fields.description') }}
              </p>
              <p class="mt-3 text-sm text-primary/80 font-light leading-relaxed">
                {{ clan.description }}
              </p>
            </div>
          </template>
        </template>

        <div class="mt-8 flex flex-wrap gap-4">
          <UiButton
            variant="secondary"
            to="/clans"
          >
            {{ t('backList') }}
          </UiButton>
          <UiButton
            variant="tertiary"
            to="/account"
          >
            {{ t('backAccount') }}
          </UiButton>
        </div>
      </div>
    </section>
  </div>
</template>

<i18n lang="yaml">
fr:
  seoTitle: 'CLAN'
  subtitle: 'Fiche clan lecture seule. Appartenance relative à la session courante.'
  loading: 'SYNC_CLAN // EN COURS'
  loadError: 'SYNC_CLAN // INTROUVABLE'
  loadErrorHint: 'Clan absent ou base indisponible.'
  fields:
    title: 'FICHE'
    id: 'ID'
    name: 'NOM'
    members: 'MEMBRES'
    points: 'POINTS'
    description: 'DESCRIPTION'
  membership:
    title: 'APPARTENANCE'
    status: 'STATUT'
    thisClan: 'VOTRE CLAN'
    other: 'AUTRE / AUCUN'
    access: 'ACCÈS ACHETÉ'
    accessYes: 'OUI'
    accessNo: 'NON'
  backList: 'ROSTER CLANS'
  backAccount: 'HUB COMMUNAUTÉ'
en:
  seoTitle: 'CLAN'
  subtitle: 'Read-only clan sheet. Membership relative to the current session.'
  loading: 'CLAN_SYNC // PENDING'
  loadError: 'CLAN_SYNC // NOT FOUND'
  loadErrorHint: 'Clan missing or database unavailable.'
  fields:
    title: 'SHEET'
    id: 'ID'
    name: 'NAME'
    members: 'MEMBERS'
    points: 'POINTS'
    description: 'DESCRIPTION'
  membership:
    title: 'MEMBERSHIP'
    status: 'STATUS'
    thisClan: 'YOUR CLAN'
    other: 'OTHER / NONE'
    access: 'BOUGHT ACCESS'
    accessYes: 'YES'
    accessNo: 'NO'
  backList: 'CLAN ROSTER'
  backAccount: 'COMMUNITY HUB'
zh:
  seoTitle: '氏族'
  subtitle: '只读氏族档案。归属相对于当前会话。'
  loading: 'CLAN_SYNC // 同步中'
  loadError: 'CLAN_SYNC // 未找到'
  loadErrorHint: '氏族不存在或数据库不可用。'
  fields:
    title: '档案'
    id: 'ID'
    name: '名称'
    members: '成员'
    points: '积分'
    description: '描述'
  membership:
    title: '归属'
    status: '状态'
    thisClan: '你的氏族'
    other: '其他 / 无'
    access: '已购访问'
    accessYes: '是'
    accessNo: '否'
  backList: '氏族名册'
  backAccount: '社区中枢'
ja:
  seoTitle: 'クラン'
  subtitle: '読み取り専用クランシート。現在セッション基準の所属。'
  loading: 'CLAN_SYNC // 同期中'
  loadError: 'CLAN_SYNC // 未検出'
  loadErrorHint: 'クランが存在しないか、DBに到達できません。'
  fields:
    title: 'シート'
    id: 'ID'
    name: '名前'
    members: 'メンバー'
    points: 'ポイント'
    description: '説明'
  membership:
    title: '所属'
    status: '状態'
    thisClan: '所属クラン'
    other: '他 / なし'
    access: '購入アクセス'
    accessYes: 'あり'
    accessNo: 'なし'
  backList: 'クランロスター'
  backAccount: 'コミュニティハブ'
</i18n>
