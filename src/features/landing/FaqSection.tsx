import { FAQ } from '../../content/landing/conversion'
import { Reveal, Section, SectionHead } from './primitives'

export function FaqSection() {
  return (
    <Section id="faq" tone="white">
      <SectionHead title={FAQ.title} />
      <Reveal className="mx-auto max-w-[760px] border-y border-rule">
        {FAQ.items.map((item) => (
          <details key={item.q} className="group border-b border-rule py-5 last:border-b-0">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
              {item.q}
              <span
                aria-hidden
                className="shrink-0 text-2xl leading-none text-signal transition-transform group-open:rotate-45 motion-reduce:transition-none"
              >
                +
              </span>
            </summary>
            <p className="mt-3 leading-relaxed whitespace-pre-line text-mute">{item.a}</p>
          </details>
        ))}
      </Reveal>
    </Section>
  )
}
