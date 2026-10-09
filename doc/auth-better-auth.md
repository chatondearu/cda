# Better Auth Integration (`@chatondearu/app`)

## Scope

This project uses Better Auth as a **Twitch-first community gateway** with:

- **Primary identity:** Twitch OAuth (streamer community portal)
- **Optional identity:** Discord OAuth
- **Secondary / gated:** Email/password **sign-in only** for existing accounts
  (`emailAndPassword.disableSignUp: true` — no open spam signup)
- Session-based auth with PostgreSQL persistence through Drizzle

Public showcase pages remain usable without auth; restricted modules go through
this login terminal (`/login`).

**Career CV access is separate:** a Twitch/Discord community session does **not**
unlock `/rx-quiet/catnip-buffer/career`. See [`doc/career-access.md`](./career-access.md).

## Server wiring

- Auth config: `modules/app/server/utils/auth.ts`
- Auth API handler: `modules/app/server/api/auth/[...all].ts`
- Client composable: `modules/app/app/composables/useAuth.ts`
- Login UX: `modules/app/app/pages/login.vue` (Twitch primary CTA; Discord
  secondary; email/password collapsed behind a disclosure)

## Trusted origins & cookies

`trustedOrigins` is built from:

1. `BETTER_AUTH_URL` origin
2. `NUXT_PUBLIC_SITE_URL` origin (when set)
3. Optional `BETTER_AUTH_TRUSTED_ORIGINS` (comma-separated absolute URLs)
4. `http://localhost:3000` in non-production

Production cookie hardening (`advanced`):

- `useSecureCookies: true` when `NODE_ENV === 'production'`
- `defaultCookieAttributes`: `httpOnly`, `secure` (prod), `sameSite: 'lax'`

Do **not** leave localhost origins in production `BETTER_AUTH_TRUSTED_ORIGINS`.

## Rate limiting / abuse guards

Better Auth built-in `rateLimit` is **enabled** (defaults on in production; we
force `enabled: true` so local smoke tests see the same path):

| Path | Window | Max |
| ---- | ------ | --- |
| global `/api/auth/*` | 60s | 100 |
| `/sign-in/email` | 60s | 5 |
| `/sign-up/email` | 60s | 3 |
| `/sign-in/social` | 60s | 20 |

Storage is in-memory (single-instance). Multi-instance deployments should move
to database or secondary storage — see Better Auth rate-limit docs.

Email/password **sign-up** remains blocked by `disableSignUp` even if a client
bypasses the gated UI.

## Database model

Auth tables are defined in:

- `modules/db/src/schema/auth.ts`

Linked business profile model:

- `modules/db/src/schema/profiles.ts` via `profiles.auth_user_id`

## Required environment variables

- `DATABASE_URL`
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL`
- `DISCORD_CLIENT_ID`
- `DISCORD_CLIENT_SECRET`
- `TWITCH_CLIENT_ID`
- `TWITCH_CLIENT_SECRET`

Optional:

- `BETTER_AUTH_TRUSTED_ORIGINS` — extra production host origins
- `NUXT_PUBLIC_SITE_URL` — also added to trusted origins

For local Nuxt development, define these in `modules/app/.env` (see `modules/app/.env.example`).

## OAuth callback endpoints

Better Auth is mounted at `/api/auth/*`.
Provider callback URLs should target this app host and Better Auth callback path.

Use your public app URL as base:

- `${BETTER_AUTH_URL}/api/auth/callback/discord`
- `${BETTER_AUTH_URL}/api/auth/callback/twitch`

## Automatic profile provisioning

On user creation, a Better Auth `databaseHooks.user.create.after` hook
provisions the linked business profile:

- Implemented in `@chatondearu/db` as `ensureProfileForAuthUser(db, user)`.
- Wired in `modules/app/server/utils/auth.ts`.

Resolution order:

1. Profile already linked to the auth user → no-op (idempotent).
2. Unlinked legacy profile matched by email → linked via `profiles.auth_user_id`.
3. Otherwise a new profile is created (`id = user.id`, email/displayName/photo from the auth user).

Failures are logged and never block signup. Discord/Twitch-id matching for
legacy accounts that differ by email remains handled by the batch linking script below.

## Legacy profile linking

Use the dedicated script after auth tables are populated:

- Dry-run: `pnpm db:link:legacy-auth`
- Apply: `pnpm db:link:legacy-auth -- --apply true`

Linking strategy:

1. Match by exact email
2. Fallback by Discord account id
3. Fallback by Twitch account id using legacy `profiles.id`

## Operational checklist

1. Run migrations (`pnpm db:migrate`)
2. Verify migration policy (`pnpm db:check:migrations`)
3. Verify type safety (`pnpm db:typecheck` and `pnpm typecheck`)
4. Configure provider callbacks in Discord and Twitch dashboards
5. Set `BETTER_AUTH_TRUSTED_ORIGINS` for any extra prod hostnames
6. Confirm Twitch app credentials are present (primary community path)
