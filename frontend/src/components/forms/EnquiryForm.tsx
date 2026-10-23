'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react';
import {
  buildingTypeOptions,
  contactPage,
  enquiryFieldLabels,
  enquiryLimits,
  enquiryServiceOptions,
  projectStageOptions,
  site,
  type EnquiryService,
  type Option,
} from '@aloft/content';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/cn';
import { publicApiUrl } from '@/lib/env';
import { toPayload, validateEnquiry, type EnquiryFormValues, type FieldErrors } from '@/lib/enquiry-validation';

type Status =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'success'; reference: string }
  | { kind: 'error'; message: string };

const empty: EnquiryFormValues = {
  fullName: '',
  companyName: '',
  email: '',
  phone: '',
  projectLocation: '',
  service: '',
  buildingType: '',
  approxArea: '',
  projectStage: '',
  message: '',
};

interface EnquiryFormProps {
  /** Pre-selects the service (e.g. on a service page). `?service=` in the URL overrides it. */
  defaultService?: EnquiryService;
  submitLabel?: string;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function EnquiryForm({ defaultService, submitLabel = contactPage.submit }: EnquiryFormProps) {
  const pathname = usePathname();
  const formId = useId();
  const [values, setValues] = useState<EnquiryFormValues>({ ...empty, service: defaultService ?? '' });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const startedAt = useRef<number>(0);
  const honeypot = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
    // Read ?service= on the client so the page itself stays statically rendered.
    const fromUrl = new URLSearchParams(window.location.search).get('service');
    if (fromUrl && enquiryServiceOptions.some((o) => o.value === fromUrl)) {
      setValues((v) => ({ ...v, service: fromUrl }));
    }
  }, []);

  useEffect(() => {
    if (status.kind === 'success' || status.kind === 'error') statusRef.current?.focus();
  }, [status.kind]);

  const set = (field: keyof EnquiryFormValues) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateEnquiry(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0];
      document.getElementById(`${formId}-${first}`)?.focus();
      return;
    }

    setStatus({ kind: 'submitting' });
    try {
      const res = await fetch(`${publicApiUrl}/api/v1/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(
          toPayload(values, {
            sourcePath: pathname,
            website: honeypot.current?.value ?? '',
            startedAt: startedAt.current,
          }),
        ),
        signal: AbortSignal.timeout(15000),
      });
      const body = await res.json().catch(() => null);

      if (res.status === 201) {
        setStatus({ kind: 'success', reference: body?.data?.id ?? '' });
        window.gtag?.('event', 'generate_lead', { form: 'enquiry', service: values.service });
        return;
      }
      if (res.status === 400 && Array.isArray(body?.details)) {
        const serverErrors: FieldErrors = {};
        for (const d of body.details as { field: keyof EnquiryFormValues; messages: string[] }[]) {
          serverErrors[d.field] = d.messages[0];
        }
        setErrors(serverErrors);
        setStatus({ kind: 'error', message: 'Please check the highlighted fields.' });
        return;
      }
      if (res.status === 429) {
        setStatus({ kind: 'error', message: 'Too many enquiries were sent from this connection. Please wait a few minutes, or contact us directly.' });
        return;
      }
      setStatus({ kind: 'error', message: body?.message ?? 'Your enquiry could not be sent.' });
    } catch {
      setStatus({ kind: 'error', message: 'Your enquiry could not be sent because of a connection problem.' });
    }
  }

  if (status.kind === 'success') {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="flex flex-col items-start gap-5 py-6 outline-none">
        <span className="grid size-14 place-items-center rounded-full bg-ice text-supply">
          <Icon name="check-circle" size={30} />
        </span>
        <h3 className="type-title">Enquiry received</h3>
        <p className="type-body">{contactPage.confirmation}</p>
        {status.reference && (
          <p className="type-label text-muted">
            Reference: <span className="normal-case tracking-normal">{status.reference.slice(0, 8).toUpperCase()}</span>
          </p>
        )}
      </div>
    );
  }

  const field = (name: keyof EnquiryFormValues) => ({
    id: `${formId}-${name}`,
    name,
    value: values[name],
    onChange: set(name),
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${formId}-${name}-error` : undefined,
  });

  return (
    <form onSubmit={onSubmit} noValidate aria-describedby={`${formId}-note`} className="relative grid gap-x-4 gap-y-5 sm:grid-cols-2">
      <Field label={enquiryFieldLabels.fullName} htmlFor={`${formId}-fullName`} error={errors.fullName} errorId={`${formId}-fullName-error`} required>
        <input {...field('fullName')} type="text" autoComplete="name" maxLength={enquiryLimits.fullName.max} required className={inputClass(errors.fullName)} />
      </Field>
      <Field label={enquiryFieldLabels.companyName} htmlFor={`${formId}-companyName`} error={errors.companyName} errorId={`${formId}-companyName-error`}>
        <input {...field('companyName')} type="text" autoComplete="organization" maxLength={enquiryLimits.companyName.max} className={inputClass(errors.companyName)} />
      </Field>
      <Field label={enquiryFieldLabels.email} htmlFor={`${formId}-email`} error={errors.email} errorId={`${formId}-email-error`} required>
        <input {...field('email')} type="email" autoComplete="email" inputMode="email" maxLength={enquiryLimits.email.max} required className={inputClass(errors.email)} />
      </Field>
      <Field label={enquiryFieldLabels.phone} htmlFor={`${formId}-phone`} error={errors.phone} errorId={`${formId}-phone-error`} required>
        <input {...field('phone')} type="tel" autoComplete="tel" inputMode="tel" maxLength={enquiryLimits.phone.max} required className={inputClass(errors.phone)} />
      </Field>
      <Field label={enquiryFieldLabels.projectLocation} htmlFor={`${formId}-projectLocation`} error={errors.projectLocation} errorId={`${formId}-projectLocation-error`} required>
        <input {...field('projectLocation')} type="text" autoComplete="address-level2" maxLength={enquiryLimits.projectLocation.max} required className={inputClass(errors.projectLocation)} />
      </Field>
      <Field label={enquiryFieldLabels.service} htmlFor={`${formId}-service`} error={errors.service} errorId={`${formId}-service-error`} required>
        <Select {...field('service')} options={enquiryServiceOptions} error={errors.service} />
      </Field>
      <Field label={enquiryFieldLabels.buildingType} htmlFor={`${formId}-buildingType`} error={errors.buildingType} errorId={`${formId}-buildingType-error`} required>
        <Select {...field('buildingType')} options={buildingTypeOptions} error={errors.buildingType} />
      </Field>
      <Field label={enquiryFieldLabels.approxArea} htmlFor={`${formId}-approxArea`} error={errors.approxArea} errorId={`${formId}-approxArea-error`} hint="Optional, e.g. 18,000 sq ft">
        <input {...field('approxArea')} type="text" maxLength={enquiryLimits.approxArea.max} className={inputClass(errors.approxArea)} />
      </Field>
      <Field label={enquiryFieldLabels.projectStage} htmlFor={`${formId}-projectStage`} error={errors.projectStage} errorId={`${formId}-projectStage-error`} required className="sm:col-span-2">
        <Select {...field('projectStage')} options={projectStageOptions} error={errors.projectStage} />
      </Field>
      <Field label={enquiryFieldLabels.message} htmlFor={`${formId}-message`} error={errors.message} errorId={`${formId}-message-error`} required className="sm:col-span-2">
        <textarea {...field('message')} rows={5} maxLength={enquiryLimits.message.max} required className={cn(inputClass(errors.message), 'h-auto min-h-32 py-3')} />
      </Field>

      {/* Honeypot: hidden from people and assistive technology; bots tend to fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${formId}-website`}>Website</label>
        <input ref={honeypot} id={`${formId}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="sm:col-span-2">
        {status.kind === 'error' && (
          <div ref={statusRef} tabIndex={-1} role="alert" className="mb-4 flex gap-3 rounded-xl border border-error/30 bg-error/5 p-4 text-[0.9375rem] text-error outline-none">
            <Icon name="alert" size={20} className="mt-0.5 shrink-0" />
            <p>
              {status.message} You can also call{' '}
              <a className="underline" href={`tel:${site.contact.phoneE164}`}>{site.contact.phoneDisplay}</a> or email{' '}
              <a className="underline" href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
            </p>
          </div>
        )}
        <Button type="submit" variant="primary" fullWidth disabled={status.kind === 'submitting'} aria-busy={status.kind === 'submitting'}>
          {status.kind === 'submitting' ? 'Sending…' : submitLabel}
        </Button>
        <p id={`${formId}-note`} className="mt-3 text-[0.8125rem] text-muted">
          Fields marked * are required. We use your details only to respond to this enquiry —{' '}
          <Link href="/privacy-policy" className="underline hover:text-petrol">privacy policy</Link>.
        </p>
      </div>
    </form>
  );
}

function inputClass(error?: string) {
  return cn(
    'h-11 w-full rounded-lg border bg-paper px-3 text-[0.9375rem] text-petrol transition-colors placeholder:text-muted/70',
    'focus:border-supply focus:bg-white focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-supply/25',
    error ? 'border-error' : 'border-ice',
  );
}

interface FieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  errorId: string;
  required?: boolean;
  hint?: string;
  className?: string;
  children: ReactNode;
}

function Field({ label, htmlFor, error, errorId, required, hint, className, children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-[0.875rem] font-medium">
        {label.replace(' (optional)', '')}
        {required ? <span aria-hidden="true"> *</span> : <span className="font-normal text-muted"> (optional)</span>}
      </label>
      {children}
      {error ? (
        <p id={errorId} className="mt-1.5 text-[0.8125rem] text-error">
          {error}
        </p>
      ) : (
        hint && <p className="mt-1.5 text-[0.8125rem] text-muted">{hint}</p>
      )}
    </div>
  );
}

function Select({
  options,
  error,
  ...props
}: { options: readonly Option[]; error?: string } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select {...props} required className={cn(inputClass(error), 'appearance-none pr-10', !props.value && 'text-muted')}>
        <option value="" disabled>
          Select…
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value} className="text-petrol">
            {o.label}
          </option>
        ))}
      </select>
      <Icon name="chevron" size={18} className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-muted" />
    </div>
  );
}
