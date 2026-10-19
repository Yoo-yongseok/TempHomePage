import { LogoMark } from '../../components/layout/Logo'
import { ButtonLink } from '../../components/ui/ButtonLink'
import { Placeholder } from '../../components/ui/Placeholder'
import { RiseText } from '../../components/ui/RiseText'
import type { Service } from '../../content/services'

export function ServiceHero({ service }: { service: Service }) {
  const { hero, name } = service

  return (
    <section className="relative flex h-[calc(100dvh-60px)] items-start justify-center overflow-hidden bg-white px-5 pt-[100px] md:h-[800px] md:px-10">
      {/* 하단 사진 + 위쪽으로 흰색 페이드 (원본은 페이드가 포함된 배경 이미지) */}
      <div aria-hidden className="absolute right-0 bottom-0 aspect-video w-[175%] md:w-full">
        <Placeholder tone={1} label="" hideIcon />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-b from-white from-20% via-white/60 via-45% to-transparent to-70%"
      />
      <span className="absolute bottom-6 left-6 rounded-full bg-black/10 px-3 py-1.5 text-[12px] font-semibold text-gray-600 backdrop-blur-sm md:bottom-8 md:left-10">
        히어로 사진 영역
      </span>

      <div className="relative mx-auto flex max-w-[1120px] flex-col items-center gap-10 text-center md:gap-20">
        <div className="flex flex-col items-center gap-5">
          <div className="flex items-center gap-3">
            <LogoMark className="h-[24.6px]" />
            <span className="text-[20px] leading-[1.2] font-bold text-primary md:text-[28px]">{name}</span>
          </div>
          <h1 className="text-[30px] leading-[1.2] font-bold text-balance text-gray-900 md:text-[48px]">
            <RiseText text={hero.title} />
          </h1>
          <p className="text-[16px] leading-[1.3] text-gray-500 md:text-[20px] md:leading-[1.2]">{hero.subtitle}</p>
        </div>

        <div className="flex w-fit flex-col gap-3 md:w-auto md:flex-row md:flex-wrap md:items-center md:justify-center">
          <ButtonLink to="/contact" className="w-full md:w-auto">
            문의하기
          </ButtonLink>
          {hero.secondaryCta && (
            <ButtonLink to={hero.secondaryCta.to} variant="glass" className="w-full md:w-auto">
              {hero.secondaryCta.label}
            </ButtonLink>
          )}
        </div>
      </div>
    </section>
  )
}
