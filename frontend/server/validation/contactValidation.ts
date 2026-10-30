import { getTriggeredHoneypotField } from '../security/honeypot';

export interface ValidatedContactPayload {
  name: string;
  email?: string;
  phone?: string;
  message: string;
  productName?: string;
  productSlug?: string;
  configurationName?: string;
  configurationSlug?: string;
  pageUrl?: string;
}

export type ContactValidationResult =
  | { isValid: true; isSpam: false; data: ValidatedContactPayload }
  | { isValid: true; isSpam: true; triggeredField?: string }
  | { isValid: false; isSpam: false; statusCode: number; error: string; field?: string };

function cleanString(val: unknown, maxLen = 250): string | undefined {
  if (typeof val === 'string') {
    const trimmed = val.trim();
    return trimmed.length > 0 ? trimmed.slice(0, maxLen) : undefined;
  }
  return undefined;
}

export function validateContactPayload(body: unknown): ContactValidationResult {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { isValid: false, isSpam: false, statusCode: 400, error: 'Invalid request body. Expected a JSON object.' };
  }

  const record = body as Record<string, unknown>;

  const honeypotField = getTriggeredHoneypotField(record);
  if (honeypotField) {
    return { isValid: true, isSpam: true, triggeredField: honeypotField };
  }

  const name = typeof record.name === 'string' ? record.name.trim() : '';
  if (!name) return { isValid: false, isSpam: false, statusCode: 400, error: 'Please provide your name.', field: 'name' };
  if (name.length > 100) return { isValid: false, isSpam: false, statusCode: 400, error: 'Name cannot exceed 100 characters.', field: 'name' };

  const message = typeof record.message === 'string' ? record.message.trim() : '';
  if (!message) return { isValid: false, isSpam: false, statusCode: 400, error: 'Please provide a message before sending your enquiry.', field: 'message' };
  if (message.length > 5000) return { isValid: false, isSpam: false, statusCode: 400, error: 'Message cannot exceed 5000 characters.', field: 'message' };

  const email = typeof record.email === 'string' ? record.email.trim() : '';
  const phone = typeof record.phone === 'string' ? record.phone.trim() : '';
  const isEmailProvided = email.length > 0;
  const isPhoneProvided = phone.length > 0;

  if (!isEmailProvided && !isPhoneProvided) {
    return { isValid: false, isSpam: false, statusCode: 400, error: 'Add an email address or phone number so we know how to reach you.', field: 'contact' };
  }

  if (isEmailProvided) {
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
    if (!isEmailValid || email.length > 254) {
      return { isValid: false, isSpam: false, statusCode: 400, error: 'Enter a valid email address.', field: 'email' };
    }
  }

  if (isPhoneProvided) {
    const phoneDigits = phone.replace(/\D/g, '');
    const hasValidPhoneChars = /^[+\d\s().-]{7,30}$/.test(phone);
    if (!hasValidPhoneChars || phoneDigits.length < 7 || phoneDigits.length > 15) {
      return { isValid: false, isSpam: false, statusCode: 400, error: 'Enter a valid phone number.', field: 'phone' };
    }
  }

  return {
    isValid: true,
    isSpam: false,
    data: {
      name,
      email: isEmailProvided ? email : undefined,
      phone: isPhoneProvided ? phone : undefined,
      message,
      productName: cleanString(record.productName),
      productSlug: cleanString(record.productSlug),
      configurationName: cleanString(record.configurationName),
      configurationSlug: cleanString(record.configurationSlug),
      pageUrl: cleanString(record.pageUrl, 500),
    },
  };
}
