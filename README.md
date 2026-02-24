# 🚀 DotF4p.com

> Hub de Conteúdos Adultos

---

## 📌 Visão Geral

O **DotF4p.com** é uma plataforma viva projetada para auxiliar aprendizes e experts na jornada Full Stack. O projeto resolve o problema da curadoria de conteúdo manual através de um robô de **Discovery** que identifica, valida e categoriza conteúdos técnicos relevantes de forma 100% autônoma.

---

## 🛠️ Tech Stack & Infraestrutura

| Camada          | Tecnologia                                |
| :-------------- | :---------------------------------------- |
| **Framework**   | Next.js 15 (App Router - Server First)    |
| **Linguagem**   | TypeScript (Strict Mode)                  |
| **ORM**         | Prisma 6.0+                               |
| **Database**    | PostgreSQL (Neon.tech)                    |
| **Estilização** | Tailwind CSS + Shadcn-ui                  |
| **IA/LLM**      | Google Gemini API (Curadoria de Conteúdo) |
| **Automação**   | GitHub Actions (Scheduled Sync)           |
| **Hosting**     | Vercel (ISR & Edge Functions)             |

---

## 🏗️ Engenharia e Arquitetura

O projeto foi construído sobre os pilares da **Clean Architecture** e princípios **SOLID**, garantindo que a regra de negócio seja independente de frameworks e fácil de testar.

### Principais Diferenciais Técnicos:

- **Server Components First:** Maximização do uso de componentes de servidor para performance bruta e SEO otimizado.
- **Discovery Bot (Agentic Workflow):** Pipeline automatizado que utiliza a API do Gemini para atuar como curador técnico, filtrando apenas o que é relevante para a stack Full Stack.
- **On-Demand Revalidation:** Integração via Webhook entre GitHub Actions e Vercel, permitindo que o cache seja limpo instantaneamente após cada descoberta do robô (ISR).
- **Escalabilidade:** Banco de dados serverless na Neon.tech com Connection Pooling configurado.

---

## 🤖 O Ciclo de Vida da Automação

1.  **Trigger:** O GitHub Actions dispara a cada 30 minutos.
2.  **Discovery:** O robô varre fontes externas e utiliza IA para extrair metadados e categorizar os vídeos.
3.  **Persistência:** O Prisma realiza um _upsert_ inteligente para garantir dados únicos e íntegros.
4.  **Instant Update:** O pipeline envia um sinal para a Vercel revalidar as páginas, atualizando o frontend em tempo real.

---

**Desenvolvido com foco em excelência técnica por Daniel Riego.**
