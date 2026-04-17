<template>
  <section class="px-8 py-12 md:px-14">
    <UiSectionHeader
      code="MODULE_06"
      title="SYSTEM_DIAGNOSTICS"
    />
    <div class="grid gap-6 md:grid-cols-2">
      <UiGlassDiagnosticPanel />
      <div class="space-y-3">
        <UiSystemBadge text="SYNC: NOMINAL" />
        <UiSystemBadge text="LATENCY: 02.1MS" />
        <UiSystemBadge text="CORE TEMP: 42C" />
      </div>
    </div>
  </section>
</template>
