import { Placeholder } from '../../components/ui/Placeholder'
import { COACH } from '../../content/landing/proof'
import { Reveal, Section, Sig } from './primitives'

/** 다크 섹션 — 좌 프로필 사진 카드 / 우 소개 + 이력 칩 (모바일은 세로 배치) */
export function CoachSection() {
  const { name, role, photoLabel, headline, credentials } = COACH
  return (
    <Section id="coach" tone="dark">
      <div className="mx-auto grid max-w-[1080px] items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <Reveal className="mx-auto w-full max-w-[400px] lg:max-w-none">
          {/* isolate: 후광(-z-10)이 섹션 배경 뒤로 숨지 않도록 */}
          <div className="relative isolate">
            <div className="rounded-[30px] bg-white/10 p-px shadow-[0_32px_64px_-32px_rgba(0,0,0,0.6)]">
              <div className="aspect-[4/5] overflow-hidden rounded-[29px]">
                <Placeholder label={photoLabel} palette="dark" tone={4} />
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="flex flex-col items-start">
          <p className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-[clamp(1.5rem,3vw,1.9rem)] leading-none font-bold text-white">{name}</span>
            <span className="text-[14px] font-medium text-white/50">{role}</span>
          </p>
          <h2 className="mt-5 text-[clamp(1.6rem,3.2vw,2.35rem)] leading-[1.3] font-bold tracking-[-0.025em] whitespace-pre-line text-white">
            <span>{headline.before}</span>
            <Sig dark>{headline.highlight}</Sig>
            <span>{headline.after}</span>
          </h2>
          <ul className="mt-10 grid w-full gap-2.5 sm:grid-cols-2">
            {credentials.map((c) => (
              <li
                key={c.text}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3.5 text-[15px] leading-snug text-white/80 sm:last:odd:col-span-2"
              >
                <span
                  aria-hidden
                  className="mt-px flex size-5 shrink-0 items-center justify-center rounded-full bg-signal-light/15 text-signal-light"
                >
                  <svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth={3}>
                    <path d="m5 12.5 4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span>
                  {c.text}
                  {'strong' in c && <strong className="font-bold text-white">{c.strong}</strong>}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  )
}
