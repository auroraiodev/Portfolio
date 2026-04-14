# Base image
FROM oven/bun:1.3.12 AS base
WORKDIR /app

# Stage 1: Pruner
FROM base AS pruner
# turbo prune requires a modern version of nodejs (16+)
RUN apt-get update && apt-get install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get install -y nodejs
RUN bun add -g turbo
COPY . .
RUN turbo prune lumina --docker

# Stage 2: Builder
FROM base AS builder
# Ensure nodejs 20 is available for the build process
RUN apt-get update && apt-get install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get install -y nodejs
WORKDIR /app

# Copy pruned package.json files and lockfile
COPY --from=pruner /app/out/json/ .
COPY bun.lock .
RUN bun install --frozen-lockfile

# Copy full source and build
COPY --from=pruner /app/out/full/ .
RUN bun turbo run build --filter=lumina...

# Stage 3: Runner
FROM base AS runner
WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Don't run production as root
RUN groupadd -r nodejs -g 1001 && useradd -r -g nodejs -u 1001 nextjs
USER nextjs

# Copy static assets and standalone build
COPY --from=builder /app/apps/lumina/public ./apps/lumina/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/lumina/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/lumina/.next/static ./apps/lumina/.next/static

# Next.js standalone server entry point
CMD ["bun", "apps/lumina/server.js"]
