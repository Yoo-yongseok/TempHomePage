import { ButtonLink } from '../../components/ui/ButtonLink'
import { CTA, FINAL_CTA } from '../../content/landing/groupD'
import { Reveal, Section } from './primitives'

export function FinalCtaSection() {
  return (
    <Section id="final-cta" tone="dark">
      <Reveal className="mx-auto max-w-[720px] text-center">
        <h2 className="text-[clamp(1.9rem,4.5vw,3rem)] leading-tight font-bold tracking-[-0.025em] text-balance">
          {FINAL_CTA.title}
        </h2>
        <p className="mt-5 text-xl leading-relaxed font-bold text-white/85 md:text-2xl">{FINAL_CTA.sub}</p>
        <div className="mt-[clamp(1.5rem,3vh,2.5rem)] flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink to={CTA.to} variant="signal" size="boxLg">
            {CTA.label}
          </ButtonLink>
          <ButtonLink to={FINAL_CTA.secondary.to} variant="outlineWhite" size="boxLg">
            {FINAL_CTA.secondary.label}
          </ButtonLink>
        </div>
      </Reveal>
    </Section>
  )
}
