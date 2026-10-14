'use client';

import { useActionState, useEffect, useId, useRef, useState, useSyncExternalStore } from 'react';
import { submitInterest } from '@/app/actions/interest';
import { landing } from '@/content/landing';
import { site } from '@/config/site';
import { Button } from '@/components/ds/Button';
import { Icon } from '@/components/ds/Icon';
import { Select } from '@/components/ds/Select';
import type { FieldErrorCode, FieldErrors, InterestState } from '@/lib/interest/schema';
import { validateClient } from '@/lib/interest/validate-client';
import { track } from '@/lib/analytics';

const copy = landing.form;
const subscribeNoop = () => () => {};
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;

function messageFor(field: 'email' | 'message', code: FieldErrorCode): string {
  if (field === 'email') return code === 'missing' ? copy.errors.emailMissing : copy.errors.emailInvalid;
  if (code === 'missing') return copy.errors.messageMissing;
  if (code === 'short') return copy.errors.messageShort;
  if (code === 'long') return copy.errors.messageLong;
  return copy.errors.messageMissing;
}

export function InterestForm() {
  const [state, formAction, pending] = useActionState<InterestState, FormData>(submitInterest, { status: 'idle' });
  const [clientErrors, setClientErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<{ email?: boolean; message?: boolean }>({});
  const [messageLength, setMessageLength] = useState(0);
  const attributionRef = useRef<HTMLDivElement>(null);
  const startedAt = useRef<HTMLInputElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const id = useId();
  // true once React has hydrated, so native validation stays the no-JS fallback
  const hydrated = useSyncExternalStore(subscribeNoop, () => true, () => false);

  // Attribution is filled straight into the hidden inputs, so the static HTML carries no values.
  useEffect(() => {
    const box = attributionRef.current;
    if (!box) return;
    try {
      const params = new URLSearchParams(window.location.search);
      for (const key of UTM_KEYS) {
        const v = params.get(key);
        const input = box.querySelector<HTMLInputElement>(`input[name="${key}"]`);
        if (v && input) input.value = v.slice(0, 200);
      }
      const ref = box.querySelector<HTMLInputElement>('input[name="referrer"]');
      if (ref && document.referrer) ref.value = document.referrer.slice(0, 200);
    } catch {
      /* attribution is optional */
    }
  }, []);

  // Server errors win over client ones; both use the same codes.
  const errors: FieldErrors = state.status === 'invalid' ? { ...clientErrors, ...state.fieldErrors } : clientErrors;
  const hasErrors = Boolean(errors.email || errors.message);

  useEffect(() => {
    if (state.status === 'success') {
      successRef.current?.focus();
      track({ name: 'form_success' });
    } else if (state.status === 'invalid' || state.status === 'error' || state.status === 'rate-limited') {
      summaryRef.current?.focus();
      track({ name: 'form_error', kind: state.status });
    }
  }, [state]);

  if (state.status === 'success') {
    return (
      <div className="amb-card form-success" aria-live="polite">
        <h3 ref={successRef} tabIndex={-1} className="title-2" style={{ margin: 0 }}>
          {copy.success.heading}
        </h3>
        <p className="body-large text-ink-secondary" style={{ margin: '12px 0 0' }}>
          {copy.success.body} {state.email}.
        </p>
      </div>
    );
  }

  const onFirstFocus = () => {
    if (startedAt.current && !startedAt.current.value) {
      startedAt.current.value = String(Date.now());
      track({ name: 'form_start' });
    }
  };

  const validateField = (field: 'email' | 'message', form: HTMLFormElement | null) => {
    if (!form) return;
    const values = {
      email: (form.elements.namedItem('email') as HTMLInputElement | null)?.value ?? '',
      message: (form.elements.namedItem('message') as HTMLTextAreaElement | null)?.value ?? '',
    };
    const next = validateClient(values);
    setClientErrors((prev) => ({ ...prev, [field]: next[field] }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    const values = {
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };
    const next = validateClient(values);
    setTouched({ email: true, message: true });
    setClientErrors(next);
    if (next.email || next.message) {
      e.preventDefault();
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    track({ name: 'form_submit' });
  };

  const emailError = touched.email || state.status === 'invalid' ? errors.email : undefined;
  const messageError = touched.message || state.status === 'invalid' ? errors.message : undefined;
  const showSummary = (hasErrors && (touched.email || touched.message)) || state.status === 'error' || state.status === 'rate-limited';

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={onSubmit}
      noValidate={hydrated}
      aria-busy={pending || undefined}
      className="amb-card"
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}
    >
      {showSummary && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="field-error" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
          {state.status === 'error' && <span>{copy.errors.server}</span>}
          {state.status === 'rate-limited' && <span>{copy.errors.rateLimited}</span>}
          {hasErrors && (
            <>
              <span>{copy.errors.summary}</span>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {errors.email && (
                  <li>
                    <a href={`#${id}-email`}>{messageFor('email', errors.email)}</a>
                  </li>
                )}
                {errors.message && (
                  <li>
                    <a href={`#${id}-message`}>{messageFor('message', errors.message)}</a>
                  </li>
                )}
              </ul>
            </>
          )}
        </div>
      )}

      <div className="field">
        <label htmlFor={`${id}-email`}>{copy.fields.email.label}</label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          className="input"
          autoComplete="email"
          inputMode="email"
          required
          maxLength={254}
          placeholder={copy.fields.email.placeholder}
          aria-invalid={emailError ? 'true' : undefined}
          aria-describedby={emailError ? `${id}-email-error` : undefined}
          onFocus={onFirstFocus}
          onBlur={(e) => {
            setTouched((t) => ({ ...t, email: true }));
            validateField('email', e.currentTarget.form);
          }}
        />
        {emailError && (
          <span id={`${id}-email-error`} className="field-error">
            <Icon name="info" size={16} />
            {messageFor('email', emailError)}
          </span>
        )}
      </div>

      <div className="field">
        <label htmlFor={`${id}-message`}>{copy.fields.message.label}</label>
        <textarea
          id={`${id}-message`}
          name="message"
          className="input"
          rows={4}
          required
          minLength={10}
          maxLength={copy.fields.message.max}
          spellCheck
          placeholder={copy.fields.message.placeholder}
          aria-invalid={messageError ? 'true' : undefined}
          aria-describedby={`${id}-message-hint${messageError ? ` ${id}-message-error` : ''}`}
          onFocus={onFirstFocus}
          onChange={(e) => setMessageLength(e.currentTarget.value.length)}
          onBlur={(e) => {
            setTouched((t) => ({ ...t, message: true }));
            validateField('message', e.currentTarget.form);
          }}
        />
        <span id={`${id}-message-hint`} className="caption text-ink-muted" style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
          <span>{copy.fields.message.hint}</span>
          {messageLength >= copy.fields.message.countAfter && (
            <span aria-live="polite" style={{ fontVariantNumeric: 'tabular-nums' }}>
              {messageLength} / {copy.fields.message.max}
            </span>
          )}
        </span>
        {messageError && (
          <span id={`${id}-message-error`} className="field-error">
            <Icon name="info" size={16} />
            {messageFor('message', messageError)}
          </span>
        )}
      </div>

      <div className="form-row">
        <div className="field">
          <label htmlFor={`${id}-size`}>
            {copy.fields.companySize.label} <span className="optional">{copy.fields.companySize.optional}</span>
          </label>
          <Select
            id={`${id}-size`}
            name="companySize"
            className="is-lg"
            label={copy.fields.companySize.label}
            defaultValue=""
            onFocus={onFirstFocus}
            options={[{ value: '', label: copy.fields.companySize.placeholder }, ...copy.fields.companySize.options]}
          />
        </div>
        <div className="field">
          <label htmlFor={`${id}-spend`}>
            {copy.fields.monthlyAiSpend.label} <span className="optional">{copy.fields.monthlyAiSpend.optional}</span>
          </label>
          <Select
            id={`${id}-spend`}
            name="monthlyAiSpend"
            className="is-lg"
            label={copy.fields.monthlyAiSpend.label}
            defaultValue=""
            enterKeyHint="send"
            onFocus={onFirstFocus}
            options={[{ value: '', label: copy.fields.monthlyAiSpend.placeholder }, ...copy.fields.monthlyAiSpend.options]}
          />
        </div>
      </div>

      {/* bot trap: visually hidden, never focusable */}
      <div className="honeypot" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input ref={startedAt} type="hidden" name="startedAt" defaultValue="" />
      <div ref={attributionRef} hidden>
        {[...UTM_KEYS, 'referrer'].map((k) => (
          <input key={k} type="hidden" name={k} defaultValue="" />
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <Button type="submit" variant="primary" size="lg" aria-disabled={pending || undefined} style={{ alignSelf: 'flex-start' }}>
          {pending ? copy.submitting : copy.submit}
        </Button>
        <p className="caption text-ink-muted" style={{ margin: 0 }}>
          {copy.privacyNote}{' '}
          <a href={site.legal.privacyHref} className="inline-link" style={{ color: 'var(--ink-secondary)' }}>
            {copy.privacyLink}
          </a>
        </p>
      </div>
    </form>
  );
}
