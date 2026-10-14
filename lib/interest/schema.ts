import { z } from 'zod';

export const companySizes = ['1-19', '20-49', '50-199', '200-499', '500-999', '1000-4999', '5000+'] as const;
export const monthlyAiSpends = ['under-1k', '1k-5k', '5k-25k', '25k-100k', '100k-500k', '500k+', 'not-sure'] as const;

import { MESSAGE_MAX, MESSAGE_MIN } from './validate-client';

export { MESSAGE_MAX, MESSAGE_MIN };

const optionalEnum = <T extends readonly [string, ...string[]]>(values: T) =>
  z.preprocess((v) => (v === '' || v == null ? undefined : v), z.enum(values).optional());

const shortText = z.preprocess((v) => (typeof v === 'string' && v.length ? v.slice(0, 200) : undefined), z.string().max(200).optional());

export const interestSchema = z.object({
  email: z.email({ error: 'invalid' }).max(254, { error: 'invalid' }),
  message: z
    .string({ error: 'missing' })
    .trim()
    .min(MESSAGE_MIN, { error: 'short' })
    .max(MESSAGE_MAX, { error: 'long' }),
  companySize: optionalEnum(companySizes),
  monthlyAiSpend: optionalEnum(monthlyAiSpends),
  // bot traps and attribution; never shown to people. The honeypot is checked before parsing.
  website: z.string().optional(),
  startedAt: z.string().optional(),
  utm_source: shortText,
  utm_medium: shortText,
  utm_campaign: shortText,
  utm_term: shortText,
  utm_content: shortText,
  referrer: shortText,
});

export type InterestInput = z.infer<typeof interestSchema>;

export type FieldErrorCode = 'missing' | 'invalid' | 'short' | 'long';
export type FieldErrors = Partial<Record<'email' | 'message', FieldErrorCode>>;

export type InterestState =
  | { status: 'idle' }
  | { status: 'invalid'; fieldErrors: FieldErrors }
  | { status: 'rate-limited' }
  | { status: 'error' }
  | { status: 'success'; email: string };

/** Maps Zod issues to the small set of error codes the UI knows how to say. */
export function fieldErrorsFromIssues(issues: z.core.$ZodIssue[]): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of issues) {
    const field = issue.path[0];
    if (field !== 'email' && field !== 'message') continue;
    if (out[field]) continue;
    out[field] = codeFor(field, issue);
  }
  return out;
}

function codeFor(field: 'email' | 'message', issue: z.core.$ZodIssue): FieldErrorCode {
  const msg = issue.message as FieldErrorCode | string;
  if (msg === 'missing' || msg === 'invalid' || msg === 'short' || msg === 'long') {
    if (field === 'email' && issue.code === 'invalid_type') return 'missing';
    return msg;
  }
  if (issue.code === 'invalid_type') return 'missing';
  if (issue.code === 'too_small') return field === 'email' ? 'missing' : 'short';
  if (issue.code === 'too_big') return field === 'email' ? 'invalid' : 'long';
  return 'invalid';
}
