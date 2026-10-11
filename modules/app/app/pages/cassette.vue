<script setup lang="ts">
const { t } = useI18n({
  useScope: 'local',
})
const localePath = useLocalePath()

usePageSeo({
  title: () => t('seoTitle'),
  description: () => t('seoDescription'),
})

const roles = computed(() => [
  { id: 'voice', label: t('roles.voice.label'), body: t('roles.voice.body') },
  { id: 'lore', label: t('roles.lore.label'), body: t('roles.lore.body') },
  { id: 'deck', label: t('roles.deck.label'), body: t('roles.deck.body') },
])
</script>

<template>
  <div>
    <section class="border-b border-primary_fixed_dim/10 bg-surface_container_lowest px-8 py-12 md:px-14 md:py-16">
      <UiSectionHeader
        code="MODULE_CASSETTE"
        :title="t('title')"
      >
        <template #right>
          <span class="text-[10px] text-primary/40 font-mono">
            {{ t('badge') }}
          </span>
        </template>
      </UiSectionHeader>

      <p class="mt-2 max-w-2xl text-[10px] text-primary/45 tracking-[0.2em] font-sans uppercase">
        {{ t('subtitle') }}
      </p>
      <p class="mt-4 max-w-2xl text-xs text-on_surface_variant leading-relaxed font-mono">
        {{ t('purpose') }}
      </p>

      <ul class="grid grid-cols-1 mt-10 gap-4 md:grid-cols-3">
        <li
          v-for="role in roles"
          :key="role.id"
          class="relative border border-outline_variant/20 bg-surface_container/30 p-5"
        >
          <HudCornerMarks />
          <HudRefCode
            class="mb-3"
            :code="role.label"
          />
          <p class="text-xs text-on_surface_variant leading-relaxed">
            {{ role.body }}
          </p>
        </li>
      </ul>

      <div class="mt-8 flex flex-wrap gap-4">
        <UiButton :to="localePath('/cda-lab')">
          {{ t('ctaLab') }}
        </UiButton>
        <UiButton
          variant="secondary"
          :to="localePath('/timeline')"
        >
          {{ t('ctaTimeline') }}
        </UiButton>
      </div>
    </section>

    <UiCassetteDeck />
  </div>
</template>

<i18n lang="yaml">
fr:
  seoTitle: "CASSETTE_VOIX // ARCHIVES COMMUNAUTAIRES"
  seoDescription: "Deck cassette ChatonDeAru — archives voix, lore live, et journal analogique de la communaute."
  title: "CASSETTE_VOIX"
  subtitle: "ANALOG_LOG · COMMUNITY CHANNEL"
  badge: "VOICE_ARCHIVES // LIVE_LORE"
  purpose: "Surface communautaire pour les archives voix et le lore des lives. Le deck ci-dessous est le chrome analogique ; le player audio complet arrivera plus tard."
  ctaLab: "OUVRIR_CDA_LAB"
  ctaTimeline: "VOIR_CHRONO_LOG"
  roles:
    voice:
      label: "VOICE_ARCHIVES"
      body: "Index des drops voix, clips VOD et fragments audio lies aux sessions Twitch."
    lore:
      label: "LIVE_LORE"
      body: "Recits et moments de live que la communaute rejoue — pas seulement des timestamps techniques."
    deck:
      label: "ANALOG_DECK"
      body: "Interface cassette clinique : transport, telemetrie de piste, framing ANALOG_LOG."
en:
  seoTitle: "CASSETTE_INT // COMMUNITY ARCHIVES"
  seoDescription: "ChatonDeAru cassette deck — voice archives, live lore, and the community analog log."
  title: "CASSETTE_INT"
  subtitle: "ANALOG_LOG · COMMUNITY CHANNEL"
  badge: "VOICE_ARCHIVES // LIVE_LORE"
  purpose: "Community surface for voice archives and live lore. The deck below is analog chrome; a full audio player comes later."
  ctaLab: "OPEN_CDA_LAB"
  ctaTimeline: "VIEW_CHRONO_LOG"
  roles:
    voice:
      label: "VOICE_ARCHIVES"
      body: "Index of voice drops, VOD clips, and audio fragments tied to Twitch sessions."
    lore:
      label: "LIVE_LORE"
      body: "Stories and live moments the community revisits — not just technical timestamps."
    deck:
      label: "ANALOG_DECK"
      body: "Clinical cassette shell: transport controls, track telemetry, ANALOG_LOG framing."
zh:
  seoTitle: "语音磁带 // 社区档案"
  seoDescription: "ChatonDeAru 磁带机 — 语音档案、直播传说与社区模拟日志。"
  title: "语音磁带"
  subtitle: "ANALOG_LOG · 社区频道"
  badge: "VOICE_ARCHIVES // LIVE_LORE"
  purpose: "面向语音档案与直播传说的社区界面。下方磁带机是模拟外观；完整音频播放器稍后上线。"
  ctaLab: "打开_CDA_LAB"
  ctaTimeline: "查看时间线"
  roles:
    voice:
      label: "VOICE_ARCHIVES"
      body: "与 Twitch 场次相关的语音片段、VOD 剪辑与音频碎片索引。"
    lore:
      label: "LIVE_LORE"
      body: "社区重温的直播故事与瞬间 — 不只是技术时间戳。"
    deck:
      label: "ANALOG_DECK"
      body: "临床磁带外壳：传输控制、轨道遥测、ANALOG_LOG 框架。"
ja:
  seoTitle: "カセットボイス // コミュニティアーカイブ"
  seoDescription: "ChatonDeAru カセットデッキ — ボイスアーカイブ、ライブロア、コミュニティのアナログログ。"
  title: "カセットボイス"
  subtitle: "ANALOG_LOG · コミュニティチャンネル"
  badge: "VOICE_ARCHIVES // LIVE_LORE"
  purpose: "ボイスアーカイブとライブロアのためのコミュニティ面。下のデッキはアナログ外装で、本格オーディオプレイヤーは後続。"
  ctaLab: "CDA_LAB_を開く"
  ctaTimeline: "CHRONO_LOG_を見る"
  roles:
    voice:
      label: "VOICE_ARCHIVES"
      body: "Twitch セッションに紐づくボイスドロップ、VOD クリップ、音声断片の索引。"
    lore:
      label: "LIVE_LORE"
      body: "コミュニティが振り返る配信の物語と瞬間 — 技術タイムスタンプだけではない。"
    deck:
      label: "ANALOG_DECK"
      body: "臨床カセットシェル：トランスポート、トラックテレメトリ、ANALOG_LOG フレーミング。"
</i18n>
