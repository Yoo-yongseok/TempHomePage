import { useEffect, useState } from 'react'
import { ButtonLink } from '../../components/ui/ButtonLink'
import { CTA, FLOATING } from '../../content/landing/groupD'
import { useScrolledPast } from '../../lib/hooks'
import { Wrap } from './primitives'

/** 하단 문의 섹션(#contact)이 화면에 보이는 동안 true — 폼을 가리지 않도록 플로팅 CTA를 숨긴다 */
function useContactInView() {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = document.getElementById('contact')
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.05 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return inView
}

// 헤더(z-50)·모달(z-[100])보다 아래에 깔리도록 z-40
export function FloatingCta() {
  const contactInView = useContactInView()
  const showBar = useScrolledPast(900) && !contactInView
  const showSticky = useScrolledPast(600) && !contactInView

  return (
    <>
      {/* md 이상: 하단 중앙 알약 바 */}
      <div
        aria-hidden={!showBar}
        inert={!showBar}
        className={`fixed bottom-6 left-1/2 z-40 hidden -translate-x-1/2 transition-all duration-300 motion-reduce:transition-none md:block ${
          showBar ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        <div className="flex items-center gap-4 rounded-full border border-rule bg-white/90 p-2 pl-6 shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur">
          <span className="text-[15px] font-semibold whitespace-nowrap text-ink">{FLOATING.copy}</span>
          <ButtonLink to={CTA.to} variant="signal" size="box" className="rounded-full!">
            {CTA.label}
          </ButtonLink>
        </div>
      </div>

      {/* md 미만: 하단 고정 바 슬라이드업 */}
      <div
        aria-hidden={!showSticky}
        inert={!showSticky}
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-rule bg-white/95 p-3 backdrop-blur transition-transform duration-300 motion-reduce:transition-none md:hidden ${
          showSticky ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <Wrap>
          <ButtonLink to={CTA.to} variant="signal" size="box" className="w-full">
            {CTA.label}
          </ButtonLink>
        </Wrap>
      </div>
    </>
  )
}
