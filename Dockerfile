# Base image
FROM oven/bun:1.1 AS base
WORKDIR /app

# Stage 1: Pruner
FROM base AS pruner
RUN bun add -g turbo
COPY . .
RUN turbo prune lumina --docker

# Stage 2: Builder
FROM base AS builder
# Copy pruned package.json files
COPY --from=pruner /app/out/json/ .
# Copy lockfile
COPY bun.lock .
# Install dependencies
RUN bun install --frozen-lockfile

# Copy full source and build
COPY --from=pruner /app/out/full/ .
RUN bun turbo run build --filter=lumina...

# Stage 3: Runner
FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder /app/apps/lumina/public ./apps/lumina/public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/apps/lumina/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/lumina/.next/static ./apps/lumina/.next/static

# Next.js standalone server entry point
CMD ["bun", "apps/lumina/server.js"]
