export interface EmailOutput {
  subject: string;
  htmlContent: string;
  textContent: string;
  replyTo?: { name?: string; email: string };
}

export interface SubmissionMetadata {
  clientIp?: string;
  userAgent?: string;
  referer?: string;
  recipientEmail?: string;
}
