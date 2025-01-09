FROM node:lts

WORKDIR /app
RUN corepack enable pnpm

COPY pnpm-lock.yaml ./
RUN pnpm fetch --registry=https://registry.npmmirror.com
COPY . .
RUN pnpm install --offline

RUN pnpm build
EXPOSE 3000

CMD ["pnpm", "start"]