#!/usr/bin/env bash
set -euo pipefail

# Full dev stack: PostgreSQL (docker) + Nuxt app (watch), with optional
# automatic migration when pending migrations are detected.
#
# Env knobs:
#   AUTO_MIGRATE=ask|yes|no   (default: ask) how to handle pending migrations
#   DATABASE_URL=...          (default: local docker connection string)

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
COMPOSE_FILE="${ROOT_DIR}/docker-compose.yml"
MIGRATIONS_DIR="${ROOT_DIR}/modules/db/drizzle"
DEFAULT_DATABASE_URL="postgres://postgres:postgres@localhost:5432/chatondearu"

export DATABASE_URL="${DATABASE_URL:-${DEFAULT_DATABASE_URL}}"
AUTO_MIGRATE="${AUTO_MIGRATE:-ask}"

log() { printf '\033[1;36m[dev]\033[0m %s\n' "$1"; }
warn() { printf '\033[1;33m[dev]\033[0m %s\n' "$1"; }

compose() { docker compose -f "${COMPOSE_FILE}" "$@"; }

psql_count() {
  # Count applied migrations; returns 0 when the table/schema is missing.
  compose exec -T postgres \
    psql -U postgres -d chatondearu -tAc \
    "SELECT count(*) FROM drizzle.__drizzle_migrations;" 2>/dev/null || echo 0
}

# 1. Start database
log "Starting PostgreSQL container..."
compose up -d

# 2. Wait until ready
log "Waiting for PostgreSQL to accept connections..."
until compose exec -T postgres pg_isready -U postgres -d chatondearu >/dev/null 2>&1; do
  sleep 1
done
log "PostgreSQL is ready."

# 3. Detect pending migrations (files on disk vs applied rows)
migration_files=$(find "${MIGRATIONS_DIR}" -maxdepth 1 -name '*.sql' 2>/dev/null | wc -l | tr -d ' ')
applied=$(psql_count | tr -d '[:space:]')
applied=${applied:-0}
pending=$(( migration_files - applied ))
[ "${pending}" -lt 0 ] && pending=0

if [ "${pending}" -gt 0 ]; then
  warn "${pending} pending migration(s) detected (${applied}/${migration_files} applied)."
  apply=0
  case "${AUTO_MIGRATE}" in
    yes) apply=1 ;;
    no) apply=0 ;;
    ask)
      if [ -t 0 ]; then
        read -r -p "[dev] Apply pending migrations now? [Y/n] " answer
        case "${answer}" in [nN]*) apply=0 ;; *) apply=1 ;; esac
      else
        warn "Non-interactive shell; skipping migrations (set AUTO_MIGRATE=yes to force)."
      fi
      ;;
    *) warn "Unknown AUTO_MIGRATE='${AUTO_MIGRATE}', skipping migrations." ;;
  esac

  if [ "${apply}" = "1" ]; then
    log "Applying migrations..."
    pnpm db:migrate
    log "Migrations applied."
  else
    warn "Continuing without applying migrations."
  fi
else
  log "Database schema up to date (${applied}/${migration_files} migrations)."
fi

# 4. Start the app in watch mode (Nuxt HMR)
log "Starting Nuxt app (watch)..."
exec pnpm dev
