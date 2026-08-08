<script setup lang="ts">
import HudCornerStack from './HudCornerStack.vue'

const state = reactive({
  org: { name: 'LOGICAL MACHINE DIV.', meta: 'SECTOR 7' },
  serial: { serial: 'LM-2984-XX', caption: 'ISSUED 2026' },
})
</script>

<template>
  <Story title="HUD / HudCornerStack">
    <Variant title="Default">
      <div class="w-80 border border-outline_variant/20 bg-background p-8">
        <HudCornerStack
          :org="state.org"
          :serial="state.serial"
        />
      </div>

      <template #controls>
        <HstText
          v-model="state.org.name"
          title="Org name"
        />
        <HstText
          v-model="state.org.meta"
          title="Org meta"
        />
        <HstText
          v-model="state.serial.serial"
          title="Serial"
        />
        <HstText
          v-model="state.serial.caption"
          title="Serial caption"
        />
      </template>
    </Variant>

    <Variant title="Grid">
      <div class="grid grid-cols-2 gap-3 border border-outline_variant/20 bg-background p-8">
        <HudCornerStack
          :org="{ name: 'LOGICAL MACHINE DIV.', meta: 'SECTOR 7' }"
          :serial="{ serial: 'LM-2984-XX', caption: 'ISSUED 2026' }"
        />
        <HudCornerStack
          :org="{ name: 'ARCHIVE OPS', meta: 'SECTOR 3' }"
          :serial="{ serial: 'AO-1102-QZ' }"
        />
      </div>
    </Variant>
  </Story>
</template>
