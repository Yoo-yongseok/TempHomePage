import { VALUE } from '../../content/landing/groupB'
import { Section } from './primitives'

/** #value — 축소 패딩 다크 밴드, 3열 체크 리스트 (원본도 reveal 없음) */
export function ValueSection() {
  return (
    <Section id="value" tone="dark" className="py-12! md:py-16!">
      <div className="mx-auto mb-8 flex max-w-[820px] flex-col items-center gap-4 text-center md:mb-10">
        <h2 className="text-[clamp(2rem,4.4vw,3.1rem)] leading-[1.28] font-bold tracking-[-0.025em] text-balance whitespace-pre-line text-white">
          {VALUE.title}
        </h2>
      </div>
      {/* 세 열을 하나의 글래스 패널로 묶고, 열마다 제목 + 구분선 목록 */}
      <div className="mx-auto grid max-w-[1160px] overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] md:grid-cols-3">
        {VALUE.columns.map((col, ci) => (
          <div
            key={ci}
            className="border-white/10 p-6 not-first:border-t md:p-8 md:not-first:border-t-0 md:not-first:border-l"
          >
            <div className="mb-5">
              <h3 className="text-lg font-bold text-white">{VALUE.headings[ci]}</h3>
            </div>
            <ul className="divide-y divide-white/[0.07]">
              {col.map((item) => (
                <li key={item.title} className="flex items-start gap-3 py-3.5 first:pt-0 last:pb-0">
                  <span aria-hidden className="mt-2 size-1.5 flex-none rounded-full bg-signal-light" />
                  <div className="min-w-0">
                    <div className="text-[15px] leading-snug font-semibold text-white/90 md:text-base">
                      {item.title}
                    </div>
                    <div className="mt-1 text-sm leading-snug text-white/50">{item.desc}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
