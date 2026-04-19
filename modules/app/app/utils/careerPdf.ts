import type { TimelineItem } from '../../../design-system-nuxt/app/composables/useSystemData'

export interface CareerProfileLink {
  id: string
  label: string
  url: string
}

const PAGE_BOTTOM_MM = 277
const MARGIN_X = 20
const CONTENT_WIDTH_MM = 170
const LINE_MM = 5
const TITLE_SIZE = 16
const HEADING_SIZE = 11
const BODY_SIZE = 10
const SMALL_SIZE = 9

/** Client-only: builds A4 PDF with employment timeline + profile links */
export async function downloadCareerPdf(
  items: TimelineItem[],
  links: CareerProfileLink[],
): Promise<void> {
  if (typeof window === 'undefined')
    return

  const { jsPDF } = await import('jspdf')
  // jsPDF class is exported with camelCase (library API)
  // eslint-disable-next-line new-cap
  const doc = new jsPDF({ unit: 'mm', format: 'a4', compress: true })

  let y = MARGIN_X

  /** Writes lines with automatic page breaks */
  function writeWrappedLines(lines: string[], x: number): void {
    for (const line of lines) {
      if (y + LINE_MM > PAGE_BOTTOM_MM) {
        doc.addPage()
        y = MARGIN_X
      }
      doc.text(line, x, y)
      y += LINE_MM
    }
  }

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(TITLE_SIZE)
  doc.text('Export parcours professionnel (canal privé)', MARGIN_X, y)
  y += LINE_MM * 2

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(SMALL_SIZE)
  doc.setTextColor(80)
  const stamp = new Date().toISOString().slice(0, 10)
  doc.text(`Généré le ${stamp}`, MARGIN_X, y)
  y += LINE_MM * 2
  doc.setTextColor(0)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(HEADING_SIZE)
  doc.text('Liens professionnels', MARGIN_X, y)
  y += LINE_MM * 1.5

  doc.setFontSize(BODY_SIZE)
  for (const link of links) {
    doc.setFont('helvetica', 'bold')
    if (y + LINE_MM > PAGE_BOTTOM_MM) {
      doc.addPage()
      y = MARGIN_X
    }
    doc.text(link.label, MARGIN_X, y)
    y += LINE_MM

    doc.setFont('helvetica', 'normal')
    doc.setTextColor(20, 80, 160)
    const urlLines = doc.splitTextToSize(link.url, CONTENT_WIDTH_MM)
    writeWrappedLines(urlLines, MARGIN_X)
    doc.setTextColor(0)
    y += LINE_MM * 0.5
  }

  y += LINE_MM * 1.5

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(HEADING_SIZE)
  doc.text('Parcours', MARGIN_X, y)
  y += LINE_MM * 2

  for (const item of items) {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(BODY_SIZE)
    if (y + LINE_MM > PAGE_BOTTOM_MM) {
      doc.addPage()
      y = MARGIN_X
    }
    doc.text(item.period, MARGIN_X, y)
    y += LINE_MM

    if (y + LINE_MM > PAGE_BOTTOM_MM) {
      doc.addPage()
      y = MARGIN_X
    }
    doc.text(item.title, MARGIN_X, y)
    y += LINE_MM

    doc.setFont('helvetica', 'italic')
    doc.setFontSize(SMALL_SIZE)
    if (y + LINE_MM > PAGE_BOTTOM_MM) {
      doc.addPage()
      y = MARGIN_X
    }
    doc.text(item.reference, MARGIN_X, y)
    y += LINE_MM * 1.2

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(BODY_SIZE)
    const descLines = doc.splitTextToSize(item.description, CONTENT_WIDTH_MM)
    writeWrappedLines(descLines, MARGIN_X)
    y += LINE_MM * 0.5

    doc.setFontSize(SMALL_SIZE)
    doc.setTextColor(60)
    const tagLine = item.tags.join(' · ')
    const tagWrapped = doc.splitTextToSize(tagLine, CONTENT_WIDTH_MM)
    writeWrappedLines(tagWrapped, MARGIN_X)
    doc.setTextColor(0)
    y += LINE_MM * 2
  }

  const filename = `career-export_${stamp}.pdf`
  doc.save(filename)
}
