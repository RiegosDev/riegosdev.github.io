import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const hasCloudflareAccess =
    request.headers.has('cf-access-jwt-assertion');

  if (!hasCloudflareAccess) {
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

