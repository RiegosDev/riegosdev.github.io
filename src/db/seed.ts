import * as dotenv from 'dotenv';
import path from 'path';
import { PrismaClient } from '@prisma/client';

dotenv.config({
  path: path.resolve(
    process.cwd(),
    '.env',
  ),
});

const prisma = new PrismaClient();

async function main() {
  console.log(
    '🌱 [SEED] Plantando categorias raízes no banco...',
  );

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

  console.log(
    `✅ [SEED] ${targetCategories.length} categorias raízes plantadas com sucesso!`,
  );
}

main()
  .catch((e) => {
    console.error(
      '❌ Erro no seed:',
      e,
    );
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
