import { HOW_TO_JOIN } from '../../content/landing/groupD'
import { Reveal, Section, SectionHead, cardClass } from './primitives'

// 진행선이 각 노드에 도달하는 시점에 맞춘 노드 활성 지연(ms)
const NODE_DELAY = [150, 750, 1350]

const fillAnim = 'transition-transform ease-brand motion-reduce:transition-none'

export function HowToJoinSection() {
  const { title, steps } = HOW_TO_JOIN
  return (
    <Section id="howtojoin" tone="gray">
      <SectionHead title={title} />
      {/* .in이 붙으면(group-[.in]) 진행선이 채워지고 노드가 차례로 켜진다 */}
      <Reveal className="group relative mx-auto max-w-[1040px]">
        {/* md+: 노드 중심(1/6 ~ 5/6)을 잇는 가로선 */}
        <div
          aria-hidden
          className="absolute top-7 right-[16.667%] left-[16.667%] hidden h-0.5 -translate-y-1/2 rounded-full bg-rule md:block"
        >
          <div
            className={`h-full w-full origin-left scale-x-0 rounded-full bg-linear-to-r from-signal to-signal-light delay-150 duration-[1400ms] group-[.in]:scale-x-100 ${fillAnim}`}
          />
        </div>

        <ol className="relative flex flex-col gap-6 md:grid md:grid-cols-3 md:gap-0">
          {steps.map((step, i) => (
            <li key={step.title} className="relative flex gap-5 md:flex-col md:items-center md:gap-7 md:px-3 lg:px-5">
              {/* 모바일: 다음 노드까지 이어지는 왼쪽 세로선 */}
              {i < steps.length - 1 && (
                <span
                  aria-hidden
                  className="absolute top-14 -bottom-6 left-7 w-0.5 -translate-x-1/2 overflow-hidden bg-rule md:hidden"
                >
                  <span
                    style={{ transitionDelay: `${NODE_DELAY[i] ?? 0}ms` }}
                    className={`block size-full origin-top scale-y-0 bg-linear-to-b from-signal to-signal-light duration-700 group-[.in]:scale-y-100 ${fillAnim}`}
                  />
                </span>
              )}
              <span
                aria-hidden
                style={{ transitionDelay: `${NODE_DELAY[i] ?? 0}ms` }}
                className="relative z-[1] flex size-14 shrink-0 items-center justify-center rounded-full border border-rule bg-white text-[15px] font-bold text-mute tabular-nums shadow-[0_1px_2px_#1018280a] transition-[background-color,color,border-color,box-shadow] duration-500 ease-brand group-[.in]:border-signal group-[.in]:bg-signal group-[.in]:text-white group-[.in]:shadow-[0_0_0_6px_rgba(37,99,235,0.12),0_10px_20px_-8px_rgba(37,99,235,0.6)] motion-reduce:transition-none"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className={`${cardClass} w-full md:text-center`}>
                <h3 className="text-lg font-bold">
                  <span className="sr-only">{i + 1}단계. </span>
                  {step.title}
                </h3>
                <p className="mt-2 leading-relaxed text-mute">{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>
    </Section>
  )
}
