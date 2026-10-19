import { Fragment, useEffect, useState } from 'react'
import { ButtonLink } from '../../components/ui/ButtonLink'
import { Placeholder } from '../../components/ui/Placeholder'
import { HERO_TRUST } from '../../content/home'
import './home.css'

const SLIDES = 5
const INTERVAL = 3000

export function Hero() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setCurrent((i) => (i + 1) % SLIDES), INTERVAL)
    return () => clearInterval(id)
  }, [])

  // 직전 장을 z-1에 남겨 두어 틈 없이 크로스페이드
  const prev = (current + SLIDES - 1) % SLIDES

  return (
    <section
      data-gnb-theme="dark"
      className="relative flex aspect-[1280/700] max-h-[100dvh] min-h-[560px] w-full flex-col items-center justify-center overflow-hidden"
    >
      <div aria-hidden className="absolute inset-0 isolate">
        {Array.from({ length: SLIDES }, (_, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
              i === current ? 'z-[2] opacity-100' : i === prev ? 'z-[1] opacity-100' : 'z-0 opacity-0'
            }`}
          >
            <Placeholder palette="dark" tone={i} label="" hideIcon />
            <span className="absolute bottom-6 left-6 rounded-full bg-black/25 px-3 py-1.5 text-[12px] font-semibold text-white/70 backdrop-blur-sm md:bottom-8 md:left-10">
              히어로 이미지 {String(i + 1).padStart(2, '0')} / {String(SLIDES).padStart(2, '0')}
            </span>
          </div>
        ))}
        <div className="absolute inset-0 z-[3] bg-[rgba(24,24,27,0.48)]" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-10 px-5 md:gap-[60px] md:px-10">
        <div className="flex flex-col items-center gap-4 text-center md:gap-5">
          <h1 className="text-[32px] leading-[1.2] font-bold tracking-[-0.5px] text-white 3xl:text-[67px]! md:text-[56px] md:tracking-normal">
            커리어 고민의 끝,
            <br />
            한국AX협회
          </h1>
          <p className="text-[16px] leading-[1.5] font-normal tracking-[-0.16px] text-white/90 md:text-[18px] md:leading-[1.4] md:tracking-[-0.18px]">
            자격증부터 취업까지 한 번에 연결하는 <br className="md:hidden" />
            커리어 종합 플랫폼입니다
          </p>
        </div>
        <div className="flex flex-col items-center gap-5 md:gap-6">
          <div className="flex flex-wrap items-center justify-center gap-3 3xl:gap-[14px]">
            <ButtonLink to="/contact" size="hero">
              문의하기
            </ButtonLink>
            <ButtonLink to="/documents" size="hero" variant="outlineOnDark">
              소개자료 받기
            </ButtonLink>
          </div>
          <p className="flex items-center gap-2.5 text-[13px] leading-[1.4] font-medium tracking-[-0.1px] text-white/70 md:text-[14px]">
            {HERO_TRUST.map((text, i) => (
              <Fragment key={text}>
                {i > 0 && <span aria-hidden className="size-[3px] rounded-full bg-white/50" />}
                <span>{text}</span>
              </Fragment>
            ))}
          </p>
        </div>
      </div>

      {/* 스크롤 안내 (모바일 숨김) */}
      <div aria-hidden className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 3xl:bottom-10 md:block">
        <div className="flex h-[34px] w-[22px] justify-center rounded-full border-[1.5px] border-white/60 pt-[7px]">
          <span className="scroll-cue-dot block size-1 rounded-full bg-white/60" />
        </div>
      </div>
    </section>
  )
}
