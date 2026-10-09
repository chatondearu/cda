# HTTP security headers and Umami privacy

## Baseline headers

Nitro middleware `modules/app/server/middleware/02-security-headers.ts` sets:

| Header | Value / behavior |
| ------ | ---------------- |
| `Content-Security-Policy` | `'self'` + `'unsafe-inline'` scripts/styles (Nuxt/Content); Umami script origin from `NUXT_PUBLIC_UMAMI_SCRIPT_URL` when set; `frame-ancestors 'none'` |
| `X-Frame-Options` | `DENY` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `X-Content-Type-Options` | `nosniff` |
| `Permissions-Policy` | camera/microphone/geolocation disabled |
| `Strict-Transport-Security` | `max-age=15552000; includeSubDomains` **only** when the request is HTTPS (`X-Forwarded-Proto` / TLS) |

Career `x-robots-tag` remains in `routeRules` and is independent of this middleware.

## Compatibility

- **Nuxt Content**: same-origin assets; `img-src` allows `https:` / `data:` / `blob:` for media and PDF helpers.
- **Better Auth (Twitch/Discord)**: callbacks stay on `/api/auth/*` (same origin). Provider pages are top-level navigations, not CSP script loads.
- **Umami**: script + `connect-src` allowlist the configured script URL origin only.

## Community vs CV host

Both hosts are served by the same Nitro app, so **the same security header set applies**.

| Concern | Community (`NUXT_PUBLIC_SITE_URL`) | CV (`NUXT_PUBLIC_ME_HOST`) |
| ------- | ---------------------------------- | -------------------------- |
| Security headers | Same middleware | Same middleware |
| Umami env keys | Usually set here if analytics are wanted | Leave empty unless you intentionally track the CV host |
| Consent UI | Banner only when Umami keys are set | No banner when keys empty |

Do not weaken CSP for one host without documenting why; prefer env-gated Umami over host-specific header forks.

## Umami consent

- Disabled when `NUXT_PUBLIC_UMAMI_SCRIPT_URL` or `NUXT_PUBLIC_UMAMI_WEBSITE_ID` is empty (no script, no banner).
- When both are set, `AppUmamiConsentNotice` asks for accept/decline before injecting the script.
- Choice is stored in `localStorage` under `cda_umami_consent` (`granted` \| `denied`).
- This is a minimal consent gate, not a full legal privacy policy.
