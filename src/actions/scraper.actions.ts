// src/actions/scraper.actions.ts
'use server';

import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { prisma } from '@/lib/prisma'; // 🚀 Singleton centralizado
import { SCRAPER_DICTIONARY } from '../utils/scraper.config';

puppeteer.use(StealthPlugin());

export async function crawlCategoryAction(
  categorySlug: string,
  targetCategorySlug: string,
) {
  console.log(
    `🚀 [MOTOR] Capturando conteúdo para: ${categorySlug.toUpperCase()}`,
  );

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

    // 🚀 ATUALIZAÇÃO DA FILA: Marcamos que esta categoria está sendo processada agora [cite: 2026-02-16]
    await prisma.category.update({
      where: { slug: categorySlug },
      data: { updatedAt: new Date() },
    });

    for (const [
      siteName,
      siteConfig,
    ] of Object.entries(
      SCRAPER_DICTIONARY,
    )) {
      if (
        !siteConfig.baseUrl ||
        siteName === 'default'
      )
        continue;

      try {
        const pageUrl = `${siteConfig.baseUrl}${siteConfig.categoryPath}/${targetCategorySlug}`;
        await page.goto(pageUrl, {
          waitUntil: 'load',
          timeout: 60000,
        });

        // Simulação humana básica
        await new Promise((r) =>
          setTimeout(r, 2000),
        );

        const videos =
          await page.evaluate(
            (config) => {
              const items = Array.from(
                document.querySelectorAll(
                  config.selectors
                    .container,
                ),
              );
              return items
                .map((item) => {
                  const thumbEl =
                    item.querySelector(
                      config.selectors
                        .thumbnail,
                    );
                  return {
                    title:
                      item
                        .querySelector(
                          config
                            .selectors
                            .title,
                        )
                        ?.textContent?.trim() ||
                      '',
                    url:
                      (
                        item.querySelector(
                          config
                            .selectors
                            .link,
                        ) as HTMLAnchorElement
                      )?.href || '',
                    thumbnail:
                      thumbEl?.getAttribute(
                        'data-src',
                      ) ||
                      thumbEl?.getAttribute(
                        'src',
                      ) ||
                      '',
                    duration:
                      item
                        .querySelector(
                          config
                            .selectors
                            .duration,
                        )
                        ?.textContent?.trim() ||
                      '00:00',
                  };
                })
                .filter(
                  (v) =>
                    v.url &&
                    v.title &&
                    v.thumbnail,
                );
            },
            siteConfig,
          );

        if (videos.length > 0) {
          for (const v of videos) {
            const vSlug = v.title
              .toLowerCase()
              .replace(/ /g, '-')
              .replace(/[^\w-]+/g, '')
              .slice(0, 150);

            await prisma.video.upsert({
              where: { slug: vSlug },
              update: {
                thumbnail: v.thumbnail,
                duration: v.duration,
              },
              create: {
                title: v.title,
                slug: vSlug,
                thumbnail: v.thumbnail,
                externalUrl: v.url,
                duration: v.duration,
                source: siteName,
                views: '0',
                categories: {
                  create: {
                    category: {
                      connect: {
                        slug: categorySlug,
                      },
                    },
                  },
                },
              },
            });
          }
        }
      } catch (e) {
        console.error(
          `❌ [${siteName}] Falhou:`,
          e,
        );
      }
    }
  } finally {
    await browser.close();
    console.log(
      `🏁 [MOTOR] Finalizado: ${categorySlug}\n`,
    );
  }
}
