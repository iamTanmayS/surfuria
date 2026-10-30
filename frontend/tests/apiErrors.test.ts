import { describe, it, expect } from 'vitest';
import { extractErrorMessage } from '../src/lib/apiErrors';

describe('extractErrorMessage (React Error #31 prevention)', () => {
  const fallback = 'Email delivery could not be completed. Please try again.';

  it('extracts plain string from data.error (Surfuria backend error)', () => {
    const input = { error: 'Please enter your name.', field: 'name' };
    const result = extractErrorMessage(input, fallback);
    expect(result).toBe('Please enter your name.');
    expect(typeof result).toBe('string');
  });

  it('extracts nested message when data.error is a Vercel-style { code, message } object', () => {
    // This is the EXACT shape that triggers Minified React error #31 if rendered directly!
    const input = {
      error: {
        code: 'FUNCTION_INVOCATION_FAILED',
        message: 'Serverless Function Crashed on Vercel',
      },
    };
    const result = extractErrorMessage(input, fallback);
    expect(result).toBe('Serverless Function Crashed on Vercel');
    expect(typeof result).toBe('string');
  });

  it('extracts message when data is a Brevo-style root { code, message } object', () => {
    const input = {
      code: 'invalid_parameter',
      message: 'Email address provided is not deliverable.',
    };
    const result = extractErrorMessage(input, fallback);
    expect(result).toBe('Email address provided is not deliverable.');
    expect(typeof result).toBe('string');
  });

  it('formats code when data.error object has code but no message', () => {
    const input = {
      error: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    };
    const result = extractErrorMessage(input, fallback);
    expect(result).toContain('INTERNAL_SERVER_ERROR');
    expect(typeof result).toBe('string');
  });

  it('formats code when data has root code but no message', () => {
    const input = { code: 'CONFIG_MISSING' };
    const result = extractErrorMessage(input, fallback);
    expect(result).toContain('CONFIG_MISSING');
    expect(typeof result).toBe('string');
  });

  it('handles plain string inputs (e.g. text/plain from reverse proxies)', () => {
    const input = '504 Gateway Timeout from edge proxy';
    const result = extractErrorMessage(input, fallback);
    expect(result).toBe('504 Gateway Timeout from edge proxy');
    expect(typeof result).toBe('string');
  });

  it('returns fallback on null, undefined, or empty object', () => {
    expect(extractErrorMessage(null, fallback)).toBe(fallback);
    expect(extractErrorMessage(undefined, fallback)).toBe(fallback);
    expect(extractErrorMessage({}, fallback)).toBe(fallback);
  });

  it('returns fallback on malformed or empty strings', () => {
    expect(extractErrorMessage('', fallback)).toBe(fallback);
    expect(extractErrorMessage('   ', fallback)).toBe(fallback);
    expect(extractErrorMessage({ error: '' }, fallback)).toBe(fallback);
    expect(extractErrorMessage({ error: '   ' }, fallback)).toBe(fallback);
    expect(extractErrorMessage({ error: {} }, fallback)).toBe(fallback);
  });

  it('never returns an object, guaranteeing safe React rendering', () => {
    const maliciousCases = [
      { error: { code: 'ERR', message: {} } },
      { error: { message: null } },
      { error: 123 },
      { error: true },
      { message: [] },
      { code: {} },
    ];

    for (const testCase of maliciousCases) {
      const result = extractErrorMessage(testCase, fallback);
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    }
  });
});

