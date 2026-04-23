<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const streamerItems = useStreamerTimeline()
const { data: archiveRows } = await useArchiveList()
const requestUrl = useRequestURL()
const config = useRuntimeConfig()
const requestHost = requestUrl.host.split(':')[0]?.trim().toLowerCase() ?? ''
const meHost = String(config.public.meHost ?? '').trim().toLowerCase()
const isMeSubdomain = meHost.length > 0 && requestHost === meHost

function sortByGithubPinnedPriority(a: { github_pinned?: boolean, order: number }, b: { github_pinned?: boolean, order: number }): number {
  return Number(b.github_pinned ?? false) - Number(a.github_pinned ?? false) || a.order - b.order
}

const featuredArchiveItems = computed(() =>
  (archiveRows.value ?? [])
    .filter(row => row.tier === 'featured')
    .toSorted(sortByGithubPinnedPriority)
    .map(mapArchiveDocumentToItem),
)

if (isMeSubdomain) {
  useSeoMeta({
    title: t('home.meSeoTitle'),
    description: t('home.meSeoDescription'),
    robots: 'noindex, nofollow',
  })

  useHead({
    meta: [
      { name: 'robots', content: 'noindex, nofollow' },
    ],
    link: [
      {
        rel: 'canonical',
        href: `https://${meHost}/`,
      },
    ],
  })
}
</script>

<template>
  <div>
    <UiMeAccessGate v-if="isMeSubdomain" />
    <template v-else>
      <UiHeroCommand>
        <template #title>
          {{ t('home.heroTitleLine1') }}<br>
          <span class="bg-primary px-2 text-background">[ CHATONDEARU ]</span><br>
          {{ t('home.heroTitleLine3') }}
        </template>

        <template #description>
          {{ t('home.heroDescription') }}
        </template>

        <template #actions>
          <UiButton :to="localePath('/contact')">
            {{ t('home.ctaPrimary') }}
          </UiButton>
          <UiButton variant="secondary" :to="localePath('/timeline')">
            {{ t('home.ctaSecondary') }}
          </UiButton>
        </template>
      </UiHeroCommand>
      <UiTimeline :items="[...streamerItems]" />
      <section class="p-8 md:p-16">
        <UiArchiveRepositoryHeader />
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <UiArchiveCard
            v-for="item in featuredArchiveItems.slice(0, 3)"
            :key="item.slug"
            :item="item"
          />
        </div>
      </section>
      <UiCassetteDeck />
    </template>
  </div>
</template>

<i18n lang="json">
{
  "fr": {
    "home": {
      "meSeoTitle": "ME // RLienard",
      "meSeoDescription": "Page de passerelle pour demander un accès au CV professionnel."
    }
  },
  "en": {
    "home": {
      "meSeoTitle": "ME // RLienard",
      "meSeoDescription": "Gateway page to request access to the professional resume."
    }
  },
  "zh": {
    "home": {
      "meSeoTitle": "ME // RLienard",
      "meSeoDescription": "用于申请访问职业履历的入口页面。"
    }
  },
  "ja": {
    "home": {
      "meSeoTitle": "ME // RLienard",
      "meSeoDescription": "職務経歴書へのアクセスを申請するためのゲートウェイページ。"
    }
  }
}
</i18n>
