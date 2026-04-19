import type { TimelineItem } from '../../../design-system-nuxt/app/composables/useSystemData'

export interface CareerProfileLink {
  id: string
  label: string
  url: string
}

/** Optional contact / identity from runtime env — passed from the career page only */
export interface CareerContactDetails {
  fullName?: string
  email?: string
  phone?: string
  location?: string
}

/** Dark theme tokens from design-system.css (:root.dark), RGB 0–255 */
const C = {
  background: [19, 19, 19] as const,
  surfaceLow: [28, 27, 27] as const,
  onSurface: [229, 226, 225] as const,
  onSurfaceVariant: [213, 196, 171] as const,
  primary: [255, 220, 161] as const,
  primaryDim: [255, 186, 32] as const,
  onPrimary: [65, 45, 0] as const,
  outline: [158, 143, 120] as const,
  outlineVariant: [81, 69, 50] as const,
} as const

const PAGE_W = 210
const PAGE_H = 297
const MARGIN_X = 16
const MARGIN_RIGHT = 16
const CONTENT_W = PAGE_W - MARGIN_X - MARGIN_RIGHT
/**
 * Max baseline Y for body content on a page (A4 297mm).
 * Footer rule ~281, footer text 286 — keep margin so entries are not clipped.
 */
const CONTENT_MAX_Y = 274
const LINE_MM = 4.9
/** Hero band height (mm); grows if the main title wraps to several lines */
const HEAD_HERO_H_BASE = 30
const HERO_TITLE_LINE_STEP_MM = 6.5

const TEXT_INDENT = MARGIN_X + 11
const TIMELINE_X = MARGIN_X + 5
const INNER_W = CONTENT_W - 14

/** Horizontal inset for outbound panel (symmetric) */
const OUTBOUND_PAD = 5
/** Inner width for link URLs inside outbound panel */
const OUTBOUND_URL_W = CONTENT_W - OUTBOUND_PAD * 2 - 8
/** Gap between Direct comms and Outbound columns (mm) */
const COL_GAP_MM = 5

/** Dot-grid panel chrome (clinical readout, matches site dot-grid) */
const DOT_GRID_STEP_MM = 3
const DOT_RADIUS_MM = 0.16
const DOT_GRID_INSET_MM = 0.5

const FS = {
  heroKicker: 8,
  heroTitle: 15,
  disclaimer: 7.5,
  stamp: 8,
  moduleCode: 7.5,
  sectionTitle: 11,
  body: 9.5,
  small: 8.5,
  footer: 7,
  tag: 7.5,
} as const

/** Client-only: A4 PDF styled like the site (dark clinical / cassette-tech) */
export async function downloadCareerPdf(
  items: TimelineItem[],
  links: CareerProfileLink[],
  contact?: CareerContactDetails,
): Promise<void> {
  if (typeof window === 'undefined')
    return

  const { jsPDF } = await import('jspdf')
  // eslint-disable-next-line new-cap
  const doc = new jsPDF({ unit: 'mm', format: 'a4', compress: true })

  let pageTotal = 1
  let y = 0

  function setFill(rgb: readonly [number, number, number]): void {
    doc.setFillColor(rgb[0], rgb[1], rgb[2])
  }

  function setText(rgb: readonly [number, number, number]): void {
    doc.setTextColor(rgb[0], rgb[1], rgb[2])
  }

  function setDraw(rgb: readonly [number, number, number], width = 0.25): void {
    doc.setDrawColor(rgb[0], rgb[1], rgb[2])
    doc.setLineWidth(width)
  }

  function paintPageBackground(): void {
    setFill(C.background)
    doc.rect(0, 0, PAGE_W, PAGE_H, 'F')
  }

  function drawHeroHeader(stamp: string, subjectFullName?: string): void {
    const namePart = subjectFullName?.trim()
    const titleMain = namePart
      ? `${namePart.toUpperCase()}  [ EMPLOYMENT_TIMELINE ]`
      : 'EMPLOYMENT_TIMELINE'

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(FS.heroTitle)
    const titleMaxW = CONTENT_W
    const titleLines = doc.splitTextToSize(titleMain, titleMaxW)

    const titleFirstBaseline = 20
    const lastBaseline = titleFirstBaseline + Math.max(0, titleLines.length - 1) * HERO_TITLE_LINE_STEP_MM
    const heroH = Math.max(HEAD_HERO_H_BASE, lastBaseline + 8)

    setFill(C.primaryDim)
    doc.rect(0, 0, PAGE_W, heroH, 'F')
    setDraw(C.outlineVariant, 0.2)
    doc.line(0, heroH, PAGE_W, heroH)

    doc.setFont('courier', 'normal')
    setText(C.onPrimary)
    doc.setFontSize(FS.heroKicker)
    doc.text('NOST-0034-X // SIDE_CHANNEL · UNLISTED · CAREER_LOG', MARGIN_X, 11)

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(FS.heroTitle)
    setText(C.onPrimary)
    for (let i = 0; i < titleLines.length; i++) {
      doc.text(titleLines[i]!, MARGIN_X, titleFirstBaseline + i * HERO_TITLE_LINE_STEP_MM)
    }

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(FS.stamp)
    doc.text(`EXPORT_STAMP_UTC ${stamp}`, PAGE_W - MARGIN_RIGHT, 11, { align: 'right' })

    y = heroH + 9
  }

  function drawContinuationHeader(): void {
    setFill(C.primaryDim)
    doc.rect(0, 0, PAGE_W, 2.8, 'F')
    doc.setFont('courier', 'normal')
    setText(C.onSurfaceVariant)
    doc.setFontSize(FS.moduleCode)
    doc.text('… CAREER_LOG (continuation)', MARGIN_X, 9)
    y = 14
  }

  function newContentPage(): void {
    doc.addPage()
    pageTotal += 1
    paintPageBackground()
    drawContinuationHeader()
  }

  /** Reserve vertical space when height is expressed in line increments (legacy helper). */
  function ensureSpace(linesNeeded: number): void {
    const needMm = linesNeeded * LINE_MM
    ensureVerticalSpaceMm(needMm)
  }

  /** Precise check: millimetres of vertical space still available above footer zone. */
  function ensureVerticalSpaceMm(minHeightMm: number): void {
    if (y + minHeightMm > CONTENT_MAX_Y)
      newContentPage()
  }

  function writeWrappedLines(lines: string[], x: number, leading = LINE_MM): void {
    for (const line of lines) {
      if (y + leading > CONTENT_MAX_Y)
        newContentPage()
      doc.text(line, x, y)
      y += leading
    }
  }

  /** Accent bar + module code + section title + rule (UiSectionHeader-style) */
  function drawSectionHeader(
    code: string,
    title: string,
    opts?: { gapAfterRuleMm?: number },
  ): void {
    ensureSpace(10)

    const bandTop = y - 1.5
    setFill(C.primaryDim)
    doc.rect(MARGIN_X, bandTop, 2.8, 11, 'F')

    doc.setFont('courier', 'normal')
    setText(C.primaryDim)
    doc.setFontSize(FS.moduleCode)
    doc.text(code, MARGIN_X + 5, y + 2.5)

    doc.setFont('helvetica', 'bold')
    setText(C.primary)
    doc.setFontSize(FS.sectionTitle)
    doc.text(title.toUpperCase(), MARGIN_X + 5, y + 8)

    y += 13
    setDraw(C.outlineVariant, 0.35)
    doc.line(MARGIN_X, y, PAGE_W - MARGIN_RIGHT, y)
    const gapAfter = opts?.gapAfterRuleMm ?? LINE_MM * 1.4
    y += gapAfter
    setText(C.onSurface)
  }

  interface ContactRow {
    label: string
    value: string
  }

  function buildContactRows(c: CareerContactDetails | undefined): ContactRow[] {
    if (!c)
      return []
    const rows: ContactRow[] = []
    const email = c.email?.trim()
    const phone = c.phone?.trim()
    const location = c.location?.trim()
    if (email)
      rows.push({ label: 'EMAIL', value: email })
    if (phone)
      rows.push({ label: 'PHONE', value: phone })
    if (location)
      rows.push({ label: 'LOCATION', value: location })
    return rows
  }

  function estimateContactPanelHeight(rows: ContactRow[], urlWrapW: number): number {
    let h = LINE_MM * 1.4
    for (const row of rows) {
      const lines = doc.splitTextToSize(row.value, urlWrapW)
      h += LINE_MM + lines.length * LINE_MM + LINE_MM * 0.18
    }
    return h
  }

  /** Draw wrapped lines without advancing global layout cursor (panel-local coordinates). */
  function flushLinesLocal(lines: string[], x: number, py: number): number {
    let p = py
    for (const line of lines) {
      doc.text(line, x, p)
      p += LINE_MM
    }
    return p
  }

  /** Subtle dot grid inside panel bounds (drawn before text). */
  function drawDotGridBackground(
    panelLeft: number,
    panelTop: number,
    panelW: number,
    panelH: number,
  ): void {
    setFill(C.outlineVariant)
    const x0 = panelLeft + DOT_GRID_INSET_MM
    const y0 = panelTop + DOT_GRID_INSET_MM
    const x1 = panelLeft + panelW - DOT_GRID_INSET_MM
    const y1 = panelTop + panelH - DOT_GRID_INSET_MM
    for (let gx = x0; gx <= x1; gx += DOT_GRID_STEP_MM) {
      for (let gy = y0; gy <= y1; gy += DOT_GRID_STEP_MM) {
        doc.circle(gx, gy, DOT_RADIUS_MM, 'F')
      }
    }
  }

  /** Bottom accent only — primary token, no full box stroke */
  function drawPanelBottomBorder(
    panelLeft: number,
    panelTop: number,
    panelW: number,
    panelH: number,
  ): void {
    const yLine = panelTop + panelH
    setDraw(C.primary, 0.55)
    doc.line(panelLeft, yLine, panelLeft + panelW, yLine)
  }

  function drawContactPanelCore(
    panelTop: number,
    panelLeft: number,
    panelW: number,
    urlWrapW: number,
    rows: ContactRow[],
  ): void {
    const panelH = estimateContactPanelHeight(rows, urlWrapW)
    drawDotGridBackground(panelLeft, panelTop, panelW, panelH)

    let py = panelTop + LINE_MM * 1.4
    const xl = panelLeft + 4

    for (const row of rows) {
      doc.setFont('helvetica', 'bold')
      setText(C.primary)
      doc.setFontSize(FS.body)
      doc.text(row.label, xl, py)
      py += LINE_MM

      doc.setFont('courier', 'normal')
      setText(C.primaryDim)
      doc.setFontSize(FS.small)
      const valueLines = doc.splitTextToSize(row.value, urlWrapW)
      py = flushLinesLocal(valueLines, xl, py)
      setText(C.onSurface)
      py += LINE_MM * 0.18
    }

    drawPanelBottomBorder(panelLeft, panelTop, panelW, panelH)
  }

  function estimateLinksPanelHeight(linksList: CareerProfileLink[], urlWrapW: number): number {
    let h = LINE_MM * 1.4
    for (const link of linksList) {
      const urlLines = doc.splitTextToSize(link.url, urlWrapW)
      h += LINE_MM + urlLines.length * LINE_MM + LINE_MM * 0.18
    }
    return h
  }

  function drawLinksPanelCore(
    panelTop: number,
    panelLeft: number,
    panelW: number,
    urlWrapW: number,
    linksList: CareerProfileLink[],
  ): void {
    const panelH = estimateLinksPanelHeight(linksList, urlWrapW)
    drawDotGridBackground(panelLeft, panelTop, panelW, panelH)

    let py = panelTop + LINE_MM * 1.4
    const xl = panelLeft + 4

    for (const link of linksList) {
      doc.setFont('helvetica', 'bold')
      setText(C.primary)
      doc.setFontSize(FS.body)
      doc.text(link.label.toUpperCase(), xl, py)
      py += LINE_MM

      doc.setFont('courier', 'normal')
      setText(C.primaryDim)
      doc.setFontSize(FS.small)
      const urlLines = doc.splitTextToSize(link.url, urlWrapW)
      py = flushLinesLocal(urlLines, xl, py)
      setText(C.onSurface)
      py += LINE_MM * 0.18
    }

    drawPanelBottomBorder(panelLeft, panelTop, panelW, panelH)
  }

  function drawTwinSectionHeaders(
    baseY: number,
    halfContentW: number,
    col2Left: number,
    gapAfterRuleMm: number,
  ): number {
    const bandTop = baseY - 1.5
    setFill(C.primaryDim)
    doc.rect(MARGIN_X, bandTop, 2.8, 11, 'F')
    doc.rect(col2Left, bandTop, 2.8, 11, 'F')

    doc.setFont('courier', 'normal')
    setText(C.primaryDim)
    doc.setFontSize(FS.moduleCode)
    doc.text('MODULE_01A', MARGIN_X + 5, baseY + 2.5)
    doc.text('MODULE_01B', col2Left + 5, baseY + 2.5)

    doc.setFont('helvetica', 'bold')
    setText(C.primary)
    doc.setFontSize(FS.sectionTitle)
    doc.text('DIRECT COMMS', MARGIN_X + 5, baseY + 8)
    doc.text('OUTBOUND CHANNELS', col2Left + 5, baseY + 8)

    const ruleY = baseY + 13
    setDraw(C.outlineVariant, 0.35)
    doc.line(MARGIN_X, ruleY, MARGIN_X + halfContentW, ruleY)
    doc.line(col2Left, ruleY, col2Left + halfContentW, ruleY)

    return 13 + gapAfterRuleMm
  }

  /** Side-by-side Direct comms + Outbound (saves vertical space). */
  function drawTwinCommsAndOutbound(
    contactRows: ContactRow[],
    linksList: CareerProfileLink[],
  ): void {
    const halfContentW = (CONTENT_W - COL_GAP_MM) / 2
    const col2Left = MARGIN_X + halfContentW + COL_GAP_MM

    const panel1Left = MARGIN_X + OUTBOUND_PAD
    const panel1W = halfContentW - OUTBOUND_PAD * 2
    const urlW1 = panel1W - 8

    const panel2Left = col2Left + OUTBOUND_PAD
    const panel2W = halfContentW - OUTBOUND_PAD * 2
    const urlW2 = panel2W - 8

    const h1 = estimateContactPanelHeight(contactRows, urlW1)
    const h2 = estimateLinksPanelHeight(linksList, urlW2)
    const panelBlockH = Math.max(h1, h2)

    const gapRule = LINE_MM * 0.45

    ensureVerticalSpaceMm(13 + gapRule + panelBlockH + LINE_MM * 0.55 + LINE_MM * 1.4)

    const baseY = y
    const headerDepth = drawTwinSectionHeaders(baseY, halfContentW, col2Left, gapRule)

    const panelTop = baseY + headerDepth

    drawContactPanelCore(panelTop, panel1Left, panel1W, urlW1, contactRows)
    drawLinksPanelCore(panelTop, panel2Left, panel2W, urlW2, linksList)

    y = panelTop + panelBlockH + LINE_MM * 0.55 + LINE_MM * 0.77
  }

  function drawLinksPanelFullWidth(linksList: CareerProfileLink[]): void {
    if (linksList.length === 0)
      return

    const urlW = OUTBOUND_URL_W
    const panelH = estimateLinksPanelHeight(linksList, urlW)
    ensureVerticalSpaceMm(panelH + LINE_MM * 0.55)

    const panelTop = y
    const panelLeft = MARGIN_X + OUTBOUND_PAD
    const panelW = CONTENT_W - OUTBOUND_PAD * 2

    drawLinksPanelCore(panelTop, panelLeft, panelW, urlW, linksList)

    y = panelTop + panelH + LINE_MM * 0.55
  }

  /**
   * Height (mm) from entryTop to final y after this entry — must match drawTimelineEntry().
   * entryTop = y at block start (same as marker anchor row).
   */
  function estimateTimelineEntryHeightMm(item: TimelineItem): number {
    const descLines = doc.splitTextToSize(item.description, INNER_W - 8)
    const tagLines = doc.splitTextToSize(item.tags.join('  ·  '), INNER_W - 10)
    const headMm
      = 3
        + LINE_MM * (1.05 + 1.05 + 1 + 1.05 + 0.5 + 1.4)
    const bodyMm = (descLines.length + tagLines.length) * LINE_MM
    return headMm + bodyMm
  }

  function drawTimelineEntry(item: TimelineItem, index: number): void {
    const descLines = doc.splitTextToSize(item.description, INNER_W - 8)
    const tagLines = doc.splitTextToSize(item.tags.join('  ·  '), INNER_W - 10)
    ensureVerticalSpaceMm(estimateTimelineEntryHeightMm(item))

    const entryTop = y
    const markerCy = entryTop + 2

    setFill(C.primaryDim)
    doc.circle(TIMELINE_X, markerCy, 1.45, 'F')
    setDraw(C.background, 0.35)
    doc.circle(TIMELINE_X, markerCy, 1.45, 'S')

    const idxBaseline = entryTop + 3
    doc.setFont('courier', 'normal')
    setText(C.primaryDim)
    doc.setFontSize(FS.moduleCode)
    doc.text(`IDX_${String(index + 1).padStart(2, '0')}`, TEXT_INDENT, idxBaseline)

    const periodBaseline = idxBaseline + LINE_MM * 1.05
    doc.setFont('helvetica', 'bold')
    setText(C.onSurface)
    doc.setFontSize(FS.small)
    doc.text(item.period, TEXT_INDENT, periodBaseline)

    y = periodBaseline + LINE_MM * 1.05

    doc.setFontSize(FS.body + 0.5)
    doc.text(item.title, TEXT_INDENT, y)
    y += LINE_MM

    doc.setFont('helvetica', 'italic')
    setText(C.onSurfaceVariant)
    doc.setFontSize(FS.small)
    doc.text(item.reference, TEXT_INDENT, y)
    y += LINE_MM * 1.05

    doc.setFont('helvetica', 'normal')
    setText(C.onSurface)
    doc.setFontSize(FS.body)
    writeWrappedLines(descLines, TEXT_INDENT)

    y += LINE_MM * 0.5

    doc.setFont('courier', 'normal')
    setText(C.primaryDim)
    doc.setFontSize(FS.tag)
    writeWrappedLines(tagLines, TEXT_INDENT)
    setText(C.onSurface)

    const spineBottom = y - LINE_MM * 0.5
    setDraw(C.outlineVariant, 0.28)
    doc.line(TIMELINE_X, markerCy + 2, TIMELINE_X, Math.max(spineBottom, markerCy + 5))

    y += LINE_MM * 0.77
  }

  function drawFooters(totalPages: number): void {
    for (let p = 1; p <= totalPages; p++) {
      doc.setPage(p)
      const footerY = PAGE_H - 11
      setDraw(C.outlineVariant, 0.22)
      doc.line(MARGIN_X, footerY - 5, PAGE_W - MARGIN_RIGHT, footerY - 5)

      doc.setFont('courier', 'normal')
      setText(C.outline)
      doc.setFontSize(FS.footer)
      doc.text('CDA_LAB // LOGICAL MACHINE · CASSETTE_FUTURISM_EXPORT', MARGIN_X, footerY)

      doc.text(
        `PAGE_${String(p).padStart(2, '0')}/${String(totalPages).padStart(2, '0')}`,
        PAGE_W - MARGIN_RIGHT,
        footerY,
        { align: 'right' },
      )
    }
  }

  const stamp = new Date().toISOString().slice(0, 10)

  paintPageBackground()
  drawHeroHeader(stamp, contact?.fullName)

  doc.setFont('courier', 'normal')
  setText(C.onSurfaceVariant)
  doc.setFontSize(FS.disclaimer)
  doc.text(
    'PRIVATE CHANNEL · NO INDEX · SHARE URL ONLY WITH TRUSTED RECIPIENTS',
    MARGIN_X,
    y,
  )
  y += LINE_MM * 2.2

  const contactRows = buildContactRows(contact)
  if (contactRows.length > 0) {
    drawTwinCommsAndOutbound(contactRows, links)
  }
  else {
    drawSectionHeader('MODULE_01B', 'Outbound channels', {
      gapAfterRuleMm: LINE_MM * 0.45,
    })
    drawLinksPanelFullWidth(links)
    y += LINE_MM * 1.4
  }

  drawSectionHeader('MODULE_02', 'Logic flow chrono')
  doc.setFont('courier', 'normal')
  setText(C.outline)
  doc.setFontSize(FS.moduleCode)
  doc.text(`TOTAL_ENTRIES: ${String(items.length).padStart(2, '0')}`, TIMELINE_X + 6, y)
  y += LINE_MM * 1.4

  items.forEach((item, i) => drawTimelineEntry(item, i))

  drawFooters(pageTotal)

  doc.save(`career-export_${stamp}.pdf`)
}
