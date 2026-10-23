# Build from the repository root:
#   docker build -f frontend/Dockerfile \
#     --build-arg NEXT_PUBLIC_SITE_URL=https://aloftac.com \
#     --build-arg NEXT_PUBLIC_API_URL=https://api.aloftac.com \
#     -t aloft-web .
FROM node:22-alpine AS build
WORKDIR /app
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_GA_ID=
ARG NEXT_PUBLIC_GSC_VERIFICATION=
ARG NEXT_PUBLIC_NOINDEX=false
ARG PROJECT_IMAGE_HOSTS=
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL \
    NEXT_PUBLIC_GA_ID=$NEXT_PUBLIC_GA_ID \
    NEXT_PUBLIC_GSC_VERIFICATION=$NEXT_PUBLIC_GSC_VERIFICATION \
    NEXT_PUBLIC_NOINDEX=$NEXT_PUBLIC_NOINDEX \
    PROJECT_IMAGE_HOSTS=$PROJECT_IMAGE_HOSTS \
    NEXT_TELEMETRY_DISABLED=1
COPY package.json package-lock.json ./
COPY packages/content/package.json packages/content/
COPY backend/package.json backend/
COPY frontend/package.json frontend/
RUN npm ci --ignore-scripts
COPY packages/content packages/content
COPY frontend frontend
RUN npm run build -w @aloft/content && npm run build -w frontend

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0
COPY --from=build /app/frontend/.next/standalone ./
COPY --from=build /app/frontend/.next/static ./frontend/.next/static
COPY --from=build /app/frontend/public ./frontend/public
USER node
EXPOSE 3000
CMD ["node", "frontend/server.js"]
