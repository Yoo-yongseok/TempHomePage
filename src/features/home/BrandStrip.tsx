import type { CSSProperties } from 'react'
import { BRAND_SIZES } from '../../content/home'

// 2번 사이트 로고 마퀴 규격: 높이 2.4rem·최대 폭 7.5rem (640px 미만은 1.6rem·5.5rem)
const fit = (w: number, h: number, maxH: number, maxW: number) => {
  const width = Math.min(maxW, (w * maxH) / h)
  return { width, height: (width * h) / w }
}

const LOGOS = BRAND_SIZES.map(([w, h]) => {
  const lg = fit(w, h, 38.4, 120)
  const sm = fit(w, h, 25.6, 88)
  return { '--w': `${lg.width}px`, '--h': `${lg.height}px`, '--w-sm': `${sm.width}px`, '--h-sm': `${sm.height}px` }
})

/** 파트너 로고 띠 — 로고가 오른쪽→왼쪽으로 끝없이 흐름 (로고 자리만 표시) */
export function BrandStrip() {
  return (
    <section className="w-full bg-gray-50 px-6 py-6 md:px-[60px] md:py-10">
      <div
        role="img"
        aria-label="파트너 기업 로고"
        className="group mx-auto w-full max-w-[1200px] overflow-hidden mask-[linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]"
      >
        {/* 같은 로고 묶음을 두 번 이어 붙이고 -50%만큼 이동 → 이음매 없이 반복 */}
        <div className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-8">
          {[0, 1].flatMap((set) =>
            LOGOS.map((size, i) => (
              <div
                key={`${set}-${i}`}
                aria-hidden={set === 1}
                className={`mr-6 flex h-(--h-sm) w-(--w-sm) flex-none items-center justify-center rounded-sm bg-[#e1e3e8] text-[9px] font-bold tracking-[0.08em] text-gray-400 sm:mr-[clamp(2rem,4vw,3rem)] sm:h-(--h) sm:w-(--w) ${set === 1 ? 'motion-reduce:hidden' : ''}`}
                style={size as CSSProperties}
              >
                <span className="hidden sm:inline">LOGO</span>
              </div>
            )),
          )}
        </div>
      </div>
    </section>
  )
}
