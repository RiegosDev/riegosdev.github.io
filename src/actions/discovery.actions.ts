// src/actions/discovery.actions.ts
'use server';

import puppeteer from 'puppeteer-extra';
import { prisma } from '@/lib/prisma';
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

  const allDiscoveredSlugs =
    new Set<string>();

  try {
    const page =
      await browser.newPage();

    // 🚀 LÓGICA DINÂMICA: Passa por TODAS as fontes do dicionário
    for (const [
      siteName,
      config,
    ] of Object.entries(
      SCRAPER_DICTIONARY,
    )) {
      if (
        !config.baseUrl ||
        siteName === 'default'
      )
        continue;

      const discoveryUrl = `${config.baseUrl}${config.categoryPath}`;
      console.log(
        `🔎 [DISCOVERY] Mapeando fonte: ${siteName} (${discoveryUrl})`,
      );

      try {
        await page.goto(discoveryUrl, {
          waitUntil: 'networkidle2',
          timeout: 60000,
        });

        const slugsFromSite =
          await page.evaluate((cfg) => {
            const links = Array.from(
              document.querySelectorAll(
                'a',
              ),
            );
            const validSlugs: string[] =
              [];

            links.forEach((a) => {
              const href =
                a.getAttribute(
                  'href',
                ) || '';
              const isCategoryLink =
                cfg.linkIncludes.some(
                  (inc) =>
                    href.includes(inc),
                );
              const isBlacklisted =
                cfg.linkExcludes.some(
                  (exc) =>
                    href.includes(exc),
                );

              if (
                isCategoryLink &&
                !isBlacklisted &&
                !href.includes(
                  'hd-porn',
                )
              ) {
                const parts = href
                  .split('/')
                  .filter(Boolean);
                const slug =
                  parts.pop();
                if (
                  slug &&
                  slug.length > 2 &&
                  slug.length < 30
                )
                  validSlugs.push(slug);
              }
            });
            return validSlugs;
          }, config);

        slugsFromSite.forEach((slug) =>
          allDiscoveredSlugs.add(slug),
        );
      } catch (err) {
        console.warn(
          `⚠️ Erro ao mapear ${siteName}:`,
          err,
        );
      }
    }

    console.log(
      `🔎 [DISCOVERY] Total de ${allDiscoveredSlugs.size} categorias únicas encontradas.`,
    );

    // 🚀 Lógica de População (igual a que estava perfeita)
    for (const slug of Array.from(
      allDiscoveredSlugs,
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

      if (
        category._count.videos === 0
      ) {
        console.log(
          `🆕 [DISCOVERY] Populando nova categoria/tag: ${slug}`,
        );
        await crawlCategoryAction(
          slug,
          slug,
        );
      }
    }

    return Array.from(
      allDiscoveredSlugs,
    );
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
