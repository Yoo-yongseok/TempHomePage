import type { ReactNode } from 'react'
import { WHO, type WhoIcon } from '../../content/landing/groupA'
import { Reveal, Section, SectionHead } from './primitives'

const ICONS: Record<WhoIcon, ReactNode> = {
  // 사람 + 체크리스트 (교육 담당자)
  hr: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" />
      <path d="m15.5 9 1.8 1.8L21 7" />
    </>
  ),
  // 상승 막대 (팀 생산성)
  team: (
    <>
      <path d="M4 20V14M10 20V10M16 20V6" />
      <path d="M3 20h18" />
      <path d="m14 5 3-2.5L20 5" />
    </>
  ),
  // 빌딩 (경영진)
  exec: (
    <>
      <rect x="4" y="3" width="10" height="18" rx="1.2" />
      <path d="M14 8h5a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1h-5" />
      <path d="M7.5 7h3M7.5 11h3M7.5 15h3M17 12h0M17 16h0" />
    </>
  ),
}

export function WhoSection() {
  return (
    <Section id="who">
      <SectionHead title={WHO.title} />

      <Reveal stagger className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-6">
        {WHO.cards.map((card) => (
          <div
            key={card.icon}
            className="rounded-xl border border-rule bg-white p-3.5 shadow-[0_16px_32px_-20px_rgba(16,24,40,0.14)] sm:rounded-2xl sm:p-7"
          >
            <div className="flex size-10 items-center justify-center rounded-lg bg-signal/10 text-signal sm:size-16 sm:rounded-2xl">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="size-6 sm:size-9"
              >
                {ICONS[card.icon]}
              </svg>
            </div>
            <h3 className="mt-3 text-sm leading-snug font-bold sm:mt-6 sm:text-lg">{card.title}</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-mute sm:mt-3 sm:text-base">{card.desc}</p>
          </div>
        ))}
      </Reveal>
    </Section>
  )
}
