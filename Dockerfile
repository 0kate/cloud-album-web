FROM arm64v8/node:16-alpine as builder
WORKDIR /app
ADD . .
RUN npm install && \
    npm run build && \
    npm run export

FROM nginx:alpine
COPY --from=builder /app/out /usr/share/nginx/html
