<script setup lang="ts">
const { t } = useI18n()
const { telemetry } = useSystemData()
const auth = useAuth()
const session = auth.useSession()

const currentUser = computed(() => session.value?.data?.user ?? null)
/** Prefer community session framing over the static diagnostic operator label. */
const operatorLabel = computed(() =>
  currentUser.value
    ? t('auth.communityOperator')
    : telemetry.value.userText,
)
</script>

<template>
  <UiTopBar :title="telemetry.statusTitle">
    <template #leading>
      <AppSiteBrandLogo />
    </template>
    <template #actions>
      <span class="hidden items-center gap-2 md:flex">
        <span class="h-2 w-2 animate-pulse bg-primary_fixed_dim" />
        {{ telemetry.secureLineText }}
      </span>
      <span class="hidden opacity-60 md:inline">{{ operatorLabel }}</span>
      <AppSettingsMenu />
    </template>
  </UiTopBar>
</template>
