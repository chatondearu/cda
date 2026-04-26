# Shared Database Module (`@chatondearu/db`)

## Purpose

`@chatondearu/db` centralizes PostgreSQL access and Drizzle schema definitions for the monorepo.
It is designed to be shared by the app API layer and future packages.

## Environment

Required:

- `DATABASE_URL=postgres://user:password@host:port/database`

Optional defaults:

- `drizzle.config.ts` falls back to `postgres://postgres:postgres@localhost:5432/chatondearu` for local tooling convenience.

## Commands

From repository root:

- Generate migrations (schema only): `pnpm db:generate`
- Apply migrations: `pnpm db:migrate`
- Verify migrations are schema-only: `pnpm db:check:migrations`
- Run dev/test seed only: `pnpm db:seed:dev`
- Generate Firestore import SQL: `pnpm db:import:sql`
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
