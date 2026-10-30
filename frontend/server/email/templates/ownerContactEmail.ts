import { HARDWARE_PRODUCTS } from '../../../src/data/products/hardwareProducts.ts';
import { KITCHEN_CONFIGURATIONS } from '../../../src/data/products/kitchenConfigurations.ts';
import type { Product, KitchenConfiguration } from '../../../src/data/products/types.ts';
import { escapeHtml } from '../../security/sanitize';
import { OFFICIAL_EMAIL } from '../../config/serverConfig';
import type { EmailOutput, SubmissionMetadata } from '../emailTypes';
import type { ValidatedContactPayload } from '../../validation/contactValidation';

interface OwnerHtmlParams {
  resolvedSubject: string;
  refId: string;
  timestampIst: string;
  timestampUtc: string;
  escapedName: string;
  escapedEmail?: string;
  escapedPhone?: string;
  escapedMessage: string;
  escapedContextTitle?: string;
  escapedSubtitle?: string;
  escapedPrice?: string;
  escapedPageUrl?: string;
  escapedIp: string;
  escapedUserAgent: string;
  escapedRecipient: string;
  contactPref: string;
  whatsAppUrl?: string;
  verifiedImage?: string;
  verifiedSpecs: Array<{ label: string; value: string }>;
}

function buildOwnerHtml(p: OwnerHtmlParams): string {
  const specsRows = p.verifiedSpecs.map((spec) =>
    `<tr><td width="130" style="width:130px;max-width:130px;padding:6px 10px 6px 0;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#767169;vertical-align:top;border-bottom:1px solid #eee8df;">${escapeHtml(spec.label)}</td><td style="padding:6px 0;font-size:13px;font-weight:600;color:#171715;vertical-align:top;border-bottom:1px solid #eee8df;word-break:break-word;overflow-wrap:anywhere;">${escapeHtml(spec.value)}</td></tr>`
  ).join('');

  const contextSection = p.escapedContextTitle ? `
<tr><td class="mobile-padding" style="padding:16px 36px 12px 36px;">
<table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="table-layout:fixed;">
<tr><td style="padding-bottom:12px;"><span style="font-size:11px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:#b77b3f;">&bull;&nbsp;TARGET ITEM &amp; SPECIFICATIONS</span></td></tr>
<tr><td bgcolor="#faf8f5" style="background-color:#faf8f5;border:1px solid #e7e0d5;border-radius:8px;padding:20px 22px;">
<table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="table-layout:fixed;">
${p.verifiedImage ? `<tr><td colspan="2" style="padding-bottom:16px;"><img src="${p.verifiedImage}" width="200" alt="${p.escapedContextTitle}" style="width:200px;max-width:100%;height:auto;border-radius:6px;border:1px solid #e7e0d5;display:block;" /></td></tr>` : ''}
<tr><td width="130" style="width:130px;max-width:130px;padding:6px 10px 6px 0;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#767169;vertical-align:top;border-bottom:1px solid #eee8df;">Selected Item</td>
<td style="padding:6px 0;font-size:15px;font-weight:800;color:#171715;vertical-align:top;border-bottom:1px solid #eee8df;word-break:break-word;overflow-wrap:anywhere;">${p.escapedContextTitle}${p.escapedSubtitle ? `<span style="display:block;font-size:12px;font-weight:500;color:#767169;margin-top:2px;">${p.escapedSubtitle}</span>` : ''}</td></tr>
${p.escapedPrice ? `<tr><td width="130" style="width:130px;max-width:130px;padding:6px 10px 6px 0;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#767169;vertical-align:top;border-bottom:1px solid #eee8df;">Package Price</td><td style="padding:6px 0;vertical-align:top;border-bottom:1px solid #eee8df;"><span style="display:inline-block;background-color:#b77b3f;color:#ffffff;font-size:14px;font-weight:800;padding:4px 10px;border-radius:4px;">${p.escapedPrice} Turnkey</span></td></tr>` : ''}
${specsRows}
${p.escapedPageUrl ? `<tr><td width="130" style="width:130px;max-width:130px;padding:6px 10px 6px 0;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#767169;vertical-align:top;">Source Page</td><td style="padding:6px 0;font-size:12px;vertical-align:top;word-break:break-all;overflow-wrap:anywhere;"><a href="${p.escapedPageUrl}" style="color:#b77b3f;text-decoration:underline;word-break:break-all;">${p.escapedPageUrl}</a></td></tr>` : ''}
</table></td></tr></table></td></tr>` : '';

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${escapeHtml(p.resolvedSubject)}</title>
<style type="text/css">
html,body{margin:0!important;padding:0!important;width:100%!important;background-color:#f5f3ef;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-text-size-adjust:100%;}
table,td{mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0;border-collapse:collapse;table-layout:fixed;}
img{border:0;line-height:100%;outline:none;text-decoration:none;max-width:100%;}
a{text-decoration:none;}
.email-container{max-width:620px;width:100%;margin:0 auto;}
@media screen and (max-width:620px){.email-container{width:100%!important;max-width:100%!important;}.mobile-padding{padding-left:16px!important;padding-right:16px!important;}.mobile-header-padding{padding-left:20px!important;padding-right:20px!important;padding-top:24px!important;padding-bottom:20px!important;}.mobile-btn{display:block!important;width:100%!important;box-sizing:border-box!important;text-align:center!important;margin-bottom:10px!important;}}
</style>
</head>
<body style="margin:0;padding:0;background-color:#f5f3ef;color:#171715;">
<table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#f5f3ef" style="background-color:#f5f3ef;width:100%;table-layout:fixed;">
<tr><td align="center" style="padding:24px 10px 40px 10px;">
<table role="presentation" class="email-container" width="620" border="0" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="max-width:620px;width:100%;background-color:#ffffff;border:1px solid #e6e0d6;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(23,23,21,0.05);table-layout:fixed;">

<tr><td bgcolor="#141412" class="mobile-header-padding" style="background-color:#141412;padding:30px 36px 26px 36px;">
<table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="table-layout:fixed;"><tr>
<td valign="top"><span style="font-size:22px;font-weight:800;letter-spacing:0.16em;color:#ffffff;text-transform:uppercase;line-height:1.1;display:block;">SURFURIA</span><div style="width:44px;height:3px;background-color:#b77b3f;margin-top:10px;margin-bottom:8px;"></div><span style="font-size:10px;font-weight:700;letter-spacing:0.16em;color:#b77b3f;text-transform:uppercase;display:block;">ARCHITECTURAL HARDWARE &amp; MODULAR KITCHENS</span></td>
<td align="right" valign="top"><span style="display:inline-block;background-color:rgba(183,123,63,0.2);border:1px solid #b77b3f;color:#f0c593;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:5px 10px;border-radius:4px;">${p.refId}</span></td>
</tr></table></td></tr>

<tr><td class="mobile-padding" style="padding:28px 36px 20px 36px;border-bottom:1px solid #f0ece4;">
<span style="font-size:11px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:#b77b3f;display:block;margin-bottom:6px;">NEW CLIENT SUBMISSION</span>
<h2 style="font-size:20px;font-weight:700;color:#171715;margin:0 0 8px 0;line-height:1.35;word-break:break-word;">${escapeHtml(p.resolvedSubject)}</h2>
<span style="font-size:13px;color:#767169;display:block;">Received: <strong>${p.timestampIst}</strong></span>
</td></tr>

<tr><td class="mobile-padding" style="padding:24px 36px 12px 36px;">
<table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="table-layout:fixed;">
<tr><td style="padding-bottom:12px;"><span style="font-size:11px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:#b77b3f;">&bull;&nbsp;CUSTOMER INFORMATION</span></td></tr>
<tr><td bgcolor="#faf8f5" style="background-color:#faf8f5;border:1px solid #e7e0d5;border-radius:8px;padding:18px 22px;">
<table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="table-layout:fixed;">
<tr><td width="130" style="width:130px;max-width:130px;padding:7px 10px 7px 0;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#767169;vertical-align:top;border-bottom:1px solid #eee8df;">Client Name</td><td style="padding:7px 0;font-size:14px;font-weight:700;color:#171715;vertical-align:top;border-bottom:1px solid #eee8df;word-break:break-word;">${p.escapedName}</td></tr>
${p.escapedEmail ? `<tr><td width="130" style="width:130px;max-width:130px;padding:7px 10px 7px 0;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#767169;vertical-align:top;border-bottom:1px solid #eee8df;">Email Address</td><td style="padding:7px 0;font-size:14px;font-weight:600;color:#171715;vertical-align:top;border-bottom:1px solid #eee8df;word-break:break-all;"><a href="mailto:${p.escapedEmail}" style="color:#b77b3f;text-decoration:underline;">${p.escapedEmail}</a></td></tr>` : ''}
${p.escapedPhone ? `<tr><td width="130" style="width:130px;max-width:130px;padding:7px 10px 7px 0;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#767169;vertical-align:top;border-bottom:1px solid #eee8df;">Phone / WhatsApp</td><td style="padding:7px 0;font-size:14px;font-weight:700;color:#171715;vertical-align:top;border-bottom:1px solid #eee8df;word-break:break-word;"><a href="tel:${p.escapedPhone}" style="color:#171715;text-decoration:none;">${p.escapedPhone}</a>${p.whatsAppUrl ? `&nbsp;&nbsp;<a href="${p.whatsAppUrl}" target="_blank" style="display:inline-block;background-color:#25d366;color:#ffffff;font-size:11px;font-weight:700;padding:2px 8px;border-radius:4px;text-decoration:none;">Open WhatsApp &rarr;</a>` : ''}</td></tr>` : ''}
<tr><td width="130" style="width:130px;max-width:130px;padding:7px 10px 7px 0;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#767169;vertical-align:top;">Contact Channel</td><td style="padding:7px 0;font-size:13px;font-weight:600;color:#5f5b54;font-style:italic;vertical-align:top;">${p.contactPref}</td></tr>
</table></td></tr></table></td></tr>

${contextSection}

<tr><td class="mobile-padding" style="padding:16px 36px 16px 36px;">
<table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="table-layout:fixed;">
<tr><td style="padding-bottom:12px;"><span style="font-size:11px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:#b77b3f;">&bull;&nbsp;CLIENT ENQUIRY MESSAGE</span></td></tr>
<tr><td bgcolor="#faf8f5" style="background-color:#faf8f5;border-left:4px solid #b77b3f;border-top:1px solid #e7e0d5;border-right:1px solid #e7e0d5;border-bottom:1px solid #e7e0d5;border-radius:0 8px 8px 0;padding:20px 24px;">
<div style="font-size:15px;line-height:1.7;color:#171715;word-break:break-word;">${p.escapedMessage}</div>
</td></tr></table></td></tr>

<tr><td class="mobile-padding" style="padding:8px 36px 20px 36px;">
<table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="table-layout:fixed;">
<tr><td style="padding-bottom:12px;"><span style="font-size:11px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:#767169;">QUICK RESPONSE ACTIONS</span></td></tr>
<tr><td>
${p.whatsAppUrl ? `<a href="${p.whatsAppUrl}" target="_blank" class="mobile-btn" style="background-color:#25d366;color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:6px;font-weight:700;font-size:13px;display:inline-block;margin-right:10px;margin-bottom:8px;vertical-align:middle;">&bull;&nbsp;Chat on WhatsApp (${p.escapedPhone})</a>` : ''}
${p.escapedEmail ? `<a href="mailto:${p.escapedEmail}?subject=Re:%20${encodeURIComponent(p.resolvedSubject)}" class="mobile-btn" style="background-color:#141412;color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:6px;font-weight:700;font-size:13px;display:inline-block;margin-bottom:8px;vertical-align:middle;">&bull;&nbsp;Reply by Email (${p.escapedEmail})</a>` : ''}
</td></tr></table></td></tr>

<tr><td class="mobile-padding" style="padding:12px 36px 24px 36px;">
<table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="table-layout:fixed;">
<tr><td style="padding-bottom:10px;"><span style="font-size:10px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:#8e8880;">TECHNICAL &amp; SUBMISSION METADATA</span></td></tr>
<tr><td bgcolor="#f6f3ee" style="background-color:#f6f3ee;border:1px solid #e5dfd5;border-radius:6px;padding:14px 18px;">
<table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="table-layout:fixed;font-size:12px;color:#5f5b54;">
<tr><td width="130" style="width:130px;max-width:130px;padding:4px 10px 4px 0;font-weight:700;color:#767169;vertical-align:top;">Enquiry Ref ID:</td><td style="padding:4px 0;font-family:monospace;font-weight:600;color:#171715;word-break:break-all;">${p.refId}</td></tr>
<tr><td width="130" style="width:130px;max-width:130px;padding:4px 10px 4px 0;font-weight:700;color:#767169;vertical-align:top;">Timestamp (IST):</td><td style="padding:4px 0;word-break:break-word;">${p.timestampIst}</td></tr>
<tr><td width="130" style="width:130px;max-width:130px;padding:4px 10px 4px 0;font-weight:700;color:#767169;vertical-align:top;">Timestamp (UTC):</td><td style="padding:4px 0;font-family:monospace;word-break:break-all;">${p.timestampUtc}</td></tr>
<tr><td width="130" style="width:130px;max-width:130px;padding:4px 10px 4px 0;font-weight:700;color:#767169;vertical-align:top;">Client IP:</td><td style="padding:4px 0;font-family:monospace;color:#171715;word-break:break-all;">${p.escapedIp}</td></tr>
<tr><td width="130" style="width:130px;max-width:130px;padding:4px 10px 4px 0;font-weight:700;color:#767169;vertical-align:top;">Client Browser / OS:</td><td style="padding:4px 0;font-size:11px;color:#5f5b54;word-break:break-all;">${p.escapedUserAgent}</td></tr>
<tr><td width="130" style="width:130px;max-width:130px;padding:4px 10px 4px 0;font-weight:700;color:#767169;vertical-align:top;">Forwarded Inbox:</td><td style="padding:4px 0;font-weight:600;color:#171715;word-break:break-all;">${p.escapedRecipient}</td></tr>
<tr><td width="130" style="width:130px;max-width:130px;padding:4px 10px 4px 0;font-weight:700;color:#767169;vertical-align:top;">Security Status:</td><td style="padding:4px 0;color:#2e7d32;font-weight:700;">&check;&nbsp;Clean Submission (Passed Honeypot &amp; Server-Side Rate Limiter)</td></tr>
</table></td></tr></table></td></tr>

<tr><td bgcolor="#f1ede6" class="mobile-padding" style="background-color:#f1ede6;padding:20px 36px;border-top:1px solid #e6e0d6;font-size:12px;color:#767169;line-height:1.5;">
<p style="margin:0 0 6px 0;font-weight:600;color:#171715;">SURFURIA ARCHITECTURAL HARDWARE &amp; MODULAR KITCHENS</p>
<p style="margin:0;font-size:11px;color:#8a847b;">This automated notification was generated by the Surfuria Contact Engine on Vercel Serverless. Direct replies to this email will route to the client if an email was supplied.</p>
</td></tr>

</table></td></tr></table>
</body></html>`;
}

export function buildOwnerContactEmail(
  data: ValidatedContactPayload,
  meta?: SubmissionMetadata
): EmailOutput {
  let resolvedSubject = `[Surfuria Enquiry] New Contact Request — ${data.name}`;
  let verifiedContextTitle: string | undefined;
  let verifiedSubtitle: string | undefined;
  let verifiedPrice: string | undefined;
  let verifiedImage: string | undefined;
  let verifiedSpecs: Array<{ label: string; value: string }> = [];

  if (data.configurationSlug) {
    const config = KITCHEN_CONFIGURATIONS.find((c: KitchenConfiguration) => c.slug === data.configurationSlug);
    if (config) {
      verifiedContextTitle = `${config.name} Modular Kitchen`;
      verifiedSubtitle = 'Factory-Engineered Package';
      verifiedPrice = config.formattedPrice;
      verifiedImage = config.image;
      resolvedSubject = `[Surfuria Enquiry] ${config.name} Modular Kitchen — ${data.name}`;
      verifiedSpecs = [
        { label: 'Door Panels', value: `${config.doorPanelArea.formatted} (${config.doorPanelFinish})` },
        { label: 'Box Panels', value: `${config.boxPanelArea.formatted} (${config.boxPanelMaterial})` },
        { label: 'Inclusions', value: 'Transportation & Professional Installation Included' },
        { label: 'Included Hardware', value: config.includedHardware.join(', ') },
      ];
    }
  } else if (data.productSlug) {
    const product = HARDWARE_PRODUCTS.find((p: Product) => p.slug === data.productSlug);
    if (product) {
      verifiedContextTitle = product.name;
      verifiedSubtitle = product.badge || 'Architectural Hardware';
      verifiedImage = product.cardImage;
      resolvedSubject = `[Surfuria Enquiry] ${product.name} — ${data.name}`;
      verifiedSpecs = product.specifications && product.specifications.length > 0
        ? product.specifications.slice(0, 4)
        : product.shortDescription ? [{ label: 'Description', value: product.shortDescription }] : [];
    }
  }

  if (!verifiedContextTitle && data.configurationName) {
    verifiedContextTitle = data.configurationName;
    verifiedSubtitle = 'Modular Kitchen';
    resolvedSubject = `[Surfuria Enquiry] ${data.configurationName} — ${data.name}`;
  } else if (!verifiedContextTitle && data.productName) {
    verifiedContextTitle = data.productName;
    verifiedSubtitle = 'Architectural Hardware';
    resolvedSubject = `[Surfuria Enquiry] ${data.productName} — ${data.name}`;
  }

  const now = new Date();
  const timestampUtc = now.toISOString();
  const timestampIst = now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'medium' });
  const refId = `SRF-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;

  const clientIp = meta?.clientIp || 'Not recorded';
  const userAgent = meta?.userAgent || 'Not recorded';
  const recipientEmail = meta?.recipientEmail || process.env.CONTACT_RECIPIENT_EMAIL || OFFICIAL_EMAIL;

  const escapedName = escapeHtml(data.name);
  const escapedEmail = data.email ? escapeHtml(data.email) : undefined;
  const escapedPhone = data.phone ? escapeHtml(data.phone) : undefined;
  const escapedMessage = escapeHtml(data.message).replace(/\r\n|\r|\n/g, '<br />');
  const escapedContextTitle = verifiedContextTitle ? escapeHtml(verifiedContextTitle) : undefined;
  const escapedSubtitle = verifiedSubtitle ? escapeHtml(verifiedSubtitle) : undefined;
  const escapedPrice = verifiedPrice ? escapeHtml(verifiedPrice) : undefined;
  const escapedPageUrl = data.pageUrl ? escapeHtml(data.pageUrl) : undefined;
  const escapedIp = escapeHtml(clientIp);
  const escapedUserAgent = escapeHtml(userAgent);
  const escapedRecipient = escapeHtml(recipientEmail);

  let contactPref = 'Both Email & Phone provided';
  if (data.email && !data.phone) contactPref = 'Email only';
  if (!data.email && data.phone) contactPref = 'Phone / WhatsApp only';

  const rawPhoneDigits = data.phone ? data.phone.replace(/\D/g, '') : '';
  const whatsAppUrl = rawPhoneDigits ? `https://wa.me/${rawPhoneDigits}` : undefined;

  const htmlContent = buildOwnerHtml({
    resolvedSubject, refId, timestampIst, timestampUtc,
    escapedName, escapedEmail, escapedPhone, escapedMessage,
    escapedContextTitle, escapedSubtitle, escapedPrice, escapedPageUrl,
    escapedIp, escapedUserAgent, escapedRecipient,
    contactPref, whatsAppUrl, verifiedImage, verifiedSpecs,
  });

  const textLines = [
    `SURFURIA — ${resolvedSubject.toUpperCase()}`,
    `Reference ID:    ${refId}`,
    '==================================================', '',
    'CUSTOMER INFORMATION', '--------------------',
    `Name:            ${data.name}`,
    `Email:           ${data.email || 'Not provided'}`,
    `Phone:           ${data.phone || 'Not provided'}`,
    `Contact Mode:    ${contactPref}`, '',
  ];

  if (verifiedContextTitle) {
    textLines.push('PROJECT & PRODUCT SPECIFICATIONS', '--------------------------------');
    textLines.push(`Item:            ${verifiedContextTitle}`);
    if (verifiedSubtitle) textLines.push(`Category:        ${verifiedSubtitle}`);
    if (verifiedPrice) textLines.push(`Turnkey Price:   ${verifiedPrice}`);
    for (const spec of verifiedSpecs) textLines.push(`${spec.label.padEnd(17)}: ${spec.value}`);
    if (data.pageUrl) textLines.push(`Source URL:      ${data.pageUrl}`);
    textLines.push('');
  }

  textLines.push(
    'CLIENT ENQUIRY MESSAGE', '----------------------', data.message, '',
    'TECHNICAL & SUBMISSION METADATA', '-------------------------------',
    `Submission Time (IST): ${timestampIst}`,
    `Submission Time (UTC): ${timestampUtc}`,
    `Client IP Address:     ${clientIp}`,
    `Client Device / OS:    ${userAgent}`,
    `Forwarded To Inbox:    ${recipientEmail}`,
    'Security Verification: Passed Honeypot & IP Rate Limiter',
    '==================================================',
  );

  return {
    subject: resolvedSubject,
    htmlContent,
    textContent: textLines.join('\n'),
    replyTo: data.email ? { name: data.name, email: data.email } : undefined,
  };
}
