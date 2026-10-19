import { useId, useState, type KeyboardEvent, type ReactNode } from 'react'
import { CURRICULUM, type CurriWeek, type DemoKind } from '../../content/landing/groupB'
import { useReveal } from '../../lib/useReveal'
import { Reveal, Section, SectionHead } from './primitives'
import { BrowserFrame } from './mocks/BrowserFrame'
import { InterviewScreen } from './mocks/InterviewScreen'
import { ReportScreen } from './mocks/ReportScreen'
import { ResumeScreen } from './mocks/ResumeScreen'
import './groupB.css'

const WEEKS = CURRICULUM.weeks
// 패널이 있는 주차만 탭으로 노출 (취업 후 카드는 클릭 불가)
const TAB_WEEKS = WEEKS.filter((w): w is CurriWeek & { panel: NonNullable<CurriWeek['panel']> } => !!w.panel)
const LAST = WEEKS.length - 1

const SCREENS: Record<DemoKind, () => ReactNode> = {
  report: () => <ReportScreen />,
  resume: () => <ResumeScreen />,
  interview: () => <InterviewScreen />,
}

/** 진행 트랙 세그먼트 색 — 지난 주차는 옅게, 선택 주차는 signal, 마지막(취업 후)은 ink */
function segmentClass(i: number, active: number) {
  if (i === LAST) return 'bg-ink'
  if (i === active) return 'bg-signal'
  if (i < active) return 'bg-signal/30'
  return 'bg-gray-200'
}

const CheckMini = ({ className = '' }: { className?: string }) => (
  <svg
    aria-hidden
    viewBox="0 0 24 24"
    className={`mt-[3px] size-3.5 shrink-0 ${className}`}
    fill="none"
    stroke="currentColor"
    strokeWidth="2.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
)

/** #curriculum — 4주 로드맵 카드 + 진행 트랙 + 브라우저 데모 / 탭 패널 */
export function CurriculumSection() {
  const [current, setCurrent] = useState(0)
  const gridRef = useReveal<HTMLUListElement>()
  const trackRef = useReveal<HTMLDivElement>()
  const uid = useId()

  const week = TAB_WEEKS[current]
  const panel = week.panel
  const climax = !!week.climax
  const activeIndex = WEEKS.findIndex((w) => w.badge === week.badge)

  const onCardKey = (e: KeyboardEvent, i: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setCurrent(i)
    }
  }

  return (
    <Section id="curriculum" tone="gray">
      <SectionHead title={CURRICULUM.title} />

      <ul
        ref={gridRef}
        className="curriculum-grid grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-[clamp(.75rem,1.5vw,1.1rem)] lg:grid-cols-4"
      >
        {WEEKS.map((w, i) => {
          const tabIndex = TAB_WEEKS.findIndex((t) => t.badge === w.badge)
          const clickable = tabIndex >= 0
          const isCurrent = clickable && tabIndex === current
          const isFinal = i === LAST
          return (
            <li
              key={w.badge}
              className={`curriculum-card group relative flex pl-5 sm:pl-0 ${clickable ? 'cursor-pointer' : ''}`}
              {...(clickable && {
                role: 'button',
                tabIndex: 0,
                'aria-pressed': isCurrent,
                onClick: () => setCurrent(tabIndex),
                onKeyDown: (e: KeyboardEvent) => onCardKey(e, tabIndex),
              })}
            >
              {/* 모바일: 진행 트랙이 카드 왼쪽 세로 레일로 */}
              <span
                aria-hidden
                className={`absolute top-1 bottom-1 left-0 w-1 rounded-full transition-colors duration-300 motion-reduce:transition-none sm:hidden ${segmentClass(i, activeIndex)}`}
              />
              <div
                className={`flex flex-1 flex-col gap-3.5 rounded-2xl border p-[clamp(1.1rem,1.8vw,1.4rem)] text-left transition-[border-color,box-shadow,transform] duration-200 ease-brand motion-reduce:transition-none ${
                  isFinal
                    ? 'border-ink/15 bg-gray-50'
                    : isCurrent
                      ? 'border-signal/70 bg-white shadow-[0_0_0_4px_#2563eb14,0_14px_30px_-18px_#2563eb59]'
                      : 'border-[#e6e8ee] bg-white shadow-[0_1px_2px_#1018280a]'
                } ${clickable && !isCurrent ? 'group-hover:-translate-y-0.5 group-hover:border-[#c0d0f5] group-hover:shadow-[0_14px_28px_-20px_#2563eb4d] motion-reduce:group-hover:translate-y-0' : ''}`}
              >
                <span
                  className={`self-start rounded-full px-2.5 py-1 text-[11px] leading-none font-semibold tracking-[0.1em] tabular-nums transition-colors duration-200 ${
                    isFinal ? 'bg-ink text-white' : isCurrent ? 'bg-signal text-white' : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {w.chip}
                </span>
                <h3 className="text-[clamp(1.02rem,1.5vw,1.18rem)] leading-[1.35] font-bold tracking-[-0.015em] text-ink">
                  {w.topic}
                </h3>
                <ul className="mt-auto flex flex-col gap-1.5 border-t border-[#eef0f3] pt-3.5 text-[clamp(.84rem,1vw,.92rem)] leading-[1.45] text-mute">
                  {w.sum.map((s) => (
                    <li key={s} className="flex gap-2">
                      <CheckMini className={isFinal ? 'text-ink' : isCurrent ? 'text-signal' : 'text-gray-300'} />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          )
        })}
      </ul>

      {/* 데스크톱: 카드 아래 4분할 진행 트랙 */}
      <div
        ref={trackRef}
        aria-hidden
        className="curriculum-track mt-5 hidden grid-cols-4 gap-[clamp(.75rem,1.5vw,1.1rem)] sm:grid"
      >
        {WEEKS.map((w, i) => (
          <span key={w.badge} className={`h-1 rounded-full ${segmentClass(i, activeIndex)}`} />
        ))}
      </div>

      <Reveal className="mt-[clamp(3.5rem,8vh,6rem)] grid grid-cols-1 items-start gap-[1.6rem] min-[901px]:grid-cols-[minmax(0,2.1fr)_minmax(0,1fr)] min-[901px]:gap-[clamp(1.4rem,3vw,2.4rem)]">
        <BrowserFrame
          screenKey={week.badge}
          url={`${CURRICULUM.host}/${panel.demo}`}
          caption={panel.caption}
          className="min-w-0 min-[901px]:sticky min-[901px]:top-[84px]"
        >
          {SCREENS[panel.demo]()}
        </BrowserFrame>

        <div className="flex min-w-0 flex-col gap-3">
          <div
            role="tablist"
            aria-label={CURRICULUM.tabsLabel}
            className="grid grid-cols-3 gap-1 rounded-full border border-[#e6e8ee] bg-gray-100 p-1"
          >
            {TAB_WEEKS.map((w, i) => {
              const selected = i === current
              return (
                <button
                  key={w.badge}
                  type="button"
                  role="tab"
                  id={`${uid}-tab-${i}`}
                  aria-selected={selected}
                  aria-controls={`${uid}-panel`}
                  onClick={() => setCurrent(i)}
                  className={`cursor-pointer rounded-full px-2 py-[clamp(.55rem,1vw,.7rem)] text-[clamp(.86rem,1.1vw,.95rem)] font-semibold transition-[background-color,box-shadow,color] duration-200 ease-brand motion-reduce:transition-none ${
                    selected
                      ? 'bg-white text-ink shadow-[0_1px_2px_#10182814,0_4px_12px_-6px_#10182833]'
                      : 'text-mute hover:text-ink'
                  }`}
                >
                  {w.badge}
                </button>
              )
            })}
          </div>

          <div
            key={week.badge}
            id={`${uid}-panel`}
            role="tabpanel"
            aria-labelledby={`${uid}-tab-${current}`}
            className={`curriculum-panel-in rounded-2xl border bg-white px-[clamp(1.1rem,1.8vw,1.4rem)] py-[clamp(1.1rem,2vw,1.5rem)] shadow-[0_1px_2px_#1018280a] ${
              climax ? 'border-signal/60' : 'border-[#e6e8ee]'
            }`}
          >
            <div className="mb-3.5 flex flex-col gap-2">
              <span className="self-start rounded-full bg-signal/10 px-2.5 py-1 text-[11px] leading-none font-semibold tracking-[0.1em] text-signal-text tabular-nums">
                {week.chip}
              </span>
              <span className="text-[clamp(1.05rem,1.6vw,1.25rem)] leading-[1.3] font-bold tracking-[-0.015em] text-ink">
                {week.topic}
              </span>
            </div>
            <p className="mb-2 text-[clamp(.96rem,1.3vw,1.08rem)] leading-[1.45] font-semibold text-ink">
              {panel.lead}
            </p>
            <p className="mb-4 text-[clamp(.85rem,1.1vw,.93rem)] leading-relaxed text-mute">{panel.quote}</p>
            <ul className="flex flex-col">
              {panel.bullets.map((b, i) => (
                <li
                  key={b.title}
                  className="grid grid-cols-[1.9rem_1fr] gap-2 border-b border-[#eef0f3] py-3 text-[clamp(.85rem,1.1vw,.93rem)] leading-normal text-ink first:border-t"
                >
                  <span className="pt-px text-[12px] font-semibold text-signal-text tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>
                    <span className="font-semibold">{b.title}</span>
                    <span className="text-mute"> — {b.desc}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p
              className={`mt-4 flex items-start gap-2.5 rounded-xl px-3.5 py-3 text-[clamp(.8rem,1vw,.88rem)] leading-normal text-ink ${
                climax ? 'bg-signal/10' : 'bg-gray-50'
              }`}
            >
              <span
                aria-hidden
                className="mt-px inline-flex size-[1.15rem] flex-none items-center justify-center rounded-full bg-signal text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                >
                  <path d="M12 7v6M12 17h.01" />
                </svg>
              </span>
              {panel.banner}
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
