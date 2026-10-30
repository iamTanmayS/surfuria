import { HARDWARE_PRODUCTS } from '../../../src/data/products/hardwareProducts.js';
import { KITCHEN_CONFIGURATIONS } from '../../../src/data/products/kitchenConfigurations.js';
import type { Product, KitchenConfiguration } from '../../../src/data/products/types.js';
import { escapeHtml } from '../../security/sanitize.js';
import { OFFICIAL_EMAIL } from '../../config/serverConfig.js';
import type { EmailOutput } from '../emailTypes.js';
import type { ValidatedContactPayload } from '../../validation/contactValidation.js';

export function buildCustomerConfirmationEmail(
  data: ValidatedContactPayload,
  meta?: { websiteUrl?: string }
): EmailOutput {
  const subject = "We've received your enquiry | Surfuria";
  const websiteUrl = meta?.websiteUrl || 'https://surfuria.com';

  let contextTitle: string | undefined;
  if (data.configurationSlug) {
    const config = KITCHEN_CONFIGURATIONS.find((c: KitchenConfiguration) => c.slug === data.configurationSlug);
    if (config) contextTitle = `${config.name} Modular Kitchen`;
  } else if (data.productSlug) {
    const product = HARDWARE_PRODUCTS.find((p: Product) => p.slug === data.productSlug);
    if (product) contextTitle = product.name;
  }
  if (!contextTitle && data.configurationName) contextTitle = data.configurationName;
  else if (!contextTitle && data.productName) contextTitle = data.productName;

  const escapedName = escapeHtml(data.name);
  const escapedMessage = escapeHtml(data.message).replace(/\r\n|\r|\n/g, '<br />');
  const escapedContextTitle = contextTitle ? escapeHtml(contextTitle) : undefined;
  const escapedWebsite = escapeHtml(websiteUrl);
  const escapedOfficialEmail = escapeHtml(OFFICIAL_EMAIL);

  const contextHtml = escapedContextTitle
    ? `<div style="background-color:#ffffff;border:1px solid #e8e2d8;border-radius:6px;padding:12px 18px;margin-bottom:12px;"><span style="font-size:11px;font-weight:700;color:#b77b3f;text-transform:uppercase;letter-spacing:0.08em;display:block;margin-bottom:4px;">Product / Collection of Interest</span><span style="font-size:15px;font-weight:700;color:#171715;">${escapedContextTitle}</span></div>`
    : '';

  const htmlContent = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${escapeHtml(subject)}</title>
<style type="text/css">
html,body{margin:0!important;padding:0!important;width:100%!important;background-color:#f5f3ef;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-text-size-adjust:100%;}
table,td{mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0;border-collapse:collapse;table-layout:fixed;}
.email-container{max-width:600px;width:100%;margin:0 auto;}
@media screen and (max-width:600px){.email-container{width:100%!important;max-width:100%!important;}.mobile-padding{padding-left:20px!important;padding-right:20px!important;}}
</style>
</head>
<body style="margin:0;padding:0;background-color:#f5f3ef;color:#171715;">
<table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#f5f3ef" style="background-color:#f5f3ef;width:100%;table-layout:fixed;">
<tr><td align="center" style="padding:24px 10px 40px 10px;">
<table role="presentation" class="email-container" width="600" border="0" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="max-width:600px;width:100%;background-color:#ffffff;border:1px solid #e6e0d6;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(23,23,21,0.05);table-layout:fixed;">

<tr><td bgcolor="#141412" class="mobile-padding" style="background-color:#141412;padding:30px 36px 26px 36px;">
<span style="font-size:22px;font-weight:800;letter-spacing:0.16em;color:#ffffff;text-transform:uppercase;line-height:1.1;display:block;">SURFURIA</span>
<div style="width:44px;height:3px;background-color:#b77b3f;margin-top:10px;margin-bottom:8px;"></div>
<span style="font-size:10px;font-weight:700;letter-spacing:0.16em;color:#b77b3f;text-transform:uppercase;display:block;">ARCHITECTURAL HARDWARE &amp; MODULAR KITCHENS</span>
</td></tr>

<tr><td class="mobile-padding" style="padding:32px 36px 24px 36px;border-bottom:1px solid #f0ece4;">
<span style="font-size:11px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:#b77b3f;display:block;margin-bottom:8px;">ENQUIRY CONFIRMATION</span>
<h1 style="font-size:22px;font-weight:700;color:#171715;margin:0 0 12px 0;line-height:1.3;">We've received your enquiry</h1>
<p style="font-size:15px;line-height:1.65;color:#403d38;margin:0;">Dear ${escapedName},<br /><br />Thank you for reaching out to Surfuria. We have successfully received your enquiry, and our architectural design and specification team is reviewing your requirements.</p>
</td></tr>

<tr><td class="mobile-padding" style="padding:24px 36px;background-color:#faf8f5;border-bottom:1px solid #f0ece4;">
<span style="font-size:11px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#5f5b54;display:block;margin-bottom:12px;">YOUR ENQUIRY DETAILS</span>
${contextHtml}
<div style="background-color:#ffffff;border:1px solid #e8e2d8;border-left:3px solid #b77b3f;border-radius:6px;padding:14px 18px;box-sizing:border-box;">
<p style="font-size:11px;font-weight:700;color:#5f5b54;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 6px 0;">Message</p>
<p style="font-size:14px;line-height:1.6;color:#171715;margin:0;word-break:break-word;">&ldquo;${escapedMessage}&rdquo;</p>
</div>
</td></tr>

<tr><td class="mobile-padding" style="padding:28px 36px;">
<span style="font-size:11px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#5f5b54;display:block;margin-bottom:8px;">WHAT HAPPENS NEXT</span>
<p style="font-size:14px;line-height:1.65;color:#403d38;margin:0 0 20px 0;">Our team will review your specifications and get in touch with you shortly to assist with technical drawings, finish samples, or scheduling.</p>
<table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td align="center" bgcolor="#b77b3f" style="border-radius:6px;"><a href="${escapedWebsite}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:12px 24px;font-size:13px;font-weight:700;color:#ffffff;text-decoration:none;letter-spacing:0.04em;">Explore Our Collections &rarr;</a></td></tr></table>
</td></tr>

<tr><td bgcolor="#141412" class="mobile-padding" style="background-color:#141412;padding:24px 36px;text-align:center;">
<p style="font-size:12px;color:#9c9589;margin:0 0 6px 0;">Surfuria &bull; Hinged on Quality</p>
<p style="font-size:11px;color:#6e675c;margin:0;">
<a href="${escapedWebsite}" target="_blank" rel="noopener noreferrer" style="color:#b77b3f;text-decoration:underline;">surfuria.com</a> &bull;
<a href="mailto:${escapedOfficialEmail}" style="color:#b77b3f;text-decoration:underline;">${escapedOfficialEmail}</a>
</p>
</td></tr>

</table></td></tr></table>
</body></html>`;

  const textLines = [
    "We've received your enquiry | Surfuria",
    '======================================', '',
    `Dear ${data.name},`, '',
    'Thank you for reaching out to Surfuria. We have successfully received your enquiry, and our architectural design and specification team is reviewing your requirements.',
    '', 'YOUR ENQUIRY DETAILS', '--------------------',
  ];
  if (contextTitle) textLines.push(`Product / Collection: ${contextTitle}`);
  textLines.push(
    `Message: "${data.message}"`, '',
    'WHAT HAPPENS NEXT', '-----------------',
    'Our team will review your specifications and get in touch with you shortly to assist with technical drawings, finish samples, or scheduling.',
    '', `Explore Our Collections: ${websiteUrl}`,
    `Email us directly: ${OFFICIAL_EMAIL}`, '',
    'Warm regards,', 'Surfuria Architectural Studio', websiteUrl,
  );

  return { subject, htmlContent, textContent: textLines.join('\n') };
}
