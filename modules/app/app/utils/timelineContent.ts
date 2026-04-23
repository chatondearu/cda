interface ContentNode {
  type?: string
  value?: string
  children?: ContentNode[]
}

interface TimelineBodyLike {
  body?: unknown
}

/**
 * True only when markdown contains meaningful body content.
 * Heading-only pages should not expose "see more".
 */
export function hasMeaningfulTimelineBody(doc: TimelineBodyLike): boolean {
  const root = doc.body as ContentNode | undefined
  if (!root?.children?.length)
    return false

  const hasNonEmptyText = (node: ContentNode): boolean => {
    if (node.type === 'text')
      return Boolean(node.value?.trim())
    return (node.children ?? []).some(hasNonEmptyText)
  }

  return root.children.some((node) => {
    if (node.type === 'heading')
      return false
    if (node.type === 'thematicBreak')
      return false
    return hasNonEmptyText(node)
  })
}
