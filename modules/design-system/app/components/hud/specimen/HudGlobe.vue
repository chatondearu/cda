<script setup lang="ts">
interface Props {
  /** Latitude in degrees, -90 (south) to 90 (north). */
  lat: number
  /** Longitude in degrees, -180 to 180; used for the orthographic marker projection only. */
  lon: number
  label?: string
  /** Slow-rotate the meridian ring (still gated by the global HUD motion switch). */
  spin?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  spin: true,
})

const RADIUS = 21
const CENTER = 24

const clampedLat = computed(() => Math.min(Math.max(props.lat, -90), 90))
const normalizedLon = computed(() => ((((props.lon + 180) % 360) + 360) % 360) - 180)

// Orthographic projection onto the front hemisphere disc.
const markerPosition = computed(() => {
  const latRad = (clampedLat.value * Math.PI) / 180
  const lonRad = (normalizedLon.value * Math.PI) / 180

  return {
    x: CENTER + RADIUS * Math.sin(lonRad) * Math.cos(latRad),
    y: CENTER - RADIUS * Math.sin(latRad),
    onFarSide: Math.cos(lonRad) < 0,
  }
})

const coordLabel = computed(() => {
  const latHemisphere = clampedLat.value >= 0 ? 'N' : 'S'
  const lonHemisphere = normalizedLon.value >= 0 ? 'E' : 'W'
  return `${Math.abs(Math.round(clampedLat.value))}\u00B0${latHemisphere} ${Math.abs(Math.round(normalizedLon.value))}\u00B0${lonHemisphere}`
})
</script>

<template>
  <div class="inline-flex flex-col items-center gap-2 border border-outline_variant/20 bg-surface_container_lowest px-3 py-2">
    <div class="relative h-12 w-12">
      <svg
        viewBox="0 0 48 48"
        class="h-full w-full"
      >
        <circle
          cx="24"
          cy="24"
          r="21"
          fill="none"
          class="stroke-primary/40"
          stroke-width="1"
        />
        <ellipse
          cx="24"
          cy="24"
          rx="21"
          ry="7"
          fill="none"
          class="stroke-outline_variant/25"
          stroke-width="0.75"
        />
        <ellipse
          cx="24"
          cy="24"
          rx="21"
          ry="14"
          fill="none"
          class="stroke-outline_variant/25"
          stroke-width="0.75"
        />
        <line
          x1="24"
          y1="3"
          x2="24"
          y2="45"
          class="stroke-outline_variant/25"
          stroke-width="0.75"
        />
        <ellipse
          cx="24"
          cy="24"
          rx="7"
          ry="21"
          fill="none"
          class="origin-center stroke-outline_variant/25"
          :class="spin ? 'hud-motion-target hud-anim-crosshair-rotate' : ''"
          stroke-width="0.75"
        />
      </svg>

      <span
        class="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
        :class="markerPosition.onFarSide ? 'bg-primary/30' : 'hud-motion-target hud-anim-crosshair-breathe bg-primary'"
        :style="{ left: `${(markerPosition.x / 48) * 100}%`, top: `${(markerPosition.y / 48) * 100}%` }"
      />
    </div>

    <div class="flex flex-col items-center gap-0.5">
      <span
        v-if="label"
        class="font-mono text-[9px] uppercase tracking-widest text-primary/40"
      >{{ label }}</span>
      <span class="font-mono text-[10px] text-primary">{{ coordLabel }}</span>
    </div>
  </div>
</template>
