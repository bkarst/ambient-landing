/**
 * Client-side validation for the interest form. Hand-written so the client bundle carries no schema
 * library (zod's JIT probe trips the page's CSP). The server re-validates everything with zod (schema.ts).
 */
import type { FieldErrors } from './schema';

export const MESSAGE_MIN = 10;
export const MESSAGE_MAX = 1000;
export const EMAIL_MAX = 254;

// The same shape zod's z.email() accepts by default: a practical address, not the full RFC grammar.
const EMAIL = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9-]*\.)+[A-Za-z]{2,}$/;

export function validateClient(values: { email: string; message: string }): FieldErrors {
  const errors: FieldErrors = {};
  const email = values.email.trim();
  if (!email) errors.email = 'missing';
  else if (email.length > EMAIL_MAX || !EMAIL.test(email)) errors.email = 'invalid';
  const message = values.message.trim();
  if (!message) errors.message = 'missing';
  else if (message.length < MESSAGE_MIN) errors.message = 'short';
  else if (message.length > MESSAGE_MAX) errors.message = 'long';
  return errors;
}
