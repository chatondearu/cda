<script setup lang="ts">
export type HudFileTreeNodeType = 'folder' | 'file'

interface HudFileTreeNode {
  name: string
  type?: HudFileTreeNodeType
  children?: HudFileTreeNode[]
}

interface HudFileTreeEntry {
  key: string
  name: string
  type: HudFileTreeNodeType
  connector: string
}

interface Props {
  nodes: HudFileTreeNode[]
  root?: string
}

const props = defineProps<Props>()

function flattenNodes(nodes: HudFileTreeNode[], ancestry: string[]): HudFileTreeEntry[] {
  return nodes.flatMap((node, index) => {
    const isLast = index === nodes.length - 1
    const connector = `${ancestry.join('')}${isLast ? '\u2514\u2500 ' : '\u251C\u2500 '}`
    const entry: HudFileTreeEntry = {
      key: `${ancestry.join('')}-${node.name}-${index}`,
      name: node.name,
      type: node.type ?? 'file',
      connector,
    }

    const childEntries = node.children?.length
      ? flattenNodes(node.children, [...ancestry, isLast ? '   ' : '\u2502  '])
      : []

    return [entry, ...childEntries]
  })
}

const entries = computed(() => flattenNodes(props.nodes, []))
</script>

<template>
  <div class="inline-flex flex-col gap-1 border border-outline_variant/20 bg-surface_container_lowest px-3 py-2 font-mono text-[10px]">
    <span
      v-if="root"
      class="pb-1 uppercase tracking-widest text-primary/40"
    >{{ root }}</span>
    <div
      v-for="entry in entries"
      :key="entry.key"
      class="whitespace-pre"
    >
      <span class="text-primary/30">{{ entry.connector }}</span>
      <span :class="entry.type === 'folder' ? 'font-bold text-primary' : 'text-primary/70'">{{ entry.type === 'folder' ? `${entry.name}/` : entry.name }}</span>
    </div>
  </div>
</template>
