/**
 * SURFURIA — WhatsApp Business & Response-Time Configuration
 *
 * Configurable via environment variables:
 * - VITE_WHATSAPP_NUMBER (recommended for Vite client-side code)
 * - WHATSAPP_NUMBER
 *
 * Formats: Country code + number with or without spaces/pluses (e.g. "+91 94246 02091"
 * or "919424602091"). The helper automatically sanitizes to digits-only as required by wa.me.
 */

export function resolveWhatsAppNumber(customNumber?: string): string {
  if (customNumber && typeof customNumber === 'string') {
    const digits = customNumber.replace(/\D/g, '');
    if (digits.length >= 7) {
      return digits;
    }
  }

  let raw: string | undefined = undefined;

  // 1. Check Node / SSR / Vitest / serverless via globalThis to prevent ambient TS errors
  const globalEnv = (
    globalThis as unknown as {
      process?: { env?: Record<string, string | undefined> };
    }
  ).process?.env;

  if (globalEnv) {
    raw = globalEnv.VITE_WHATSAPP_NUMBER || globalEnv.WHATSAPP_NUMBER;
  }

  // 2. Check Vite client-side environment variable (import.meta.env) safely
  if (!raw) {
    try {
      const metaEnv = (import.meta as unknown as { env?: Record<string, string | undefined> }).env;
      if (metaEnv) {
        raw = metaEnv.VITE_WHATSAPP_NUMBER || metaEnv.WHATSAPP_NUMBER;
      }
    } catch {
      // import.meta may not be available in all runners
    }
  }

  // 3. Clean and sanitize all non-digit characters (+, -, spaces, parentheses)
  if (raw && typeof raw === 'string') {
    const digits = raw.replace(/\D/g, '');
    if (digits.length >= 7) {
      return digits;
    }
  }

  // Fallback default business contact number
  return '919424602091';
}

/** Dynamic active WhatsApp number */
export const WHATSAPP_NUMBER = resolveWhatsAppNumber();

/** Indicates whether a customized WhatsApp number was provided in the environment */
export const WHATSAPP_IS_CONFIGURED = Boolean(
  (
    globalThis as unknown as {
      process?: { env?: Record<string, string | undefined> };
    }
  ).process?.env?.VITE_WHATSAPP_NUMBER ||
    (
      globalThis as unknown as {
        process?: { env?: Record<string, string | undefined> };
      }
    ).process?.env?.WHATSAPP_NUMBER ||
    (import.meta as unknown as { env?: Record<string, string | undefined> }).env
      ?.VITE_WHATSAPP_NUMBER
);

/**
 * Response-time reassurance shown on the Contact page.
 */
export const RESPONSE_TIME_MESSAGE = 'We aim to respond within 1 business hour.';

/**
 * Supporting text accompanying the response-time reassurance.
 */
export const RESPONSE_TIME_SUPPORTING =
  'Share your enquiry or start a conversation with us on WhatsApp.';

/**
 * Build a wa.me deep-link with a pre-filled message using the configured WhatsApp number.
 */
export function buildWhatsAppUrl(message: string): string {
  const number = resolveWhatsAppNumber();
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encoded}`;
}

/** Generic greeting message for the floating button. */
export const WHATSAPP_GENERAL_MESSAGE =
  'Hello Surfuria! I have an enquiry about your modular kitchens and architectural hardware.';
