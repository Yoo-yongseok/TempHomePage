import { useEffect, useRef } from 'react'
import { Placeholder } from '../../components/ui/Placeholder'
import { INTRO } from '../../content/landing/why'
import { Reveal } from './primitives'
import './introQuote.css'

export function IntroQuoteSection() {
  const sectionRef = useRef<HTMLElement>(null)

  // 섹션 top이 뷰포트 하단 → 30% 지점으로 올라오는 동안 --reveal 0→1 (카드 → 풀블리드)
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      section.style.setProperty('--reveal', '1')
      return
    }

    let raf = 0
    const update = () => {
      raf = 0
      const top = section.getBoundingClientRect().top
      const vh = window.innerHeight || 1
      const progress = Math.min(Math.max((vh - top) / (0.7 * vh), 0), 1)
      section.style.setProperty('--reveal', progress.toFixed(3))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  const { quote, author, photoLabel } = INTRO

  return (
    <section id="intro" ref={sectionRef} className="relative h-[clamp(480px,78vh,800px)] overflow-hidden bg-white">
      <div className="intro-quote-frame">
        <div className="absolute inset-0 bg-[#0b1220]">
          <Placeholder palette="dark" tone={4} label={photoLabel} hideLabel hideIcon />
        </div>
        <div aria-hidden className="intro-quote-shade" />
      </div>

      <div className="intro-quote-anchor">
        <Reveal as="figure" className="intro-quote-card">
          <span aria-hidden className="intro-quote-glyph">
            “
          </span>
          <blockquote className="text-[clamp(1.3rem,2.6vw,1.9rem)] leading-[1.42] font-bold tracking-[-0.02em] whitespace-pre-line text-white">
            {quote}
          </blockquote>
          <figcaption className="mt-6 flex items-center gap-3 border-t border-white/15 pt-5">
            <span
              aria-hidden
              className="flex size-9 shrink-0 items-center justify-center rounded-full bg-signal-light/20 text-sm font-bold text-signal-light ring-1 ring-signal-light/40"
            >
              {author.initial}
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block text-[15px] font-semibold text-white">{author.name}</span>
              <span className="mt-1 block text-[13px] text-white/60">{author.role}</span>
            </span>
          </figcaption>
        </Reveal>
      </div>
    </section>
  )
}
