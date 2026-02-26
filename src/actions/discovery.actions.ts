// src/actions/discovery.actions.ts
'use server';

import puppeteer from 'puppeteer-extra';
import { prisma } from '@/lib/prisma'; // 🚀 Singleton centralizado
import { SCRAPER_DICTIONARY } from '../utils/scraper.config';
import { crawlCategoryAction } from './scraper.actions';

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
      await page.evaluate((config) => {
        const links = Array.from(
          document.querySelectorAll(
            'a',
          ),
        );
        const validSlugs: string[] = [];

        links.forEach((a) => {
          const href =
            a.getAttribute('href') ||
            '';
          const isCategoryLink =
            config.linkIncludes.some(
              (inc) =>
                href.includes(inc),
            );
          const isBlacklisted =
            config.linkExcludes.some(
              (exc) =>
                href.includes(exc),
            );

          if (
            isCategoryLink &&
            !isBlacklisted &&
            !href.includes('hd-porn')
          ) {
            const parts = href
              .split('/')
              .filter(Boolean);
            const slug = parts.pop();
            if (
              slug &&
              slug.length > 2 &&
              slug.length < 30
            ) {
              validSlugs.push(slug);
            }
          }
        });
        return validSlugs;
      }, config);

    console.log(
      `🔎 [DISCOVERY] Processando ${discoveredSlugs.length} potenciais categorias...`,
    );

    for (const slug of Array.from(
      new Set(discoveredSlugs),
    )) {
      const category =
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
          include: {
            _count: {
              select: { videos: true },
            },
          },
        });

      // 🚀 Se for nova ou estiver zerada, já faz o primeiro scrape
      if (
        category._count.videos === 0
      ) {
        console.log(
          `🆕 [DISCOVERY] Populando nova categoria: ${slug}`,
        );
        await crawlCategoryAction(
          slug,
          slug,
        );
      }
    }

    return discoveredSlugs;
    // eslint-disable-next-line
  } catch (error: any) {
    console.error(
      '❌ [DISCOVERY] Erro Crítico:',
      error.message,
    );
    throw error;
  } finally {
    await browser.close();
  }
}
