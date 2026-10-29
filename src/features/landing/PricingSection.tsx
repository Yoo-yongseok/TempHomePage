import { ButtonLink } from '../../components/ui/ButtonLink'
import { CTA, PRICING } from '../../content/landing/groupD'
import { Reveal, Section, SectionHead, cardClass } from './primitives'

export function PricingSection() {
  return (
    <Section id="pricing" tone="white">
      <SectionHead title={PRICING.title} sub={PRICING.sub} />
      <Reveal className="mx-auto max-w-[480px]">
        <div className={`${cardClass} text-center`}>
          {PRICING.original && <div className="text-mute tabular-nums line-through">{PRICING.original}</div>}
          <div className="text-[clamp(2.2rem,6vw,3rem)] leading-none font-bold text-signal-text">
            {PRICING.price}
            {PRICING.vatNote && <span className="ml-1.5 text-base font-semibold text-mute">{PRICING.vatNote}</span>}
          </div>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-1.5">
            <span className="rounded-full bg-signal/10 px-3 py-1 text-xs font-semibold text-signal-text">
              {PRICING.discount}
            </span>
          </div>
          <div className="mt-4 text-sm font-semibold text-ink">{PRICING.finalPrice}</div>
          <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-signal/10 px-3.5 py-1.5 text-sm font-semibold text-signal-text">
            <svg
              viewBox="0 0 24 24"
              aria-hidden
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m5 12 4.5 4.5L19 7" />
            </svg>
            {PRICING.benefit}
          </div>
          <div className="mt-[clamp(1.5rem,3vh,2.5rem)] flex flex-col items-center">
            <ButtonLink to={CTA.to} variant="signal" size="boxLg">
              {CTA.label}
            </ButtonLink>
            <p className="mt-3 text-xs text-mute">{PRICING.note}</p>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
