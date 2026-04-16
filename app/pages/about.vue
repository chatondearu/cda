<template>
  <div class="grid gap-6">
    <div>
      <div class="ui-micro text-primary_amber/60">
        REF-02/DATA
      </div>
      <h1 class="ui-heading mt-2 text-primary_amber text-2xl">
        ABOUT
      </h1>
    </div>

    <TerminalWindow label="SYS_MSG: TIMELINE" ref-code="NOST-0002-X">
      <div class="grid gap-3">
        <div
          v-for="item in timeline"
          :key="item.ref"
          class="grid gap-2 md:grid-cols-[9rem_1fr] md:gap-4"
        >
          <div class="ui-micro text-primary_amber/50">
            {{ item.date }} // {{ item.ref }}
          </div>
          <div>
            <div class="ui-heading text-primary_amber_soft">
              {{ item.title }}
            </div>
            <div class="mt-1 text-sm leading-6 text-primary_amber_soft/80">
              {{ item.desc }}
            </div>
            <div v-if="item.tags?.length" class="mt-2 flex flex-wrap gap-2">
              <span
                v-for="tag in item.tags"
                :key="tag"
                class="ui-micro bg-surface_container_lowest px-2 py-0.5 text-primary_amber/70"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </TerminalWindow>
  </div>
</template>

<script setup lang="ts">
import TerminalWindow from '~/components/ui/TerminalWindow.vue'

type TimelineItem = {
  date: string
  ref: string
  title: string
  desc: string
  tags?: string[]
}

const timeline: TimelineItem[] = [
  {
    date: 'YYYY',
    ref: 'REF-01/A',
    title: 'SYSTEM_ONLINE',
    desc: 'Add your first milestone here (role, project, learning arc).',
    tags: ['NUXT', 'VUE', 'NIX'],
  },
  {
    date: 'YYYY',
    ref: 'REF-02/B',
    title: 'SIGNAL_ACQUIRED',
    desc: 'Second milestone. Keep it dense and factual.',
    tags: ['DX', 'UI_SYSTEM'],
  },
]
</script>

