<script setup lang="ts">
const { t } = useI18n({
  useScope: 'local',
})
</script>

<template>
  <section class="px-8 py-12 md:px-14">
    <UiSectionHeader
      code="CDA_REF"
      :title="t('title')"
    />
    <p class="mt-2 text-[10px] text-primary/45 tracking-[0.2em] font-sans uppercase">
      {{ t('subtitle') }}
    </p>
    <div class="mt-12 min-h-[42vh] flex flex-col items-center justify-center gap-5 border border-outline_variant/20 bg-surface_container/20 p-10">
      <UiEmptyCrosshair />
      <p class="max-w-md text-center text-[10px] text-primary/40 tracking-[0.2em] font-sans uppercase">
        {{ t('empty') }}
      </p>
    </div>
  </section>
</template>

<i18n lang="yaml">
fr:
  title: "CDA_LAB"
  subtitle: "EXPERIMENTAL BUFFER · CHATONDEARU (CDA ID)"
  empty: "AWAITING_SIGNAL // PUBLISH SOURCES UNDER content/cda_lab/"
en:
  title: "CDA_LAB"
  subtitle: "EXPERIMENTAL BUFFER · CHATONDEARU (CDA ID)"
  empty: "AWAITING_SIGNAL // PUBLISH SOURCES UNDER content/cda_lab/"
zh:
  title: "CDA_LAB"
  subtitle: "实验缓冲区 · CHATONDEARU (CDA ID)"
  empty: "等待信号 // 在 content/cda_lab/ 下发布来源"
ja:
  title: "CDA_LAB"
  subtitle: "実験バッファ · CHATONDEARU (CDA ID)"
  empty: "信号待機中 // content/cda_lab/ 配下に公開"
</i18n>
