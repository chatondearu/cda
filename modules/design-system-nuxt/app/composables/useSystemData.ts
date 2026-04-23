export interface NavItem {
  label: string
  to: string
  icon: string
  dockLabel: string
}

export interface TimelineItem {
  period: string
  title: string
  reference: string
  description: string
  tags: string[]
  /** Matches prototype alternating columns / markers */
  layout: 'a' | 'b'
  /** Optional detail page path (display "see more" only when available). */
  detailsPath?: string
}

export interface ArchiveItem {
  slug: string
  capsule: string
  title: string
  status: 'nominal' | 'unfinished'
  description: string
  tech: string
  image: string
  repoUrl: string
  projectUrl: string
  githubTopics: string[]
  githubPinned: boolean
  tier: 'featured' | 'other'
}

export function useSystemData() {
  const { t } = useI18n()

  const navItems = computed<NavItem[]>(() => [
    { label: t('nav.home'), to: '/', icon: 'home', dockLabel: t('nav.dock.home') },
    { label: t('nav.timeline'), to: '/timeline', icon: 'timeline', dockLabel: t('nav.dock.timeline') },
    { label: t('nav.archive'), to: '/archive', icon: 'inventory_2', dockLabel: t('nav.dock.archive') },
    { label: t('nav.cassette'), to: '/cassette', icon: 'settings_voice', dockLabel: t('nav.dock.cassette') },
    { label: t('nav.diag'), to: '/system/diag', icon: 'analytics', dockLabel: t('nav.dock.diag') },
  ])

  const timelineItems: TimelineItem[] = [
    {
      period: '2118 — PRESENT',
      title: 'SENIOR SYSTEMS ARCHITECT',
      reference: 'REF: WEYLAND-YUTANI / CORP',
      description: 'OVERSEEING THE DEPLOYMENT OF AUTONOMOUS LOGISTICS ARRAYS. OPTIMIZING CORE LATENCY FOR INTERSTELLAR COMMS. IMPLEMENTING SECURE HANDSHAKE PROTOCOLS FOR REMOTELY OPERATED SYNTHETICS.',
      tags: ['RUST', 'K8S', 'GO'],
      layout: 'a',
    },
    {
      period: '2114 — 2118',
      title: 'CORE_ENGINE_DEV',
      reference: 'REF: SEVASTOPOL_STATION',
      description: 'MAINTAINING LEGACY COBOL SYSTEMS ON DEEP-SPACE OUTPOSTS. DEVELOPING REAL-TIME DIAGNOSTIC TOOLS FOR ATMOSPHERIC PROCESSORS.',
      tags: ['C++', 'ASSEMBLY'],
      layout: 'b',
    },
  ]

  return {
    navItems,
    timelineItems,
  }
}
