# Career CV access model

The unlisted career surface (`/rx-quiet/catnip-buffer/career` and detail slugs)
is **not** security-through-obscurity alone. Access requires an explicit **CV
grant**, independent from the Twitch-first community gateway.

## Grant mechanisms

Either of the following unlocks the CV (cookie / allowlist checked server-side):

1. **Access token** — value listed in `NUXT_CAREER_ACCESS_TOKENS` (comma-separated).
   - Redeem via `POST /api/career/access` with `{ "token": "..." }`, or
   - Visit any career URL with `?cv_token=...` (sets httpOnly cookie `cda_cv_grant`).
2. **Allowlisted auth identity** — signed-in user whose email or Better Auth user id
   appears in `NUXT_CAREER_ALLOWLIST`.

**Community Twitch / Discord login alone never unlocks the CV.**

When neither token nor allowlist matches, users are sent to
`/rx-quiet/catnip-buffer/career/access`.

## Contact PII

Career contact fields (`NUXT_CAREER_FULL_NAME`, `EMAIL`, `PHONE`, `LOCATION`) are
**server-only** runtime config. They are not exposed as `NUXT_PUBLIC_*`. Clients
receive them only from `GET /api/career/contact` after a valid grant.

## Indexing

Career routes set `noindex, nofollow` (SEO meta + `x-robots-tag` route rules,
including locale-prefixed paths).

## Related

- Me-host gateway (`NUXT_PUBLIC_ME_HOST`): public request-access landing only;
  does not itself grant CV access.
- Community auth: `doc/auth-better-auth.md`
