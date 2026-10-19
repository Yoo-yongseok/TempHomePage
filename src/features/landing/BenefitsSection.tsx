import type { ReactNode } from 'react'
import { BENEFITS, type BenefitMock } from '../../content/landing/groupB'
import { Placeholder } from '../../components/ui/Placeholder'
import { Reveal, Section, SectionHead } from './primitives'
import { ConsultStepsMock } from './mocks/ConsultStepsMock'
import { StudyChatMock } from './mocks/StudyChatMock'

const MOCKS: Record<BenefitMock, () => ReactNode> = {
  chat: () => <StudyChatMock />,
  app: () => (
    <div className="aspect-[1276/794] w-full max-w-[440px] overflow-hidden rounded-[20px] border border-[#e6e8ee] bg-white shadow-[0_1px_2px_#1018280a,0_28px_60px_-30px_#10182847]">
      <Placeholder label="학습 앱 대시보드 화면" tone={0} />
    </div>
  ),
  steps: () => <ConsultStepsMock />,
}

/** #benefits — 혜택 3행 지그재그 (2번째 행 좌우 반전) */
export function BenefitsSection() {
  return (
    <Section id="benefits" tone="offer">
      <SectionHead title={BENEFITS.title} />
      <div className="mx-auto mt-8 flex max-w-[980px] flex-col gap-16 md:mt-12 md:gap-24">
        {BENEFITS.rows.map((row, i) => {
          const reverse = i % 2 === 1
          return (
            <Reveal key={row.label} className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
              <div className={reverse ? 'md:order-2' : ''}>
                <div className={`text-center md:max-w-[440px] md:text-left ${reverse ? 'md:ml-auto' : ''}`}>
                  <h3 className="text-[clamp(1.5rem,3vw,2.1rem)] leading-[1.3] font-bold tracking-[-0.02em] whitespace-pre-line">
                    {row.title}
                  </h3>
                  <p className="mt-4 leading-relaxed whitespace-pre-line text-mute">{row.desc}</p>
                </div>
              </div>
              <div className={`flex justify-center ${reverse ? 'md:order-1 md:justify-start' : 'md:justify-end'}`}>
                {MOCKS[row.mock]()}
              </div>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
