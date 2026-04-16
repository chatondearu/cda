<template>
  <div class="grid gap-6">
    <div class="flex items-start justify-between gap-4">
      <div>
        <div class="ui-micro text-primary_amber/60">
          REF-01/LOG
        </div>
        <h1 class="ui-heading mt-2 text-primary_amber text-2xl">
          <span class="sr-only">WELCOME TO THE LAB... INITIALIZING...</span>
          <span aria-hidden="true">{{ displayText }}</span>
          <span
            aria-hidden="true"
            class="ml-0.5 inline-block h-[1em] w-[0.65em] align-middle bg-primary_amber"
            :class="cursorOn ? 'opacity-100' : 'opacity-0'"
          />
        </h1>
      </div>

      <div class="ui-micro text-primary_amber/30">
        SYS_UPTIME: {{ uptime }}
      </div>
    </div>

    <TerminalWindow label="SYS_MSG: INITIALIZING..." ref-code="NOST-0001-X">
      <div class="text-sm leading-6 text-primary_amber_soft">
        Diagnostic console online. Logs, experiments, and archived side-projects will be indexed here.
      </div>
    </TerminalWindow>
  </div>
</template>

<script setup lang="ts">
import TerminalWindow from '~/components/ui/TerminalWindow.vue'

const fullText = 'WELCOME TO THE LAB... INITIALIZING...'
const displayText = ref('')
const cursorOn = ref(true)

const bootAt = Date.now()
const uptime = computed(() => {
  const s = Math.floor((Date.now() - bootAt) / 1000)
  const hh = String(Math.floor(s / 3600)).padStart(2, '0')
  const mm = String(Math.floor((s % 3600) / 60)).padStart(2, '0')
  const ss = String(s % 60).padStart(2, '0')
  return `${hh}:${mm}:${ss}`
})

onMounted(() => {
  let idx = 0

  const typeInterval = window.setInterval(() => {
    displayText.value = fullText.slice(0, idx + 1)
    idx += 1
    if (idx >= fullText.length)
      window.clearInterval(typeInterval)
  }, 36)

  const cursorInterval = window.setInterval(() => {
    cursorOn.value = !cursorOn.value
  }, 480)

  onBeforeUnmount(() => {
    window.clearInterval(typeInterval)
    window.clearInterval(cursorInterval)
  })
})
</script>

