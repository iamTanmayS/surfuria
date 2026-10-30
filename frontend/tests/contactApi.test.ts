import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import handler, {
  validateContactPayload,
  buildEnquiryEmail,
  buildCustomerConfirmationEmail,
  checkRateLimit,
  resetRateLimitsForTesting,
  escapeHtml,
} from '../api/contact.js';

function createMockRequest(
  method: string,
  body?: unknown,
  headers: Record<string, string> = {},
  remoteAddress = '192.168.1.1'
): VercelRequest {
  return { method, body, headers, socket: { remoteAddress } } as unknown as VercelRequest;
}

interface MockResponse {
  statusCode: number;
  headers: Record<string, string>;
  data: unknown;
  status: (code: number) => MockResponse;
  json: (data: unknown) => MockResponse;
  setHeader: (name: string, value: string) => MockResponse;
}

function createMockResponse(): MockResponse {
  const res: MockResponse = {
    statusCode: 200,
    headers: {},
    data: undefined,
    status(code) { res.statusCode = code; return res; },
    json(data) { res.data = data; return res; },
    setHeader(name, value) { res.headers[name] = value; return res; },
  };
  return res;
}

describe('Surfuria Contact API & Validation Suite', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    resetRateLimitsForTesting();
    vi.restoreAllMocks();
    process.env = {
      ...originalEnv,
      BREVO_API_KEY: 'xkeysib-test-mock-key-12345',
      BREVO_SENDER_EMAIL: 'concierge@surfuria.com',
      BREVO_SENDER_NAME: 'Surfuria Concierge',
      CONTACT_RECIPIENT_EMAIL: 'info@surfuria.com',
    };
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  describe('Official contact information', () => {
    it('owner notification is delivered to info@surfuria.com', async () => {
      const capturedPayloads: Array<Record<string, unknown>> = [];
      vi.stubGlobal('fetch', vi.fn().mockImplementation(async (_url: string, init?: RequestInit) => {
        capturedPayloads.push(JSON.parse(init?.body as string));
        return { ok: true, status: 201, json: async () => ({ messageId: `msg-${capturedPayloads.length}` }) };
      }));

      const req = createMockRequest('POST', { name: 'Test User', email: 'user@example.com', message: 'Hello' });
      const res = createMockResponse();
      await handler(req, res as unknown as VercelResponse);

      expect(res.statusCode).toBe(200);
      const ownerPayload = capturedPayloads[0] as { to: Array<{ email: string }> };
      expect(ownerPayload.to[0].email).toBe('info@surfuria.com');
    });

    it('customer confirmation email contains info@surfuria.com as official contact', () => {
      const confirmation = buildCustomerConfirmationEmail({
        name: 'Test User',
        email: 'user@example.com',
        message: 'Hello',
      });
      expect(confirmation.htmlContent).toContain('info@surfuria.com');
      expect(confirmation.textContent).toContain('info@surfuria.com');
    });

    it('owner enquiry email shows info@surfuria.com as forwarded inbox', () => {
      process.env.CONTACT_RECIPIENT_EMAIL = 'info@surfuria.com';
      const email = buildEnquiryEmail({ name: 'Test', email: 'test@example.com', message: 'Hi' });
      expect(email.htmlContent).toContain('info@surfuria.com');
      expect(email.textContent).toContain('info@surfuria.com');
    });
  });

  describe('HTML escaping and sanitization', () => {
    it('escapes dangerous HTML characters safely', () => {
      const malicious = '<script>alert("xss & \'inject\'")</script>';
      const sanitized = escapeHtml(malicious);
      expect(sanitized).toBe('&lt;script&gt;alert(&quot;xss &amp; &#39;inject&#39;&quot;)&lt;/script&gt;');
      expect(sanitized).not.toContain('<script>');
    });
  });

  describe('Payload validation logic (validateContactPayload)', () => {
    it('rejects empty or non-object body', () => {
      const result = validateContactPayload(null);
      expect(result.isValid).toBe(false);
      if (!result.isValid) expect(result.statusCode).toBe(400);
    });

    it('flags spam silently when honeypot field is filled (website, hp, company_hp)', () => {
      const resWebsite = validateContactPayload({ name: 'Spam Bot', email: 'spammer@example.com', message: 'Buy now!', website: 'http://spam-site.com' });
      expect(resWebsite.isValid).toBe(true);
      expect(resWebsite.isSpam).toBe(true);

      const resHp = validateContactPayload({ name: 'Spam Bot', email: 'spammer@example.com', message: 'Buy now!', hp: 'bot-content' });
      expect(resHp.isValid).toBe(true);
      expect(resHp.isSpam).toBe(true);

      const resCompanyHp = validateContactPayload({ name: 'Spam Bot', email: 'spammer@example.com', message: 'Buy now!', company_hp: 'Acme Spammer' });
      expect(resCompanyHp.isValid).toBe(true);
      expect(resCompanyHp.isSpam).toBe(true);
    });

    it('requires customer name', () => {
      const result = validateContactPayload({ name: '   ', email: 'test@example.com', message: 'Hello' });
      expect(result.isValid).toBe(false);
      if (!result.isValid) { expect(result.field).toBe('name'); expect(result.error).toContain('Please provide your name'); }
    });

    it('enforces maximum character length on name', () => {
      const result = validateContactPayload({ name: 'A'.repeat(101), email: 'test@example.com', message: 'Hello' });
      expect(result.isValid).toBe(false);
      if (!result.isValid) { expect(result.field).toBe('name'); expect(result.error).toContain('100 characters'); }
    });

    it('requires enquiry message', () => {
      const result = validateContactPayload({ name: 'Aarav Sharma', email: 'aarav@example.com', message: '' });
      expect(result.isValid).toBe(false);
      if (!result.isValid) { expect(result.field).toBe('message'); expect(result.error).toContain('Please provide a message'); }
    });

    it('rejects if BOTH email and phone are absent', () => {
      const result = validateContactPayload({ name: 'Aarav Sharma', email: '', phone: '', message: 'I would like a quote.' });
      expect(result.isValid).toBe(false);
      if (!result.isValid) { expect(result.field).toBe('contact'); expect(result.error).toBe('Add an email address or phone number so we know how to reach you.'); }
    });

    it('accepts valid email-only enquiry', () => {
      const result = validateContactPayload({ name: 'Priya Mehta', email: 'priya.mehta@studio.in', phone: '', message: 'Interested in L-Shaped kitchen.' });
      expect(result.isValid).toBe(true);
      if (result.isValid && !result.isSpam) { expect(result.data.email).toBe('priya.mehta@studio.in'); expect(result.data.phone).toBeUndefined(); }
    });

    it('accepts valid phone-only enquiry', () => {
      const result = validateContactPayload({ name: 'Vikram Seth', email: '', phone: '+91 98200 12345', message: 'Call me regarding wardrobe hardware.' });
      expect(result.isValid).toBe(true);
      if (result.isValid && !result.isSpam) { expect(result.data.email).toBeUndefined(); expect(result.data.phone).toBe('+91 98200 12345'); }
    });

    it('accepts both email and phone provided together', () => {
      const result = validateContactPayload({ name: 'Rohan Gupta', email: 'rohan@example.com', phone: '+91 98765 43210', message: 'Enquiring about island kitchen.' });
      expect(result.isValid).toBe(true);
      if (result.isValid && !result.isSpam) { expect(result.data.email).toBe('rohan@example.com'); expect(result.data.phone).toBe('+91 98765 43210'); }
    });

    it('rejects invalid email formats', () => {
      const result = validateContactPayload({ name: 'Rohan Gupta', email: 'invalid-email-address', phone: '', message: 'Hello' });
      expect(result.isValid).toBe(false);
      if (!result.isValid) { expect(result.field).toBe('email'); expect(result.error).toContain('valid email address'); }
    });

    it('rejects invalid phone numbers with insufficient digits', () => {
      const result = validateContactPayload({ name: 'Rohan Gupta', email: '', phone: '123', message: 'Hello' });
      expect(result.isValid).toBe(false);
      if (!result.isValid) { expect(result.field).toBe('phone'); expect(result.error).toContain('valid phone number'); }
    });
  });

  describe('Email content generation (buildEnquiryEmail)', () => {
    it('resolves kitchen configuration authoritative details and formats turnkey price', () => {
      const email = buildEnquiryEmail({ name: 'Ananya Roy', email: 'ananya@architects.in', phone: '+91 98111 22233', message: 'Need dimensions.', configurationSlug: 'l-shaped' });
      expect(email.subject).toContain('L-Shaped Modular Kitchen');
      expect(email.htmlContent).toContain('L-Shaped Modular Kitchen');
      expect(email.htmlContent).toContain('₹99,000');
      expect(email.htmlContent).toContain('ananya@architects.in');
      expect(email.htmlContent).toContain('info@surfuria.com');
      expect(email.replyTo).toEqual({ name: 'Ananya Roy', email: 'ananya@architects.in' });
    });

    it('resolves hardware product authoritative name', () => {
      const email = buildEnquiryEmail({ name: 'Kabir Verma', phone: '+91 99999 88888', message: 'Need bulk quote.', productSlug: 'hydraulic-soft-close-hinge' });
      expect(email.subject).toContain('Hydraulic Soft-Close Hinge');
      expect(email.htmlContent).toContain('Hydraulic Soft-Close Hinge');
      expect(email.textContent).toContain('Hydraulic Soft-Close Hinge');
      expect(email.replyTo).toBeUndefined();
    });

    it('converts newlines in message to HTML line breaks', () => {
      const email = buildEnquiryEmail({ name: 'Dev', email: 'dev@example.com', message: 'Line 1\nLine 2\nLine 3' });
      expect(email.htmlContent).toContain('Line 1<br />Line 2<br />Line 3');
      expect(email.textContent).toContain('Line 1\nLine 2\nLine 3');
    });
  });

  describe('Customer confirmation email generation (buildCustomerConfirmationEmail)', () => {
    it('generates the exact required subject and greeting', () => {
      const confirmation = buildCustomerConfirmationEmail({ name: 'Meera Kapoor', email: 'meera@designstudio.in', message: 'Looking for brass handles.' });
      expect(confirmation.subject).toBe("We've received your enquiry | Surfuria");
      expect(confirmation.htmlContent).toContain('Dear Meera Kapoor');
      expect(confirmation.htmlContent).toContain('Looking for brass handles.');
      expect(confirmation.htmlContent).toContain('https://surfuria.com');
      expect(confirmation.textContent).toContain("We've received your enquiry | Surfuria");
      expect(confirmation.textContent).toContain('Dear Meera Kapoor');
    });

    it('includes resolved modular kitchen configuration in customer confirmation', () => {
      const confirmation = buildCustomerConfirmationEmail({ name: 'Rohan Sharma', email: 'rohan@gmail.com', message: 'Need pricing.', configurationSlug: 'l-shaped' });
      expect(confirmation.htmlContent).toContain('L-Shaped Modular Kitchen');
      expect(confirmation.textContent).toContain('L-Shaped Modular Kitchen');
    });

    it('includes resolved hardware product in customer confirmation', () => {
      const confirmation = buildCustomerConfirmationEmail({ name: 'Tara Seth', email: 'tara@gmail.com', message: 'Can I get samples?', productSlug: 'hydraulic-soft-close-hinge' });
      expect(confirmation.htmlContent).toContain('Hydraulic Soft-Close Hinge');
      expect(confirmation.textContent).toContain('Hydraulic Soft-Close Hinge');
    });

    it('escapes user-supplied content to prevent HTML injection in customer email', () => {
      const confirmation = buildCustomerConfirmationEmail({ name: '<script>alert("hacked")</script>', email: 'test@example.com', message: '<b>bold</b> & "quotes"' });
      expect(confirmation.htmlContent).not.toContain('<script>');
      expect(confirmation.htmlContent).toContain('&lt;script&gt;alert(&quot;hacked&quot;)&lt;/script&gt;');
      expect(confirmation.htmlContent).toContain('&lt;b&gt;bold&lt;/b&gt; &amp; &quot;quotes&quot;');
    });
  });

  describe('Rate limiter (checkRateLimit)', () => {
    it('allows up to 5 requests from the same IP within window and blocks 6th', () => {
      const ip = '203.0.113.42';
      for (let i = 0; i < 5; i++) expect(checkRateLimit(ip, 5, 600000)).toBe(true);
      expect(checkRateLimit(ip, 5, 600000)).toBe(false);
    });

    it('allows requests from different IPs independently', () => {
      const ipA = '10.0.0.1';
      const ipB = '10.0.0.2';
      for (let i = 0; i < 5; i++) checkRateLimit(ipA, 5, 600000);
      expect(checkRateLimit(ipA, 5, 600000)).toBe(false);
      expect(checkRateLimit(ipB, 5, 600000)).toBe(true);
    });
  });

  describe('Vercel Handler HTTP Lifecycle & Brevo Integration', () => {
    it('rejects non-POST HTTP methods with 405 Method Not Allowed', async () => {
      const req = createMockRequest('GET');
      const res = createMockResponse();
      await handler(req, res as unknown as VercelResponse);
      expect(res.statusCode).toBe(405);
      expect(res.headers['Allow']).toBe('POST');
      expect((res.data as Record<string, string>).error).toContain('must use POST');
    });

    it('enforces rate limiting at handler level returning 429', async () => {
      const ip = '198.51.100.1';
      const req = () => createMockRequest('POST', { name: 'Rapid Submitter', email: 'rapid@test.com', message: 'Testing rate limits' }, { 'x-forwarded-for': ip });
      for (let i = 0; i < 5; i++) {
        const res = createMockResponse();
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, status: 201, json: async () => ({ messageId: `msg-${i}` }) }));
        await handler(req(), res as unknown as VercelResponse);
        expect(res.statusCode).toBe(200);
      }
      const blockedRes = createMockResponse();
      await handler(req(), blockedRes as unknown as VercelResponse);
      expect(blockedRes.statusCode).toBe(429);
      expect((blockedRes.data as Record<string, string>).code).toBe('RATE_LIMIT_EXCEEDED');
    });

    it('returns 200 silently for honeypot spam without calling Brevo API', async () => {
      const fetchSpy = vi.fn();
      vi.stubGlobal('fetch', fetchSpy);
      const req = createMockRequest('POST', { name: 'Spambot', email: 'bot@spam.com', message: 'Spam text', website: 'http://spammer.ru' });
      const res = createMockResponse();
      await handler(req, res as unknown as VercelResponse);
      expect(res.statusCode).toBe(200);
      expect((res.data as Record<string, string>).success).toBe(true);
      expect(fetchSpy).not.toHaveBeenCalled();

      // Test with new hp field
      const reqHp = createMockRequest('POST', { name: 'Spambot 2', email: 'bot2@spam.com', message: 'Spam text', hp: 'bot-filled' });
      const resHp = createMockResponse();
      await handler(reqHp, resHp as unknown as VercelResponse);
      expect(resHp.statusCode).toBe(200);
      expect((resHp.data as Record<string, string>).success).toBe(true);
      expect(fetchSpy).not.toHaveBeenCalled();
    });

    it('returns 503 CONFIG_MISSING when BREVO_API_KEY is not configured', async () => {
      delete process.env.BREVO_API_KEY;
      const req = createMockRequest('POST', { name: 'Real User', email: 'user@example.com', message: 'Hello Surfuria' });
      const res = createMockResponse();
      await handler(req, res as unknown as VercelResponse);
      expect(res.statusCode).toBe(503);
      expect((res.data as Record<string, string>).code).toBe('CONFIG_MISSING');
      expect((res.data as Record<string, string>).error).toContain('awaiting business Brevo configuration');
    });

    it('returns 503 CONFIG_MISSING when BREVO_SENDER_EMAIL is not configured', async () => {
      delete process.env.BREVO_SENDER_EMAIL;
      const req = createMockRequest('POST', { name: 'Real User', email: 'user@example.com', message: 'Hello Surfuria' });
      const res = createMockResponse();
      await handler(req, res as unknown as VercelResponse);
      expect(res.statusCode).toBe(503);
      expect((res.data as Record<string, string>).code).toBe('CONFIG_MISSING');
    });

    it('successfully submits enquiry to Brevo API and returns 200 with messageId', async () => {
      const capturedPayloads: Array<Record<string, unknown>> = [];
      let capturedHeaders: Record<string, string> = {};
      vi.stubGlobal('fetch', vi.fn().mockImplementation(async (url: string, init?: RequestInit) => {
        if (url === 'https://api.brevo.com/v3/smtp/email') {
          capturedHeaders = (init?.headers || {}) as Record<string, string>;
          capturedPayloads.push(JSON.parse(init?.body as string));
          return { ok: true, status: 201, json: async () => ({ messageId: `<brevo-msg-${capturedPayloads.length}>` }) };
        }
        return { ok: false, status: 404 };
      }));

      const req = createMockRequest('POST', { name: 'Suresh Raina', email: 'suresh@cricket.in', phone: '+91 98100 98100', message: 'Please send catalogue.', configurationSlug: 'u-shaped' });
      const res = createMockResponse();
      await handler(req, res as unknown as VercelResponse);

      expect(res.statusCode).toBe(200);
      const data = res.data as { success: boolean; message: string; messageId: string };
      expect(data.success).toBe(true);
      expect(data.message).toBe('Your enquiry has been received.');
      expect(data.messageId).toBe('<brevo-msg-1>');
      expect(capturedHeaders['api-key']).toBe('xkeysib-test-mock-key-12345');
      expect(capturedHeaders['Content-Type']).toBe('application/json');
      expect(capturedPayloads.length).toBe(2);

      const ownerPayload = capturedPayloads[0] as { sender: { email: string }; to: Array<{ email: string }>; replyTo?: { email: string }; subject: string };
      expect(ownerPayload.sender.email).toBe('concierge@surfuria.com');
      expect(ownerPayload.to[0].email).toBe('info@surfuria.com');
      expect(ownerPayload.replyTo?.email).toBe('suresh@cricket.in');
      expect(ownerPayload.subject).toContain('U-Shaped Modular Kitchen');

      const custPayload = capturedPayloads[1] as { sender: { email: string }; to: Array<{ email: string; name: string }>; subject: string; htmlContent: string };
      expect(custPayload.sender.email).toBe('concierge@surfuria.com');
      expect(custPayload.to[0].email).toBe('suresh@cricket.in');
      expect(custPayload.to[0].name).toBe('Suresh Raina');
      expect(custPayload.subject).toBe("We've received your enquiry | Surfuria");
      expect(custPayload.htmlContent).toContain('Dear Suresh Raina');
      expect(custPayload.htmlContent).toContain('U-Shaped Modular Kitchen');
    });

    it('Scenario 1: Customer provides both phone and email -> owner receives enquiry and customer receives confirmation', async () => {
      const capturedPayloads: Array<Record<string, unknown>> = [];
      vi.stubGlobal('fetch', vi.fn().mockImplementation(async (_url: string, init?: RequestInit) => {
        capturedPayloads.push(JSON.parse(init?.body as string));
        return { ok: true, status: 201, json: async () => ({ messageId: `msg-${capturedPayloads.length}` }) };
      }));

      const req = createMockRequest('POST', { name: 'Aarav Mehta', email: 'aarav@domain.com', phone: '+91 98765 43210', message: 'Looking for wardrobe profiles.' });
      const res = createMockResponse();
      await handler(req, res as unknown as VercelResponse);

      expect(res.statusCode).toBe(200);
      expect((res.data as Record<string, unknown>).success).toBe(true);
      expect(capturedPayloads.length).toBe(2);
      expect((capturedPayloads[0].to as Array<{ email: string }>)[0].email).toBe('info@surfuria.com');
      expect((capturedPayloads[1].to as Array<{ email: string }>)[0].email).toBe('aarav@domain.com');
      expect(capturedPayloads[1].subject as string).toBe("We've received your enquiry | Surfuria");
    });

    it('Scenario 2: Customer provides only phone -> owner receives enquiry, no customer confirmation is attempted, and submission succeeds', async () => {
      const capturedPayloads: Array<Record<string, unknown>> = [];
      vi.stubGlobal('fetch', vi.fn().mockImplementation(async (_url: string, init?: RequestInit) => {
        capturedPayloads.push(JSON.parse(init?.body as string));
        return { ok: true, status: 201, json: async () => ({ messageId: 'phone-msg-1' }) };
      }));

      const req = createMockRequest('POST', { name: 'Phone Only Visitor', phone: '+91 99999 11111', message: 'Contact me via WhatsApp please.' });
      const res = createMockResponse();
      await handler(req, res as unknown as VercelResponse);

      expect(res.statusCode).toBe(200);
      expect((res.data as Record<string, unknown>).success).toBe(true);
      expect(capturedPayloads.length).toBe(1);
      expect((capturedPayloads[0].to as Array<{ email: string }>)[0].email).toBe('info@surfuria.com');
      expect((capturedPayloads[0] as { replyTo?: unknown }).replyTo).toBeUndefined();
    });

    it('Scenario 3: Owner notification succeeds but customer confirmation fails -> submission still returns 200 success and failure is logged', async () => {
      let callCount = 0;
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      vi.stubGlobal('fetch', vi.fn().mockImplementation(async (url: string) => {
        if (url === 'https://api.brevo.com/v3/smtp/email') {
          callCount++;
          if (callCount === 1) return { ok: true, status: 201, json: async () => ({ messageId: 'owner-success-id' }) };
          return { ok: false, status: 500, json: async () => ({ message: 'Brevo upstream internal error', code: 'service_unavailable' }) };
        }
        return { ok: false, status: 404 };
      }));

      const req = createMockRequest('POST', { name: 'Vikram Singh', email: 'vikram@example.com', phone: '+91 98888 77777', message: 'Need hardware specifications.' });
      const res = createMockResponse();
      await handler(req, res as unknown as VercelResponse);

      expect(res.statusCode).toBe(200);
      const data = res.data as { success: boolean; message: string; messageId: string };
      expect(data.success).toBe(true);
      expect(data.messageId).toBe('owner-success-id');
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('[Surfuria Contact API] Customer confirmation email rejected by Brevo:'),
        expect.anything(),
        expect.stringContaining('Brevo upstream internal error')
      );
      consoleErrorSpy.mockRestore();
    });

    it('handles Brevo 401/403 authentication failures gracefully with 502 BREVO_AUTH_ERROR', async () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 401, json: async () => ({ message: 'Key not found', code: 'unauthorized' }) }));
      const req = createMockRequest('POST', { name: 'Test Customer', email: 'customer@test.com', message: 'Testing auth error handling' });
      const res = createMockResponse();
      await handler(req, res as unknown as VercelResponse);
      expect(res.statusCode).toBe(502);
      expect((res.data as Record<string, string>).code).toBe('BREVO_AUTH_ERROR');
    });

    it('handles Brevo network failures gracefully with 502 NETWORK_ERROR', async () => {
      vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('ECONNREFUSED connect to api.brevo.com')));
      const req = createMockRequest('POST', { name: 'Test Customer', email: 'customer@test.com', message: 'Testing network failure' });
      const res = createMockResponse();
      await handler(req, res as unknown as VercelResponse);
      expect(res.statusCode).toBe(502);
      expect((res.data as Record<string, string>).code).toBe('NETWORK_ERROR');
    });

    it('guarantees response error is always a string even if upstream returns nested error object', async () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        json: async () => ({
          error: {
            code: 'UPSTREAM_FAILURE',
            message: 'Nested upstream failure message',
          },
        }),
      }));
      const req = createMockRequest('POST', { name: 'Test Customer', email: 'customer@test.com', message: 'Testing nested error structure' });
      const res = createMockResponse();
      await handler(req, res as unknown as VercelResponse);
      expect(res.statusCode).toBe(502);
      const data = res.data as { error: unknown; code: string };
      expect(typeof data.error).toBe('string');
      expect(data.error).toBe('Nested upstream failure message');
    });

    it('handles malformed upstream JSON gracefully without crashing', async () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: false,
        status: 502,
        json: async () => {
          throw new Error('Unexpected token < in JSON at position 0');
        },
      }));
      const req = createMockRequest('POST', { name: 'Test Customer', email: 'customer@test.com', message: 'Testing malformed HTML response' });
      const res = createMockResponse();
      await handler(req, res as unknown as VercelResponse);
      expect(res.statusCode).toBe(502);
      const data = res.data as { error: unknown; code: string };
      expect(typeof data.error).toBe('string');
      expect(data.error).toBe('Email delivery could not be completed at this time.');
    });

    it('returns 500 INTERNAL_ERROR when validateContactPayload throws unexpectedly', async () => {
      // The top-level try/catch in the handler catches any unexpected synchronous exception.
      // We simulate this by having validateContactPayload (re-exported from the module) throw.
      // Spy on the re-exported reference — the handler calls its own internal import,
      // so we trigger this by making req.body a Proxy that throws on property access.
      const throwingProxy = new Proxy({}, {
        get(_target, prop) {
          // Allow normal string checks on method to not interfere with earlier guards
          if (prop === 'method') return 'POST';
          // Throw on body access inside validateContactPayload
          throw new Error('Unexpected proxy error simulating corrupt request body');
        },
      });
      // Create a request where body is the proxy
      const req = {
        method: 'POST',
        body: throwingProxy,
        headers: {},
        socket: { remoteAddress: '192.168.1.1' },
      } as unknown as VercelRequest;
      const res = createMockResponse();
      await handler(req, res as unknown as VercelResponse);
      expect(res.statusCode).toBe(500);
      const data = res.data as { error: string; code: string };
      expect(data.code).toBe('INTERNAL_ERROR');
      expect(typeof data.error).toBe('string');
    });
  });
});
