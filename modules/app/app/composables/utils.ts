export function useUptime() {
  const bootAt = Date.now()

  const uptime = computed(() => {
    const s = Math.floor((Date.now() - bootAt) / 1000)
    const hh = String(Math.floor(s / 3600)).padStart(2, '0')
    const mm = String(Math.floor((s % 3600) / 60)).padStart(2, '0')
    const ss = String(s % 60).padStart(2, '0')
    return `${hh}:${mm}:${ss}`
  })

  return {
    uptime,
  }
}
