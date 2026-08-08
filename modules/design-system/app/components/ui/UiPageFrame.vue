<script setup lang="ts">
const gridMouseStyle = ref<Record<string, string>>({
  '--grid-mouse-x': '50%',
  '--grid-mouse-y': '50%',
  '--grid-drift-x': '0px',
  '--grid-drift-y': '0px',
  '--grid-drift-distance': '0px',
  '--grid-drift-angle': '0deg',
  '--grid-speed': '0',
})

let lastPointer: { x: number, y: number } | null = null
let targetDriftX = 0
let targetDriftY = 0
let currentDriftX = 0
let currentDriftY = 0
let currentSpeed = 0
let lastDirectionX = 1
let lastDirectionY = 0
let animationFrameId: number | null = null
let lastTick = 0
let mouseX = 0
let mouseY = 0
const magnetCanvasRef = ref<HTMLCanvasElement | null>(null)
let magnetCtx: CanvasRenderingContext2D | null = null

const GRID_SPACING = 24
const GRID_OFFSET = 12
const VECTOR_OFFSET_X = 12
const VECTOR_OFFSET_Y = 12
const MAGNET_RADIUS = 180

function parseRgbToken(token: string, fallback: [number, number, number]): [number, number, number] {
  const parsed = token.trim().split(/\s+/).map(Number).filter(Number.isFinite)
  if (parsed.length >= 3)
    return [parsed[0] ?? fallback[0], parsed[1] ?? fallback[1], parsed[2] ?? fallback[2]]
  return fallback
}

function resizeMagnetCanvas() {
  const canvas = magnetCanvasRef.value
  if (!canvas)
    return

  const width = window.innerWidth
  const height = window.innerHeight
  // Keep canvas in CSS pixel space so vectors align exactly with CSS grid overlays.
  canvas.width = Math.floor(width)
  canvas.height = Math.floor(height)
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  magnetCtx = canvas.getContext('2d')
  magnetCtx?.setTransform(1, 0, 0, 1, 0, 0)
}

function drawMagnetVectors() {
  if (!magnetCtx)
    return

  const ctx = magnetCtx
  const width = window.innerWidth
  const height = window.innerHeight
  ctx.clearRect(0, 0, width, height)

  const styles = getComputedStyle(document.documentElement)
  const [pr, pg, pb] = parseRgbToken(styles.getPropertyValue('--primary'), [255, 220, 161])
  const [dr, dg, db] = parseRgbToken(styles.getPropertyValue('--primary-fixed-dim'), [255, 186, 32])

  const minX = Math.max(0, mouseX - MAGNET_RADIUS - GRID_SPACING)
  const maxX = Math.min(width, mouseX + MAGNET_RADIUS + GRID_SPACING)
  const minY = Math.max(0, mouseY - MAGNET_RADIUS - GRID_SPACING)
  const maxY = Math.min(height, mouseY + MAGNET_RADIUS + GRID_SPACING)

  const startGridX = Math.floor((minX - GRID_OFFSET) / GRID_SPACING) * GRID_SPACING + GRID_OFFSET
  const startGridY = Math.floor((minY - GRID_OFFSET) / GRID_SPACING) * GRID_SPACING + GRID_OFFSET

  for (let y = startGridY; y <= maxY; y += GRID_SPACING) {
    for (let x = startGridX; x <= maxX; x += GRID_SPACING) {
      const sourceX = x + VECTOR_OFFSET_X
      const sourceY = y + VECTOR_OFFSET_Y
      const dx = sourceX - mouseX
      const dy = sourceY - mouseY
      const distance = Math.hypot(dx, dy)
      if (distance > MAGNET_RADIUS)
        continue

      const influence = 1 - (distance / MAGNET_RADIUS)
      const directionMagnitude = Math.hypot(currentDriftX, currentDriftY)
      const directionX = directionMagnitude > 0.001 ? (currentDriftX / directionMagnitude) : lastDirectionX
      const directionY = directionMagnitude > 0.001 ? (currentDriftY / directionMagnitude) : lastDirectionY
      const bump = Math.pow(influence, 1.8)
      const vectorLength = bump * (2 + (currentSpeed * 22))
      const displacedX = sourceX + (directionX * vectorLength)
      const displacedY = sourceY + (directionY * vectorLength)
      const alphaBase = 0.06 + (influence * 0.16)
      const alphaMotion = influence * (0.35 + (currentSpeed * 0.45))
      const alpha = Math.min(0.95, alphaBase + alphaMotion)

      ctx.beginPath()
      ctx.moveTo(sourceX, sourceY)
      ctx.lineTo(displacedX, displacedY)
      ctx.strokeStyle = `rgb(${dr} ${dg} ${db} / ${alpha})`
      ctx.lineWidth = 1
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(sourceX, sourceY, 1.05, 0, Math.PI * 2)
      ctx.fillStyle = `rgb(${dr} ${dg} ${db} / ${Math.min(0.9, alpha + 0.08)})`
      ctx.fill()

      ctx.beginPath()
      ctx.arc(displacedX, displacedY, 1.2, 0, Math.PI * 2)
      ctx.fillStyle = `rgb(${pr} ${pg} ${pb} / ${Math.min(0.95, alpha + 0.18)})`
      ctx.fill()
    }
  }
}

function applyGridStyle() {
  const driftDistance = Math.hypot(currentDriftX, currentDriftY)
  const driftAngle = driftDistance > 0.1
    ? Math.atan2(currentDriftY, currentDriftX) * (180 / Math.PI)
    : 0

  gridMouseStyle.value = {
    '--grid-mouse-x': `${mouseX}px`,
    '--grid-mouse-y': `${mouseY}px`,
    '--grid-drift-x': `${currentDriftX.toFixed(2)}px`,
    '--grid-drift-y': `${currentDriftY.toFixed(2)}px`,
    '--grid-drift-distance': `${driftDistance.toFixed(2)}px`,
    '--grid-drift-angle': `${driftAngle.toFixed(2)}deg`,
    '--grid-speed': currentSpeed.toFixed(3),
  }
}

function tickGridMagnetism(timestamp: number) {
  if (!lastTick)
    lastTick = timestamp

  const dt = Math.min(2, (timestamp - lastTick) / 16.67)
  lastTick = timestamp

  // Smooth spring-back so displaced dots return to their origin.
  currentDriftX += (targetDriftX - currentDriftX) * (0.28 * dt)
  currentDriftY += (targetDriftY - currentDriftY) * (0.28 * dt)
  targetDriftX *= Math.pow(0.72, dt)
  targetDriftY *= Math.pow(0.72, dt)
  currentSpeed *= Math.pow(0.78, dt)

  applyGridStyle()
  drawMagnetVectors()
  animationFrameId = window.requestAnimationFrame(tickGridMagnetism)
}

function updateGridMousePosition(event: PointerEvent) {
  mouseX = event.clientX
  mouseY = event.clientY
  const deltaX = lastPointer ? event.clientX - lastPointer.x : 0
  const deltaY = lastPointer ? event.clientY - lastPointer.y : 0
  const driftX = Math.max(-14, Math.min(14, deltaX * 0.45))
  const driftY = Math.max(-14, Math.min(14, deltaY * 0.45))
  const speed = Math.min(1, Math.hypot(deltaX, deltaY) / 18)
  const driftNorm = Math.hypot(driftX, driftY)

  if (driftNorm > 0.001) {
    lastDirectionX = driftX / driftNorm
    lastDirectionY = driftY / driftNorm
  }

  targetDriftX = driftX
  targetDriftY = driftY
  currentSpeed = Math.max(currentSpeed, speed)

  lastPointer = { x: event.clientX, y: event.clientY }
}

function resetGridDrift() {
  lastPointer = null
  targetDriftX = 0
  targetDriftY = 0
}

onMounted(() => {
  mouseX = window.innerWidth / 2
  mouseY = window.innerHeight / 2
  resizeMagnetCanvas()
  applyGridStyle()
  drawMagnetVectors()
  window.addEventListener('resize', resizeMagnetCanvas)
  animationFrameId = window.requestAnimationFrame(tickGridMagnetism)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeMagnetCanvas)
  if (animationFrameId !== null)
    window.cancelAnimationFrame(animationFrameId)
})
</script>

<template>
  <div
    class="relative min-h-screen bg-background font-sans text-primary selection:bg-primary_fixed_dim selection:text-background dot-grid scanline"
    :style="gridMouseStyle"
    @pointermove.passive="updateGridMousePosition"
    @pointerleave="resetGridDrift"
  >
    <canvas ref="magnetCanvasRef" class="dot-grid-magnet-canvas" />
    <div class="pointer-events-none fixed left-4 top-20 z-30 font-mono text-[8px] text-primary/10">
      + 00.12.91
    </div>
    <div class="pointer-events-none fixed bottom-20 right-4 z-30 font-mono text-[8px] text-primary/10">
      + FF.00.AE
    </div>
    <div class="relative z-10">
      <slot />
    </div>
  </div>
</template>
