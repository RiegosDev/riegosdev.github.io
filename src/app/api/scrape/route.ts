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
    // 1. SEGURANÇA ÚNICA E SÓLIDA
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

    // 2. PARSE DO JSON (Garante que o n8n está mandando RAW JSON)
    const {
      command,
      categorySlug,
      targetUrl,
    } = await request.json();

    // 3. ROTEAMENTO
    if (command === 'DISCOVERY') {
      console.log(
        '🤖 [API] Iniciando mapeamento de categorias em BACKGROUND...',
      );
      discoverNewCategoriesAction().catch(
        (e) =>
          console.error(
            'Erro no discovery bg:',
            e,
          ),
      );
      return NextResponse.json({
        success: true,
        message:
          'Mapeamento iniciado em segundo plano.',
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
