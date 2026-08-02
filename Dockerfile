FROM node:20-slim

# Install pnpm
RUN npm install -g pnpm@10.26.1 --ignore-scripts

WORKDIR /app

# Copy workspace config files first (for caching)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc tsconfig.base.json tsconfig.json ./

# Copy library packages
COPY lib/ ./lib/

# Copy the API server artifact
COPY artifacts/api-server/ ./artifacts/api-server/

# Install all dependencies
RUN pnpm install --frozen-lockfile

# Build the API server
RUN pnpm --filter @workspace/api-server build

# Run as non-root for security hardening
RUN groupadd --system appgroup && useradd --system --gid appgroup appuser
USER appuser

EXPOSE 8080

CMD ["node", "artifacts/api-server/dist/index.mjs"]
