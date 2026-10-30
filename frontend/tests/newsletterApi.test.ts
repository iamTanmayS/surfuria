import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import handler, {
  validateNewsletterPayload,
  buildNewsletterNotificationEmail,
  checkRateLimit,
  resetRateLimitsForTesting,
} from '../api/newsletter.js';

function createMockHttp(options: { method?: string; body?: unknown; headers?: Record<string, string>; ip?: string }) {
  const req = {
    method: options.method || 'POST',
    body: options.body,
    headers: { 'content-type': 'application/json', ...options.headers },
    socket: { remoteAddress: options.ip || '127.0.0.1' },
  } as unknown as VercelRequest;

  let statusCode = 200;
  let responseData: unknown = null;
  const responseHeaders: Record<string, string> = {};

  const res = {
    status(code: number) { statusCode = code; return res; },
    json(data: unknown) { responseData = data; return res; },
    setHeader(name: string, value: string) { responseHeaders[name.toLowerCase()] = value; return res; },
    getHeader(name: string) { return responseHeaders[name.toLowerCase()]; },
  } as unknown as VercelResponse;

  return { req, res, getStatus: () => statusCode, getData: () => responseData as Record<string, unknown>, getHeaders: () => responseHeaders };
}

describe('Surfuria Newsletter API & Validation Suite', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    resetRateLimitsForTesting();
    process.env = {
      ...originalEnv,
      BREVO_API_KEY: 'test-brevo-api-key',
      BREVO_SENDER_EMAIL: 'verified@surfuria.com',
      BREVO_SENDER_NAME: 'Surfuria',
      CONTACT_RECIPIENT_EMAIL: 'info@surfuria.com',
    };
    vi.restoreAllMocks();
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  describe('Official contact information', () => {
    it('newsletter notification is delivered to info@surfuria.com', async () => {
      let capturedPayload: unknown = null;
      vi.spyOn(globalThis, 'fetch').mockImplementationOnce(async (_url, init) => {
        if (init?.body) capturedPayload = JSON.parse(init.body as string);
        return new Response(JSON.stringify({ messageId: 'nl-msg-1' }), { status: 201, headers: { 'Content-Type': 'application/json' } });
      });

      const { req, res, getStatus } = createMockHttp({ method: 'POST', body: { email: 'subscriber@example.com' } });
      await handler(req, res);
      expect(getStatus()).toBe(200);
      const brevoData = capturedPayload as { to: Array<{ email: string }> };
      expect(brevoData.to[0].email).toBe('info@surfuria.com');
    });

    it('newsletter notification email template shows info@surfuria.com as forwarded inbox', () => {
      const email = buildNewsletterNotificationEmail(
        { email: 'subscriber@example.com' },
        { recipientEmail: 'info@surfuria.com' }
      );
      expect(email.htmlContent).toContain('info@surfuria.com');
      expect(email.textContent).toContain('info@surfuria.com');
    });
  });

  describe('validateNewsletterPayload()', () => {
    it('rejects non-object or missing payloads with 400', () => {
      expect(validateNewsletterPayload(null)).toEqual({ isValid: false, isSpam: false, statusCode: 400, error: 'Invalid request body. Expected a JSON object.' });
      expect(validateNewsletterPayload('not a json object')).toEqual({ isValid: false, isSpam: false, statusCode: 400, error: 'Invalid request body. Expected a JSON object.' });
    });

    it('silently flags honeypot submissions as spam', () => {
      const res = validateNewsletterPayload({ email: 'test@example.com', website: 'https://spam-bot.site' });
      expect(res).toEqual({ isValid: true, isSpam: true });
    });

    it('rejects missing or empty email with "Enter a valid email address."', () => {
      const res = validateNewsletterPayload({ email: '' });
      expect(res).toEqual({ isValid: false, isSpam: false, statusCode: 400, error: 'Enter a valid email address.', field: 'email' });
    });

    it('rejects malformed email formats', () => {
      const invalidEmails = ['plainaddress', '@missingusername.com', 'user@domain', 'user@.com'];
      for (const bad of invalidEmails) {
        const res = validateNewsletterPayload({ email: bad });
        expect(res.isValid).toBe(false);
        if (!res.isValid) expect(res.error).toBe('Enter a valid email address.');
      }
    });

    it('accepts clean, valid subscriber emails', () => {
      const res = validateNewsletterPayload({ email: 'studio@architects.com' });
      expect(res.isValid).toBe(true);
      if (res.isValid && !res.isSpam) expect(res.data.email).toBe('studio@architects.com');
    });
  });

  describe('buildNewsletterNotificationEmail()', () => {
    it('generates notification with correct subject and escaped subscriber email', () => {
      const email = buildNewsletterNotificationEmail(
        { email: 'specifier<test>@atelier.design' },
        { clientIp: '198.51.100.42', userAgent: 'Mozilla/5.0 Test Suite', recipientEmail: 'info@surfuria.com' }
      );
      expect(email.subject).toBe('[Surfuria Newsletter] New Subscriber');
      expect(email.replyTo).toEqual({ email: 'specifier<test>@atelier.design' });
      expect(email.htmlContent).toContain('specifier&lt;test&gt;@atelier.design');
      expect(email.htmlContent).toContain('198.51.100.42');
      expect(email.htmlContent).toContain('info@surfuria.com');
      expect(email.textContent).toContain('specifier<test>@atelier.design');
    });
  });

  describe('Rate Limiter', () => {
    it('allows up to 5 requests within window and blocks 6th', () => {
      const ip = '192.0.2.10';
      for (let i = 0; i < 5; i++) expect(checkRateLimit(ip, 5, 60000)).toBe(true);
      expect(checkRateLimit(ip, 5, 60000)).toBe(false);
    });
  });

  describe('Vercel Handler HTTP Lifecycle & Brevo Integration', () => {
    it('rejects GET requests with 405 Method Not Allowed and sets Allow header', async () => {
      const { req, res, getStatus, getData, getHeaders } = createMockHttp({ method: 'GET' });
      await handler(req, res);
      expect(getStatus()).toBe(405);
      expect(getHeaders().allow).toBe('POST');
      expect(getData().error).toContain('Method Not Allowed');
    });

    it('silently returns 200 for spam honeypot without dispatching to Brevo', async () => {
      const fetchSpy = vi.spyOn(globalThis, 'fetch');
      const { req, res, getStatus, getData } = createMockHttp({ method: 'POST', body: { email: 'bot@spam.com', website: 'http://spam.org' } });
      await handler(req, res);
      expect(getStatus()).toBe(200);
      expect(getData().success).toBe(true);
      expect(fetchSpy).not.toHaveBeenCalled();
    });

    it('returns 400 when email is invalid', async () => {
      const { req, res, getStatus, getData } = createMockHttp({ method: 'POST', body: { email: 'bad-email' } });
      await handler(req, res);
      expect(getStatus()).toBe(400);
      expect(getData().error).toBe('Enter a valid email address.');
      expect(getData().field).toBe('email');
    });

    it('returns 503 CONFIG_MISSING when BREVO_API_KEY is not configured', async () => {
      delete process.env.BREVO_API_KEY;
      const { req, res, getStatus, getData } = createMockHttp({ method: 'POST', body: { email: 'user@example.com' } });
      await handler(req, res);
      expect(getStatus()).toBe(503);
      expect(getData().code).toBe('CONFIG_MISSING');
    });

    it('successfully dispatches notification to Brevo and returns 200', async () => {
      let capturedPayload: unknown = null;
      vi.spyOn(globalThis, 'fetch').mockImplementationOnce(async (_url, init) => {
        if (init?.body) capturedPayload = JSON.parse(init.body as string);
        return new Response(JSON.stringify({ messageId: 'brevo-msg-nl-12345' }), { status: 201, headers: { 'Content-Type': 'application/json' } });
      });

      const { req, res, getStatus, getData } = createMockHttp({ method: 'POST', body: { email: 'subscriber@designstudio.com' } });
      await handler(req, res);

      expect(getStatus()).toBe(200);
      expect(getData().success).toBe(true);
      expect(getData().messageId).toBe('brevo-msg-nl-12345');
      expect(getData().message).toBe("You're on the list. Thank you for subscribing.");

      const brevoData = capturedPayload as { to: Array<{ email: string }>; subject: string; replyTo: { email: string } };
      expect(brevoData.to[0].email).toBe('info@surfuria.com');
      expect(brevoData.subject).toBe('[Surfuria Newsletter] New Subscriber');
      expect(brevoData.replyTo.email).toBe('subscriber@designstudio.com');
    });

    it('handles Brevo 401/403 authentication failures gracefully with 502 BREVO_AUTH_ERROR', async () => {
      vi.spyOn(globalThis, 'fetch').mockImplementationOnce(async () => {
        return new Response(JSON.stringify({ message: 'Key not found', code: 'unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
      });
      const { req, res, getStatus, getData } = createMockHttp({ method: 'POST', body: { email: 'subscriber@designstudio.com' } });
      await handler(req, res);
      expect(getStatus()).toBe(502);
      expect(getData().code).toBe('BREVO_AUTH_ERROR');
    });

    it('enforces IP rate limiting and returns 429 when exceeded', async () => {
      const fixedIp = '203.0.113.88';
      for (let i = 0; i < 5; i++) checkRateLimit(fixedIp, 5, 60000);
      const { req, res, getStatus, getData } = createMockHttp({ method: 'POST', body: { email: 'subscriber@designstudio.com' }, ip: fixedIp });
      await handler(req, res);
      expect(getStatus()).toBe(429);
      expect(getData().code).toBe('RATE_LIMIT_EXCEEDED');
    });

    it('returns 502 NETWORK_ERROR with human-readable message when Brevo is unreachable', async () => {
      vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('ECONNREFUSED connect to api.brevo.com'));
      const { req, res, getStatus, getData } = createMockHttp({ method: 'POST', body: { email: 'subscriber@designstudio.com' } });
      await handler(req, res);
      expect(getStatus()).toBe(502);
      expect(getData().code).toBe('NETWORK_ERROR');
      expect(typeof getData().error).toBe('string');
      expect((getData().error as string).length).toBeGreaterThan(0);
    });
  });
});
