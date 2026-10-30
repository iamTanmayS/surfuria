import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { sendTransactionalEmail } from '../server/brevo/sendTransactionalEmail.js';
import type { BrevoPayload } from '../server/brevo/brevoClient.js';

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

const minimalPayload: BrevoPayload = {
  sender: { email: 'sender@surfuria.com', name: 'Surfuria' },
  to: [{ email: 'recipient@example.com', name: 'Test Recipient' }],
  subject: 'Test Subject',
  htmlContent: '<p>Test</p>',
  textContent: 'Test',
};

describe('sendTransactionalEmail()', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // ------------------------------------------------------------------ Success
  describe('Successful Brevo response', () => {
    it('returns ok:true with messageId when Brevo responds 201 with messageId', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
        new Response(JSON.stringify({ messageId: 'brevo-abc-123' }), {
          status: 201,
          headers: { 'Content-Type': 'application/json' },
        })
      );

      const result = await sendTransactionalEmail('test-api-key', minimalPayload);

      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.messageId).toBe('brevo-abc-123');
      }
    });

    it('returns ok:true with undefined messageId when Brevo 201 body omits messageId', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
        new Response(JSON.stringify({}), {
          status: 201,
          headers: { 'Content-Type': 'application/json' },
        })
      );

      const result = await sendTransactionalEmail('test-api-key', minimalPayload);

      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.messageId).toBeUndefined();
      }
    });

    it('returns ok:true even when Brevo 200 body is malformed JSON (non-critical parse failure)', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
        new Response('not-valid-json', {
          status: 200,
          headers: { 'Content-Type': 'text/plain' },
        })
      );

      const result = await sendTransactionalEmail('test-api-key', minimalPayload);

      // A parse failure on a successful response should still yield ok:true with no messageId
      expect(result.ok).toBe(true);
    });

    it('sends the correct API key header and JSON body to Brevo', async () => {
      let capturedUrl = '';
      let capturedInit: RequestInit | undefined;

      vi.spyOn(globalThis, 'fetch').mockImplementationOnce(async (url, init) => {
        capturedUrl = url as string;
        capturedInit = init;
        return new Response(JSON.stringify({ messageId: 'sent' }), {
          status: 201,
          headers: { 'Content-Type': 'application/json' },
        });
      });

      await sendTransactionalEmail('xkeysib-secret', minimalPayload);

      expect(capturedUrl).toBe(BREVO_API_URL);
      const headers = capturedInit?.headers as Record<string, string>;
      expect(headers['api-key']).toBe('xkeysib-secret');
      expect(headers['Content-Type']).toBe('application/json');
      const body = JSON.parse(capturedInit?.body as string) as typeof minimalPayload;
      expect(body.to[0].email).toBe('recipient@example.com');
    });
  });

  // ----------------------------------------------------------------- Auth errors
  describe('HTTP 401/403 authentication failures', () => {
    it('returns ok:false, code:BREVO_AUTH_ERROR for 401 with Brevo error message', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
        new Response(JSON.stringify({ message: 'Key not found', code: 'unauthorized' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        })
      );

      const result = await sendTransactionalEmail('bad-key', minimalPayload);

      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.code).toBe('BREVO_AUTH_ERROR');
        expect(result.status).toBe(401);
        expect(result.message).toBe('Key not found');
      }
    });

    it('returns ok:false, code:BREVO_AUTH_ERROR for 403 with fallback message when body is empty', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
        new Response(JSON.stringify({}), {
          status: 403,
          headers: { 'Content-Type': 'application/json' },
        })
      );

      const result = await sendTransactionalEmail('bad-key', minimalPayload);

      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.code).toBe('BREVO_AUTH_ERROR');
        expect(result.status).toBe(403);
        expect(typeof result.message).toBe('string');
        expect(result.message.length).toBeGreaterThan(0);
      }
    });
  });

  // ----------------------------------------------------------------- Upstream errors
  describe('HTTP 4xx/5xx upstream errors (non-auth)', () => {
    it('returns ok:false, code:BREVO_UPSTREAM_ERROR for 400 with Brevo message', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
        new Response(JSON.stringify({ message: 'Invalid sender email' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        })
      );

      const result = await sendTransactionalEmail('test-key', minimalPayload);

      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.code).toBe('BREVO_UPSTREAM_ERROR');
        expect(result.status).toBe(400);
        expect(result.message).toBe('Invalid sender email');
      }
    });

    it('returns ok:false, code:BREVO_UPSTREAM_ERROR for 500 with fallback message when body empty', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
        new Response(JSON.stringify({}), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        })
      );

      const result = await sendTransactionalEmail('test-key', minimalPayload);

      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.code).toBe('BREVO_UPSTREAM_ERROR');
        expect(result.status).toBe(500);
        expect(typeof result.message).toBe('string');
        expect(result.message.length).toBeGreaterThan(0);
      }
    });

    it('returns ok:false, code:BREVO_UPSTREAM_ERROR and falls back gracefully when response body is malformed JSON', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
        new Response('<!DOCTYPE html><h1>502 Bad Gateway</h1>', {
          status: 502,
          headers: { 'Content-Type': 'text/html' },
        })
      );

      const result = await sendTransactionalEmail('test-key', minimalPayload);

      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.code).toBe('BREVO_UPSTREAM_ERROR');
        expect(typeof result.message).toBe('string');
        expect(result.message.length).toBeGreaterThan(0);
      }
    });
  });

  // ----------------------------------------------------------------- Network failures
  describe('Network failures (fetch throws)', () => {
    it('returns ok:false, code:NETWORK_ERROR, status:0 when fetch throws ECONNREFUSED', async () => {
      vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(
        new Error('ECONNREFUSED 127.0.0.1:443')
      );

      const result = await sendTransactionalEmail('test-key', minimalPayload);

      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.code).toBe('NETWORK_ERROR');
        expect(result.status).toBe(0);
        expect(result.message).toContain('ECONNREFUSED');
      }
    });

    it('returns ok:false, code:NETWORK_ERROR when fetch throws a timeout error', async () => {
      vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(
        new Error('Request timeout after 30000ms')
      );

      const result = await sendTransactionalEmail('test-key', minimalPayload);

      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.code).toBe('NETWORK_ERROR');
        expect(result.message).toContain('timeout');
      }
    });

    it('returns ok:false, code:NETWORK_ERROR with generic message when fetch throws non-Error object', async () => {
      vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce('unexpected string rejection');

      const result = await sendTransactionalEmail('test-key', minimalPayload);

      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.code).toBe('NETWORK_ERROR');
        expect(typeof result.message).toBe('string');
        expect(result.message.length).toBeGreaterThan(0);
      }
    });
  });

  // ----------------------------------------------------------------- Type safety
  describe('Return type exhaustiveness', () => {
    it('discriminant ok:true gives access to messageId (no code/message)', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
        new Response(JSON.stringify({ messageId: 'x' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      );
      const result = await sendTransactionalEmail('key', minimalPayload);
      // Compile-time: if (result.ok) → SendEmailResult, no .code or .message
      if (result.ok) {
        expect(result.messageId).toBe('x');
        // TypeScript ensures result.code and result.message do not exist here
      }
    });

    it('discriminant ok:false gives access to code and message (no messageId)', async () => {
      vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('Network down'));
      const result = await sendTransactionalEmail('key', minimalPayload);
      // Compile-time: if (!result.ok) → SendEmailError with .code and .message
      if (!result.ok) {
        expect(result.code).toBeDefined();
        expect(result.message).toBeDefined();
        expect(result.status).toBe(0);
      }
    });
  });
});

