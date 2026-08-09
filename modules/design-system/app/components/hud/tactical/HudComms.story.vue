<script setup lang="ts">
import HudComms from './HudComms.vue'

const state = reactive({
  channel: 'CH.07 TAC',
  frequency: '243.000',
  signal: 3,
  encrypted: true,
  status: 'link' as 'link' | 'no-link' | 'scanning',
})
</script>

<template>
  <Story title="HUD / TACTICAL / HudComms">
    <Variant title="Default">
      <div class="w-72 bg-background p-8">
        <HudComms
          :channel="state.channel"
          :frequency="state.frequency"
          :signal="state.signal"
          :encrypted="state.encrypted"
          :status="state.status"
        />
      </div>

      <template #controls>
        <HstText
          v-model="state.channel"
          title="Channel"
        />
        <HstText
          v-model="state.frequency"
          title="Frequency"
        />
        <HstNumber
          v-model="state.signal"
          title="Signal"
          :min="0"
          :max="5"
        />
        <HstCheckbox
          v-model="state.encrypted"
          title="Encrypted"
        />
        <HstSelect
          v-model="state.status"
          title="Status"
          :options="{ link: 'link', 'no-link': 'no-link', scanning: 'scanning' }"
        />
      </template>
    </Variant>

    <Variant title="All statuses">
      <div class="flex w-72 flex-col gap-3 bg-background p-8">
        <HudComms
          channel="CH.01 CMD"
          frequency="121.500"
          :signal="5"
          :encrypted="true"
          status="link"
        />
        <HudComms
          channel="CH.07 TAC"
          frequency="243.000"
          :signal="1"
          status="scanning"
        />
        <HudComms
          channel="CH.12 AUX"
          :signal="0"
          status="no-link"
        />
      </div>
    </Variant>
  </Story>
</template>
