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
}

export function useSystemData() {
  const navItems: NavItem[] = [
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

  const archiveItems: ArchiveItem[] = [
    {
      slug: 'neural-mesh',
      capsule: 'DATA_CAPSULE: 01',
      title: 'PROJECT_X: NEURAL_MESH',
      status: 'unfinished',
      description: 'EXPERIMENTAL PEER-TO-PEER NETWORK DESIGNED FOR SUB-LIGHT COMMUNICATION SYNCING.',
      tech: 'RUST/WEBGL',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnv5u16RdFiE_aVP9yW3nMYRqZtpopG9GqIvWDsxLVhPs_MF07T7knYdemZ9NaMBj6voZRlTtVlH9P7nhnUMf-ZMdDU1zvrK1o4vsiVJzjR4Pc-Ys6dDb4TOkQZwqCJjs73JZ3lEishm6EeesD7QJqCWzYs7xDcCyNxQBnAFgB9Ex5Rp5UZE8hzoiE0PzPMPKRXDtCCKINhpXaUxOQGMRBrAl44VPcu7AqzggeCI16bvbT5zcAoq1LOLRvW-VrqpqiL9YqlZxDrGDw',
    },
    {
      slug: 'ghost-shell-os',
      capsule: 'DATA_CAPSULE: 02',
      title: 'GHOST_SHELL: OS',
      status: 'nominal',
      description: 'A MINIMALIST LINUX KERNEL OPTIMIZED FOR HEADLESS SERVER DEPLOYMENTS IN HIGH-RADIATION ZONES.',
      tech: 'C/ASSEMBLY',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3VMWC1fgX3Lyb2eorhFXLNFUEi8fG7Jd2T8HO3-Eq6rQjCzdBbuukmAXWdAW5QY41GQrUdWrYWmDWgqeorvvhSl3sfQzpiGKc7E4gdGSrxgld8Qjm3_tZeg0sb8E67ruS44KdWje2eerhDv7iJet2Iyz-K_bMzxpBaC2iOeTgBDFmf8LW3vJeyPTOVyy_lHymudkhi6TxlNActSNZR3doNCtdpH3yNOYe7y3zEMgKGl9iwVOJ0u-lOV22vPMgbAE5iL17b5Ricanz',
    },
    {
      slug: 'void-scanner-v2',
      capsule: 'DATA_CAPSULE: 03',
      title: 'VOID_SCANNER_v2',
      status: 'nominal',
      description: 'TOPOGRAPHICAL MAPPING SUITE FOR UNCHARTED ASTEROID FIELDS. USES LIDAR POINT-CLOUD DATA.',
      tech: 'PYTHON/CUDA',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXAPGfJP4LOmOcU4P-wNDWKnRlpNg-kLfi0y51QQsKRZlW-x6ecxdvGYN4Jb080YDfvxpFRGfoxhItYBexRhLPdjWAtSOROyXyGmsOUPyRbDGq2o4cB5MhRfzF54sboOw61Lh2ewpW6YjQxhlVEFOgOCnHh4HgP5fK8s5UDlyTGGrPYQARq0hyI--Yn0BcWazCbAXFuR_4Jwh0yPdzjV96L4QqtUPFCxsmuATZvn_r8Dg2_kBVBcubiqmA4hFMwHZguPFscClwjCbZ',
    },
  ]

  return {
    navItems,
    timelineItems,
    archiveItems,
  }
}
