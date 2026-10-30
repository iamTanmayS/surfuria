import { escapeHtml } from '../../security/sanitize';
import { OFFICIAL_EMAIL } from '../../config/serverConfig';
import type { EmailOutput, SubmissionMetadata } from '../emailTypes';
import type { ValidatedNewsletterPayload } from '../../validation/newsletterValidation';

export function buildNewsletterNotificationEmail(
  data: ValidatedNewsletterPayload,
  meta?: SubmissionMetadata
): EmailOutput {
  const now = new Date();
  const timestampUtc = now.toISOString();
  const timestampIst = now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'medium' });
  const refId = `NL-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;

  const clientIp = meta?.clientIp || 'Not recorded';
  const userAgent = meta?.userAgent || 'Not recorded';
  const recipientEmail = meta?.recipientEmail || process.env.CONTACT_RECIPIENT_EMAIL || OFFICIAL_EMAIL;

  const escapedEmail = escapeHtml(data.email);
  const escapedIp = escapeHtml(clientIp);
  const escapedUserAgent = escapeHtml(userAgent);
  const escapedRecipient = escapeHtml(recipientEmail);

  const subject = '[Surfuria Newsletter] New Subscriber';

  const htmlContent = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${escapeHtml(subject)}</title>
<style type="text/css">
html,body{margin:0!important;padding:0!important;width:100%!important;background-color:#f5f3ef;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-text-size-adjust:100%;}
table,td{mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0;border-collapse:collapse;table-layout:fixed;}
a{text-decoration:none;}
.email-container{max-width:620px;width:100%;margin:0 auto;}
@media screen and (max-width:620px){.email-container{width:100%!important;max-width:100%!important;}.mobile-padding{padding-left:16px!important;padding-right:16px!important;}.mobile-header-padding{padding-left:20px!important;padding-right:20px!important;padding-top:24px!important;padding-bottom:20px!important;}}
</style>
</head>
<body style="margin:0;padding:0;background-color:#f5f3ef;color:#171715;">
<table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#f5f3ef" style="background-color:#f5f3ef;width:100%;table-layout:fixed;">
<tr><td align="center" style="padding:24px 10px 40px 10px;">
<table role="presentation" class="email-container" width="620" border="0" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="max-width:620px;width:100%;background-color:#ffffff;border:1px solid #e6e0d6;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(23,23,21,0.05);table-layout:fixed;">

<tr><td bgcolor="#141412" class="mobile-header-padding" style="background-color:#141412;padding:30px 36px 26px 36px;">
<table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="table-layout:fixed;"><tr>
<td valign="top"><span style="font-size:22px;font-weight:800;letter-spacing:0.16em;color:#ffffff;text-transform:uppercase;line-height:1.1;display:block;">SURFURIA</span><div style="width:44px;height:3px;background-color:#b77b3f;margin-top:10px;margin-bottom:8px;"></div><span style="font-size:10px;font-weight:700;letter-spacing:0.16em;color:#b77b3f;text-transform:uppercase;display:block;">ARCHITECTURAL DISPATCH &bull; NEWSLETTER SUBSCRIBER</span></td>
<td align="right" valign="top"><span style="display:inline-block;background-color:rgba(183,123,63,0.2);border:1px solid #b77b3f;color:#f0c593;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:5px 10px;border-radius:4px;">${refId}</span></td>
</tr></table></td></tr>

<tr><td class="mobile-padding" style="padding:28px 36px 20px 36px;border-bottom:1px solid #f0ece4;">
<span style="font-size:11px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:#b77b3f;display:block;margin-bottom:6px;">NEW AUDIENCE SUBSCRIPTION</span>
<h2 style="font-size:20px;font-weight:700;color:#171715;margin:0 0 8px 0;line-height:1.35;">New Newsletter Subscriber</h2>
<span style="font-size:13px;color:#767169;display:block;">Subscribed on: <strong>${timestampIst}</strong></span>
</td></tr>

<tr><td class="mobile-padding" style="padding:24px 36px 16px 36px;">
<table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="table-layout:fixed;">
<tr><td style="padding-bottom:12px;"><span style="font-size:11px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:#b77b3f;">&bull;&nbsp;SUBSCRIBER INFORMATION</span></td></tr>
<tr><td bgcolor="#faf8f5" style="background-color:#faf8f5;border:1px solid #e7e0d5;border-radius:8px;padding:18px 22px;">
<table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="table-layout:fixed;">
<tr><td width="130" style="width:130px;max-width:130px;padding:7px 10px 7px 0;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#767169;vertical-align:top;border-bottom:1px solid #eee8df;">Subscriber Email</td><td style="padding:7px 0;font-size:15px;font-weight:700;color:#171715;vertical-align:top;border-bottom:1px solid #eee8df;word-break:break-all;"><a href="mailto:${escapedEmail}" style="color:#b77b3f;text-decoration:underline;">${escapedEmail}</a></td></tr>
<tr><td width="130" style="width:130px;max-width:130px;padding:7px 10px 7px 0;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#767169;vertical-align:top;border-bottom:1px solid #eee8df;">Subscription Channel</td><td style="padding:7px 0;font-size:13px;font-weight:600;color:#171715;vertical-align:top;border-bottom:1px solid #eee8df;">Website Footer Architectural Dispatch</td></tr>
<tr><td width="130" style="width:130px;max-width:130px;padding:7px 10px 7px 0;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#767169;vertical-align:top;">Status</td><td style="padding:7px 0;font-size:13px;font-weight:700;color:#2e7d32;vertical-align:top;">&check;&nbsp;Active &bull; Confirmed via Website</td></tr>
</table></td></tr></table></td></tr>

<tr><td class="mobile-padding" style="padding:8px 36px 20px 36px;">
<a href="mailto:${escapedEmail}?subject=Welcome%20to%20Surfuria%20Architectural%20Dispatches" style="background-color:#141412;color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:6px;font-weight:700;font-size:13px;display:inline-block;">&bull;&nbsp;Send Welcome Email (${escapedEmail})</a>
</td></tr>

<tr><td class="mobile-padding" style="padding:12px 36px 24px 36px;">
<table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="table-layout:fixed;">
<tr><td style="padding-bottom:10px;"><span style="font-size:10px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:#8e8880;">TECHNICAL &amp; AUDIT METADATA</span></td></tr>
<tr><td bgcolor="#f6f3ee" style="background-color:#f6f3ee;border:1px solid #e5dfd5;border-radius:6px;padding:14px 18px;">
<table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="table-layout:fixed;font-size:12px;color:#5f5b54;">
<tr><td width="130" style="width:130px;max-width:130px;padding:4px 10px 4px 0;font-weight:700;color:#767169;vertical-align:top;">Reference ID:</td><td style="padding:4px 0;font-family:monospace;font-weight:600;color:#171715;word-break:break-all;">${refId}</td></tr>
<tr><td width="130" style="width:130px;max-width:130px;padding:4px 10px 4px 0;font-weight:700;color:#767169;vertical-align:top;">Timestamp (IST):</td><td style="padding:4px 0;word-break:break-word;">${timestampIst}</td></tr>
<tr><td width="130" style="width:130px;max-width:130px;padding:4px 10px 4px 0;font-weight:700;color:#767169;vertical-align:top;">Client IP:</td><td style="padding:4px 0;font-family:monospace;color:#171715;word-break:break-all;">${escapedIp}</td></tr>
<tr><td width="130" style="width:130px;max-width:130px;padding:4px 10px 4px 0;font-weight:700;color:#767169;vertical-align:top;">Device / Browser:</td><td style="padding:4px 0;font-size:11px;color:#5f5b54;word-break:break-all;">${escapedUserAgent}</td></tr>
<tr><td width="130" style="width:130px;max-width:130px;padding:4px 10px 4px 0;font-weight:700;color:#767169;vertical-align:top;">Forwarded To:</td><td style="padding:4px 0;font-weight:600;color:#171715;word-break:break-all;">${escapedRecipient}</td></tr>
</table></td></tr></table></td></tr>

<tr><td bgcolor="#f1ede6" class="mobile-padding" style="background-color:#f1ede6;padding:20px 36px;border-top:1px solid #e6e0d6;font-size:12px;color:#767169;line-height:1.5;">
<p style="margin:0 0 6px 0;font-weight:600;color:#171715;">SURFURIA ARCHITECTURAL HARDWARE &amp; MODULAR KITCHENS</p>
<p style="margin:0;font-size:11px;color:#8a847b;">This automated notification was generated by the Surfuria Newsletter Service on Vercel Serverless.</p>
</td></tr>

</table></td></tr></table>
</body></html>`;

  const textLines = [
    'SURFURIA — NEW NEWSLETTER SUBSCRIBER',
    `Reference ID:    ${refId}`,
    '==================================================', '',
    'SUBSCRIBER INFORMATION', '----------------------',
    `Email:           ${data.email}`,
    'Channel:         Website Footer Architectural Dispatch',
    'Status:          Active / Confirmed', '',
    'TECHNICAL & AUDIT METADATA', '--------------------------',
    `Submission Time (IST): ${timestampIst}`,
    `Submission Time (UTC): ${timestampUtc}`,
    `Client IP Address:     ${clientIp}`,
    `Client Device / OS:    ${userAgent}`,
    `Forwarded To Inbox:    ${recipientEmail}`,
    '==================================================',
  ];

  return {
    subject,
    htmlContent,
    textContent: textLines.join('\n'),
    replyTo: { email: data.email },
  };
}
