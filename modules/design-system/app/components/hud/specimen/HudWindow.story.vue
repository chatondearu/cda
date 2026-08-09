<script setup lang="ts">
import HudWindow from './HudWindow.vue'

const state = reactive({
  title: 'DIAG.SYS',
  status: 'active' as 'active' | 'idle' | 'error',
})
</script>

<template>
  <Story title="HUD / SPECIMEN / HudWindow">
    <Variant title="Default">
      <div class="w-72 bg-background p-8">
        <HudWindow
          :title="state.title"
          :status="state.status"
        >
          <span class="font-mono text-[10px] uppercase tracking-widest text-primary/60">
            Window body content slot.
          </span>
        </HudWindow>
      </div>

      <template #controls>
        <HstText
          v-model="state.title"
          title="Title"
        />
        <HstSelect
          v-model="state.status"
          title="Status"
          :options="{ active: 'active', idle: 'idle', error: 'error' }"
        />
      </template>
    </Variant>

    <Variant title="Statuses">
      <div class="flex w-72 flex-col gap-3 bg-background p-8">
        <HudWindow
          title="UPLINK.SYS"
          status="active"
        >
          <span class="font-mono text-[9px] uppercase tracking-widest text-primary/50">Active session</span>
        </HudWindow>
        <HudWindow
          title="STANDBY.SYS"
          status="idle"
        >
          <span class="font-mono text-[9px] uppercase tracking-widest text-primary/50">Idle</span>
        </HudWindow>
        <HudWindow
          title="FAULT.SYS"
          status="error"
        >
          <span class="font-mono text-[9px] uppercase tracking-widest text-primary/50">Error state</span>
        </HudWindow>
      </div>
    </Variant>
  </Story>
</template>
