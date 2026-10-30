interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();

function cleanup() {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetAt) rateLimitMap.delete(ip);
  }
}

export function checkRateLimit(ip: string, maxRequests = 5, windowMs = 600000): boolean {
  cleanup();
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) return false;
  record.count += 1;
  return true;
}

export function resetRateLimitsForTesting() {
  rateLimitMap.clear();
}
