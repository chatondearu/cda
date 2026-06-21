# syntax=docker/dockerfile:1.7

# --- Base image: Node 24 + pnpm via corepack ---
FROM node:24-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

# --- Build stage: install workspace deps and build the Nuxt app ---
FROM base AS build
# pnpm store cache speeds up repeated builds
COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile
RUN pnpm --filter @chatondearu/app build

# --- Runtime stage: minimal self-contained Nitro server ---
FROM node:24-alpine AS runner
ENV NODE_ENV=production
ENV NITRO_HOST=0.0.0.0
ENV NITRO_PORT=3000
# Default location of the Drizzle migrations copied below
ENV DB_MIGRATIONS_FOLDER=/app/drizzle
WORKDIR /app

# Nitro output is self-contained (bundles its own node_modules)
COPY --from=build /app/modules/app/.output ./.output
# Drizzle SQL migrations applied on startup by the Nitro plugin
COPY --from=build /app/modules/db/drizzle ./drizzle

EXPOSE 3000

# Optional container-level health check (Coolify can also use /api/health)
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:3000/api/health || exit 1

CMD ["node", ".output/server/index.mjs"]
