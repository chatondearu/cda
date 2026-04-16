<template>
  <div class="grid gap-6">
    <div class="flex items-start justify-between gap-4">
      <div>
        <div class="ui-micro text-primary_amber/60">
          REF-03/LAB
        </div>
        <h1 class="ui-heading mt-2 text-primary_amber text-2xl">
          THE_LAB
        </h1>
      </div>
      <div class="ui-micro text-primary_amber/30">
        CAPSULES: {{ items.length }}
      </div>
    </div>

    <TerminalWindow label="SYS_MSG: INDEX" ref-code="NOST-0100-X">
      <div v-if="pending" class="ui-micro text-primary_amber/60">
        SYS_MSG: LOADING...
      </div>
      <div v-else-if="error" class="ui-micro text-primary_amber/60">
        SYS_ERR: {{ error.message }}
      </div>

      <div v-else class="grid gap-3">
        <NuxtLink
          v-for="item in items"
          :key="item.path"
          :to="item.path"
          class="group block bg-surface_container_lowest ui-ghost-border px-4 py-3 hover:border-outline/40"
        >
          <div class="flex items-start justify-between gap-4">
            <div>
              <div class="ui-micro text-primary_amber/50">
                {{ item.date }} // {{ item.status }}
              </div>
              <div class="ui-heading mt-1 text-primary_amber_soft group-hover:text-primary_amber">
                {{ item.title }}
              </div>
              <div class="mt-1 text-sm text-primary_amber_soft/80">
                {{ item.description }}
              </div>
            </div>
            <div class="ui-micro text-primary_amber/30">
              OPEN_IN_NEW
            </div>
          </div>

          <div v-if="item.tech_stack?.length" class="mt-3 flex flex-wrap gap-2">
            <span
              v-for="tech in item.tech_stack"
              :key="tech"
              class="ui-micro bg-surface px-2 py-0.5 text-primary_amber/70"
            >
              {{ tech }}
            </span>
          </div>
        </NuxtLink>
      </div>
    </TerminalWindow>
  </div>
</template>

<script setup lang="ts">
import TerminalWindow from '~/components/ui/TerminalWindow.vue'

type LabStatus = 'ARCHIVED' | 'INCOMPLETE' | 'ACTIVE'

type LabItem = {
  path: string
  title: string
  description: string
  status: LabStatus
  tech_stack: string[]
  date: string
}

const { data, pending, error } = await useAsyncData('lab-index', async () => {
  return await queryCollection('content')
    .where('path', 'LIKE', '/lab/%')
    .select('path', 'title', 'description', 'status', 'tech_stack', 'date')
    .order('date', 'DESC')
    .all<LabItem>()
})

const items = computed(() => data.value ?? [])
</script>
