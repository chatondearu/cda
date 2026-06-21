import process from 'node:process'

/**
 * Lightweight health endpoint for container/Coolify health checks.
 * Returns 200 with a minimal payload; does not touch the database.
 */
export default defineEventHandler(() => ({
  status: 'ok',
  uptime: process.uptime(),
  timestamp: new Date().toISOString(),
}))
