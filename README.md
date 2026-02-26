# 🚀 DotF4p - Content Hub & Aggregator

Bem-vindo à documentação oficial do **DotF4p**. Este projeto foi arquitetado com foco em **Clean Architecture, SOLID e Segurança**, rodando de forma 100% autônoma através de fluxos de scraping avançados e automação via n8n.

## 🛠️ Tech Stack Principal

- **Core:** Next.js (App Router), React, Node.js, TypeScript [cite: 2026-02-16].
- **Database:** PostgreSQL via Prisma ORM (v7.0+) com adaptador `pg` (Singleton pattern para otimização de conexões).
- **Scraping Engine:** Puppeteer Extra + Stealth Plugin (Bypass de Cloudflare, Cookies de Idade e Overlays).
- **Infraestrutura:** Docker (Compose) & Vercel/VPS.
- **Automação:** n8n (Cron Jobs e Webhooks).

---

## 🏗️ Estrutura de Diretórios (Root)

A estrutura segue o padrão de isolamento de responsabilidades:

> `/docker` - Configurações de containers, Nginx e Certbot (SSL)
> `/prisma` - Schema do banco (`schema.prisma`) e migrações
> `/public` - Assets estáticos (imagens, ícones)
> `/src`
> &nbsp;&nbsp; ├── `/actions` - Lógica de servidor (Scraping, Discovery, Maintenance)
> &nbsp;&nbsp; ├── `/app` - Rotas do Next.js App Router (incluindo a API do n8n)
> &nbsp;&nbsp; ├── `/components` - Componentes React isolados (UI e Admin)
> &nbsp;&nbsp; ├── `/context` - Gerenciamento de estado global
> &nbsp;&nbsp; ├── `/lib` - Configurações core (Prisma Singleton, Auth, Queries)
> &nbsp;&nbsp; ├── `/models` - Tipagens e interfaces de domínio
> &nbsp;&nbsp; ├── `/repositories` - Padrão de repositório para acesso a dados
> &nbsp;&nbsp; └── `/utils` - Funções utilitárias e Dicionário de Scrapers (`scraper.config.ts`)

---

## ⚙️ O Motor Autônomo (Scraper & Actions)

O coração do DotF4p é o seu sistema de mineração, dividido em 3 pilares principais localizados em `src/actions/`:

### 1. Discovery (`discovery.actions.ts`)

- **Objetivo:** Encontrar novas categorias e tags automaticamente.
- **Como funciona:** Varre as URLs raízes definidas em `scraper.config.ts` (ex: `/cat/` e `/tag/`), extrai slugs válidos, salva no banco e **imediatamente popula a nova categoria** para evitar vitrines vazias.

### 2. Maintenance (`maintenance.actions.ts`)

- **Refresh Queue:** Atualiza as categorias existentes em um "loop infinito" ordenado pelo campo `updatedAt` (`asc`). As categorias esquecidas há mais tempo são atualizadas primeiro.
- **Cleanup (Anti-404):** A função `cleanBrokenVideosAction` dispara requisições `HEAD` nos links dos vídeos. Se retornar `404` ou `410`, o vídeo é deletado do banco, garantindo a integridade do conteúdo.

### 3. Scraper Core (`scraper.actions.ts`)

- O motor pesado. Injeta cookies de `age_verified`, deleta overlays do DOM via JavaScript, aguarda o carregamento de imagens via Lazy Load (`data-src`) e extrai os metadados dos vídeos, inserindo via `upsert` no Prisma.

---

## 📡 API do n8n (Webhook Central)

A integração com a automação ocorre via `src/app/api/scrape/route.ts`. A rota é protegida por um Header `x-api-secret` e aceita os seguintes comandos no JSON body:

| Comando       | Ação Executada                                                                          | Uso no n8n               |
| :------------ | :-------------------------------------------------------------------------------------- | :----------------------- |
| `MAINTENANCE` | Chama `refreshExistingContentAction(limit)`. Traz vídeos novos para categorias antigas. | Cron Diário (Frequente)  |
| `DISCOVERY`   | Varre o site-fonte em busca de novas taxonomias.                                        | Cron Semanal             |
| `SCRAPE`      | Força a atualização de uma categoria específica.                                        | Gatilho Manual           |
| `CLEANUP`     | Limpa vídeos com status 404 do banco.                                                   | Cron Semanal (Madrugada) |

---

## 💻 Comandos de Emergência (CLI)

Para bypassar o n8n e controlar o motor diretamente na VPS, utilize os atalhos configurados no `package.json`:

- **`npm run seed:hardcore`**: Dispara a descoberta de novas categorias no terminal.
- **`npm run seed:refresh`**: Atualiza as próximas 20 categorias da fila de manutenção.
- **`npm run db:cleanup`**: Varre os próximos 100 vídeos testando links quebrados.
- **`npm run db:sync`**: Sincroniza o `schema.prisma` com o banco de dados de produção (gera o Prisma Client).

**Exemplo de uso na VPS via Docker:**

```bash
docker compose exec app npm run seed:refresh
```

## 🚢 Fluxo de Deploy Sênior (Local ➡️ VPS)

Para garantir que não ocorram erros de Column not available (P2022) devido a mudanças no Prisma, siga sempre esta ordem:

Local: Altere o código/schema.prisma e faça o git push.

VPS: Dê o git pull na raiz do projeto.

VPS: Rebuilde a imagem do Next.js:

Bash
docker compose up -d --build app
VPS: Sincronize o banco de dados imediatamente após o container subir:

Bash
docker compose exec app npx prisma db push
(Nota: Mudanças drásticas no DB em tabelas populadas devem usar o artifício de @default(now()) temporário no schema.prisma para não exigir --force-reset).

DotF4p Architecture by Daniel Riêgo.
