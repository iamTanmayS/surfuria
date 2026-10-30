import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getBrevoConfig } from '../server/config/serverConfig';
import { sendTransactionalEmail } from '../server/brevo/sendTransactionalEmail';
import type { BrevoPayload } from '../server/brevo/brevoClient';
import { buildNewsletterNotificationEmail } from '../server/email/templates/newsletterNotificationEmail';
import { validateNewsletterPayload } from '../server/validation/newsletterValidation';
import { checkRateLimit, resetRateLimitsForTesting } from '../server/security/rateLimiter';
import { escapeHtml } from '../server/security/sanitize';
import { extractClientIp } from '../server/security/ipExtractor';

// Re-export for test compatibility
export { validateNewsletterPayload, checkRateLimit, resetRateLimitsForTesting, escapeHtml };
export { buildNewsletterNotificationEmail };
export type { ValidatedNewsletterPayload } from '../server/validation/newsletterValidation';
export type { NewsletterValidationResult } from '../server/validation/newsletterValidation';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed. Newsletter subscriptions must use POST.' });
  }

  const { clientIp, isLocalIp } = extractClientIp(req);
  const maxRequests = isLocalIp ? 100 : 5;

  if (!checkRateLimit(clientIp, maxRequests, 600000)) {
    return res.status(429).json({
      error: 'Too many newsletter subscription attempts. Please try again later.',
      code: 'RATE_LIMIT_EXCEEDED',
    });
  }

  const validation = validateNewsletterPayload(req.body);

  if (!validation.isValid) {
    return res.status(validation.statusCode).json({ error: validation.error, field: validation.field });
  }

  if (validation.isSpam) {
    return res.status(200).json({ success: true, message: "You're on the list. Thank you for subscribing." });
  }

  const { apiKey, senderEmail, senderName, recipientEmail } = getBrevoConfig();

  if (!apiKey || !senderEmail) {
    console.error('[Surfuria Newsletter API] Missing Brevo configuration:', !apiKey ? 'BREVO_API_KEY' : '', !senderEmail ? 'BREVO_SENDER_EMAIL' : '');
    return res.status(503).json({
      error: 'The email delivery service is awaiting business Brevo configuration (BREVO_API_KEY / BREVO_SENDER_EMAIL).',
      code: 'CONFIG_MISSING',
    });
  }

  const userAgent = (typeof req.headers['user-agent'] === 'string' ? req.headers['user-agent'] : '') || 'Unknown Device';

  const emailData = buildNewsletterNotificationEmail(validation.data, { clientIp, userAgent, recipientEmail });

  const brevoPayload: BrevoPayload = {
    sender: { name: senderName, email: senderEmail },
    to: [{ name: 'Surfuria Management', email: recipientEmail }],
    replyTo: emailData.replyTo,
    subject: emailData.subject,
    htmlContent: emailData.htmlContent,
    textContent: emailData.textContent,
  };

  const result = await sendTransactionalEmail(apiKey, brevoPayload);

  if (result.ok) {
    return res.status(200).json({
      success: true,
      message: "You're on the list. Thank you for subscribing.",
      messageId: result.messageId,
    });
  }

  if (result.code === 'BREVO_AUTH_ERROR') {
    console.error('[Surfuria Newsletter API] Brevo authentication failed:', result.message);
    return res.status(502).json({ error: result.message, code: 'BREVO_AUTH_ERROR' });
  }

  console.error('[Surfuria Newsletter API] Brevo request rejected:', result.code, result.message);
  return res.status(502).json({
    error: result.code === 'NETWORK_ERROR'
      ? 'Network error connecting to email service. Please retry later.'
      : result.message || 'Newsletter notification could not be delivered at this time.',
    code: result.code,
  });
}
