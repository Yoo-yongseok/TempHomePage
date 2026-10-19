import { PROBLEM } from '../../content/landing/groupA'
import { Reveal, Section, Wrap } from './primitives'
import './groupA.css'

// 카드 3장을 좌우로 엇갈리게 배치
const NOTE_OFFSET = ['sm:-translate-x-12', 'sm:translate-x-12', 'sm:-translate-x-4']

export function ProblemSection() {
  return (
    <Section id="problem" tone="dark" bare className="overflow-hidden bg-[#070a12]!">
      <div aria-hidden className="problem-aurora" />

      <Wrap className="relative z-[1]">
        <Reveal className="mx-auto mb-[clamp(2.5rem,6vh,4rem)] flex max-w-[820px] flex-col items-center gap-5 text-center">
          <h2 className="text-[clamp(2rem,4.4vw,3.1rem)] leading-[1.28] font-bold tracking-[-0.025em] text-balance text-white">
            {PROBLEM.topics.join('·')},
            <br />
            {PROBLEM.title}
          </h2>
        </Reveal>

        {/* 등장 후 핵심 문구에 취소선이 그어진다 — "이 방식으로는 안 된다" */}
        <Reveal stagger className="mx-auto flex max-w-[600px] flex-col gap-3">
          {PROBLEM.notes.map((note, i) => (
            <div
              key={note.hl}
              className={`problem-note flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.045] px-5 py-4 sm:px-6 ${NOTE_OFFSET[i]}`}
            >
              <span
                aria-hidden
                className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#ff6b6b]/15 text-[#ff8a8a]"
              >
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              </span>
              <p className="text-[15px] leading-snug text-white/70 sm:text-[clamp(1.02rem,1.7vw,1.18rem)]">
                <span className="problem-strike font-semibold text-white">{note.hl}</span>
                {note.rest}
              </p>
            </div>
          ))}
        </Reveal>

        <div aria-hidden className="problem-beam mx-auto mt-10 h-16 w-px" />

        <Reveal className="mt-8 text-center">
          <p className="text-[clamp(1.1rem,2.2vw,1.4rem)] text-white/45">{PROBLEM.lead}</p>
          <p className="mt-2 text-[clamp(1.3rem,3vw,2rem)] font-bold text-white">{PROBLEM.question}</p>
        </Reveal>
      </Wrap>
    </Section>
  )
}
