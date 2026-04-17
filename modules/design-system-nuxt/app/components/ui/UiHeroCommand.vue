<template>
  <section class="relative flex min-h-[530px] flex-col justify-center overflow-hidden border-b border-primary_fixed_dim/10 p-8 md:p-16">
    <span
      class="material-symbols-outlined pointer-events-none absolute bottom-0 right-0 hidden text-primary opacity-10 lg:block text-[400px]"
      style="font-variation-settings: 'FILL' 0, 'wght' 100, 'GRAD' 0, 'opsz' 24"
    >grid_view</span>
    <div class="absolute left-4 top-4 font-mono text-[10px] text-primary_fixed_dim/20">
      NOST-0034-X // BOOT_SEQUENCE
    </div>
    <div class="max-w-4xl">
      <div class="mb-6 flex items-center gap-2 text-primary_container">
        <span class="font-mono text-xs">&gt;&gt;</span>
        <span class="text-xs font-bold uppercase tracking-[0.3em]">Initializing Deep Systems</span>
      </div>
      <h2 class="mb-8 text-4xl font-black uppercase leading-tight tracking-tighter text-primary md:text-7xl">
        MISSION BRIEF:<br>
        <span class="bg-primary px-2 text-background">ARCHITECTING</span> SYSTEM<br>
        INTEGRATION_

        <span aria-hidden="true">{{ displayText }}</span>

        <span
          aria-hidden="true"
          class="ml-0.5 inline-block h-[1em] w-[0.65em] align-middle bg-primary_amber"
          :class="cursorOn ? 'opacity-100' : 'opacity-0'"
        />
      </h2>
      <p class="max-w-2xl text-lg font-light leading-relaxed text-primary/70 md:text-xl">
        DEPLOYING SCALABLE ARCHITECTURES ACROSS NEURAL NETWORKS AND DISTRIBUTED LEDGERS. OPERATING AT THE INTERSECTION OF RAW LOGIC AND HUMAN INTERFACE.
      </p>
      <div class="mt-12 flex flex-wrap gap-4">
        <UiButton>INITIALIZE_PROTOCOL</UiButton>
        <UiButton variant="secondary">
          VIEW_RAW_DATA
        </UiButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const fullText = 'MISSION BRIEF: ARCHITECTING SYSTEM INTEGRATION'
const displayText = ref('')
const cursorOn = ref(true)
let typeInterval: number | undefined
let cursorInterval: number | undefined

onMounted(() => {
  let idx = 0

  typeInterval = window.setInterval(() => {
    displayText.value = fullText.slice(0, idx + 1)
    idx += 1
    if (idx >= fullText.length)
      window.clearInterval(typeInterval)
  }, 36)

  cursorInterval = window.setInterval(() => {
    cursorOn.value = !cursorOn.value
  }, 480)
})

onBeforeUnmount(() => {
  if (typeInterval)
    window.clearInterval(typeInterval)
  if (cursorInterval)
    window.clearInterval(cursorInterval)
})
</script>