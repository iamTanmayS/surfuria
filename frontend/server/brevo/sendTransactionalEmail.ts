import { BREVO_API_URL } from '../config/serverConfig.js';
import type { BrevoPayload } from './brevoClient.js';

export interface SendEmailResult {
  ok: true;
  messageId?: string;
}

export interface SendEmailError {
  ok: false;
  status: number;
  code: 'BREVO_AUTH_ERROR' | 'BREVO_UPSTREAM_ERROR' | 'NETWORK_ERROR';
  message: string;
}

export type SendEmailOutcome = SendEmailResult | SendEmailError;

export async function sendTransactionalEmail(
  apiKey: string,
  payload: BrevoPayload
): Promise<SendEmailOutcome> {
  try {
    const response = await fetch(BREVO_API_URL, {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const result = (await response.json().catch(() => ({}))) as { messageId?: string };
      return { ok: true, messageId: result.messageId };
    }

    const errorDetails = (await response.json().catch(() => ({}))) as Record<string, unknown>;
    const rawMsg = errorDetails.message || errorDetails.error;
    const extractedMessage =
      typeof rawMsg === 'string' && rawMsg.trim().length > 0
        ? rawMsg.trim()
        : rawMsg && typeof rawMsg === 'object' && 'message' in rawMsg && typeof (rawMsg as { message: unknown }).message === 'string'
          ? (rawMsg as { message: string }).message.trim()
          : undefined;

    if (response.status === 401 || response.status === 403) {
      return {
        ok: false,
        status: response.status,
        code: 'BREVO_AUTH_ERROR',
        message:
          extractedMessage ||
          'Email service authentication failed. Please check your Brevo API key.',
      };
    }

    return {
      ok: false,
      status: response.status,
      code: 'BREVO_UPSTREAM_ERROR',
      message:
        extractedMessage ||
        'Email delivery could not be completed at this time.',
    };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      code: 'NETWORK_ERROR',
      message: err instanceof Error ? err.message : 'Network error connecting to email service.',
    };
  }
}
