// Stub import.meta.env for Node/Vitest environment
// whatsapp.ts and social.ts access import.meta.env at module scope
if (typeof (globalThis as Record<string, unknown>)['import'] === 'undefined') {
  Object.defineProperty(globalThis, 'import', {
    value: { meta: { env: {} } },
    writable: true,
    configurable: true,
  });
}
