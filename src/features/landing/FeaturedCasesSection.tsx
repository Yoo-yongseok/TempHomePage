import { useId, useState, type KeyboardEvent } from 'react'
import { ButtonLink } from '../../components/ui/ButtonLink'
import { Placeholder } from '../../components/ui/Placeholder'
import { CASES as FEATURED, FEATURED_CASES as F } from '../../content/home'
import { Reveal, Section, SectionHead } from './primitives'

function Label({ children }: { children: string }) {
  return <h4 className="text-[15px] font-bold text-ink">{children}</h4>
}

/** #cases — 좌측 사례 탭 + 우측 상세(목표·커리큘럼·교육생 코멘트). 모바일은 탭이 가로 스크롤 */
export function FeaturedCasesSection() {
  const [current, setCurrent] = useState(0)
  const uid = useId()
  const item = FEATURED[current]

  // 방향키로 탭 이동 (WAI-ARIA tabs 패턴)
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const next = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key]
    if (!next) return
    e.preventDefault()
    const i = (current + next + FEATURED.length) % FEATURED.length
    setCurrent(i)
    document.getElementById(`${uid}-tab-${i}`)?.focus()
  }

  return (
    <Section id="cases" tone="white">
      <SectionHead title={F.title} sub={F.sub} />
      <Reveal className="grid gap-5 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-8">
        <div
          role="tablist"
          aria-label={F.tabsLabel}
          aria-orientation="vertical"
          onKeyDown={onKeyDown}
          className="-mx-[clamp(1.25rem,5vw,5rem)] flex gap-2 overflow-x-auto px-[clamp(1.25rem,5vw,5rem)] pb-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0"
        >
          {FEATURED.map((c, i) => {
            const active = i === current
            return (
              <button
                key={c.client}
                id={`${uid}-tab-${i}`}
                role="tab"
                type="button"
                aria-selected={active}
                aria-controls={`${uid}-panel`}
                tabIndex={active ? 0 : -1}
                onClick={() => setCurrent(i)}
                className={`flex shrink-0 cursor-pointer flex-col items-start gap-1 rounded-2xl border px-5 py-4 text-left transition-[background-color,border-color,box-shadow] duration-200 lg:w-full ${
                  active
                    ? 'border-signal bg-white shadow-[0_1px_2px_#1018280a,0_16px_32px_-20px_#2563eb40]'
                    : 'border-transparent bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <span className={`text-[16px] font-bold ${active ? 'text-signal-text' : 'text-ink'}`}>{c.client}</span>
                <span className="text-[14px] leading-snug whitespace-nowrap text-mute lg:whitespace-normal">
                  {c.title}
                </span>
              </button>
            )
          })}
        </div>

        <div
          key={current}
          id={`${uid}-panel`}
          role="tabpanel"
          aria-labelledby={`${uid}-tab-${current}`}
          className="animate-fade-in rounded-[22px] border border-[#eceef2] bg-white p-[clamp(1.25rem,3vw,2.25rem)] shadow-[0_1px_2px_#1018280a,0_16px_32px_-20px_#10182824]"
        >
          <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_220px] md:items-start">
            <div>
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-signal/10 px-2 py-1 text-[12px] font-semibold text-signal-text"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-[15px] font-bold text-signal-text">{item.client}</p>
              <h3 className="mt-1 text-[clamp(1.4rem,2.6vw,1.85rem)] leading-tight font-bold tracking-[-0.02em] text-ink">
                {item.title}
              </h3>
              <p className="mt-3 leading-relaxed text-mute">{item.summary}</p>
              {item.meta && (
                <p className="mt-4 inline-flex gap-2 rounded-lg bg-gray-50 px-3 py-2 text-[14px]">
                  <span className="font-semibold text-mute">{F.labels.format}</span>
                  <span className="font-semibold text-ink">{item.meta}</span>
                </p>
              )}
            </div>
            <div className="hidden aspect-[4/3] overflow-hidden rounded-2xl md:block">
              <Placeholder tone={item.tone} label="교육 현장 사진" compact />
            </div>
          </div>

          <div className="mt-8 grid gap-6 border-t border-rule pt-7 md:grid-cols-2">
            <div>
              <Label>{F.labels.goals}</Label>
              <ul className="mt-3 flex flex-col gap-2">
                {item.goals.map((g) => (
                  <li key={g} className="flex items-start gap-2 text-[15px] leading-relaxed text-gray-700">
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden
                      className="mt-1 size-4 shrink-0 text-signal"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.6"
                    >
                      <path d="m5 12.5 4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {g}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Label>{F.labels.curriculum}</Label>
              <ol className="mt-3 flex flex-col divide-y divide-rule rounded-xl border border-rule">
                {item.curriculum.map((c, i) => (
                  <li key={c} className="flex items-center gap-3 px-4 py-3 text-[15px] text-ink">
                    <span className="text-[13px] font-bold text-signal-text tabular-nums">{i + 1}</span>
                    {c}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {item.comments && (
            <div className="mt-8">
              <Label>{F.labels.comments}</Label>
              <ul className="mt-3 grid gap-2.5 md:grid-cols-3">
                {item.comments.map((c) => (
                  <li key={c} className="rounded-xl bg-gray-50 px-4 py-3.5 text-[14.5px] leading-relaxed text-gray-700">
                    “{c}”
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Reveal>
      <div className="mt-[clamp(1.5rem,3vh,2.5rem)] flex justify-center">
        <ButtonLink to={F.more.to} variant="outlineInk" size="box">
          {F.more.label}
        </ButtonLink>
      </div>
    </Section>
  )
}
