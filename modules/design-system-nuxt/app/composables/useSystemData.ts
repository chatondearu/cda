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

interface TrackTelemetry {
  label: string
  value: string
  progress: number
}

export interface SystemTelemetry {
  coordText: string
  latText: string
  lonText: string
  memLoadPercent: number
  memLoadText: string
  latencyMs: number
  latencyText: string
  coreTempC: number
  coreTempText: string
  uptimeHours: number
  uptimeText: string
  status: 'NOMINAL' | 'SYNCING' | 'SCANNING'
  statusTitle: string
  secureLineText: string
  userText: string
  track: TrackTelemetry
}

const TRACK_DURATION_SECONDS = 12 * 60
const TRACK_BASE_SECONDS = 4 * 60 + 21
const UPTIME_BASE_HOURS = 124800
const STATUS_SWITCH_MS = 2200
const LORE_LAT_BASE = -34.8
const LORE_LON_BASE = 151.2
const LORE_LAT_SPAN = 22
const LORE_LON_SPAN = 36

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

function lerp(min: number, max: number, ratio: number): number {
  return min + (max - min) * ratio
}

function formatSignedCoordinate(value: number, positive: string, negative: string): string {
  const absolute = Math.abs(value).toFixed(4)
  const suffix = value >= 0 ? positive : negative
  return `${absolute} ${suffix}`
}

function formatClock(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  const minuteText = String(minutes).padStart(2, '0')
  const secondText = String(seconds).padStart(2, '0')
  return `${minuteText}:${secondText}`
}

function formatUptimeHours(hours: number): string {
  return hours.toLocaleString('en-US', {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  })
}

function formatElapsedClock(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

export function useSystemData() {
  const { t } = useI18n()
  const route = useRoute()

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

  const telemetry = useState<SystemTelemetry>('system-telemetry', () => ({
    coordText: 'COORD: 42.091 // 11.200',
    latText: 'LAT: 34.0522 N',
    lonText: 'LON: 118.2437 W',
    memLoadPercent: 14,
    memLoadText: 'MEM_LOAD: 14%',
    latencyMs: 2.1,
    latencyText: 'LATENCY: 02.1MS',
    coreTempC: 42,
    coreTempText: 'CORE TEMP: 42C',
    uptimeHours: UPTIME_BASE_HOURS,
    uptimeText: `TOTAL_UPTIME: ${formatUptimeHours(UPTIME_BASE_HOURS)}_HRS // 00:00:00`,
    status: 'NOMINAL',
    statusTitle: 'REF-01/SYS_STATUS: NOMINAL',
    secureLineText: t('ui.secureLine'),
    userText: t('ui.userAdmin'),
    track: {
      label: 'TRACK_04: INTERVIEW_DATA.LOG',
      value: '04:21 / 12:00',
      progress: 33,
    },
  }))

  const hasTelemetryBooted = useState<boolean>('system-telemetry-booted', () => false)
  const hasRouteStatusWatcher = useState<boolean>('system-telemetry-route-watch', () => false)
  const hasLocaleWatcher = useState<boolean>('system-telemetry-locale-watch', () => false)
  const lastInteractionTimestamp = useState<number>('system-telemetry-last-interaction', () => 0)
  const currentStatusTimeout = useState<ReturnType<typeof setTimeout> | null>('system-telemetry-status-timeout', () => null)

  if (import.meta.client && !hasTelemetryBooted.value) {
    hasTelemetryBooted.value = true

    const startTimestamp = Date.now()
    let virtualLat = LORE_LAT_BASE
    let virtualLon = LORE_LON_BASE
    let pointerXRatio = 0.5
    let pointerYRatio = 0.5
    let orientationXRatio = 0.5
    let orientationYRatio = 0.5
    let hasOrientationSignal = false
    let lastScrollY = window.scrollY
    let scrollVelocity = 0
    const resourceLatencySamples: number[] = []

    const getScrollRatio = (): number => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      return clamp(window.scrollY / maxScroll, 0, 1)
    }

    const updatePointer = (event: MouseEvent) => {
      pointerXRatio = clamp(event.clientX / Math.max(1, window.innerWidth), 0, 1)
      pointerYRatio = clamp(event.clientY / Math.max(1, window.innerHeight), 0, 1)
      lastInteractionTimestamp.value = Date.now()
    }

    const onScroll = () => {
      const nextScrollY = window.scrollY
      scrollVelocity = Math.abs(nextScrollY - lastScrollY)
      lastScrollY = nextScrollY
      lastInteractionTimestamp.value = Date.now()
    }

    const onOrientation = (event: DeviceOrientationEvent) => {
      const gamma = clamp(event.gamma ?? 0, -60, 60)
      const beta = clamp(event.beta ?? 0, -60, 60)
      orientationXRatio = (gamma + 60) / 120
      orientationYRatio = (beta + 60) / 120
      hasOrientationSignal = true
      lastInteractionTimestamp.value = Date.now()
    }

    const hasPerformanceMemory = typeof performance !== 'undefined' && 'memory' in performance
    const networkInfo = (navigator as Navigator & { connection?: { rtt?: number } }).connection
    const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4

    window.addEventListener('mousemove', updatePointer, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    if ('DeviceOrientationEvent' in window)
      window.addEventListener('deviceorientation', onOrientation, { passive: true })

    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((entries) => {
        for (const entry of entries.getEntries()) {
          if (entry.entryType !== 'resource')
            continue

          const duration = clamp(entry.duration, 5, 6000)
          resourceLatencySamples.push(duration)
        }

        if (resourceLatencySamples.length > 18)
          resourceLatencySamples.splice(0, resourceLatencySamples.length - 18)
      })
      observer.observe({ entryTypes: ['resource'] })
    }

    setInterval(() => {
      const scrollRatio = getScrollRatio()
      const now = Date.now()
      const idleMs = now - lastInteractionTimestamp.value

      // Use pointer for desktop and scroll-derived fallback for touch/mobile.
      const inputXRatio = hasOrientationSignal
        ? (orientationXRatio * 0.65 + pointerXRatio * 0.35)
        : pointerXRatio
      const inputYRatio = hasOrientationSignal
        ? (orientationYRatio * 0.65 + pointerYRatio * 0.35)
        : (pointerYRatio === 0.5 && lastInteractionTimestamp.value === 0 ? scrollRatio : pointerYRatio)

      const targetLat = LORE_LAT_BASE + lerp(LORE_LAT_SPAN * 0.5, -LORE_LAT_SPAN * 0.5, inputYRatio) + lerp(-3.5, 3.5, scrollRatio)
      const targetLon = LORE_LON_BASE + lerp(-LORE_LON_SPAN * 0.5, LORE_LON_SPAN * 0.5, inputXRatio) + lerp(-6, 6, scrollRatio)

      // Smooth transitions so values read like sensor data instead of raw cursor jumps.
      virtualLat = lerp(virtualLat, clamp(targetLat, -89.9999, 89.9999), 0.14)
      virtualLon = lerp(virtualLon, clamp(targetLon, -179.9999, 179.9999), 0.14)

      const coordLeft = ((virtualLat + 90) / 180 * 84.182 + (scrollRatio * 1.8)).toFixed(3)
      const coordRight = ((virtualLon + 180) / 360 * 24.911 + (scrollRatio * 0.9)).toFixed(3)
      telemetry.value.coordText = `COORD: ${coordLeft} // ${coordRight}`
      telemetry.value.latText = `LAT: ${formatSignedCoordinate(virtualLat, 'N', 'S')}`
      telemetry.value.lonText = `LON: ${formatSignedCoordinate(virtualLon, 'E', 'W')}`

      let memoryPercent = 14
      if (hasPerformanceMemory) {
        const memory = (performance as Performance & { memory: { usedJSHeapSize: number, jsHeapSizeLimit: number } }).memory
        memoryPercent = Math.round((memory.usedJSHeapSize / Math.max(1, memory.jsHeapSizeLimit)) * 100)
      }
      else {
        const domFactor = Math.min(40, Math.round(document.getElementsByTagName('*').length / 80))
        const interactionFactor = Math.min(20, Math.round(scrollVelocity / 12))
        const deviceFactor = clamp(Math.round((8 - deviceMemory) * 4), 0, 18)
        memoryPercent = clamp(10 + domFactor + interactionFactor + deviceFactor, 8, 84)
      }
      telemetry.value.memLoadPercent = clamp(memoryPercent, 1, 99)
      telemetry.value.memLoadText = `MEM_LOAD: ${telemetry.value.memLoadPercent}%`

      const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
      const navDuration = navEntry?.duration ? navEntry.duration / 180 : 0
      const networkRtt = networkInfo?.rtt ? networkInfo.rtt / 40 : 0
      const avgResourceLatency = resourceLatencySamples.length > 0
        ? resourceLatencySamples.reduce((sum, value) => sum + value, 0) / resourceLatencySamples.length / 220
        : 0
      const jitter = Math.min(4, scrollVelocity / 50)
      const nextLatency = clamp(1.2 + navDuration + networkRtt + avgResourceLatency + jitter, 1.2, 98)
      telemetry.value.latencyMs = Number(nextLatency.toFixed(1))
      telemetry.value.latencyText = `LATENCY: ${telemetry.value.latencyMs.toFixed(1).padStart(4, '0')}MS`

      const activityHeat = telemetry.value.memLoadPercent * 0.11 + telemetry.value.latencyMs * 0.65
      const idleCooling = idleMs > 2500 ? 1.8 : 0
      const targetTemp = clamp(36 + activityHeat - idleCooling, 37, 72)
      telemetry.value.coreTempC = Number(lerp(telemetry.value.coreTempC, targetTemp, 0.18).toFixed(1))
      telemetry.value.coreTempText = `CORE TEMP: ${Math.round(telemetry.value.coreTempC)}C`

      const elapsedSeconds = Math.floor((now - startTimestamp) / 1000)
      telemetry.value.uptimeHours = UPTIME_BASE_HOURS + elapsedSeconds / 3600
      telemetry.value.uptimeText = `TOTAL_UPTIME: ${formatUptimeHours(telemetry.value.uptimeHours)}_HRS // ${formatElapsedClock(elapsedSeconds)}`

      const trackSeconds = (TRACK_BASE_SECONDS + elapsedSeconds) % TRACK_DURATION_SECONDS
      const trackProgress = clamp(Math.round((trackSeconds / TRACK_DURATION_SECONDS) * 100), 0, 100)
      telemetry.value.track = {
        label: 'TRACK_04: INTERVIEW_DATA.LOG',
        value: `${formatClock(trackSeconds)} / 12:00`,
        progress: trackProgress,
      }
    }, 900)
  }

  if (!hasRouteStatusWatcher.value) {
    hasRouteStatusWatcher.value = true

    watch(
      () => route.fullPath,
      () => {
        if (!import.meta.client)
          return

        const nextStatus = Math.random() > 0.5 ? 'SYNCING' : 'SCANNING'
        telemetry.value.status = nextStatus
        telemetry.value.statusTitle = `REF-01/SYS_STATUS: ${nextStatus}`

        if (currentStatusTimeout.value)
          clearTimeout(currentStatusTimeout.value)

        currentStatusTimeout.value = setTimeout(() => {
          telemetry.value.status = 'NOMINAL'
          telemetry.value.statusTitle = 'REF-01/SYS_STATUS: NOMINAL'
        }, STATUS_SWITCH_MS)
      },
    )
  }

  if (!hasLocaleWatcher.value) {
    hasLocaleWatcher.value = true

    watchEffect(() => {
      telemetry.value.secureLineText = t('ui.secureLine')
      telemetry.value.userText = t('ui.userAdmin')
    })
  }

  return {
    navItems,
    timelineItems,
    telemetry,
  }
}
