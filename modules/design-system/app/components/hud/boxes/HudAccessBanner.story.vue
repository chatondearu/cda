<script setup lang="ts">
import HudAccessBanner from './HudAccessBanner.vue'

const state = reactive({
  granted: true,
  detail: 'CLEARANCE LVL 3',
})
</script>

<template>
  <Story title="HUD / BOXES / HudAccessBanner">
    <Variant title="Default">
      <div class="bg-background p-8">
        <HudAccessBanner
          :granted="state.granted"
          :detail="state.detail"
        />
      </div>

      <template #controls>
        <HstCheckbox
          v-model="state.granted"
          title="Granted"
        />
        <HstText
          v-model="state.detail"
          title="Detail"
        />
      </template>
    </Variant>

    <Variant title="Granted vs Denied">
      <div class="flex flex-col gap-2 bg-background p-8">
        <HudAccessBanner
          :granted="true"
          detail="CLEARANCE LVL 3"
        />
        <HudAccessBanner
          :granted="false"
          detail="INVALID CREDENTIALS"
        />
      </div>
    </Variant>
  </Story>
</template>
