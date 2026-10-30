import type { VercelRequest } from '@vercel/node';

export function extractClientIp(req: VercelRequest): { clientIp: string; isLocalIp: boolean } {
  const isProductionVercel =
    process.env.VERCEL_ENV === 'production' || process.env.VERCEL_ENV === 'preview';

  const vercelRealIp =
    typeof req.headers['x-real-ip'] === 'string' ? req.headers['x-real-ip'].trim() : '';
  const vercelEdgeIp =
    typeof req.headers['x-vercel-ip'] === 'string' ? req.headers['x-vercel-ip'].trim() : '';
  const forwarded =
    typeof req.headers['x-forwarded-for'] === 'string'
      ? req.headers['x-forwarded-for'].split(',')[0].trim()
      : '';

  const clientIp = isProductionVercel
    ? vercelRealIp || vercelEdgeIp || forwarded || req.socket?.remoteAddress || '127.0.0.1'
    : forwarded || vercelRealIp || req.socket?.remoteAddress || '127.0.0.1';

  const isLocalIp =
    !isProductionVercel &&
    (clientIp === '127.0.0.1' ||
      clientIp === '::1' ||
      clientIp === '::ffff:127.0.0.1' ||
      clientIp === 'localhost');

  return { clientIp, isLocalIp };
}
