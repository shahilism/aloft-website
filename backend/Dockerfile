# Build from the repository root:  docker build -f backend/Dockerfile -t aloft-api .
FROM node:22-alpine AS build
RUN apk add --no-cache openssl
WORKDIR /app
COPY package.json package-lock.json ./
COPY packages/content/package.json packages/content/
COPY backend/package.json backend/
COPY frontend/package.json frontend/
RUN npm ci --ignore-scripts
COPY packages/content packages/content
COPY database database
COPY backend backend
RUN npm run build -w @aloft/content \
 && npm run prisma:generate -w backend \
 && npm run build -w backend

FROM node:22-alpine
RUN apk add --no-cache openssl
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app /app
WORKDIR /app/backend
USER node
EXPOSE 4000
# Apply pending migrations, then start the API.
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]
