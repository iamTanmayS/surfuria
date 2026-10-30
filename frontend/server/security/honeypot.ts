export const HONEYPOT_FIELDS = ['hp', 'company_hp', 'website'] as const;

export function getTriggeredHoneypotField(record: Record<string, unknown>): string | null {
  for (const field of HONEYPOT_FIELDS) {
    const val = record[field];
    if (typeof val === 'string' && val.trim().length > 0) {
      return field;
    }
  }
  return null;
}

export function isHoneypotTriggered(record: Record<string, unknown>): boolean {
  return getTriggeredHoneypotField(record) !== null;
}
