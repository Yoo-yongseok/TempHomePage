import { SOLUTION } from '../../content/landing/groupA'
import { Reveal, Section, SectionHead, Sig, Wrap } from './primitives'
import './groupA.css'

export function ConeSolutionSection() {
  return (
    <Section id="solution" tone="dark" bare className="overflow-hidden bg-[#070a12]!">
      {/* 장식: 아래에서 떠오르는 동심원 빛 + 점 패턴 */}
      <div aria-hidden className="solution-orbit" />
      <div aria-hidden className="solution-dots" />

      <Wrap className="relative z-[1]">
        <SectionHead
          dark
          title={
            <>
              {SOLUTION.titleBefore}
              <br />
              <Sig dark>{SOLUTION.titleSig}</Sig>
              {SOLUTION.titleAfter}
            </>
          }
          sub={SOLUTION.sub}
        />

        <Reveal stagger className="mx-auto grid max-w-[920px] grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-8">
          {SOLUTION.steps.map((step, i) => (
            <div
              key={step.no}
              className="relative rounded-2xl border border-white/10 bg-linear-to-b from-white/[0.08] to-white/[0.02] p-4 sm:p-6"
            >
              <h3 className="text-base leading-snug font-bold text-white sm:text-xl">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/60 sm:mt-2.5 sm:text-base">{step.desc}</p>

              {/* 다음 단계로 이어지는 화살표 */}
              {i < SOLUTION.steps.length - 1 && (
                <span
                  aria-hidden
                  className="absolute top-1/2 -right-[1.45rem] z-[2] hidden size-7 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#0d1220] text-signal-light sm:flex"
                >
                  <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              )}
            </div>
          ))}
        </Reveal>
      </Wrap>

      {/* 하단을 흰색으로 페이드 — 다음 흰 섹션(#who)과 자연스럽게 이어짐 */}
      <div aria-hidden className="solution-fade" />
    </Section>
  )
}
