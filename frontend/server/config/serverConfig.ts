import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const OFFICIAL_EMAIL = 'info@surfuria.com';
export const OFFICIAL_PHONE = '9424602091';
export const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';
export const DEFAULT_SENDER_NAME = 'Surfuria';

export function loadLocalEnvIfNeeded(): void {
  if (process.env.NODE_ENV === 'test' || process.env.VITEST) return;
  if (process.env.BREVO_API_KEY && process.env.BREVO_SENDER_EMAIL) return;
  if (typeof process.loadEnvFile === 'function') {
    let moduleDir: string | undefined;
    try {
      if (typeof import.meta !== 'undefined' && import.meta.url) {
        moduleDir = path.dirname(fileURLToPath(import.meta.url));
      }
    } catch {
      // fallback
    }

    const candidates = [
      '.env.local',
      '.env',
      ...(moduleDir ? [
        path.resolve(moduleDir, '../../.env.local'),
        path.resolve(moduleDir, '../../.env'),
      ] : []),
      path.resolve(process.cwd(), '.env.local'),
      path.resolve(process.cwd(), '.env'),
      path.resolve(process.cwd(), 'frontend/.env.local'),
      path.resolve(process.cwd(), 'frontend/.env'),
    ];
    for (const file of candidates) {
      try {
        process.loadEnvFile(file);
        if (process.env.BREVO_API_KEY && process.env.BREVO_SENDER_EMAIL) break;
      } catch {
        // continue
      }
    }
  }
}

export function getBrevoConfig() {
  loadLocalEnvIfNeeded();
  return {
    apiKey: process.env.BREVO_API_KEY,
    senderEmail: process.env.BREVO_SENDER_EMAIL,
    senderName: process.env.BREVO_SENDER_NAME || DEFAULT_SENDER_NAME,
    recipientEmail: process.env.CONTACT_RECIPIENT_EMAIL || OFFICIAL_EMAIL,
  };
}
