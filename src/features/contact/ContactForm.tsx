import { useId, useState, type FormEvent, type ReactNode } from 'react'
import { CONTACT_FORM as F } from '../../content/contact'

// 기획 시연용 — 제출하면 접수 완료 화면만 보여주고 실제 전송은 하지 않는다

const inputClass =
  'w-full rounded-xl border border-rule bg-white px-4 py-3 text-[15px] text-ink placeholder:text-gray-400 transition-[border-color,box-shadow] duration-150 outline-none focus:border-signal focus:shadow-[0_0_0_3px_rgba(37,99,235,0.15)]'

const chipClass =
  'cursor-pointer rounded-full border border-rule bg-white px-3.5 py-2 text-sm font-semibold text-mute transition-colors duration-150 has-checked:border-signal has-checked:bg-signal/10 has-checked:text-signal-text has-focus-visible:shadow-[0_0_0_3px_rgba(37,99,235,0.15)]'

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string
  htmlFor?: string
  required?: boolean
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-sm font-semibold text-ink">
        {label}
        {required && <span className="ml-1 text-signal-text">*</span>}
        {required && <span className="sr-only">({F.required})</span>}
      </label>
      {children}
    </div>
  )
}

export function ContactForm({ className = '' }: { className?: string }) {
  const id = useId()
  const [sent, setSent] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(true)
  }

  if (sent) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-4 rounded-[18px] bg-white p-10 text-center ${className}`}
      >
        <span aria-hidden className="flex size-14 items-center justify-center rounded-full bg-signal/10 text-signal">
          <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="m5 12.5 4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h3 className="text-xl font-bold text-ink" role="status">
          {F.success.title}
        </h3>
        <p className="max-w-[32ch] leading-relaxed text-mute">{F.success.desc}</p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-2 cursor-pointer text-sm font-semibold text-signal-text underline-offset-4 hover:underline"
        >
          {F.success.reset}
        </button>
      </div>
    )
  }

  const f = F.fields
  return (
    <form
      onSubmit={onSubmit}
      className={`flex flex-col gap-5 rounded-[18px] bg-white p-[clamp(1.5rem,3vw,2.25rem)] text-left ${className}`}
    >
      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 text-sm font-semibold text-ink">{f.type}</legend>
        <div className="flex flex-wrap gap-2">
          {F.types.map((t, i) => (
            <label key={t} className={chipClass}>
              <input type="radio" name="type" value={t} defaultChecked={i === 0} className="sr-only" />
              {t}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={f.company.label} htmlFor={`${id}-company`} required>
          <input
            id={`${id}-company`}
            name="company"
            required
            placeholder={f.company.placeholder}
            className={inputClass}
          />
        </Field>
        <Field label={f.name.label} htmlFor={`${id}-name`} required>
          <input id={`${id}-name`} name="name" required placeholder={f.name.placeholder} className={inputClass} />
        </Field>
        <Field label={f.position.label} htmlFor={`${id}-position`}>
          <input id={`${id}-position`} name="position" placeholder={f.position.placeholder} className={inputClass} />
        </Field>
        <Field label={f.phone.label} htmlFor={`${id}-phone`} required>
          <input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            required
            placeholder={f.phone.placeholder}
            className={inputClass}
          />
        </Field>
        <Field label={f.email.label} htmlFor={`${id}-email`} required>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            required
            placeholder={f.email.placeholder}
            className={inputClass}
          />
        </Field>
        <Field label={f.headcount.label} htmlFor={`${id}-headcount`}>
          <select id={`${id}-headcount`} name="headcount" defaultValue="" className={`${inputClass} cursor-pointer`}>
            <option value="" disabled>
              {f.headcount.placeholder}
            </option>
            {F.headcounts.map((h) => (
              <option key={h}>{h}</option>
            ))}
          </select>
        </Field>
      </div>

      <fieldset>
        <legend className="mb-2 text-sm font-semibold text-ink">{f.interests}</legend>
        <div className="flex flex-wrap gap-2">
          {F.interests.map((t) => (
            <label key={t} className={chipClass}>
              <input type="checkbox" name="interests" value={t} className="sr-only" />
              {t}
            </label>
          ))}
        </div>
      </fieldset>

      <Field label={f.message.label} htmlFor={`${id}-message`}>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={4}
          placeholder={f.message.placeholder}
          className={`${inputClass} resize-y`}
        />
      </Field>

      <label className="flex cursor-pointer items-center gap-2.5 text-sm text-mute">
        <input type="checkbox" required className="size-4 cursor-pointer accent-signal" />
        {F.consent}
        <span className="text-signal-text">({F.required})</span>
      </label>

      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-mute">{F.note}</p>
        <button
          type="submit"
          className="min-h-11 cursor-pointer rounded-xl border-[1.5px] border-signal bg-signal px-[2.2rem] py-[1.1rem] text-[1.05rem] font-semibold text-white transition-[box-shadow,transform] duration-150 ease-brand hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(37,99,235,0.25)] active:scale-[0.97]"
        >
          {F.submit}
        </button>
      </div>
    </form>
  )
}
