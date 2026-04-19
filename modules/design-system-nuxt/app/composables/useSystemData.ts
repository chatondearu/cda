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
  tier: 'featured' | 'other'
}

export function useSystemData() {
  const navItems: NavItem[] = [
    { label: 'HOME_BASE', to: '/', icon: 'home', dockLabel: 'HOME' },
    { label: 'TIMELINE_LOG', to: '/timeline', icon: 'timeline', dockLabel: 'LOG' },
    { label: 'ARCHIVE_REP', to: '/archive', icon: 'inventory_2', dockLabel: 'ARCHIVE' },
    { label: 'CASSETTE_INT', to: '/cassette', icon: 'settings_voice', dockLabel: 'VOICE' },
    { label: 'SYS_DIAG', to: '/system/diag', icon: 'analytics', dockLabel: 'DIAG' },
  ]

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
