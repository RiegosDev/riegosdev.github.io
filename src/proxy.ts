import {
  NextRequest,
  NextResponse,
} from 'next/server';
import { decrypt } from '@/lib/auth';

export async function proxy(
  request: NextRequest,
) {
  const { pathname } = request.nextUrl;

  // 1. 🚀 EXCEÇÃO API: Liberdade total para as rotas de backend
  // A segurança aqui é tratada via Header x-api-secret na própria Route
  if (pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // 2. EXCEÇÃO LOGIN: Evita loop de redirecionamento
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  // 3. 🛡️ PROTEÇÃO ADMIN: Validação de Sessão via JWT
  if (pathname.startsWith('/admin')) {
    const session =
      request.cookies.get(
        'session',
      )?.value;

    if (!session) {
      return NextResponse.redirect(
        new URL(
          '/admin/login',
          request.url,
        ),
      );
    }

    try {
      await decrypt(session);
      return NextResponse.next();
    } catch (error) {
      console.warn(
        '🚨 [Proxy] Sessão expirada ou inválida.',
      );
      return NextResponse.redirect(
        new URL(
          '/admin/login',
          request.url,
        ),
      );
    }
  }

  return NextResponse.next();
}

// O Matcher garante que o middleware só rode onde é estritamente necessário
export const config = {
  matcher: [
    '/admin/:path*',
    '/api/:path*',
  ],
};
