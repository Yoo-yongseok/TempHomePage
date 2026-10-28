import { ButtonLink } from '../../components/ui/ButtonLink'
import { MultiLine } from '../../components/ui/MultiLine'
import { COMPANY } from '../../content/site'
import { FINAL_CTA } from '../../content/landing/conversion'
import { ContactForm } from '../contact/ContactForm'
import { Reveal, Section } from './primitives'

/** #contact — 다크 섹션, 좌 마무리 카피 + 연락처 / 우 교육 문의 폼 */
export function FinalCtaSection() {
  return (
    <Section id="contact" tone="dark">
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28">
          <h2 className="text-[clamp(1.9rem,4.2vw,2.8rem)] leading-tight font-bold tracking-[-0.025em] text-balance">
            <MultiLine text={FINAL_CTA.title} desktopOnly />
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/70 md:text-xl">
            <MultiLine text={FINAL_CTA.sub} desktopOnly />
          </p>
          <ButtonLink to={FINAL_CTA.secondary.to} variant="outlineWhite" size="box" className="mt-8">
            {FINAL_CTA.secondary.label}
          </ButtonLink>
          <div className="mt-10 border-t border-white/10 pt-6">
            <p className="text-[15px] font-semibold text-white/85">{FINAL_CTA.stepsLabel}</p>
            <ol className="mt-4 flex flex-col gap-4">
              {FINAL_CTA.steps.map((s, i) => (
                <li key={s.title} className="flex gap-3.5">
                  <span
                    aria-hidden
                    className="flex size-7 shrink-0 items-center justify-center rounded-full border border-white/20 text-[13px] font-bold text-signal-light tabular-nums"
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-white">{s.title}</p>
                    <p className="mt-0.5 text-[14px] leading-relaxed text-white/55">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="mt-8 border-t border-white/10 pt-6 text-[15px] text-white/60">
            <p className="font-semibold text-white/85">{FINAL_CTA.contactLabel}</p>
            <p className="mt-2 tabular-nums">{COMPANY.phone}</p>
            <p>{COMPANY.email}</p>
          </div>
        </Reveal>
        <Reveal>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  )
}
