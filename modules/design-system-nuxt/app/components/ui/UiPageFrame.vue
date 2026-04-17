<template>
  <div class="relative min-h-screen bg-background font-sans text-primary selection:bg-primary_fixed_dim selection:text-background dot-grid scanline">
    <div class="pointer-events-none fixed left-4 top-20 z-30 font-mono text-[8px] text-primary/10">
      + 00.12.91
    </div>
    <div class="pointer-events-none fixed bottom-20 right-4 z-30 font-mono text-[8px] text-primary/10">
      + FF.00.AE
    </div>
    <div class="relative z-10">
      <slot />
    </div>
  </div>
</template>
