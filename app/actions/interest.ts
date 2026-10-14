'use server';

import { headers } from 'next/headers';
import { fieldErrorsFromIssues, interestSchema, type InterestState } from '@/lib/interest/schema';
import { isFreeEmail } from '@/lib/interest/free-email-domains';
import { allowSubmission } from '@/lib/interest/rate-limit';
import { getSink, type Lead } from '@/lib/interest/sink';

const MIN_FILL_MS = 2000;

export async function submitInterest(_prev: InterestState, formData: FormData): Promise<InterestState> {
  const raw = Object.fromEntries(Array.from(formData.entries()).filter(([k]) => !k.startsWith('$ACTION')));

  // A filled honeypot means a bot. Return a fake success before validating so it learns nothing.
  if (typeof raw.website === 'string' && raw.website.length > 0) {
    return { status: 'success', email: typeof raw.email === 'string' ? raw.email.slice(0, 254) : '' };
  }
  const parsed = interestSchema.safeParse(raw);

  // Field errors come back first so a person sees them even when a trap would have tripped.
  if (!parsed.success) {
    const fieldErrors = fieldErrorsFromIssues(parsed.error.issues);
    if (fieldErrors.email || fieldErrors.message) return { status: 'invalid', fieldErrors };
  }
  const data = parsed.success ? parsed.data : null;
  if (!data) return { status: 'invalid', fieldErrors: { message: 'invalid' } };

  // The time trap also returns a fake success.
  const fakeSuccess: InterestState = { status: 'success', email: data.email };
  if (data.startedAt) {
    const started = Number(data.startedAt);
    if (Number.isFinite(started) && Date.now() - started < MIN_FILL_MS) return fakeSuccess;
  }

  const h = await headers();
  const ip = (h.get('x-forwarded-for') ?? '').split(',')[0]?.trim() || h.get('x-real-ip') || 'unknown';
  if (!(await allowSubmission(ip))) return { status: 'rate-limited' };

  const lead: Lead = {
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
    email: data.email,
    isFreeEmail: isFreeEmail(data.email),
    message: data.message,
    ...(data.companySize ? { companySize: data.companySize } : {}),
    ...(data.monthlyAiSpend ? { monthlyAiSpend: data.monthlyAiSpend } : {}),
    attribution: Object.fromEntries(
      (['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'referrer'] as const)
        .map((k) => [k, data[k]] as const)
        .filter((entry): entry is readonly [typeof entry[0], string] => typeof entry[1] === 'string' && entry[1].length > 0),
    ),
  };

  try {
    await getSink().deliver(lead);
  } catch (err) {
    console.error('[interest] delivery failed', err);
    return { status: 'error' };
  }
  return { status: 'success', email: data.email };
}
