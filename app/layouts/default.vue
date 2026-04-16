<template>
  <div class="min-h-screen ui-surface">
    <header class="mx-auto max-w-6xl px-4 pt-6">
      <div class="bg-surface_container_lowest ui-ghost-border px-4 py-3">
        <div class="flex items-center justify-between gap-4">
          <div class="flex items-baseline gap-3">
            <div class="ui-heading text-primary_amber">CHATONDEARU_WEB</div>
            <div class="ui-micro text-primary_amber/60">REF-00/BOOT</div>
          </div>

          <nav class="flex gap-2 text-sm">
            <NuxtLink
              to="/"
              class="px-3 py-1 ui-heading text-primary_amber_soft hover:text-primary_amber"
              active-class="bg-surface_container_highest text-primary_amber"
            >
              LOGS
            </NuxtLink>
            <NuxtLink
              to="/lab"
              class="px-3 py-1 ui-heading text-primary_amber_soft hover:text-primary_amber"
              active-class="bg-surface_container_highest text-primary_amber"
            >
              THE LAB
            </NuxtLink>
            <NuxtLink
              to="/contact"
              class="px-3 py-1 ui-heading text-primary_amber_soft hover:text-primary_amber"
              active-class="bg-surface_container_highest text-primary_amber"
            >
              CONTACT
            </NuxtLink>
          </nav>
        </div>
      </div>
    </header>

    <main class="mx-auto max-w-6xl px-4 pb-12 pt-6">
      <div class="bg-surface_container_highest ui-ghost-border">
        <div class="flex items-center justify-between px-4 py-2">
          <div class="ui-micro text-primary_amber/60">SYS_MSG: READY</div>
          <div class="ui-micro text-primary_amber/30">NOST-0000-X</div>
        </div>

        <div class="px-4 py-6">
          <slot />
        </div>
      </div>
    </main>
  </div>
</template>

