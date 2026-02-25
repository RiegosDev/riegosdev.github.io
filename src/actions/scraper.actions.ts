'use server';

import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { PrismaClient } from '@prisma/client';
import { SCRAPER_DICTIONARY } from '../utils/scraper.config';

// Ativa o modo furtivo para evitar detecção de bot
puppeteer.use(StealthPlugin());

const prisma = new PrismaClient();

export async function crawlCategoryAction(
  categorySlug: string,
  targetCategorySlug: string,
) {
  console.log(
    `\n🚀 [MOTOR] Iniciando captura: ${categorySlug.toUpperCase()}`,
  );

  const browser =
    await puppeteer.launch({
      headless: true, // Mude para false se quiser ver o robô trabalhando
      executablePath:
        process.env
          .PUPPETEER_EXECUTABLE_PATH ||
        undefined, // Usa o Chrome do SO no Docker, e o padrão no seu Windows
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-blink-features=AutomationControlled',
        '--lang=pt-BR,pt;q=0.9',
        '--disable-dev-shm-usage', // 🚀 Dica sênior: evita crash de memória no Docker
      ],
    });

  try {
    const page =
      await browser.newPage();
    // User-agent de peso para passar credibilidade
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    );

    for (const [
      siteName,
      siteConfig,
    ] of Object.entries(
      SCRAPER_DICTIONARY,
    )) {
      // 1. Validação de Segurança (Ignora entradas inválidas ou o 'default')
      if (
        !siteConfig.baseUrl ||
        siteName === 'default'
      ) {
        continue;
      }

      try {
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
        const pageUrl = new URL(
          `${cleanPath}/${targetCategorySlug}`,
          safeBase,
        ).toString();

        console.log(
          `🔎 [${siteName}] Tentando: ${pageUrl}`,
        );
        const cookies = [
          {
            name: 'age_verified',
            value: '1',
            domain: '.xhamster.com',
          },
          {
            name: 'age_verified',
            value: '1',
            domain: '.br.xhamster.com',
          },
          {
            name: 'is_over_18',
            value: '1',
            domain: '.faphouse.com',
          },
          {
            name: 'kt_is_over18',
            value: '1',
            domain: '.eporner.com',
          },
        ];
        await page.setCookie(
          ...cookies,
        );

        // 1. Navegação com wait mais resiliente
        await page.goto(pageUrl, {
          waitUntil: 'load',
          timeout: 60000,
        });

        await page.evaluate(() => {
          // Tenta clicar em qualquer botão que pareça de confirmação de idade
          const ageSelectors = [
            'button',
            'a',
            'div',
          ];
          const keywords = [
            'Sim',
            'Yes',
            'Enter',
            'Confirm',
            'Over 18',
            'Agree',
            'Aceitar',
          ];
          const beegButton =
            document.querySelector(
              'button.tw-bg-beeg-primary, .tw-modal button',
            );
          if (beegButton)
            (
              beegButton as HTMLElement
            ).click();
          const buttons =
            document.querySelectorAll(
              ageSelectors.join(','),
            );
          buttons.forEach(
            // eslint-disable-next-line
            (btn: any) => {
              if (
                keywords.some((kw) =>
                  btn.innerText?.includes(
                    kw,
                  ),
                )
              ) {
                btn.click();
              }
            },
          );

          // Mata overlays pretos/borrados que impedem o scraping
          const overlays =
            document.querySelectorAll(
              '[class*="age-gate"], [class*="overlay"], [id*="age-gate"]',
            );
          // eslint-disable-next-line
          overlays.forEach((el: any) =>
            el.remove(),
          );

          // Remove o blur/hidden do body se o site travar o scroll
          document.body.style.overflow =
            'visible';
          document.body.style.filter =
            'none';
        });

        await new Promise((r) =>
          setTimeout(r, 2000),
        ); // Espera a limpeza surtir efeito
        // 4. Espera o seletor específico
        try {
          await page.waitForSelector(
            siteConfig.selectors
              .container,
            { timeout: 15000 },
          );
          // eslint-disable-next-line
        } catch (e) {
          console.warn(
            `⚠️ [${siteName}] Elementos não carregaram a tempo.`,
          );
        }

        // 5. Extração com suporte a <video poster="">
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
                  const titleEl =
                    item.querySelector(
                      config.selectors
                        .title,
                    );
                  const linkEl =
                    item.querySelector(
                      config.selectors
                        .link,
                    ) as HTMLAnchorElement;
                  const thumbEl =
                    item.querySelector(
                      config.selectors
                        .thumbnail,
                    ); // Pode ser img ou video
                  const durationEl =
                    item.querySelector(
                      config.selectors
                        .duration,
                    );
                  const title =
                    titleEl?.textContent?.trim() ||
                    titleEl?.getAttribute(
                      'alt',
                    ) ||
                    '';

                  // Lógica de Thumbnail Inteligente
                  let finalThumb = '';
                  if (thumbEl) {
                    // Tenta todos os atributos comuns de Lazy Load na ordem de prioridade
                    finalThumb =
                      thumbEl.getAttribute(
                        'data-src',
                      ) ||
                      thumbEl.getAttribute(
                        'data-lazy',
                      ) ||
                      thumbEl.getAttribute(
                        'data-original',
                      ) ||
                      thumbEl
                        .getAttribute(
                          'srcset',
                        )
                        ?.split(
                          ' ',
                        )[0] || // Pega a primeira imagem do srcset
                      (
                        thumbEl as HTMLImageElement
                      ).src ||
                      '';
                  }

                  return {
                    title,
                    url:
                      linkEl?.href ||
                      '',
                    thumbnail:
                      finalThumb,
                    duration:
                      durationEl?.textContent?.trim() ||
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

        // 5. Lógica de Debug e Persistência
        if (
          extractedVideos.length === 0
        ) {
          console.log(
            `📸 [${siteName}] 0 vídeos. Gerando debug print em ./public/debug-${siteName}.png`,
          );
          await page.screenshot({
            path: `./public/debug-${siteName}.png`,
          });
        } else {
          console.log(
            `✅ [${siteName}] Encontrados ${extractedVideos.length} vídeos.`,
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
                publishedAt: new Date(),
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
      } catch (siteError) {
        console.error(
          `❌ Erro processando ${siteName}:`,
          siteError instanceof Error
            ? siteError.message
            : siteError,
        );
      }
    }
  } catch (globalError) {
    console.error(
      '🚨 Erro Crítico no Scraper:',
      globalError,
    );
  } finally {
    await browser.close();
    console.log(
      `🏁 [MOTOR] Ciclo finalizado para: ${categorySlug}\n`,
    );
  }
}
