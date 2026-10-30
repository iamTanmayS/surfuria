/**
 * SURFURIA — API Error Extraction Utility
 *
 * Safely extracts user-facing error message strings from any API response,
 * error object, or network failure payload.
 *
 * Guarantees that the returned value is ALWAYS a renderable non-empty string and NEVER
 * a raw JavaScript object (which causes React Minified Error #31:
 * "Objects are not valid as a React child (found: object with keys {code, message})").
 */

export function extractErrorMessage(data: unknown, fallbackMessage: string): string {
  if (!data) return fallbackMessage;

  // 1. Primitive string response (e.g. text/plain from proxy)
  if (typeof data === 'string') {
    const trimmed = data.trim();
    return trimmed.length > 0 ? trimmed : fallbackMessage;
  }

  if (typeof data === 'object') {
    const record = data as Record<string, unknown>;

    // 2. data.error exists
    if (record.error !== undefined && record.error !== null) {
      // 2a. data.error is a string (Surfuria API standard: { error: "...", code: "..." })
      if (typeof record.error === 'string') {
        const trimmed = record.error.trim();
        if (trimmed.length > 0) return trimmed;
      }
      // 2b. data.error is an object (Vercel serverless standard: { error: { code, message } })
      else if (typeof record.error === 'object') {
        const errObj = record.error as Record<string, unknown>;
        if (typeof errObj.message === 'string' && errObj.message.trim().length > 0) {
          return errObj.message.trim();
        }
        if (typeof errObj.error === 'string' && errObj.error.trim().length > 0) {
          return errObj.error.trim();
        }
        if (typeof errObj.code === 'string' && errObj.code.trim().length > 0) {
          return `Service error (${errObj.code.trim()}). Please try again or reach us on WhatsApp.`;
        }
      }
    }

    // 3. data.message exists (Brevo / HTTP standard: { code, message })
    if (typeof record.message === 'string') {
      const trimmed = record.message.trim();
      if (trimmed.length > 0) return trimmed;
    }

    // 4. data.code exists without message
    if (typeof record.code === 'string' && record.code.trim().length > 0) {
      return `Service error (${record.code.trim()}). Please try again or reach us on WhatsApp.`;
    }
  }

  return fallbackMessage;
}

