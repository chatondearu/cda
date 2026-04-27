# Shared Database Module (`@chatondearu/db`)

## Purpose

`@chatondearu/db` centralizes PostgreSQL access and Drizzle schema definitions for the monorepo.
It is designed to be shared by the app API layer and future packages.

## Environment

Required:

- `DATABASE_URL=postgres://user:password@host:port/database`

Optional defaults:

- `drizzle.config.ts` falls back to `postgres://postgres:postgres@localhost:5432/chatondearu` for local tooling convenience.

## Local PostgreSQL with Docker Compose

This repository includes `docker-compose.yml` with a ready-to-use PostgreSQL service.

Start database:

```bash
docker compose up -d
```

Check service health:

```bash
docker compose ps
```

Stop database:

```bash
docker compose stop
```

Remove container (keep data volume):

```bash
docker compose down
```

Connection URL for local usage:

```bash
export DATABASE_URL="postgres://postgres:postgres@localhost:5432/chatondearu"
```

Then run migrations:

```bash
nix develop -c pnpm db:migrate
```

Shortcut helper script:

```bash
scripts/dev-db.sh start
scripts/dev-db.sh status
scripts/dev-db.sh migrate
```

Other helpers:

```bash
scripts/dev-db.sh logs
scripts/dev-db.sh stop
scripts/dev-db.sh reset
```

## Commands

From repository root:

- Generate migrations (schema only): `pnpm db:generate`
- Apply migrations: `pnpm db:migrate`
- Verify migrations are schema-only: `pnpm db:check:migrations`
- Run dev/test seed only: `pnpm db:seed:dev`
- Generate Firestore import SQL: `pnpm db:import:sql`
- Dry-run profile to auth linking: `pnpm db:link:legacy-auth`
- Apply profile to auth linking: `pnpm db:link:legacy-auth -- --apply true`
- Typecheck db package: `pnpm db:typecheck`

## Data Workflow Contract

The project enforces a strict separation:

1. **Migrations** (`modules/db/drizzle/`): schema only (DDL), no data insertion
2. **Dev/Test seed** (`modules/db/src/seed/`): lightweight local/testing fixtures only
3. **Firestore import SQL** (`modules/db/generated/*.sql`): operational data import, generated and not versioned

## Firestore Backup Re-import

Default input folder:

- `tmp/firestore-dump`

Generate SQL file:

```bash
pnpm db:import:sql
```

Generate SQL file with explicit paths:

```bash
pnpm --filter @chatondearu/db db:import:sql -- --input ../../tmp/firestore-dump --output ./generated/firestore-import.sql
```

Then execute the generated SQL manually against your target PostgreSQL database.

## Notes

- Import SQL generation is idempotent with `ON CONFLICT ("id") DO UPDATE`.
- Unknown or flexible Firestore payloads are preserved in `raw_data` JSONB columns.
