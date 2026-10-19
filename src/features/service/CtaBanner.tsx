import { ButtonLink } from '../../components/ui/ButtonLink'
import { MultiLine } from '../../components/ui/MultiLine'

// 원본은 파랑→보라→검정 그라데이션 이미지. CSS로 재현
const BANNER_BG =
  'radial-gradient(120% 140% at 0% 0%, #2d4ff0 0%, rgba(45,79,240,0) 55%), radial-gradient(90% 120% at 55% 100%, #5b2bb8 0%, rgba(91,43,184,0) 60%), linear-gradient(100deg, #1d2fb8 0%, #2a1f7a 45%, #15121f 80%, #0c0c10 100%)'

type Props = { text: string; secondary?: { label: string; to: string } }

export function CtaBanner({ text, secondary }: Props) {
  return (
    <section className="flex h-[450px] items-center px-5 md:px-10">
      <div className="mx-auto w-full max-w-[1120px]">
        <div
          className="relative flex flex-col items-start gap-8 overflow-hidden rounded-[12px] p-8 md:flex-row md:items-center md:justify-between md:gap-10 md:p-[60px]"
          style={{ background: BANNER_BG }}
        >
          <p className="text-[22px] leading-[1.2] font-semibold text-balance text-white md:text-[28px]">
            <MultiLine text={text} desktopOnly />
          </p>
          <div className="flex w-fit flex-col gap-3 md:w-auto md:shrink-0 md:flex-row md:flex-wrap">
            <ButtonLink to="/contact" className="w-full md:w-auto">
              문의하기
            </ButtonLink>
            {secondary && (
              <ButtonLink to={secondary.to} variant="white" className="w-full md:w-auto">
                {secondary.label}
              </ButtonLink>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
