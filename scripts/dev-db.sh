#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
COMPOSE_FILE="${ROOT_DIR}/docker-compose.yml"
DEFAULT_DATABASE_URL="postgres://postgres:postgres@localhost:5432/chatondearu"

if [[ ! -f "${COMPOSE_FILE}" ]]; then
  echo "docker-compose.yml not found at ${COMPOSE_FILE}" >&2
  exit 1
fi

usage() {
  cat <<'EOF'
Usage: scripts/dev-db.sh <command>

Commands:
  start    Start PostgreSQL container
  stop     Stop PostgreSQL container
  status   Show container status
  logs     Tail PostgreSQL logs
  reset    Destroy container and volume, then restart clean
  migrate  Run Drizzle migrations with local DATABASE_URL
EOF
}

start() {
  docker compose -f "${COMPOSE_FILE}" up -d
  echo "PostgreSQL started."
}

stop() {
  docker compose -f "${COMPOSE_FILE}" stop
  echo "PostgreSQL stopped."
}

status() {
  docker compose -f "${COMPOSE_FILE}" ps
}

logs() {
  docker compose -f "${COMPOSE_FILE}" logs -f postgres
}

reset() {
  docker compose -f "${COMPOSE_FILE}" down -v
  docker compose -f "${COMPOSE_FILE}" up -d
  echo "PostgreSQL reset complete."
}

migrate() {
  (
    cd "${ROOT_DIR}"
    DATABASE_URL="${DATABASE_URL:-${DEFAULT_DATABASE_URL}}" nix develop -c pnpm db:migrate
  )
}

CMD="${1:-}"

case "${CMD}" in
  start) start ;;
  stop) stop ;;
  status) status ;;
  logs) logs ;;
  reset) reset ;;
  migrate) migrate ;;
  *) usage; exit 1 ;;
esac
