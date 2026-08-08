<template>
  <component
    :is="as"
    ref="targetRef"
    v-bind="attrs"
  />

  <span
    ref="sourceRef"
    aria-hidden="true"
    class="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
  >
    <slot v-if="hasSlotContent" />
    <template v-else>{{ text }}</template>
  </span>
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

interface Props {
  as?: string
  text?: string
  speed?: number
  cursor?: boolean
  cursorClass?: string
  cursorInterval?: number
}

const props = withDefaults(defineProps<Props>(), {
  as: 'span',
  text: '',
  speed: 36,
  cursor: true,
  cursorClass: 'ml-0.5 inline-block h-[1em] w-[0.65em] align-middle bg-primary_amber',
  cursorInterval: 480,
})

const slots = useSlots()
const attrs = useAttrs()

const sourceRef = ref<HTMLElement>()
const targetRef = ref<HTMLElement>()
const hasSlotContent = computed(() => Boolean(slots.default?.().length))

let typingTimer: number | undefined
let blinkTimer: number | undefined
let cursorEl: HTMLSpanElement | undefined

function clearTimers() {
  if (typingTimer) {
    window.clearInterval(typingTimer)
    typingTimer = undefined
  }

  if (blinkTimer) {
    window.clearInterval(blinkTimer)
    blinkTimer = undefined
  }
}

function setupCursor(target: HTMLElement) {
  if (!props.cursor)
    return

  cursorEl = document.createElement('span')
  cursorEl.setAttribute('aria-hidden', 'true')
  cursorEl.className = props.cursorClass
  target.append(cursorEl)

  blinkTimer = window.setInterval(() => {
    cursorEl?.classList.toggle('opacity-0')
  }, props.cursorInterval)
}

function moveCursorAfterNode(node: Node) {
  if (!cursorEl || !node.parentNode)
    return

  node.parentNode.insertBefore(cursorEl, node.nextSibling)
}

function startTyping() {
  const source = sourceRef.value
  const target = targetRef.value

  if (!source || !target)
    return

  clearTimers()
  target.innerHTML = source.innerHTML
  const stableHeight = target.offsetHeight
  if (stableHeight > 0)
    target.style.minHeight = `${stableHeight}px`

  const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT)
  const nodes: Text[] = []
  let currentNode = walker.nextNode()

  while (currentNode) {
    nodes.push(currentNode as Text)
    currentNode = walker.nextNode()
  }

  const segments = nodes.map((node) => {
    const value = node.nodeValue ?? ''
    node.nodeValue = ''
    const wrappers: HTMLElement[] = []
    let parent = node.parentElement
    while (parent && parent !== target) {
      wrappers.push(parent)
      parent = parent.parentElement
    }
    return { node, value, wrappers }
  })

  const pendingWrappers = new Set<HTMLElement>()
  segments.forEach((segment) => {
    segment.wrappers.forEach((wrapper) => {
      pendingWrappers.add(wrapper)
    })
  })
  pendingWrappers.forEach((wrapper) => {
    wrapper.style.opacity = '0'
  })

  setupCursor(target)
  if (segments[0]?.node)
    moveCursorAfterNode(segments[0].node)

  let segmentIndex = 0
  let charIndex = 0

  typingTimer = window.setInterval(() => {
    if (segmentIndex >= segments.length) {
      if (typingTimer) {
        window.clearInterval(typingTimer)
        typingTimer = undefined
      }
      target.style.minHeight = ''
      return
    }

    const segment = segments[segmentIndex]
    if (!segment)
      return

    segment.wrappers.forEach((wrapper) => {
      if (pendingWrappers.has(wrapper)) {
        wrapper.style.opacity = ''
        pendingWrappers.delete(wrapper)
      }
    })

    segment.node.nodeValue = segment.value.slice(0, charIndex + 1)
    moveCursorAfterNode(segment.node)
    charIndex += 1

    if (charIndex >= segment.value.length) {
      segmentIndex += 1
      charIndex = 0
    }
  }, props.speed)
}

onMounted(async () => {
  await nextTick()
  startTyping()
})

watch(
  () => props.text,
  async () => {
    await nextTick()
    startTyping()
  },
)

onBeforeUnmount(() => {
  clearTimers()
})
</script>
