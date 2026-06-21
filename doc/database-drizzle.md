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

## Full dev stack

Start PostgreSQL and the Nuxt app together, with an automatic check for
pending migrations:

```bash
nix develop -c pnpm dev:full
```

Behavior:

1. Starts the PostgreSQL container and waits until it is ready.
2. Compares migration files on disk with applied migrations.
3. If migrations are pending, prompts to apply them (`AUTO_MIGRATE=ask`, default).
4. Starts the Nuxt app in watch mode.

Override the prompt with `AUTO_MIGRATE`:

```bash
AUTO_MIGRATE=yes nix develop -c pnpm dev:full   # always apply pending migrations
AUTO_MIGRATE=no nix develop -c pnpm dev:full    # never apply, just start
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

Then execute the generated SQL manually against your target PostgreSQL database:

```bash
docker exec -i cda-postgres psql -U postgres -d chatondearu -v ON_ERROR_STOP=1 \
  < modules/db/generated/firestore-import.sql
```

## Validated data runbook (migrate → import → link)

End-to-end pipeline validated locally against PostgreSQL 18. Reproducible steps:

1. **Clean database + schema**

   ```bash
   docker compose up -d postgres
   nix develop -c pnpm db:migrate
   ```

2. **Generate and apply the import**

   ```bash
   nix develop -c pnpm db:import:sql
   docker exec -i cda-postgres psql -U postgres -d chatondearu -v ON_ERROR_STOP=1 \
     < modules/db/generated/firestore-import.sql
   ```

3. **Sanity checks** (reference counts from the current dump)

   | Table                 | Rows |
   | --------------------- | ---: |
   | clans                 |    3 |
   | profiles              |   88 |
   | clan_rewards          |   10 |
   | clan_events           |  918 |
   | tests                 |    1 |
   | test_clan_questions   |   17 |
   | test_clan_answers     |   17 |
   | test_clan_responses   |   46 |

4. **Link legacy profiles to auth users**

   ```bash
   nix develop -c pnpm db:link:legacy-auth                 # dry-run (no writes)
   nix develop -c pnpm db:link:legacy-auth -- --apply true # persist links
   ```

   On a fresh DB with no auth users, the dry-run reports `linkedProfiles: 0`
   (all 88 profiles unlinked). Linking happens once real users sign in (by
   `email`, then `discord`, then `twitch` account id).

### Orphan foreign keys

Legacy `clan_events` / `test_clan_responses` reference authors and clans that no
longer exist in the dump. The import generator (`scripts/import-firestore.ts`)
nulls out foreign keys whose target row is absent (columns are nullable), so the
import applies cleanly while `raw_data` and `*_display_name` columns preserve the
original values.

### OAuth smoke test (pending)

The live Discord/Twitch login smoke test requires provider credentials
(`DISCORD_CLIENT_ID/SECRET`, `TWITCH_CLIENT_ID/SECRET`) and configured callbacks.
Once set in `.env`, sign in, then re-run `db:link:legacy-auth --apply true` to
attach the matching legacy profile.

## Notes

- Import SQL generation is idempotent with `ON CONFLICT ("id") DO UPDATE`.
- Unknown or flexible Firestore payloads are preserved in `raw_data` JSONB columns.
- The import nulls orphan foreign keys (targets missing from the dump) to keep
  referential integrity without losing denormalized data.
