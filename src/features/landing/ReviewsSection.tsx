import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from '../../components/ui/icons'
import { REVIEWS, REVIEWS_HEAD } from '../../content/landing/groupC'
import { Reveal, Section, SectionHead, Wrap } from './primitives'

const NAV_BTN =
  'flex size-11 cursor-pointer items-center justify-center rounded-full border border-[#dfe3ea] bg-white text-ink shadow-[0_1px_2px_#1018280a] transition-[border-color,color,opacity] duration-200 ease-brand hover:border-ink disabled:cursor-default disabled:opacity-40 disabled:hover:border-[#dfe3ea] motion-reduce:transition-none'

const Star = ({ filled }: { filled: boolean }) => (
  <svg aria-hidden viewBox="0 0 20 20" className={`size-3.5 ${filled ? 'text-[#f5b301]' : 'text-gray-200'}`}>
    <path fill="currentColor" d="M10 1.8l2.5 5.1 5.6.8-4 3.9.9 5.6-5-2.6-5 2.6.9-5.6-4-3.9 5.6-.8z" />
  </svg>
)

function NavButtons({
  atStart,
  atEnd,
  onMove,
  className = '',
}: {
  atStart: boolean
  atEnd: boolean
  onMove: (dir: -1 | 1) => void
  className?: string
}) {
  return (
    <div className={`gap-2 ${className}`}>
      <button
        type="button"
        aria-label={REVIEWS_HEAD.nav.prev}
        disabled={atStart}
        onClick={() => onMove(-1)}
        className={NAV_BTN}
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        aria-label={REVIEWS_HEAD.nav.next}
        disabled={atEnd}
        onClick={() => onMove(1)}
        className={NAV_BTN}
      >
        <ChevronRight className="size-5" />
      </button>
    </div>
  )
}

/** #reviews — 가로 스냅 캐러셀, 헤더 우측 버튼으로 카드 1장씩 이동 */
export function ReviewsSection() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [edges, setEdges] = useState({ atStart: true, atEnd: false })
  const { title, metric } = REVIEWS_HEAD

  const syncEdges = useCallback(() => {
    const t = trackRef.current
    if (!t) return
    const atStart = t.scrollLeft <= 4
    const atEnd = t.scrollLeft + t.clientWidth >= t.scrollWidth - 4
    setEdges((prev) => (prev.atStart === atStart && prev.atEnd === atEnd ? prev : { atStart, atEnd }))
  }, [])

  // 카드가 모두 보이는 넓은 화면에서도 버튼 상태가 맞도록
  useEffect(() => {
    syncEdges()
    window.addEventListener('resize', syncEdges)
    return () => window.removeEventListener('resize', syncEdges)
  }, [syncEdges])

  const move = (dir: -1 | 1) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector('blockquote')
    const step = card ? card.offsetWidth + 20 : track.clientWidth * 0.8
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    track.scrollBy({ left: dir * step, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <Section id="reviews" tone="offer" bare>
      <Wrap>
        <div className="mb-[clamp(2.5rem,6vh,3.5rem)] flex flex-col items-center gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHead
            className="mb-0! whitespace-pre-line md:mx-0 md:items-start md:text-left"
            title={title}
            sub={
              <>
                {metric.prefix}
                <span className="font-bold text-signal-text">{metric.score}</span>
                <span className="text-mute">{metric.suffix}</span>
              </>
            }
          />
          <NavButtons {...edges} onMove={move} className="hidden shrink-0 md:flex" />
        </div>
      </Wrap>
      <Wrap>
        <Reveal>
          <div
            ref={trackRef}
            onScroll={syncEdges}
            className="-my-2 flex snap-x snap-mandatory [scrollbar-width:none] gap-5 overflow-x-auto py-2 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {REVIEWS.map((r) => (
              <blockquote
                key={r.body}
                className="relative flex w-[min(84vw,360px)] shrink-0 snap-start flex-col overflow-hidden rounded-[20px] border border-[#e6e8ee] bg-white p-[clamp(1.4rem,2.4vw,1.75rem)] shadow-[0_1px_2px_#1018280a,0_20px_40px_-30px_#10182840]"
              >
                {/* 우상단 큰 인용 부호 */}
                <svg
                  aria-hidden
                  viewBox="0 0 48 36"
                  className="pointer-events-none absolute top-5 right-5 h-9 w-12 text-signal-light/25"
                  fill="currentColor"
                >
                  <path d="M0 36V22.4C0 9.6 6.7 2.1 18.4 0l1.9 4.7C13.6 6.6 10.4 10.9 10 17h9v19H0Zm27.7 0V22.4C27.7 9.6 34.4 2.1 46.1 0L48 4.7c-6.7 1.9-9.9 6.2-10.3 12.3h9v19h-19Z" />
                </svg>
                {r.rating !== undefined && (
                  <div className="mb-4 flex gap-0.5" role="img" aria-label={`별점 5점 중 ${r.rating}점`}>
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} filled={i < r.rating!} />
                    ))}
                  </div>
                )}
                <p className={`flex-1 text-[15px] leading-[1.7] text-ink ${r.rating === undefined ? 'pt-12' : ''}`}>{r.body}</p>
                <footer className="mt-6 flex items-center gap-3 border-t border-[#eef0f3] pt-5">
                  <span
                    aria-hidden
                    className="flex size-10 shrink-0 items-center justify-center rounded-full bg-signal/10 text-[15px] font-bold text-signal-text"
                  >
                    {r.name.charAt(0)}
                  </span>
                  <span className="min-w-0 leading-tight">
                    <cite className="block text-[14px] font-semibold text-ink not-italic">{r.name}</cite>
                    <span className="mt-1 block truncate text-[12.5px] text-mute">
                      {r.org} · {r.role}
                    </span>
                  </span>
                </footer>
              </blockquote>
            ))}
          </div>
        </Reveal>
        <NavButtons {...edges} onMove={move} className="mt-6 flex justify-center md:hidden" />
      </Wrap>
    </Section>
  )
}
