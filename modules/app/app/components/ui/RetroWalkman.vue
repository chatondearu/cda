<template>
  <aside class="ui-ghost-border bg-surface_container_lowest p-3">
    <div class="ui-micro text-primary_amber/60">
      REF-05/EASTER_EGG
    </div>

    <div class="mt-2 bg-surface p-3 ui-ghost-border">
      <div class="mb-2 flex items-center justify-between">
        <div class="ui-heading text-xs text-primary_amber">
          RETRO_WALKMAN
        </div>
        <div class="ui-micro text-primary_amber/40">
          VISUAL_ONLY
        </div>
      </div>

      <div class="relative grid h-20 grid-cols-2 items-center gap-3 bg-surface_container_highest px-4 py-2">
        <div class="pointer-events-none absolute inset-0 opacity-20">
          <div
            class="h-full w-full"
            style="background-image: repeating-linear-gradient(90deg, rgba(255, 186, 32, 0.25) 0, rgba(255, 186, 32, 0.25) 1px, transparent 1px, transparent 6px);"
          />
        </div>

        <div class="relative z-10 mx-auto h-12 w-12 rounded-full border-2 border-primary_amber/40">
          <div class="absolute left-1/2 top-1/2 h-3 w-1 -translate-x-1/2 -translate-y-1/2 bg-primary_amber/40" />
        </div>
        <div class="relative z-10 mx-auto h-12 w-12 rounded-full border-2 border-primary_amber/40">
          <div class="absolute left-1/2 top-1/2 h-3 w-1 -translate-x-1/2 -translate-y-1/2 bg-primary_amber/40" />
        </div>
      </div>

      <div class="mt-3 grid grid-cols-2 gap-2">
        <button
          type="button"
          class="ui-heading border border-outline bg-surface px-2 py-1 text-[10px] text-primary_amber hover:bg-surface_container_highest"
        >
          PLAY
        </button>
        <button
          type="button"
          class="ui-heading border border-outline bg-surface px-2 py-1 text-[10px] text-primary_amber hover:bg-surface_container_highest"
        >
          STOP
        </button>
      </div>
    </div>
  </aside>
</template>

