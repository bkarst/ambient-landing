import 'server-only';
import { createHmac } from 'node:crypto';
import { site } from '@/config/site';

export interface Lead {
  id: string;
  submittedAt: string;
  email: string;
  isFreeEmail: boolean;
  message: string;
  companySize?: string;
  monthlyAiSpend?: string;
  attribution: Partial<Record<'utm_source' | 'utm_medium' | 'utm_campaign' | 'utm_term' | 'utm_content' | 'referrer', string>>;
}

export interface InterestSink {
  deliver(lead: Lead): Promise<void>;
}

function redactEmail(email: string): string {
  const [local, domain] = email.split('@');
  return `${local?.slice(0, 1) ?? ''}***@${domain ?? ''}`;
}

const consoleSink: InterestSink = {
  async deliver(lead) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('INTEREST_SINK=console is for development only. Set webhook or email.');
    }
    console.log('[interest] lead', { ...lead, email: redactEmail(lead.email) });
  },
};

async function withRetries<T>(fn: () => Promise<T>, retries = 2): Promise<T> {
  let lastError: unknown;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt < retries) await new Promise((r) => setTimeout(r, 400 * 2 ** attempt));
    }
  }
  throw lastError;
}

const webhookSink: InterestSink = {
  async deliver(lead) {
    const url = process.env.INTEREST_WEBHOOK_URL;
    const secret = process.env.INTEREST_WEBHOOK_SECRET;
    if (!url || !secret) throw new Error('INTEREST_WEBHOOK_URL and INTEREST_WEBHOOK_SECRET are required for the webhook sink.');
    const body = JSON.stringify(lead);
    const signature = `sha256=${createHmac('sha256', secret).update(body).digest('hex')}`;
    await withRetries(async () => {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Ambiently-Signature': signature },
        body,
        signal: AbortSignal.timeout(5000),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    });
  },
};

/** Transactional email through Resend's HTTP API (provider choice is [Verify] in the spec). */
const emailSink: InterestSink = {
  async deliver(lead) {
    const to = process.env.INTEREST_NOTIFY_EMAIL;
    const key = process.env.RESEND_API_KEY;
    const from = process.env.INTEREST_FROM_EMAIL ?? `${site.name} <no-reply@${new URL(site.url).hostname}>`;
    if (!to || !key) throw new Error('INTEREST_NOTIFY_EMAIL and RESEND_API_KEY are required for the email sink.');
    const lines = [
      `Email: ${lead.email}${lead.isFreeEmail ? ' (free-mail domain)' : ''}`,
      `Company size: ${lead.companySize ?? '—'}`,
      `Monthly AI spend: ${lead.monthlyAiSpend ?? '—'}`,
      '',
      lead.message,
      '',
      `Attribution: ${JSON.stringify(lead.attribution)}`,
      `Lead ${lead.id} at ${lead.submittedAt}`,
    ];
    await withRetries(async () => {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ from, to, reply_to: lead.email, subject: `Access request from ${lead.email}`, text: lines.join('\n') }),
        signal: AbortSignal.timeout(5000),
      });
      if (!res.ok) throw new Error(`Email provider responded ${res.status}`);
    });
  },
};

/** Logs the lead (email redacted) and succeeds in any environment. For CI, e2e runs and staging smoke tests only; never for real leads. */
const logSink: InterestSink = {
  async deliver(lead) {
    console.log('[interest] lead (log sink)', { ...lead, email: redactEmail(lead.email) });
  },
};

export function getSink(): InterestSink {
  const kind = process.env.INTEREST_SINK ?? (process.env.NODE_ENV === 'production' ? 'unset' : 'console');
  switch (kind) {
    case 'webhook':
      return webhookSink;
    case 'email':
      return emailSink;
    case 'console':
      return consoleSink;
    case 'log':
      return logSink;
    default:
      return {
        async deliver() {
          throw new Error('INTEREST_SINK is not configured (webhook | email).');
        },
      };
  }
}
