<script setup lang="ts">
export type HudComplianceStatus = 'pass' | 'fail' | 'pending'

interface HudComplianceToneClasses {
  border: string
  text: string
  statusLabel: string
}

interface Props {
  /** Regulatory/standard reference, e.g. `ISO-9001`. */
  standard: string
  status?: HudComplianceStatus
  code?: string
}

const props = withDefaults(defineProps<Props>(), {
  status: 'pending',
})

function resolveToneClasses(status: HudComplianceStatus): HudComplianceToneClasses {
  switch (status) {
    case 'pass':
      return { border: 'border-primary/60', text: 'text-primary', statusLabel: 'COMPLIANT' }
    case 'fail':
      return { border: 'border-error/60', text: 'text-error', statusLabel: 'NON-COMPLIANT' }
    case 'pending':
      return { border: 'border-tertiary/60', text: 'text-tertiary', statusLabel: 'PENDING REVIEW' }
    default: {
      const exhaustiveCheck: never = status
      return exhaustiveCheck
    }
  }
}

const toneClasses = computed(() => resolveToneClasses(props.status))
</script>

<template>
  <div
    class="inline-flex flex-col gap-1 border-2 bg-surface_container_lowest px-3 py-2"
    :class="toneClasses.border"
  >
    <div class="flex items-center justify-between gap-4 font-mono text-[9px] uppercase tracking-widest text-primary/40">
      <span>{{ standard }}</span>
      <span
        v-if="code"
      >{{ code }}</span>
    </div>
    <span
      class="font-mono text-xs font-bold uppercase tracking-widest"
      :class="toneClasses.text"
    >{{ toneClasses.statusLabel }}</span>
  </div>
</template>
