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
    `🚀 [MOTOR] Capturando: ${categorySlug.toUpperCase()}`,
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

    // ✅ RESTAURADO: Cookies de verificação de idade (Pulo do gato)
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

    // ✅ ATUALIZAÇÃO: Marca a categoria como processada na fila [cite: 2026-02-16]
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
        // ✅ CORREÇÃO DE URL: Restaurando a limpeza de barras do código antigo
        const safeBase =
          siteConfig.baseUrl.endsWith(
            '/',
          )
            ? siteConfig.baseUrl
            : `${siteConfig.baseUrl}/`;
        const cleanPath =
          siteConfig.categoryPath.replace(
            /^\/|\/$/g,
            '',
          );
        const pageUrl = `${safeBase}${cleanPath}/${targetCategorySlug}`;

        console.log(
          `🔎 [${siteName}] Acessando: ${pageUrl}`,
        );

        await page.goto(pageUrl, {
          waitUntil: 'load',
          timeout: 60000,
        });

        // ✅ RESTAURADO: Clique em botões de confirmação e limpeza de overlay
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
        );

        // ✅ CORREÇÃO DE EXTRAÇÃO: Suporte a Lazy Load e atributos do código antigo
        const extractedVideos =
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
                  const titleEl =
                    item.querySelector(
                      config.selectors
                        .title,
                    );

                  // Lógica de Thumbnail Robusta da versão antiga
                  const finalThumb =
                    thumbEl?.getAttribute(
                      'data-src',
                    ) ||
                    thumbEl?.getAttribute(
                      'data-lazy',
                    ) ||
                    thumbEl?.getAttribute(
                      'src',
                    ) ||
                    '';

                  return {
                    title:
                      titleEl?.textContent?.trim() ||
                      titleEl?.getAttribute(
                        'alt',
                      ) ||
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
                      finalThumb,
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
                    v.thumbnail &&
                    v.thumbnail !== '',
                );
            },
            siteConfig,
          );

        if (
          extractedVideos.length > 0
        ) {
          console.log(
            `✅ [${siteName}] Inserindo ${extractedVideos.length} vídeos.`,
          );
          for (const v of extractedVideos) {
            const videoSlug = v.title
              .toLowerCase()
              .replace(/ /g, '-')
              .replace(/[^\w-]+/g, '')
              .slice(0, 150);
            await prisma.video.upsert({
              where: {
                slug: videoSlug,
              },
              update: {
                thumbnail: v.thumbnail,
                duration: v.duration,
              },
              create: {
                title: v.title,
                slug: videoSlug,
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
            `⚠️ [${siteName}] Nenhum vídeo extraído. Verificando DOM...`,
          );
        }
      } catch (siteError) {
        console.error(
          `❌ [${siteName}] Erro:`,
          siteError,
        );
      }
    }
  } finally {
    await browser.close();
    console.log(
      `🏁 [MOTOR] Ciclo finalizado para: ${categorySlug}\n`,
    );
  }
}
