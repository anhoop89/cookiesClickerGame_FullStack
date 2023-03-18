# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:18-slim as build-stage

RUN apt-get update && apt-get upgrade -y && \
    npm install -g pnpm

WORKDIR /app
COPY package*.json /app/
RUN pnpm install

COPY ./ /app/
RUN pnpm build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:latest
COPY --from=build-stage /app/build/ /usr/share/nginx/html
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf
