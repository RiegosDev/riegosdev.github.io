import { NextRequest, NextResponse } from 'next/server';
import { createRemoteJWKSet, jwtVerify } from 'jose';

const cloudflareAccessTeamDomain = process.env.CF_ACCESS_TEAM_DOMAIN;
const cloudflareAccessAudience = process.env.CF_ACCESS_AUD;
const normalizedTeamDomain = cloudflareAccessTeamDomain
  ?.replace(/^https?:\/\//, '')
  .replace(/\/$/, '');
const cloudflareAccessIssuer = normalizedTeamDomain
  ? `https://${normalizedTeamDomain}`
  : null;
const cloudflareAccessJwks =
  normalizedTeamDomain && cloudflareAccessIssuer
    ? createRemoteJWKSet(
        new URL(
          `${cloudflareAccessIssuer}/cdn-cgi/access/certs`,
        ),
      )
    : null;

function accessRequired() {
  return new NextResponse('Cloudflare Access required', {
    status: 403,
    headers: {
      'Cache-Control': 'private, no-store',
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}

export async function proxy(request: NextRequest) {
  const cloudflareAccessJwt = request.headers.get(
    'cf-access-jwt-assertion',
  );

  if (
    !cloudflareAccessJwt ||
    !cloudflareAccessJwks ||
    !cloudflareAccessIssuer ||
    !cloudflareAccessAudience
  ) {
    return accessRequired();
  }

  try {
    await jwtVerify(
      cloudflareAccessJwt,
      cloudflareAccessJwks,
      {
        issuer: cloudflareAccessIssuer,
        audience: cloudflareAccessAudience,
      },
    );
  } catch {
    return accessRequired();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/cronogramas/:path*'],
};
