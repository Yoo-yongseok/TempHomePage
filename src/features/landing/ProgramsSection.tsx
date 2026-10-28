import { ButtonLink } from '../../components/ui/ButtonLink'
import { CTA, PROGRAMS } from '../../content/landing/groupD'
import { Reveal, Section, SectionHead, cardClass } from './primitives'

const Check = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden
    className="mt-1 size-3.5 shrink-0 text-signal"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
)

/** #programs — 교육 프로그램 3종 (대상·형태·대표 커리큘럼) + 맞춤 견적 안내 */
export function ProgramsSection() {
  const { title, sub, labels, items, quote, note } = PROGRAMS
  return (
    <Section id="programs" tone="white">
      <SectionHead title={title} sub={sub} />
      <Reveal stagger className="grid gap-5 md:grid-cols-3 md:gap-6">
        {items.map((p) => (
          <article
            key={p.name}
            className={`${cardClass} relative flex flex-col ${p.featured ? 'border-signal! shadow-[0_1px_2px_#1018280a,0_22px_40px_-22px_#2563eb38]!' : ''}`}
          >
            {/* 카드 상단 테두리에 걸쳐 두어 세 카드의 행 정렬을 유지 */}
            {p.featured && (
              <span className="absolute -top-3 left-[clamp(1.5rem,2.8vw,2rem)] rounded-full bg-signal px-3 py-1 text-xs font-semibold text-white">
                {labels.featured}
              </span>
            )}
            <h3 className="text-[1.35rem] font-bold tracking-[-0.02em] text-ink">{p.name}</h3>
            <p className="mt-2 leading-relaxed text-mute">{p.desc}</p>

            <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 border-y border-rule py-4 text-[15px]">
              <dt className="font-semibold text-mute">{labels.target}</dt>
              <dd className="font-semibold text-ink">{p.target}</dd>
              <dt className="font-semibold text-mute">{labels.format}</dt>
              <dd className="font-semibold text-ink">{p.format}</dd>
            </dl>

            <p className="mt-4 text-sm font-semibold text-mute">{labels.topics}</p>
            <ul className="mt-2 flex flex-col gap-1.5">
              {p.topics.map((t) => (
                <li key={t} className="flex items-start gap-2 text-[15px] text-ink">
                  <Check />
                  {t}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </Reveal>

      <Reveal className="mt-[clamp(2rem,5vh,3rem)] flex flex-col items-center text-center">
        <p className="text-lg font-semibold text-ink">{quote}</p>
        <ButtonLink to={CTA.to} variant="signal" size="boxLg" className="mt-5">
          {CTA.label}
        </ButtonLink>
        <p className="mt-3 text-xs text-mute">{note}</p>
      </Reveal>
    </Section>
  )
}
