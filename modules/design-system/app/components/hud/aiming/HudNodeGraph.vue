<script setup lang="ts">
interface HudNodeGraphNode {
  id: string
  label: string
}

interface Props {
  nodes: HudNodeGraphNode[]
  activeId?: string
}

const props = defineProps<Props>()

function isActive(id: string): boolean {
  return id === props.activeId
}

function isLinkActive(index: number): boolean {
  const current = props.nodes[index]
  const next = props.nodes[index + 1]
  return Boolean((current && isActive(current.id)) || (next && isActive(next.id)))
}
</script>

<template>
  <div class="flex items-stretch gap-0 overflow-x-auto">
    <template
      v-for="(node, index) in nodes"
      :key="node.id"
    >
      <div
        class="flex min-w-16 shrink-0 flex-col items-center gap-0.5 border px-2 py-1.5"
        :class="isActive(node.id) ? 'border-primary bg-primary/10 text-primary' : 'border-outline_variant/30 text-primary/40'"
      >
        <span class="font-mono text-[7px] uppercase tracking-widest opacity-60">{{ index === 0 ? 'CORE' : 'NODE' }}</span>
        <span class="font-mono text-[10px] uppercase tracking-widest">{{ node.label }}</span>
        <span class="font-mono text-[7px] uppercase tracking-widest opacity-40">{{ node.id }}</span>
      </div>

      <div
        v-if="index < nodes.length - 1"
        class="relative flex min-w-6 flex-1 items-center justify-center"
      >
        <span
          class="hud-motion-target hud-anim-tick-active h-px w-full"
          :class="isLinkActive(index) ? 'bg-primary' : 'bg-outline_variant/30'"
        />
        <span class="absolute -top-2.5 whitespace-nowrap font-mono text-[6px] uppercase tracking-widest text-primary/30">LINK</span>
      </div>
    </template>
  </div>
</template>
