<script setup lang="ts">
import HudCodeReadout from './HudCodeReadout.vue'

const state = reactive({
  code: '4F2A91',
  prefix: '0X',
})
</script>

<template>
  <Story title="HUD / TEXT / HudCodeReadout">
    <Variant title="Default">
      <div class="bg-background p-8">
        <HudCodeReadout
          :code="state.code"
          :prefix="state.prefix"
        />
      </div>

      <template #controls>
        <HstText
          v-model="state.code"
          title="Code"
        />
        <HstText
          v-model="state.prefix"
          title="Prefix"
        />
      </template>
    </Variant>

    <Variant title="Stack">
      <div class="flex flex-col gap-1 bg-background p-8">
        <HudCodeReadout code="4F2A91" />
        <HudCodeReadout code="00A1" prefix="ID" />
        <HudCodeReadout code="7F" prefix="ERR" />
      </div>
    </Variant>
  </Story>
</template>
