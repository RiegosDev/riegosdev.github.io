import { NextResponse } from 'next/server';
import path from 'node:path';
import { getContentFile } from '../../_lib/content';

export const dynamic = 'force-dynamic';

const contentTypes: Record<string, string> = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};

type RouteContext = {
  params: Promise<{
    path: string[];
  }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { path: pathParts } = await context.params;
  const relativePath = pathParts.join('/');

  try {
    const file = await getContentFile(relativePath);
    const extension = path.extname(relativePath).toLowerCase();

    return new Response(new Uint8Array(file), {
      headers: {
        'Cache-Control': 'private, no-store',
        'Content-Type':
          contentTypes[extension] ?? 'application/octet-stream',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch {
    return NextResponse.json(
      { error: 'Cronograma file not found' },
      { status: 404 },
    );
  }
}

