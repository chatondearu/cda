<template>
  <section class="border-t border-primary/20 bg-surface_container p-8 md:p-16">
    <div class="relative mx-auto max-w-xl border-4 border-surface_variant bg-surface_container_lowest p-8 shadow-[0_0_40px_rgb(var(--inverse-on-surface)/50%)]">
      <div class="absolute -top-3 left-10 bg-surface_container_lowest px-2 text-[10px] font-bold uppercase text-primary/60">
        CASSETTE_INT // ANALOG_LOG
      </div>
      <div class="flex flex-col gap-6">
        <div class="relative flex h-32 items-center justify-around overflow-hidden rounded-sm border-2 border-primary/20 bg-background px-8">
          <div class="pointer-events-none absolute inset-0 opacity-10">
            <div
              class="h-full w-full"
              style="background-image: repeating-linear-gradient(0deg, rgb(var(--primary-fixed-dim)) 0px, rgb(var(--primary-fixed-dim)) 1px, transparent 1px, transparent 4px);"
            />
          </div>
          <div class="flex h-20 w-20 animate-[spin_10s_linear_infinite] items-center justify-center rounded-full border-4 border-primary/40">
            <div class="h-6 w-2 bg-primary/40" />
          </div>
          <div class="flex h-20 w-20 animate-[spin_10s_linear_infinite] items-center justify-center rounded-full border-4 border-primary/40">
            <div class="h-6 w-2 bg-primary/40" />
          </div>
        </div>
        <div class="grid grid-cols-5 gap-2">
          <button
            type="button"
            class="flex aspect-square items-center justify-center border-b-4 border-inverse-on-surface bg-surface_variant transition-all active:translate-y-1 active:border-b-0"
          >
            <UiMaterialIcon
              name="square"
              filled
              size-class="text-primary"
            />
          </button>
          <button
            type="button"
            class="flex aspect-square items-center justify-center border-b-4 border-inverse-on-surface bg-surface_variant transition-all active:translate-y-1 active:border-b-0"
          >
            <UiMaterialIcon
              name="play_arrow"
              filled
              size-class="text-primary"
            />
          </button>
          <button
            type="button"
            class="flex aspect-square items-center justify-center border-b-4 border-inverse-on-surface bg-surface_variant transition-all active:translate-y-1 active:border-b-0"
          >
            <UiMaterialIcon
              name="fast_rewind"
              filled
              size-class="text-primary"
            />
          </button>
          <button
            type="button"
            class="flex aspect-square items-center justify-center border-b-4 border-inverse-on-surface bg-surface_variant transition-all active:translate-y-1 active:border-b-0"
          >
            <UiMaterialIcon
              name="fast_forward"
              filled
              size-class="text-primary"
            />
          </button>
          <button
            type="button"
            class="flex aspect-square items-center justify-center border-b-4 border-inverse-on-surface bg-error_container transition-all active:translate-y-1 active:border-b-0"
          >
            <div class="h-3 w-3 rounded-full bg-on_error_container" />
          </button>
        </div>
        <UiProgressReadout
          label="TRACK_04: INTERVIEW_DATA.LOG"
          value="04:21 / 12:00"
          :progress="33"
        />
      </div>
    </div>
  </section>
</template>
