import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getBrevoConfig } from '../server/config/serverConfig';
import { sendTransactionalEmail } from '../server/brevo/sendTransactionalEmail';
import type { BrevoPayload } from '../server/brevo/brevoClient';
import { buildOwnerContactEmail } from '../server/email/templates/ownerContactEmail';
import { buildCustomerConfirmationEmail } from '../server/email/templates/customerConfirmationEmail';
import { validateContactPayload } from '../server/validation/contactValidation';
import { checkRateLimit, resetRateLimitsForTesting } from '../server/security/rateLimiter';
import { escapeHtml } from '../server/security/sanitize';
import { extractClientIp } from '../server/security/ipExtractor';

// Re-export for test compatibility
export { validateContactPayload, checkRateLimit, resetRateLimitsForTesting, escapeHtml };
export { buildOwnerContactEmail as buildEnquiryEmail };
export { buildCustomerConfirmationEmail };
export type { ValidatedContactPayload as ValidatedPayload } from '../server/validation/contactValidation';
export type { BrevoPayload, BrevoContact } from '../server/brevo/brevoClient';
export type { SubmissionMetadata } from '../server/email/emailTypes';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const reqId = `req_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return res.status(405).json({ error: 'Method Not Allowed. Contact enquiry submissions must use POST.' });
    }

    const { clientIp, isLocalIp } = extractClientIp(req);
    const maxRequests = isLocalIp ? 100 : 5;

    if (!checkRateLimit(clientIp, maxRequests, 600000)) {
      console.warn(`[Contact API ${reqId}] Rate limit exceeded for IP: ${clientIp}`);
      return res.status(429).json({
        error: 'Too many enquiries submitted recently. Please try again later or reach us on WhatsApp.',
        code: 'RATE_LIMIT_EXCEEDED',
      });
    }

    const rawBody = (req.body && typeof req.body === 'object' && !Array.isArray(req.body))
      ? (req.body as Record<string, unknown>)
      : {};

    console.log(`[Contact API ${reqId}] Honeypot field inspection:`, {
      hp: typeof rawBody.hp === 'string' && rawBody.hp.trim().length > 0 ? 'populated' : 'empty',
      company_hp: typeof rawBody.company_hp === 'string' && rawBody.company_hp.trim().length > 0 ? 'populated' : 'empty',
      website: typeof rawBody.website === 'string' && rawBody.website.trim().length > 0 ? 'populated' : 'empty',
    });

    const validation = validateContactPayload(req.body);
    console.log(`[Contact API ${reqId}] Validation result:`, {
      isValid: validation.isValid,
      isSpam: validation.isSpam,
      ...(validation.isSpam && 'triggeredField' in validation ? { triggeredHoneypotField: validation.triggeredField } : {}),
    });

    if (!validation.isValid) {
      return res.status(validation.statusCode).json({ error: validation.error, field: validation.field });
    }

    if (validation.isSpam) {
      const field = ('triggeredField' in validation && validation.triggeredField) ? validation.triggeredField : 'unknown';
      console.log(`[Contact API ${reqId}] Honeypot triggered by field "${field}"; silently returning 200.`);
      return res.status(200).json({ success: true, message: 'Your enquiry has been received.' });
    }

    const { apiKey, senderEmail, senderName, recipientEmail } = getBrevoConfig();
    console.log(`[Contact API ${reqId}] Environment config:`, {
      hasApiKey: Boolean(apiKey),
      senderEmail,
      senderName,
      recipientEmail,
    });

    if (!apiKey || !senderEmail) {
      console.error(`[Contact API ${reqId}] Missing Brevo configuration:`, !apiKey ? 'BREVO_API_KEY' : '', !senderEmail ? 'BREVO_SENDER_EMAIL' : '');
      return res.status(503).json({
        error: 'The email delivery service is awaiting business Brevo configuration (BREVO_API_KEY / BREVO_SENDER_EMAIL). Please contact us directly via WhatsApp or email.',
        code: 'CONFIG_MISSING',
      });
    }

    const userAgent = (typeof req.headers['user-agent'] === 'string' ? req.headers['user-agent'] : '') || 'Unknown Device';
    const referer = typeof req.headers['referer'] === 'string' ? req.headers['referer'] : undefined;

    const ownerEmail = buildOwnerContactEmail(validation.data, { clientIp, userAgent, referer, recipientEmail });

    const ownerPayload: BrevoPayload = {
      sender: { name: senderName, email: senderEmail },
      to: [{ name: 'Surfuria Management', email: recipientEmail }],
      subject: ownerEmail.subject,
      htmlContent: ownerEmail.htmlContent,
      textContent: ownerEmail.textContent,
    };
    if (ownerEmail.replyTo) ownerPayload.replyTo = ownerEmail.replyTo;

    console.log(`[Contact API ${reqId}] Attempting Brevo owner notification to: ${recipientEmail}`);
    const ownerResult = await sendTransactionalEmail(apiKey, ownerPayload);
    console.log(`[Contact API ${reqId}] Brevo owner notification result:`, {
      ok: ownerResult.ok,
      messageId: ownerResult.ok ? ownerResult.messageId : undefined,
      code: !ownerResult.ok ? ownerResult.code : undefined,
      message: !ownerResult.ok ? ownerResult.message : undefined,
    });

    if (!ownerResult.ok) {
      const statusCode = ownerResult.code === 'BREVO_AUTH_ERROR' ? 502 : ownerResult.code === 'NETWORK_ERROR' ? 502 : 502;
      console.error(`[Surfuria Contact API] Owner notification failed (${ownerResult.code}):`, ownerResult.message);
      return res.status(statusCode).json({ error: ownerResult.message, code: ownerResult.code });
    }

    let confirmationMessageId: string | undefined;
    const customerEmail = validation.data.email;

    if (customerEmail) {
      console.log(`[Contact API ${reqId}] Customer provided email (${customerEmail}); attempting confirmation email.`);
      try {
        const confirmEmail = buildCustomerConfirmationEmail(validation.data, { websiteUrl: 'https://surfuria.com' });
        const confirmPayload: BrevoPayload = {
          sender: { name: senderName, email: senderEmail },
          to: [{ name: validation.data.name, email: customerEmail }],
          replyTo: { name: senderName, email: senderEmail },
          subject: confirmEmail.subject,
          htmlContent: confirmEmail.htmlContent,
          textContent: confirmEmail.textContent,
        };
        const confirmResult = await sendTransactionalEmail(apiKey, confirmPayload);
        console.log(`[Contact API ${reqId}] Customer confirmation result:`, {
          ok: confirmResult.ok,
          messageId: confirmResult.ok ? confirmResult.messageId : undefined,
          code: !confirmResult.ok ? confirmResult.code : undefined,
          message: !confirmResult.ok ? confirmResult.message : undefined,
        });

        if (confirmResult.ok) {
          confirmationMessageId = confirmResult.messageId;
        } else {
          console.error('[Surfuria Contact API] Customer confirmation email rejected by Brevo:', confirmResult.code === 'NETWORK_ERROR' ? 0 : 500, confirmResult.message);
        }
      } catch (custError) {
        console.error('[Surfuria Contact API] Network error sending customer confirmation email:', custError);
      }
    } else {
      console.log(`[Contact API ${reqId}] Customer provided phone only; skipping confirmation email.`);
    }

    return res.status(200).json({
      success: true,
      message: 'Your enquiry has been received.',
      messageId: ownerResult.messageId,
      ...(confirmationMessageId ? { confirmationMessageId } : {}),
    });
  } catch (topError) {
    console.error(`[Contact API ${reqId} Top-Level Error]:`, topError);
    return res.status(500).json({
      error: 'Internal Server Error encountered while processing enquiry.',
      code: 'INTERNAL_ERROR',
    });
  }
}
