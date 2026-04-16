<template>
  <div class="grid gap-6">
    <div class="flex items-start justify-between gap-4">
      <div>
        <div class="ui-micro text-primary_amber/60">
          REF-04/DOC
        </div>
        <h1 class="ui-heading mt-2 text-primary_amber text-2xl">
          {{ page?.title ?? 'UNKNOWN_CAPSULE' }}
        </h1>
      </div>
      <NuxtLink to="/lab" class="ui-micro text-primary_amber/60 hover:text-primary_amber">
        &lt;&lt; BACK_TO_INDEX
      </NuxtLink>
    </div>

    <TerminalWindow :label="headerLabel" :ref-code="refCode">
      <div v-if="pending" class="ui-micro text-primary_amber/60">
        SYS_MSG: LOADING...
      </div>
      <div v-else-if="error" class="ui-micro text-primary_amber/60">
        SYS_ERR: {{ error.message }}
      </div>
      <ContentRenderer v-else-if="page" :value="page" />
      <div v-else class="ui-micro text-primary_amber/60">
        SYS_ERR: NOT_FOUND
      </div>
    </TerminalWindow>
  </div>
</template>

<script setup lang="ts">
import TerminalWindow from '~/components/ui/TerminalWindow.vue'

const route = useRoute()

const path = computed(() => `/lab/${String(route.params.slug ?? '').replaceAll(',', '/')}`)

const { data: page, pending, error } = await useAsyncData(
  () => `lab:${path.value}`,
  async () => {
    return await queryCollection('content')
      .path(path.value)
      .first()
  },
)

const headerLabel = computed(() => `SYS_MSG: CAPSULE // ${page.value?.status ?? 'UNKNOWN'}`)
const refCode = computed(() => page.value?.date ? `DATE:${page.value.date}` : 'NOST-0101-X')
</script>

