# Deployment (Docker + Coolify)

The project ships with an explicit multi-stage `Dockerfile` (replacing the previous
Nixpacks build) so the runtime image is fully under our control. Database migrations
are applied **automatically at container startup**.

## Architecture

- **App image** (`/Dockerfile`): builds the Nuxt app and produces a slim, self-contained
  Nitro server (`node .output/server/index.mjs`) on Node 24 Alpine.
- **Database**: a separate PostgreSQL 18 resource (Coolify-managed).
- **Migrations**: a Nitro startup plugin (`server/plugins/00.db-migrate.ts`) applies pending
  Drizzle migrations from `/app/drizzle` before serving traffic. It only uses runtime deps
  (`drizzle-orm`, `pg`) — no `drizzle-kit` in the image.

## Image internals

| Concern         | Value                                              |
| --------------- | -------------------------------------------------- |
| Exposed port    | `3000`                                             |
| Start command   | `node .output/server/index.mjs`                    |
| Health endpoint | `GET /api/health` → `{ "status": "ok", ... }`      |
| Migrations dir  | `/app/drizzle` (copied from `modules/db/drizzle`)  |

## Environment variables

| Variable                 | Required | Description                                                        |
| ------------------------ | :------: | ------------------------------------------------------------------ |
| `DATABASE_URL`           |   yes    | Postgres connection string (use the Coolify internal URL).         |
| `DB_MIGRATE_ON_STARTUP`  |   yes\*  | Set to `true` to apply migrations on boot. \*Required for auto-migrations. |
| `DB_MIGRATIONS_FOLDER`   |    no    | Defaults to `/app/drizzle` (already set in the image).             |
| `BETTER_AUTH_SECRET`     |   yes    | Auth signing secret — generate with `openssl rand -base64 32`.     |
| `BETTER_AUTH_URL`        |   yes    | Public base URL, e.g. `https://chatondearu.fr`.                    |
| `NUXT_PUBLIC_SITE_URL`   |   reco   | Canonical site URL.                                                |
| `NUXT_PUBLIC_ME_HOST`    |    no    | Host for the CV access gateway.                                    |
| `NUXT_PUBLIC_REDIRECT_HOSTS_EN` | no | Comma-separated hosts redirected to `/en`.                       |
| `NUXT_PUBLIC_CAREER_*`   |    no    | CV/contact values inlined for PDF export.                          |
| `NUXT_PUBLIC_UMAMI_*`    |    no    | Analytics; leave empty to disable.                                 |
| `DISCORD_CLIENT_ID` / `DISCORD_CLIENT_SECRET` | no | Discord OAuth.                                       |
| `TWITCH_CLIENT_ID` / `TWITCH_CLIENT_SECRET`   | no | Twitch OAuth.                                        |

## Coolify setup

1. **PostgreSQL resource**
   - Create a *PostgreSQL 18* database in the project.
   - Copy its **internal** connection string for `DATABASE_URL`.

2. **Application resource** (from this Git repo)
   - **Build Pack**: switch from *Nixpacks* to **Dockerfile**.
   - **Dockerfile location**: `/Dockerfile`.
   - **Port**: `3000`.
   - **Health check**: path `/api/health`, port `3000`.

3. **Environment variables**: set the variables from the table above. At minimum:

   ```env
   DATABASE_URL=postgres://USER:PASSWORD@HOST:5432/DBNAME
   DB_MIGRATE_ON_STARTUP=true
   BETTER_AUTH_SECRET=<openssl rand -base64 32>
   BETTER_AUTH_URL=https://chatondearu.fr
   NUXT_PUBLIC_SITE_URL=https://chatondearu.fr
   ```

4. **Deploy**. On startup the container applies pending migrations, then serves the app.
   Confirm `https://<domain>/api/health` returns `{"status":"ok"}`.

## Scaling note

Startup migrations are designed for a **single app instance**. If you scale to multiple
replicas, run migrations exactly once to avoid concurrent runs:

- keep `DB_MIGRATE_ON_STARTUP=true` only while running a single instance for the deploy, **or**
- disable it (`DB_MIGRATE_ON_STARTUP=false`) and run migrations as a dedicated one-off step
  before promoting the new version.

## Local validation

Build and smoke-test the production image locally:

```bash
# Build
docker build -t cda-app:local .

# Run without DB (health only)
docker run --rm -p 3000:3000 cda-app:local
curl -s http://127.0.0.1:3000/api/health

# Run with auto-migrations against the local compose Postgres
docker compose up -d postgres
docker run --rm --network host \
  -e DB_MIGRATE_ON_STARTUP=true \
  -e DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:5432/chatondearu" \
  cda-app:local
```
