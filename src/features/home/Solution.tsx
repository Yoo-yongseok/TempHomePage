import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { SOLUTION } from '../../content/home'
import { clamp, useMediaQuery } from '../../lib/hooks'
import { scrollToY } from '../../lib/lenis'
import { ChevronRight } from '../../components/ui/icons'
import { Placeholder } from '../../components/ui/Placeholder'

const TABS = SOLUTION.tabs
const STEPS_PER_TAB = 3
const TOTAL = TABS.length * STEPS_PER_TAB
const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

// 탭 안 3단계 진행 표시
function StepProgress({ active, dark }: { active: number; dark: boolean }) {
  return (
    <div role="img" aria-label={`${STEPS_PER_TAB}단계 중 ${active + 1}단계`} className="flex items-center gap-1.5">
      {Array.from({ length: STEPS_PER_TAB }, (_, i) => (
        <span
          key={i}
          className={`relative h-[3px] w-7 overflow-hidden rounded-full transition-colors duration-500 ${dark ? 'bg-gray-700' : 'bg-gray-200'}`}
        >
          <span
            className={`absolute inset-0 origin-left rounded-full transition-transform duration-300 ease-out motion-reduce:transition-none ${dark ? 'bg-signal-light' : 'bg-primary'} ${i <= active ? 'scale-x-100' : 'scale-x-0'}`}
          />
        </span>
      ))}
    </div>
  )
}

export function Solution() {
  const desktop = useMediaQuery('(min-width: 1024px)')
  return desktop ? <SolutionDesktop /> : <SolutionMobile />
}

function SolutionDesktop() {
  const sectionRef = useRef<HTMLElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const headRef = useRef<HTMLDivElement>(null)
  const rowRef = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLDivElement>(null)
  const lockUntil = useRef(0)

  const [step, setStep] = useState(0)
  const [size, setSize] = useState({ active: 600, height: 338, inactive: 40, gap: 16 })

  const tab = Math.floor(step / STEPS_PER_TAB)
  const sub = step % STEPS_PER_TAB
  const dark = tab === 2

  // 스크롤 진행률 → 9단계
  useEffect(() => {
    const onScroll = () => {
      if (performance.now() < lockUntil.current) return
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const range = rect.height - window.innerHeight
      const p = range > 0 ? clamp(-rect.top, 0, range) / range : 0
      setStep(clamp(Math.floor(p * TOTAL), 0, TOTAL - 1))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 활성 이미지 크기: 남는 높이와 행 폭에 맞춘 16:9 (최대 1000px)
  useLayoutEffect(() => {
    const measure = () => {
      if (!stickyRef.current || !rowRef.current || !headRef.current || !descRef.current) return
      const xl = window.innerWidth >= 1280
      const inactive = xl ? 48 : 40
      const gap = xl ? 20 : 16
      const availH =
        stickyRef.current.clientHeight -
        120 -
        headRef.current.offsetHeight -
        60 -
        descRef.current.offsetHeight -
        28 -
        40
      const active = Math.max(
        0,
        Math.min(rowRef.current.clientWidth - 2 * (inactive + gap), Math.round((availH * 533) / 300), 1000),
      )
      setSize({ active, height: Math.round((active * 300) / 533), inactive, gap })
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (stickyRef.current) ro.observe(stickyRef.current)
    if (rowRef.current) ro.observe(rowRef.current)
    return () => ro.disconnect()
  }, [])

  const goTo = (index: number) => {
    const el = sectionRef.current
    if (!el) return
    const range = el.offsetHeight - window.innerHeight
    const top = el.getBoundingClientRect().top + window.scrollY + ((index + 0.5) / TOTAL) * range
    lockUntil.current = performance.now() + 800
    setStep(index)
    scrollToY(top)
  }

  return (
    <section
      ref={sectionRef}
      className={`relative w-full transition-colors duration-500 ${dark ? 'bg-gray-800' : 'bg-white'}`}
      style={{ height: `${100 + TOTAL * 40}vh` }}
    >
      <div
        ref={stickyRef}
        className="sticky top-[60px] flex h-[calc(100vh-60px)] flex-col items-center justify-center gap-[60px] overflow-hidden px-[100px] py-[60px]"
      >
        <div ref={headRef} className="flex flex-col items-center gap-3 text-center">
          <h2
            className={`text-[28px] leading-[1.2] font-bold transition-colors duration-500 md:text-[40px] ${dark ? 'text-white' : 'text-gray-900'}`}
          >
            {SOLUTION.title}
          </h2>
          <p
            className={`text-[16px] leading-[1.4] font-normal tracking-[-0.18px] transition-colors duration-500 md:text-[18px] ${dark ? 'text-gray-200' : 'text-gray-500'}`}
          >
            {SOLUTION.subtitle}
          </p>
        </div>

        <div className="flex w-full items-center gap-[120px] [@media(min-width:1920px)]:mx-auto [@media(min-width:1920px)]:max-w-[1720px]">
          {/* 좌측 탭 */}
          <div className="flex w-[340px] shrink-0 flex-col gap-[40px] self-start xl:w-[400px]">
            {TABS.map((t, i) => {
              const active = i === tab
              return (
                <div key={t.title} className="flex flex-col gap-4">
                  <button
                    type="button"
                    className="relative w-fit cursor-pointer text-left text-[40px] leading-[1.2] font-bold whitespace-nowrap xl:text-[48px]"
                    onClick={() => goTo(i * STEPS_PER_TAB)}
                  >
                    <span
                      className={`transition-colors duration-500 ${
                        active ? (dark ? 'text-white' : 'text-gray-900') : dark ? 'text-gray-700' : 'text-gray-200'
                      }`}
                    >
                      {t.title}
                    </span>
                  </button>
                  {active && (
                    <div className="flex items-center gap-5">
                      <Link
                        to={t.to}
                        className={`inline-flex w-fit items-center gap-1 rounded-[40px] px-4 py-2 text-[16px] leading-[1.5] font-medium tracking-[-0.16px] transition-colors duration-500 ${
                          dark
                            ? 'bg-gray-700 text-gray-300 hover:bg-[#484c55]'
                            : 'bg-gray-50 text-gray-500 hover:bg-[#eef0f3]'
                        }`}
                      >
                        자세히 보기 <ChevronRight />
                      </Link>
                      <StepProgress active={sub} dark={dark} />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* 우측 이미지 아코디언 */}
          <div ref={rowRef} className="flex max-w-[1200px] min-w-0 flex-1 flex-col gap-[28px] pb-[40px]">
            <div className="flex w-full items-stretch justify-center" style={{ gap: size.gap }}>
              {Array.from({ length: STEPS_PER_TAB }, (_, i) => {
                const active = i === sub
                return (
                  <button
                    key={i}
                    type="button"
                    aria-label={`${TABS[tab].title} ${i + 1}단계`}
                    className="relative shrink-0 cursor-pointer overflow-hidden rounded-xl bg-gray-200 [@media(min-width:1920px)]:rounded-2xl"
                    style={{
                      width: active ? size.active : size.inactive,
                      height: size.height,
                      transition: `width 550ms ${EASE}`,
                    }}
                    onClick={() => goTo(tab * STEPS_PER_TAB + i)}
                  >
                    {/* 비활성 이미지는 옅게 */}
                    <Placeholder
                      palette="vivid"
                      tone={tab}
                      label={`${TABS[tab].title} 사진 ${i + 1}`}
                      hideLabel={!active}
                      style={{
                        opacity: active ? 1 : 0.45,
                        transition: `opacity 550ms ${EASE}`,
                      }}
                    />
                  </button>
                )
              })}
            </div>
            <div ref={descRef} key={step} className="animate-s4fade px-3 text-center">
              <p
                className={`text-[20px] leading-[1.3] font-medium tracking-[-0.2px] transition-colors duration-500 ${dark ? 'text-gray-200' : 'text-gray-600'}`}
              >
                {TABS[tab].steps[sub]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SolutionMobile() {
  return (
    <section className="flex w-full flex-col items-center gap-[60px] bg-white px-6 py-[60px]">
      <div className="flex flex-col items-center gap-3 text-center">
        <h2 className="text-[28px] leading-[1.2] font-bold text-gray-900">{SOLUTION.title}</h2>
        <p className="text-[16px] leading-[1.4] tracking-[-0.18px] text-gray-500">{SOLUTION.subtitle}</p>
      </div>
      {TABS.map((t, ti) => (
        <div key={t.title} className="flex w-full max-w-[560px] flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-[28px] leading-[1.2] font-bold text-gray-900">{t.title}</h3>
            <Link
              to={t.to}
              className="inline-flex items-center gap-1 rounded-[40px] bg-gray-50 px-3 py-1.5 text-[14px] font-medium text-gray-500"
            >
              자세히 보기 <ChevronRight />
            </Link>
          </div>
          {t.steps.map((s, si) => (
            <div key={s} className="flex flex-col gap-3">
              <div className="relative aspect-video overflow-hidden rounded-xl bg-gray-200">
                <Placeholder palette="vivid" tone={ti} label={`${t.title} 사진 ${si + 1}`} />
              </div>
              <div className="px-1">
                <p className="text-[16px] leading-[1.4] font-medium tracking-[-0.2px] text-gray-600">{s}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </section>
  )
}
