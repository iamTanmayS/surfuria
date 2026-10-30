import { isHoneypotTriggered } from '../security/honeypot';

export interface ValidatedNewsletterPayload {
  email: string;
}

export type NewsletterValidationResult =
  | { isValid: true; isSpam: false; data: ValidatedNewsletterPayload }
  | { isValid: true; isSpam: true }
  | { isValid: false; isSpam: false; statusCode: number; error: string; field?: string };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateNewsletterPayload(body: unknown): NewsletterValidationResult {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { isValid: false, isSpam: false, statusCode: 400, error: 'Invalid request body. Expected a JSON object.' };
  }

  const record = body as Record<string, unknown>;

  if (isHoneypotTriggered(record)) return { isValid: true, isSpam: true };

  const email = typeof record.email === 'string' ? record.email.trim() : '';
  if (!email) {
    return { isValid: false, isSpam: false, statusCode: 400, error: 'Enter a valid email address.', field: 'email' };
  }

  if (email.length > 254 || !EMAIL_REGEX.test(email)) {
    return { isValid: false, isSpam: false, statusCode: 400, error: 'Enter a valid email address.', field: 'email' };
  }

  return { isValid: true, isSpam: false, data: { email } };
}
