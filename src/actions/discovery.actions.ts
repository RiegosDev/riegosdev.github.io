// src/actions/discovery.actions.ts
'use server';

import puppeteer from 'puppeteer-extra';
import { PrismaClient } from '@prisma/client';
import { SCRAPER_DICTIONARY } from '../utils/scraper.config';

const prisma = new PrismaClient();

export async function discoverNewCategoriesAction() {
  const browser =
    await puppeteer.launch({
      headless: true,
      executablePath:
        process.env
          .PUPPETEER_EXECUTABLE_PATH ||
        undefined,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-blink-features=AutomationControlled',
      ],
    });

  try {
    const page =
      await browser.newPage();

    // Foco no Eporner para o Discovery inicial
    const config =
      SCRAPER_DICTIONARY['eporner.com'];
    const discoveryUrl = `${config.baseUrl}${config.categoryPath}`;

    await page.goto(discoveryUrl, {
      waitUntil: 'networkidle2',
      timeout: 60000,
    });

    // Minerando links com Tipagem Estrita
    const discoveredSlugs =
      await page.evaluate(
        (includes) => {
          const links = Array.from(
            document.querySelectorAll(
              'a',
            ),
          );
          const validSlugs: string[] =
            []; // Array tipado para garantir que não vai undefined pro TS

          links.forEach((a) => {
            const href =
              a.getAttribute('href') ||
              '';

            // CORREÇÃO DO ESLINT: Agora usamos a variável 'includes' de forma dinâmica
            const isCategoryLink =
              includes.some((inc) =>
                href.includes(inc),
              );

            if (isCategoryLink) {
              const parts = href
                .split('/')
                .filter(Boolean);
              const slug = parts.pop(); // O pop() pode ser string ou undefined

              // CORREÇÃO DO TYPESCRIPT: Type Guard. Só entra se for string de verdade
              if (
                slug &&
                typeof slug ===
                  'string' &&
                slug.length > 2
              ) {
                validSlugs.push(slug);
              }
            }
          });

          return validSlugs;
        },
        config.linkIncludes,
      );

    console.log(
      `🔎 Descobertas ${discoveredSlugs.length} categorias potenciais.`,
    );

    // Salvando no banco de forma segura
    for (const slug of Array.from(
      new Set(discoveredSlugs),
    )) {
      await prisma.category.upsert({
        where: { slug }, // TS agora sabe que slug é 100% string
        update: {},
        create: {
          slug,
          name:
            slug
              .charAt(0)
              .toUpperCase() +
            slug
              .slice(1)
              .replace(/-/g, ' '),
        },
      });
    }

    return discoveredSlugs;
    // eslint-disable-next-line
  } catch (error: any) {
    console.error(
      '❌ [DISCOVERY] Erro na mineração:',
      error.message,
    );
    throw error;
  } finally {
    await browser.close();
  }
}
