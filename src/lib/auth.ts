// /src/lib/auth.ts
import {
  SignJWT,
  jwtVerify,
  JWTPayload,
} from 'jose';
import { cookies } from 'next/headers';

// Puxa a secret do .env (Certifique-se de que a JWT_SECRET existe lá junto com a ADMIN_...)
const secretKey =
  process.env.JWT_SECRET;
const key = new TextEncoder().encode(
  secretKey,
);

export async function encrypt(
  payload: JWTPayload,
) {
  return await new SignJWT(payload)
    .setProtectedHeader({
      alg: 'HS256',
    })
    .setIssuedAt()
    .setExpirationTime('2h') // Sessão de 2 horas
    .sign(key);
}

export async function decrypt(
  input: string,
): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(
      input,
      key,
      {
        algorithms: ['HS256'],
      },
    );
    return payload;
  } catch {
    // 🚀 Se o token expirar ou for adulterado, cai aqui silenciosamente retornando null [cite: 2026-02-16]
    return null;
  }
}

export async function getSession() {
  const session = (await cookies()).get(
    'session',
  )?.value; //
  if (!session) return null;
  return await decrypt(session);
}
