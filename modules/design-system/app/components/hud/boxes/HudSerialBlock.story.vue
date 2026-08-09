<script setup lang="ts">
import HudSerialBlock from './HudSerialBlock.vue'

const state = reactive({
  serial: '8829-441-C',
  caption: 'UNIT REF',
})
</script>

<template>
  <Story title="HUD / BOXES / HudSerialBlock">
    <Variant title="Default">
      <div class="bg-background p-8">
        <HudSerialBlock
          :serial="state.serial"
          :caption="state.caption"
        />
      </div>

      <template #controls>
        <HstText
          v-model="state.serial"
          title="Serial"
        />
        <HstText
          v-model="state.caption"
          title="Caption"
        />
      </template>
    </Variant>

    <Variant title="Stack">
      <div class="flex flex-col items-start gap-2 bg-background p-8">
        <HudSerialBlock
          serial="8829-441-C"
          caption="UNIT REF"
        />
        <HudSerialBlock serial="0001-A" />
      </div>
    </Variant>
  </Story>
</template>
