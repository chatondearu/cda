<script setup lang="ts">
type LabStatus = 'ARCHIVED' | 'INCOMPLETE' | 'ACTIVE'

interface LabCapsule {
  path: string
  stem: string
  title: string
  description: string
  status: LabStatus
  tech_stack: string[]
  date: string
}

const { t } = useI18n({
  useScope: 'local',
})

const { data: capsules } = await useAsyncData('cda-lab-capsules', () =>
  queryCollection('cda_lab')
    .order('date', 'DESC')
    .all())

const rows = computed(() => (capsules.value ?? []) as LabCapsule[])

usePageSeo({
  title: () => t('seoTitle'),
  description: () => t('seoDescription'),
})

function statusLabel(status: LabStatus) {
  return t(`status.${status}`)
}

function statusTone(status: LabStatus) {
  if (status === 'ACTIVE')
    return 'border-primary/50 text-primary'
  if (status === 'INCOMPLETE')
    return 'border-tertiary/50 text-tertiary'
  return 'border-outline_variant/40 text-on_surface_variant'
}
</script>

<template>
  <section class="px-8 py-12 md:px-14">
    <UiSectionHeader
      code="CDA_REF"
      :title="t('title')"
    >
      <template #right>
        <span class="text-[10px] text-primary/40 font-mono">
          {{ t('count', { n: rows.length }) }}
        </span>
      </template>
    </UiSectionHeader>
    <p class="mt-2 max-w-2xl text-[10px] text-primary/45 tracking-[0.2em] font-sans uppercase">
      {{ t('subtitle') }}
    </p>
    <p class="mt-4 max-w-2xl text-xs text-on_surface_variant leading-relaxed font-mono">
      {{ t('purpose') }}
    </p>

    <div
      v-if="rows.length === 0"
      class="relative mt-12 min-h-[42vh] flex flex-col items-center justify-center gap-5 border border-outline_variant/20 bg-surface_container/20 p-10"
    >
      <HudCornerMarks />
      <HudCrosshair />
      <p class="max-w-md text-center text-[10px] text-primary/40 tracking-[0.2em] font-sans uppercase">
        {{ t('empty') }}
      </p>
      <HudStatusLine
        label="BUFFER"
        status="standby"
      />
      <HudNoiseLabel label="NO_ENTRIES_DETECTED // STANDBY" />
    </div>

    <ul
      v-else
      class="grid grid-cols-1 mt-12 gap-6 md:grid-cols-2"
    >
      <li
        v-for="item in rows"
        :key="item.path"
        class="relative border border-outline_variant/20 bg-surface_container/30 p-6"
      >
        <HudCornerMarks />
        <div class="mb-4 flex items-start justify-between gap-3">
          <HudRefCode :code="`LAB/${item.stem.toUpperCase()}`" />
          <span
            class="shrink-0 border px-2 py-0.5 text-[8px] font-bold tracking-wide font-mono uppercase"
            :class="statusTone(item.status)"
          >
            {{ statusLabel(item.status) }}
          </span>
        </div>
        <h3 class="mb-2 text-lg text-primary font-bold uppercase">
          {{ item.title }}
        </h3>
        <p class="mb-4 text-xs text-on_surface_variant leading-relaxed">
          {{ item.description }}
        </p>
        <div class="flex flex-wrap items-center justify-between gap-3">
          <HudChips
            :chips="item.tech_stack.map(label => ({ label, status: item.status === 'ACTIVE' ? 'active' : 'idle' }))"
          />
          <time
            class="text-[10px] text-primary/40 font-mono"
            :datetime="item.date"
          >
            {{ item.date }}
          </time>
        </div>
      </li>
    </ul>
  </section>
</template>

<i18n lang="yaml">
fr:
  seoTitle: "CDA_LAB // BUFFER EXPERIMENTAL"
  seoDescription: "Capsules d experimentation CDA_LAB — overlays live, protocoles voix et notes communautaires."
  title: "CDA_LAB"
  subtitle: "EXPERIMENTAL BUFFER · CHATONDEARU (CDA ID)"
  purpose: "Laboratoire public des experiences stream et design — HUD live, buffers voix, notes de gateway. Ce n est pas l archive repos ; c est le banc d essai communautaire."
  empty: "AWAITING_SIGNAL // PUBLISH SOURCES UNDER content/cda_lab/"
  count: "{n} CAPSULES"
  status:
    ACTIVE: "ACTIVE"
    INCOMPLETE: "INCOMPLETE"
    ARCHIVED: "ARCHIVED"
en:
  seoTitle: "CDA_LAB // EXPERIMENTAL BUFFER"
  seoDescription: "CDA_LAB experiment capsules — live overlays, voice protocols, and community gateway notes."
  title: "CDA_LAB"
  subtitle: "EXPERIMENTAL BUFFER · CHATONDEARU (CDA ID)"
  purpose: "Public lab for stream and design experiments — live HUD, voice buffers, gateway notes. Not the repo archive; the community test bench."
  empty: "AWAITING_SIGNAL // PUBLISH SOURCES UNDER content/cda_lab/"
  count: "{n} CAPSULES"
  status:
    ACTIVE: "ACTIVE"
    INCOMPLETE: "INCOMPLETE"
    ARCHIVED: "ARCHIVED"
zh:
  seoTitle: "CDA_LAB // 实验缓冲区"
  seoDescription: "CDA_LAB 实验胶囊 — 直播 HUD、语音协议与社区网关笔记。"
  title: "CDA_LAB"
  subtitle: "实验缓冲区 · CHATONDEARU (CDA ID)"
  purpose: "面向直播与设计实验的公共实验室 — 直播 HUD、语音缓冲、网关笔记。不是仓库档案，而是社区试验台。"
  empty: "等待信号 // 在 content/cda_lab/ 下发布来源"
  count: "{n} 胶囊"
  status:
    ACTIVE: "ACTIVE"
    INCOMPLETE: "INCOMPLETE"
    ARCHIVED: "ARCHIVED"
ja:
  seoTitle: "CDA_LAB // 実験バッファ"
  seoDescription: "CDA_LAB 実験カプセル — 配信 HUD、ボイスプロトコル、コミュニティゲートウェイノート。"
  title: "CDA_LAB"
  subtitle: "実験バッファ · CHATONDEARU (CDA ID)"
  purpose: "配信とデザイン実験の公開ラボ — ライブ HUD、ボイスバッファ、ゲートウェイノート。リポジトリ保管庫ではなく、コミュニティの試験台。"
  empty: "信号待機中 // content/cda_lab/ 配下に公開"
  count: "{n} CAPSULES"
  status:
    ACTIVE: "ACTIVE"
    INCOMPLETE: "INCOMPLETE"
    ARCHIVED: "ARCHIVED"
</i18n>
