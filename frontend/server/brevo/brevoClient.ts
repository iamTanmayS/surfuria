export interface BrevoContact {
  name?: string;
  email: string;
}

export interface BrevoPayload {
  sender: BrevoContact;
  to: BrevoContact[];
  replyTo?: BrevoContact;
  subject: string;
  htmlContent: string;
  textContent: string;
}
