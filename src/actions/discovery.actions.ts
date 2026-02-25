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
    const config =
      SCRAPER_DICTIONARY['eporner.com'];
    const discoveryUrl = `${config.baseUrl}${config.categoryPath}`;

    await page.goto(discoveryUrl, {
      waitUntil: 'networkidle2',
      timeout: 60000,
    });

    const discoveredSlugs =
      await page.evaluate(
        (includes) => {
          const links = Array.from(
            document.querySelectorAll(
              'a',
            ),
          );
          const validSlugs: string[] =
            [];

          links.forEach((a) => {
            const href =
              a.getAttribute('href') ||
              '';

            // 🚀 Agora 'includes' existe de verdade (vem do config.linkIncludes)
            const isCategoryLink =
              includes.some((inc) =>
                href.includes(inc),
              );

            // Ignora coisas que não são categorias reais e links estáticos do site
            if (
              isCategoryLink &&
              !href.includes(
                'hd-porn',
              ) &&
              !href.includes('login')
            ) {
              const parts = href
                .split('/')
                .filter(Boolean);
              const slug = parts.pop();

              if (
                slug &&
                typeof slug ===
                  'string' &&
                slug.length > 2 &&
                slug.length < 30
              ) {
                validSlugs.push(slug);
              }
            }
          });

          return validSlugs;
        },
        config.linkIncludes, // Passando o ARRAY diretamente para a função do browser!
      );

    console.log(
      `🔎 Descobertas ${discoveredSlugs.length} categorias potenciais.`,
    );

    for (const slug of Array.from(
      new Set(discoveredSlugs),
    )) {
      await prisma.category.upsert({
        where: { slug },
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
