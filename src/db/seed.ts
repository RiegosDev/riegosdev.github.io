import * as dotenv from 'dotenv';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import { crawlCategoryAction } from '../actions/scraper.actions';
import { discoverNewCategoriesAction } from '../actions/discovery.actions';

// 1. CARREGAMENTO DE AMBIENTE
dotenv.config({
  path: path.resolve(
    process.cwd(),
    '.env',
  ),
});

const prisma = new PrismaClient();

async function main() {
  console.log(
    '🌱 [SEED] Iniciando o Bootstrap Completo do Motor DotF4p.com...',
  );

  // 2. AS RAÍZES LIMPAS (Sem lixo)
  const targetCategories = [
    'amateur',
    'anal',
    'asian',
    'brazilian',
    'bbw',
    'big-ass',
    'big-tits',
    'blonde',
    'blowjob',
    'creampie',
    'cumshot',
    'ebony',
    'hardcore',
    'hentai',
    'interracial',
    'latina',
    'lesbians',
    'mature',
    'milf',
    'pov-porn',
    'redhead',
    'threesome',
  ];

  console.log(
    '🌲 [SEED] Plantando categorias raízes...',
  );
  for (const slug of targetCategories) {
    await prisma.category.upsert({
      where: { slug },
      update: {},
      create: {
        slug,
        name:
          slug.charAt(0).toUpperCase() +
          slug
            .slice(1)
            .replace(/-/g, ' '),
      },
    });
  }

  // 3. DESCOBERTA DE NOVAS CATEGORIAS (Usando o Discovery limpo)
  let dynamicCategories: string[] = [];
  try {
    console.log(
      '\n🔎 [SEED] Buscando categorias dinâmicas fresquinhas na web...',
    );
    dynamicCategories =
      await discoverNewCategoriesAction();
    console.log(
      `✅ [SEED] ${dynamicCategories.length} categorias dinâmicas mapeadas.`,
    );
  } catch (err) {
    console.error(
      '❌ [SEED] Erro no discovery:',
      err,
    );
  }

  // 4. O PULO DO GATO: Unindo Raízes + Dinâmicas sem repetir slugs
  const allTargets = Array.from(
    new Set([
      ...targetCategories,
      ...dynamicCategories,
    ]),
  );

  console.log(
    `\n🤖 [MOTOR] Iniciando Puppeteer para popular ${allTargets.length} categorias.`,
  );
  console.log(
    '⚠️ [AVISO] Isso vai demorar. Pode ir pegar um café e deixar o servidor trabalhar!',
  );

  // 5. SCRAPING SEQUENCIAL (Para não explodir a VPS)
  for (const slug of allTargets) {
    try {
      console.log(
        `\n🎬 [SCRAPER] Minerando vídeos para: ${slug.toUpperCase()}...`,
      );
      // Passando o slug tanto como ID interno quanto como target externo
      await crawlCategoryAction(
        slug,
        slug,
      );
      console.log(
        `✅ [SCRAPER] ${slug.toUpperCase()} populada com sucesso.`,
      );
    } catch (err) {
      console.error(
        `❌ [SCRAPER] Erro ao popular ${slug}:`,
        err,
      );
    }
  }

  console.log(
    '\n🎉 [SEED] Bootstrap finalizado com sucesso! O banco está GIGANTE!',
  );
}

main()
  .catch((e) => {
    console.error(
      '❌ Erro Fatal no Seed:',
      e,
    );
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
