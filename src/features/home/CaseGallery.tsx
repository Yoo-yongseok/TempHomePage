import { useCallback, useEffect, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import { ButtonLink } from '../../components/ui/ButtonLink'
import { CASES } from '../../content/home'
import { clamp, useWindowWidth } from '../../lib/hooks'
import { CaseModal } from './CaseModal'
import { Placeholder } from '../../components/ui/Placeholder'
import { ArrowUpRight } from '../../components/ui/icons'

// 원본 레이아웃: 기준 폭(px), single = 카드 1장, stack = 위아래 2장
const LAYOUT = [
  { type: 'single', w: 942 },
  { type: 'single', w: 300 },
  { type: 'stack', w: 450 },
  { type: 'single', w: 300 },
  { type: 'single', w: 600 },
  { type: 'stack', w: 450 },
  { type: 'single', w: 676 },
] as const

const COLS = LAYOUT.length
const STAGGER = 90
const ENTER_MS = 650
const MARQUEE_DELAY = (COLS - 1) * STAGGER + 700

// 화면 폭에 따른 스케일: 360px→0.55, 1280px→0.75, 1920px→0.9
function scaleFor(w: number) {
  if (w < 1280) return 0.55 + (0.75 - 0.55) * clamp((w - 360) / 920, 0, 1)
  return 0.75 + (0.9 - 0.75) * clamp((w - 1280) / 640, 0, 1)
}

// 슬롯별로 사례를 순서대로 배치
let slot = 0
const COLUMNS = LAYOUT.map((col) => {
  const count = col.type === 'stack' ? 2 : 1
  const cases = Array.from({ length: count }, () => slot++ % CASES.length)
  return { ...col, cases }
})

export function CaseGallery() {
  const vw = useWindowWidth()
  const mobile = vw < 1024
  const c = scaleFor(vw)
  const gap = 20 * c
  const singleH = 450 * c
  const stackH = 215 * c
  const colWidth = (w: number) => (mobile ? Math.min(w, 600) : w) * c
  const setWidth = LAYOUT.reduce((sum, col) => sum + colWidth(col.w), 0) + gap * COLS

  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const xRef = useRef(0)
  const setWidthRef = useRef(setWidth)
  const startedRef = useRef(false)
  const pausedRef = useRef({ hover: false, drag: false, modal: false })
  const dragRef = useRef({ active: false, downX: 0, startX: 0, moved: false, caseIdx: -1 })

  const [entered, setEntered] = useState(false)
  const [modalCase, setModalCase] = useState<number | null>(null)
  const closeModal = useCallback(() => setModalCase(null), [])

  useEffect(() => {
    setWidthRef.current = setWidth
  }, [setWidth])

  useEffect(() => {
    pausedRef.current.modal = modalCase !== null
  }, [modalCase])

  // 화면에 15% 보이면 1회 등장
  useEffect(() => {
    const el = viewportRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true)
          io.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!entered) return
    const t = setTimeout(() => (startedRef.current = true), MARQUEE_DELAY)
    return () => clearTimeout(t)
  }, [entered])

  // 무한 마퀴 (원본과 같은 프레임당 1px, 모바일 0.5px)
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    const tick = () => {
      const p = pausedRef.current
      if (!reduced && startedRef.current && !p.hover && !p.drag && !p.modal) {
        xRef.current -= window.innerWidth < 1024 ? 0.5 : 1
      }
      const M = setWidthRef.current
      while (xRef.current <= -M) xRef.current += M
      while (xRef.current > 0) xRef.current -= M
      if (trackRef.current) trackRef.current.style.transform = `translate3d(${xRef.current}px,0,0)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    const caseEl = (e.target as HTMLElement).closest<HTMLElement>('[data-case]')
    dragRef.current = {
      active: true,
      downX: e.clientX,
      startX: xRef.current,
      moved: false,
      caseIdx: caseEl ? Number(caseEl.dataset.case) : -1,
    }
    e.currentTarget.setPointerCapture(e.pointerId)
    pausedRef.current.drag = true
  }

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = dragRef.current
    if (!d.active) return
    const dx = e.clientX - d.downX
    if (Math.abs(dx) > 4) d.moved = true
    xRef.current = d.startX + dx
  }

  const endDrag = (openOnClick: boolean) => {
    const d = dragRef.current
    if (!d.active) return
    d.active = false
    pausedRef.current.drag = false
    if (openOnClick && !d.moved && d.caseIdx >= 0) setModalCase(d.caseIdx)
  }

  return (
    <section className="w-full overflow-hidden bg-white py-[80px] md:py-[100px]">
      <h2 className="px-6 text-center text-[28px] leading-[1.2] font-bold text-gray-900 md:text-[40px]">
        바로잡이 함께한 <br className="md:hidden" />
        커리어 성장 현장
      </h2>
      <p className="mt-3 px-6 text-center text-[16px] leading-[1.4] font-normal tracking-[-0.18px] text-gray-500 md:text-[18px]">
        교육부터 채용 박람회, 코칭까지 기업과 기관의 현장을 소개합니다
      </p>
      <div className="mt-8 text-center">
        <ButtonLink to="/news/newsroom" size="md">
          현장 사례 전체보기 →
        </ButtonLink>
      </div>

      <div
        ref={viewportRef}
        className="relative mt-[48px] w-full cursor-grab overflow-hidden active:cursor-grabbing md:mt-[64px]"
        style={{ touchAction: 'pan-y' }}
        onMouseEnter={() => (pausedRef.current.hover = true)}
        onMouseLeave={() => (pausedRef.current.hover = false)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={() => endDrag(true)}
        onPointerCancel={() => endDrag(false)}
      >
        <div ref={trackRef} className="flex w-max items-start will-change-transform" style={{ gap }}>
          {[0, 1].flatMap((set) =>
            COLUMNS.map((col, i) => {
              const colIndex = set * COLS + i
              const height = col.type === 'stack' ? stackH : singleH
              return (
                <div key={colIndex} className="flex shrink-0 flex-col" style={{ width: colWidth(col.w), gap }}>
                  {col.cases.map((caseIdx) => {
                    const item = CASES[caseIdx]
                    const small = height < 260
                    return (
                      <div
                        key={caseIdx}
                        data-case={caseIdx}
                        className="group relative w-full cursor-pointer overflow-hidden rounded-[14px] bg-gray-50"
                        style={{
                          height,
                          transform: entered ? 'scale(1)' : 'scale(0.4)',
                          opacity: entered ? 1 : 0,
                          transitionProperty: 'transform, opacity',
                          transitionDuration: `${ENTER_MS}ms`,
                          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                          transitionDelay: `${(colIndex % COLS) * STAGGER}ms`,
                        }}
                      >
                        <div className="pointer-events-none size-full transition-transform duration-600 ease-brand group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100">
                          <Placeholder tone={item.tone} compact={small} />
                        </div>
                        {/* 캡션 카드: 데스크톱은 hover 시 아래에서 올라오고, 모바일은 항상 노출 */}
                        <div
                          className={`pointer-events-none absolute inset-x-2.5 bottom-2.5 flex items-center gap-3 rounded-xl bg-white shadow-[0_1px_2px_rgba(16,24,40,0.06),0_12px_28px_-14px_rgba(16,24,40,0.32)] transition-[transform,opacity] duration-450 ease-brand motion-reduce:transition-opacity ${
                            small ? 'px-3 py-2.5' : 'px-4 py-3.5'
                          } ${
                            mobile
                              ? 'translate-y-0 opacity-100'
                              : 'translate-y-[calc(100%+12px)] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:translate-y-0'
                          }`}
                        >
                          <div className="min-w-0 flex-1">
                            {!small && (
                              <div className="mb-1.5 flex flex-wrap gap-1">
                                {item.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="rounded-md bg-gray-50 px-1.5 py-0.5 text-[11px] leading-[1.4] font-semibold text-gray-500"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                            <p
                              className={`leading-[1.35] font-bold tracking-[-0.01em] text-gray-900 ${small ? 'line-clamp-1 text-[12.5px]' : 'line-clamp-2 text-[14.5px]'}`}
                            >
                              {item.title}
                            </p>
                          </div>
                          <span
                            aria-hidden
                            className={`flex shrink-0 items-center justify-center rounded-full bg-primary text-white transition-colors duration-200 group-hover:bg-primary-hover ${small ? 'size-7' : 'size-9'}`}
                          >
                            <ArrowUpRight className={small ? 'size-3.5' : 'size-4'} />
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            }),
          )}
        </div>
      </div>

      {modalCase !== null && <CaseModal item={CASES[modalCase]} onClose={closeModal} />}
    </section>
  )
}
