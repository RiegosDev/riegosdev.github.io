// src/actions/scraper.actions.ts
'use server';

import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { prisma } from '@/lib/prisma';
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
        '--lang=pt-BR,pt;q=0.9',
      ],
    });

  try {
    const page =
      await browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    );

    // 🚀 RESTAURADO: Cookies de Verificação de Idade
    const cookies = [
      {
        name: 'age_verified',
        value: '1',
        domain: '.xhamster.com',
      },
      {
        name: 'kt_is_over18',
        value: '1',
        domain: '.eporner.com',
      },
    ];
    await page.setCookie(...cookies);

    // Atualiza a fila de manutenção
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

        // 🚀 RESTAURADO: Limpeza de Overlays e Cliques Automáticos
        await page.evaluate(() => {
          const keywords = [
            'Sim',
            'Yes',
            'Enter',
            'Confirm',
            'Over 18',
            'Agree',
            'Aceitar',
          ];
          document
            .querySelectorAll(
              'button, a, div',
            )
            // eslint-disable-next-line
            .forEach((btn: any) => {
              if (
                keywords.some((kw) =>
                  btn.innerText?.includes(
                    kw,
                  ),
                )
              )
                btn.click();
            });
          document
            .querySelectorAll(
              '[class*="age-gate"], [class*="overlay"]',
            )
            .forEach((el) =>
              el.remove(),
            );
          document.body.style.overflow =
            'visible';
        });

        await new Promise((r) =>
          setTimeout(r, 3000),
        ); // Tempo extra para carregar os thumbs

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
          console.log(
            `✅ [${siteName}] ${videos.length} vídeos novos.`,
          );
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
        } else {
          console.warn(
            `⚠️ [${siteName}] Nenhum vídeo extraído.`,
          );
        }
      } catch (e) {
        console.error(
          `❌ [${siteName}] Erro:`,
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
