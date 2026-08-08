<script setup lang="ts">
import HudChecksumStamp from './HudChecksumStamp.vue'

const state = reactive({
  ok: true,
  code: 'SHA1:4F2C',
})
</script>

<template>
  <Story title="HUD / HudChecksumStamp">
    <Variant title="Default">
      <div class="w-64 bg-background p-8">
        <HudChecksumStamp
          :ok="state.ok"
          :code="state.code"
        />
      </div>

      <template #controls>
        <HstCheckbox
          v-model="state.ok"
          title="Ok"
        />
        <HstText
          v-model="state.code"
          title="Code"
        />
      </template>
    </Variant>

    <Variant title="Verified vs Failed">
      <div class="flex w-64 flex-col gap-2 bg-background p-8">
        <HudChecksumStamp
          :ok="true"
          code="SHA1:4F2C"
        />
        <HudChecksumStamp
          :ok="false"
          code="SHA1:0000"
        />
      </div>
    </Variant>
  </Story>
</template>
