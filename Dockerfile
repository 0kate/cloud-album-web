FROM node:16-alpine AS builder

WORKDIR /app
COPY . .
RUN npm install && \
    npm run build && \
    npm run export

FROM nginx:alpine
COPY --from=builder /app/out /usr/share/nginx/html
