<script setup lang="ts">
type BracketStyle = 'square' | 'angle' | 'lenticular'

interface BracketPair {
  open: string
  close: string
}

interface Props {
  word: string
  bracket?: BracketStyle
}

const props = withDefaults(defineProps<Props>(), {
  bracket: 'square',
})

function resolvePair(bracket: BracketStyle): BracketPair {
  switch (bracket) {
    case 'square':
      return { open: '[', close: ']' }
    case 'angle':
      return { open: '<', close: '>' }
    case 'lenticular':
      return { open: '【', close: '】' }
    default: {
      const exhaustiveCheck: never = bracket
      return exhaustiveCheck
    }
  }
}

const pair = computed(() => resolvePair(props.bracket))
</script>

<template>
  <span class="font-mono text-xs font-bold uppercase tracking-widest text-primary">
    <span class="text-primary/40">{{ pair.open }}</span>{{ word }}<span class="text-primary/40">{{ pair.close }}</span>
  </span>
</template>
