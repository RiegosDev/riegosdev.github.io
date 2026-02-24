# Dockerfile
FROM node:20-bookworm-slim

# Instala as dependências do SO necessárias para o Puppeteer/Chromium rodar no Linux
RUN apt-get update \
    && apt-get install -y wget gnupg \
    && apt-get install -y fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
      --no-install-recommends \
    && apt-get install -y chromium \
    && rm -rf /var/lib/apt/lists/*

# Configura o Puppeteer para usar o Chromium instalado no SO em vez de baixar um novo
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

WORKDIR /app

# Ativa o pnpm
RUN corepack enable

# Copia os arquivos de dependência
COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma/

# Instala as dependências
RUN pnpm install --frozen-lockfile

# Copia o resto do código
COPY . .

# Gera o client do Prisma e builda o Next.js App Router
RUN pnpm prisma generate
RUN pnpm build

EXPOSE 3000

# Inicia o servidor em produção
CMD ["pnpm", "start"]

# COMMIT