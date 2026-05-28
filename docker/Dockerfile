# Dockerfile Ultra-Otimizado para Next.js (Sem Prisma/Puppeteer)
FROM node:24-alpine

WORKDIR /app

# Ativa o pnpm
RUN corepack enable

# Copia apenas os arquivos de dependência primeiro (Cache de Docker maravilhoso)
COPY package.json pnpm-lock.yaml ./

# Instala as dependências
RUN pnpm install --frozen-lockfile

# Copia o resto do código do projeto
COPY . .

# Builda o Next.js App Router
RUN pnpm build

EXPOSE 3000

# Inicia o servidor em produção
CMD ["pnpm", "start"]
