import type { ReactNode } from 'react'
import { METHOD, type MethodIcon } from '../../content/landing/groupA'
import { Reveal, Section } from './primitives'

const ICONS: Record<MethodIcon, ReactNode> = {
  // 방패 + 체크
  shield: (
    <>
      <path d="M12 3 5 6v5.5c0 4.4 3 8 7 9.5 4-1.5 7-5.1 7-9.5V6l-7-3Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </>
  ),
  // 펜 (작성 실습)
  pen: (
    <>
      <path d="M16.5 4.5a2.1 2.1 0 0 1 3 3L8 19l-4 1 1-4L16.5 4.5Z" />
      <path d="m14.5 6.5 3 3" />
    </>
  ),
  // 순환 화살표
  cycle: (
    <>
      <path d="M20 11a8 8 0 0 0-14.3-4.9L4 8" />
      <path d="M4 4v4h4" />
      <path d="M4 13a8 8 0 0 0 14.3 4.9L20 16" />
      <path d="M20 20v-4h-4" />
    </>
  ),
  // 과녁
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" />
    </>
  ),
}

export function MethodSection() {
  return (
    <Section id="method">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-20">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="text-[clamp(1.9rem,3.6vw,2.8rem)] leading-[1.22] font-bold tracking-[-0.03em] whitespace-pre-line text-ink">
            {METHOD.title}
          </h2>
          {/* 지표는 카드형 숫자 대신 한 문장으로 */}
          <p className="mt-6 max-w-[34ch] text-[1.05rem] leading-relaxed text-mute">
            {METHOD.metrics.map((m, i) => (
              <span key={m.label}>
                {m.label} <strong className="font-bold text-ink tabular-nums">{m.value}</strong>
                {i < METHOD.metrics.length - 1 && ', '}
              </span>
            ))}
            {METHOD.metricsSuffix}
          </p>
        </Reveal>

        <Reveal as="ol" stagger className="relative">
          {METHOD.cards.map((card, i) => {
            const last = i === METHOD.cards.length - 1
            return (
              <li key={card.icon} className="relative flex gap-5 pb-10 last:pb-0 sm:gap-7">
                {/* 아이콘 아래로 이어지는 세로선 (signal → 투명) */}
                {!last && (
                  <span
                    aria-hidden
                    className="absolute top-14 bottom-0 left-7 w-px -translate-x-1/2 bg-linear-to-b from-signal/50 to-signal/0"
                  />
                )}
                <div className="relative flex size-14 shrink-0 items-center justify-center rounded-2xl border border-signal/15 bg-white text-signal shadow-[0_1px_2px_#1018280a,0_10px_24px_-14px_#2563eb59]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.7}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="size-6"
                  >
                    {ICONS[card.icon]}
                  </svg>
                </div>
                <div className="min-w-0 pt-1">
                  <h3 className="text-[1.15rem] leading-snug font-bold tracking-[-0.01em] whitespace-pre-line text-ink">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed whitespace-pre-line text-mute">{card.desc}</p>
                </div>
              </li>
            )
          })}
        </Reveal>
      </div>
    </Section>
  )
}
