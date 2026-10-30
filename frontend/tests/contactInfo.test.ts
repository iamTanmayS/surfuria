import { describe, it, expect } from 'vitest';
import { OFFICIAL_EMAIL, OFFICIAL_PHONE, getBrevoConfig } from '../server/config/serverConfig';
import { resolveWhatsAppNumber, buildWhatsAppUrl } from '../src/config/whatsapp';
import { buildCustomerConfirmationEmail } from '../server/email/templates/customerConfirmationEmail';
import { buildOwnerContactEmail } from '../server/email/templates/ownerContactEmail';
import { buildNewsletterNotificationEmail } from '../server/email/templates/newsletterNotificationEmail';

describe('Official Business Contact Information Verification', () => {
  it('official email is info@surfuria.com', () => {
    expect(OFFICIAL_EMAIL).toBe('info@surfuria.com');
  });

  it('official phone number is 9424602091', () => {
    expect(OFFICIAL_PHONE).toBe('9424602091');
  });

  it('default recipient for serverless emails resolves to info@surfuria.com', () => {
    const original = process.env.CONTACT_RECIPIENT_EMAIL;
    delete process.env.CONTACT_RECIPIENT_EMAIL;
    const config = getBrevoConfig();
    expect(config.recipientEmail).toBe('info@surfuria.com');
    if (original) process.env.CONTACT_RECIPIENT_EMAIL = original;
  });

  it('default WhatsApp number resolves to 919424602091', () => {
    const originalVite = process.env.VITE_WHATSAPP_NUMBER;
    const originalPlain = process.env.WHATSAPP_NUMBER;
    delete process.env.VITE_WHATSAPP_NUMBER;
    delete process.env.WHATSAPP_NUMBER;

    expect(resolveWhatsAppNumber()).toBe('919424602091');
    expect(buildWhatsAppUrl('Hello')).toContain('https://wa.me/919424602091?text=');

    if (originalVite) process.env.VITE_WHATSAPP_NUMBER = originalVite;
    if (originalPlain) process.env.WHATSAPP_NUMBER = originalPlain;
  });

  it('telephone link format is tel:+919424602091', () => {
    const telLink = `tel:+91${OFFICIAL_PHONE}`;
    expect(telLink).toBe('tel:+919424602091');
  });

  it('customer confirmation email uses info@surfuria.com and contains no legacy emails', () => {
    const confirmation = buildCustomerConfirmationEmail({
      name: 'Client Verification',
      email: 'client@example.com',
      message: 'Testing contact details',
    });
    expect(confirmation.htmlContent).toContain('info@surfuria.com');
    expect(confirmation.textContent).toContain('info@surfuria.com');
    expect(confirmation.htmlContent).not.toContain('rahul.nema111@gmail.com');
    expect(confirmation.htmlContent).not.toContain('tanmayshukla126@gmail.com');
  });

  it('owner notification email routes to info@surfuria.com and contains no legacy emails', () => {
    const ownerEmail = buildOwnerContactEmail({
      name: 'Client Verification',
      email: 'client@example.com',
      message: 'Testing contact details',
    });
    expect(ownerEmail.htmlContent).toContain('info@surfuria.com');
    expect(ownerEmail.textContent).toContain('info@surfuria.com');
    expect(ownerEmail.htmlContent).not.toContain('rahul.nema111@gmail.com');
    expect(ownerEmail.htmlContent).not.toContain('tanmayshukla126@gmail.com');
  });

  it('newsletter notification email routes to info@surfuria.com and contains no legacy emails', () => {
    const newsletterEmail = buildNewsletterNotificationEmail({
      email: 'subscriber@example.com',
    });
    expect(newsletterEmail.htmlContent).toContain('info@surfuria.com');
    expect(newsletterEmail.textContent).toContain('info@surfuria.com');
    expect(newsletterEmail.htmlContent).not.toContain('rahul.nema111@gmail.com');
    expect(newsletterEmail.htmlContent).not.toContain('tanmayshukla126@gmail.com');
  });
});
