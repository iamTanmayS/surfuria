import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  resolveWhatsAppNumber,
  buildWhatsAppUrl,
  WHATSAPP_GENERAL_MESSAGE,
} from '../src/config/whatsapp';

describe('WhatsApp Configuration & Deep-link Builder', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it('resolves number from process.env / VITE_WHATSAPP_NUMBER when provided', () => {
    process.env.VITE_WHATSAPP_NUMBER = '919999988888';
    expect(resolveWhatsAppNumber()).toBe('919999988888');
  });

  it('sanitizes formatted numbers with plus, spaces, and dashes', () => {
    process.env.VITE_WHATSAPP_NUMBER = '+91 98200-12345';
    expect(resolveWhatsAppNumber()).toBe('919820012345');
  });

  it('builds a valid wa.me URL with clean number and encoded message', () => {
    process.env.VITE_WHATSAPP_NUMBER = '+91 98765 43210';
    const url = buildWhatsAppUrl('Hello Surfuria!');
    expect(url).toBe('https://wa.me/919876543210?text=Hello%20Surfuria!');
  });

  it('correctly builds URL for the general greeting message', () => {
    process.env.VITE_WHATSAPP_NUMBER = '919424602091';
    const url = buildWhatsAppUrl(WHATSAPP_GENERAL_MESSAGE);
    expect(url).toContain('https://wa.me/919424602091?text=');
    expect(url).toContain('Hello%20Surfuria');
  });
});

