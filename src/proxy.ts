import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const cloudflareAccessJwt = request.headers.get(
    'cf-access-jwt-assertion',
  );
  const hasCloudflareAccessJwt =
    typeof cloudflareAccessJwt === 'string' &&
    /^eyJ[A-Za-z0-9_-]*\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(
      cloudflareAccessJwt,
    );

  if (!hasCloudflareAccessJwt) {
    return new NextResponse('Cloudflare Access required', {
      status: 403,
      headers: {
        'Cache-Control': 'private, no-store',
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/cronogramas/:path*'],
};
