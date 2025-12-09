FROM node:18-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install deps
RUN pnpm install --frozen-lockfile

# Copy source
COPY . .

# Accept build args (Next.js will replace these at build time)
ARG NEXT_PUBLIC_ENV
ARG NEXT_PUBLIC_REDIRECT_URI
ARG NEXT_PUBLIC_LINKEDIN_CLIENT_ID
ARG NEXT_PUBLIC_GOOGLE_REDIRECT_URI
ARG NEXT_PUBLIC_BACKEND_URL
ARG NEXT_PUBLIC_GOOGLE_CLIENT_ID
ARG NEXT_PUBLIC_LINKEDIN_CLIENT_SECRET
ARG NEXT_PUBLIC_PERCEPT_PROJECT_TOKEN
ARG SENTRY_AUTH_TOKEN

# Export them as ENV so pnpm build sees them
ENV NEXT_PUBLIC_ENV=$NEXT_PUBLIC_ENV
ENV NEXT_PUBLIC_REDIRECT_URI=$NEXT_PUBLIC_REDIRECT_URI
ENV NEXT_PUBLIC_LINKEDIN_CLIENT_ID=$NEXT_PUBLIC_LINKEDIN_CLIENT_ID
ENV NEXT_PUBLIC_GOOGLE_REDIRECT_URI=$NEXT_PUBLIC_GOOGLE_REDIRECT_URI
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_GOOGLE_CLIENT_ID=$NEXT_PUBLIC_GOOGLE_CLIENT_ID
ENV NEXT_PUBLIC_LINKEDIN_CLIENT_SECRET=$NEXT_PUBLIC_LINKEDIN_CLIENT_SECRET
ENV NEXT_PUBLIC_PERCEPT_PROJECT_TOKEN=$NEXT_PUBLIC_PERCEPT_PROJECT_TOKEN
ENV SENTRY_AUTH_TOKEN=$SENTRY_AUTH_TOKEN

# Build Next.js app
ENV NODE_ENV=production
RUN pnpm build

# --------- Runtime Image ----------
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
ENV HOSTNAME="0.0.0.0"

CMD ["pnpm", "start"]
