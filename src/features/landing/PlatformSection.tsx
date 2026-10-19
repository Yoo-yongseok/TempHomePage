import { PLATFORM } from '../../content/landing/groupB'
import { Placeholder } from '../../components/ui/Placeholder'
import { Reveal, Section, SectionHead } from './primitives'

/** #governance UI — 3단계 세로 타임라인 + 앱 스크린샷 */
export function PlatformSection() {
  const last = PLATFORM.steps.length - 1
  return (
    <Section id="platform" tone="white">
      <SectionHead title={PLATFORM.title} />
      <div className="mx-auto grid max-w-[1080px] items-center gap-10 md:grid-cols-2">
        <Reveal as="ol" stagger>
          {PLATFORM.steps.map((step, i) => (
            <li key={step.title} className="relative flex gap-5 pb-9 last:pb-0">
              {i < last && <span aria-hidden className="absolute top-12 bottom-0 left-[23px] w-px bg-rule" />}
              <div className="relative z-[1] flex size-12 shrink-0 items-center justify-center rounded-full bg-signal text-base font-bold text-white tabular-nums shadow-[0_6px_16px_-6px_rgba(37,99,235,0.6)]">
                {i + 1}
              </div>
              <div className="pt-1.5">
                <h3 className="text-xl leading-snug font-bold">{step.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-mute">{step.desc}</p>
              </div>
            </li>
          ))}
        </Reveal>
        <Reveal>
          <div className="aspect-[1276/794] w-full overflow-hidden rounded-2xl border border-rule shadow-[0_24px_60px_-30px_rgba(16,24,40,0.35)]">
            <Placeholder label={PLATFORM.image} tone={0} />
          </div>
          <div className="mx-auto mt-5 flex max-w-fit flex-wrap items-center justify-center gap-x-2.5 gap-y-1 rounded-full border border-signal/20 bg-signal/[0.06] px-4 py-2">
            <span className="text-[13px] font-bold text-signal-text tabular-nums sm:text-base">
              {PLATFORM.chipName}
            </span>
            <span className="text-[13px] whitespace-nowrap text-mute sm:text-base">{PLATFORM.chipText}</span>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
