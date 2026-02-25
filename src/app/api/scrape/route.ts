// src/app/api/scrape/route.ts
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

    if (
      !secret ||
      authHeader !== secret
    ) {
      console.warn(
        '🚨 [API] Bloqueio: Crachá inválido ou ausente.',
      );
      return NextResponse.json(
        { error: 'Acesso Negado.' },
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
        '🤖 [API] Iniciando mapeamento de categorias em BACKGROUND...',
      );

      // 🚀 PULO DO GATO: Executa a ação sem usar o "await" para não travar a resposta
      discoverNewCategoriesAction().catch(
        (e) =>
          console.error(
            'Erro no discovery bg:',
            e,
          ),
      );

      // Responde imediatamente para o n8n não dar timeout!
      return NextResponse.json({
        success: true,
        message: `Mapeamento iniciado em segundo plano. O log mostrará o resultado.`,
      });
    }

    if (command === 'SCRAPE') {
      if (!categorySlug || !targetUrl) {
        return NextResponse.json(
          {
            error: 'Faltam parâmetros.',
          },
          { status: 400 },
        );
      }
      console.log(
        `🤖 [API] Raspagem iniciada em BACKGROUND: ${categorySlug}`,
      );

      // 🚀 Executa em background também!
      crawlCategoryAction(
        categorySlug,
        targetUrl,
      ).catch((e) =>
        console.error(
          'Erro no scrape bg:',
          e,
        ),
      );

      return NextResponse.json({
        success: true,
        message: `Raspagem da categoria ${categorySlug} iniciada em background.`,
      });
    }

    return NextResponse.json(
      { error: 'Comando inválido.' },
      { status: 400 },
    );
    // eslint-disable-next-line
  } catch (error: any) {
    console.error(
      '❌ [API] Erro na rota:',
      error.message,
    );
    return NextResponse.json(
      { error: 'Erro interno.' },
      { status: 500 },
    );
  }
}
