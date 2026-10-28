import { COMPARE } from '../../content/landing/proof'
import { Reveal, Section, SectionHead } from './primitives'

const svg = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

/** 좌 혼자 준비(뮤트) / 우 한국AX협회(블루 그라디언트) 비교 — 이음매 위 VS 배지 */
export function CompareSection() {
  const { title, sub, solo, baro } = COMPARE
  return (
    <Section id="compare" tone="offer">
      <SectionHead title={title} sub={sub} className="whitespace-pre-line" />
      {/* auto-rows-fr: 세로 배치(모바일)에서도 두 패널 높이를 같게 → 배지가 정확히 이음매 중앙 */}
      <Reveal className="relative mx-auto grid max-w-[960px] auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex flex-col rounded-3xl border border-rule bg-white/70 p-6 sm:p-9">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg font-bold text-mute">{solo.label}</h3>
            <span className="text-[11px] font-semibold tracking-[0.12em] text-mute/70 tabular-nums">{solo.tag}</span>
          </div>
          <ul className="mt-6 flex flex-1 flex-col divide-y divide-rule">
            {solo.lines.map((line) => (
              <li key={line} className="flex min-h-[68px] flex-1 items-center gap-3.5 text-[15px] text-mute">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                  <svg {...svg} strokeWidth={2.6} className="size-3">
                    <path d="M6 6l12 12M18 6 6 18" />
                  </svg>
                </span>
                {line}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative flex flex-col overflow-hidden rounded-3xl bg-signal p-6 text-white shadow-[0_24px_48px_-24px_rgba(37,99,235,0.55)] sm:p-9">
          <div className="relative flex items-center justify-between gap-3">
            <h3 className="text-lg font-bold">{baro.label}</h3>
            <span className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold tracking-[0.12em] text-white/90 tabular-nums">
              {baro.tag}
            </span>
          </div>
          <ul className="relative mt-6 flex flex-1 flex-col divide-y divide-white/15">
            {baro.rows.map((row) => (
              <li key={row.bold} className="flex min-h-[68px] flex-1 items-center gap-3.5">
                <svg {...svg} strokeWidth={1.9} className="size-6 shrink-0 text-white">
                  <circle cx="12" cy="12" r="9.5" />
                  <path d="m8 12.3 2.7 2.7L16 9.5" />
                </svg>
                <span className="min-w-0">
                  <span className="block text-[13px] leading-snug text-white/70">{row.small}</span>
                  <span className="mt-0.5 block text-[15px] leading-snug font-bold">{row.bold}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <span
          aria-hidden
          className="absolute top-1/2 left-1/2 z-[2] flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-[#eef2fb] bg-ink text-sm font-bold tracking-wider text-white tabular-nums shadow-[0_10px_24px_-8px_rgba(26,29,36,0.5)]"
        >
          VS
        </span>
      </Reveal>
    </Section>
  )
}
