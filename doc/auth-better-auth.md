# Better Auth Integration (`@chatondearu/app`)

## Scope

This project uses Better Auth with:

- Social login: Discord + Twitch
- Email/password login
- Session-based auth with PostgreSQL persistence through Drizzle

## Server wiring

- Auth config: `modules/app/server/utils/auth.ts`
- Auth API handler: `modules/app/server/api/auth/[...all].ts`
- Client composable: `modules/app/app/composables/useAuth.ts`

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

## OAuth callback endpoints

Better Auth is mounted at `/api/auth/*`.
Provider callback URLs should target this app host and Better Auth callback path.

Use your public app URL as base:

- `${BETTER_AUTH_URL}/api/auth/callback/discord`
- `${BETTER_AUTH_URL}/api/auth/callback/twitch`

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
