import {
  NextRequest,
  NextResponse,
} from 'next/server';
import { discoverNewCategoriesAction } from '@/actions/discovery.actions';
import { crawlCategoryAction } from '@/actions/scraper.actions';

export async function POST(
  request: NextRequest,
) {
  try {
    const authHeader =
      request.headers.get(
        'x-api-secret',
      );
    const secret =
      process.env.N8N_API_SECRET;

    // Validação de Segurança Sólida
    if (
      !secret ||
      authHeader !== secret
    ) {
      console.warn(
        '🚨 [API] Bloqueio: Crachá inválido ou ausente.',
      );
      return NextResponse.json(
        {
          error:
            'Acesso Negado. Crachá inválido, parceiro.',
        },
        { status: 401 },
      );
    }

    const {
      command,
      categorySlug,
      targetUrl,
    } = await request.json();

    if (command === 'DISCOVERY') {
      console.log(
        '🤖 [API] Iniciando mapeamento de categorias...',
      );
      const discoveredSlugs =
        await discoverNewCategoriesAction();
      return NextResponse.json({
        success: true,
        message: `${discoveredSlugs.length} novas rotas mapeadas.`,
        data: discoveredSlugs,
      });
    }

    if (command === 'SCRAPE') {
      if (!categorySlug || !targetUrl) {
        return NextResponse.json(
          {
            error:
              'Faltam parâmetros para SCRAPE.',
          },
          { status: 400 },
        );
      }
      console.log(
        `🤖 [API] Raspagem iniciada: ${categorySlug}`,
      );
      await crawlCategoryAction(
        categorySlug,
        targetUrl,
      );
      return NextResponse.json({
        success: true,
        category: categorySlug,
      });
    }

    return NextResponse.json(
      { error: 'Comando inválido.' },
      { status: 400 },
    );
    // eslint-disable-next-line
  } catch (error: any) {
    console.error(
      '❌ [API] Erro no motor de scrape:',
      error.message,
    );
    return NextResponse.json(
      {
        error:
          'Erro interno no processamento.',
      },
      { status: 500 },
    );
  }
}
