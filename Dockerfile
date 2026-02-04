FROM node:18-alpine AS builder

WORKDIR /app
# Install pnpm
RUN npm install -g pnpm
# Copy package files
COPY package.json pnpm-lock.yaml* ./
# Install deps
RUN pnpm install --frozen-lockfile

COPY . .

# Inject correct env file
ARG ENV_FILE
COPY ${ENV_FILE} .env

# Optional sanity check
RUN echo "===== ENV CHECK =====" && \
    cat .env && \
    echo "====================="

# Build Next.js app
ENV NODE_ENV=staging
RUN pnpm build

# -------- Runtime Image --------
FROM node:18-alpine AS runner
WORKDIR /app

RUN npm install -g pnpm

# Copy only built output + node_modules from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Create non-root user
RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs \
 && chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["pnpm", "start"]
