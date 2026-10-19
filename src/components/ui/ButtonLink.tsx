import type { ReactNode } from 'react'
import { Link } from 'react-router'

const VARIANTS = {
  primary: 'bg-primary text-white hover:bg-primary-hover',
  /** 어두운 배경 위 반투명 테두리 버튼 (홈 히어로) */
  outlineOnDark: 'border border-white/[0.48] bg-white/[0.08] text-white hover:bg-white/[0.16]',
  /** 밝은 사진 위 반투명 흰 버튼 (서비스 히어로) */
  glass: 'bg-white/60 text-gray-900 hover:bg-white/80',
  white: 'bg-white text-gray-900 hover:bg-[#f0f1f3]',
  /** 2번 사이트 .btn-primary — hover 시 살짝 떠오르며 블루 그림자 */
  signal:
    'border-[1.5px] border-signal bg-signal text-white hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(37,99,235,0.25)] active:scale-[0.97]',
  /** 2번 사이트 .btn-secondary (밝은 배경) */
  outlineInk: 'border-[1.5px] border-ink text-ink hover:bg-ink hover:text-white active:scale-[0.97]',
  /** 2번 사이트 .btn-secondary-dark (어두운 배경) */
  outlineWhite: 'border-[1.5px] border-white text-white hover:bg-white hover:text-ink active:scale-[0.97]',
}

const SIZES = {
  /** 홈 히어로 — 1920px 이상에서 확대 */
  hero: 'rounded-[40px] px-6 py-4 text-[16px] font-bold leading-[1.4] tracking-[-0.18px] md:text-[18px] 3xl:rounded-[48px] 3xl:px-[29px] 3xl:py-[19px] 3xl:text-[22px]!',
  lg: 'rounded-[40px] px-6 py-4 text-[18px] font-semibold leading-[1.4] tracking-[-0.18px]',
  md: 'rounded-[40px] px-6 py-3.5 text-[16px] font-bold leading-[1.4] tracking-[-0.18px] md:text-[18px]',
  sm: 'rounded-[40px] px-5 py-3 text-[15px] font-semibold',
  /** 랜딩 하단 버튼 — 라운드 12px */
  box: 'min-h-11 rounded-xl px-[1.6rem] py-[0.95rem] text-base font-semibold',
  boxLg: 'min-h-11 rounded-xl px-[2.2rem] py-[1.1rem] text-[1.15rem] font-semibold',
}

type Props = {
  to: string
  variant?: keyof typeof VARIANTS
  size?: keyof typeof SIZES
  className?: string
  children: ReactNode
}

export function ButtonLink({ to, variant = 'primary', size = 'lg', className = '', children }: Props) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center justify-center gap-1 transition-[color,background-color,border-color,box-shadow,transform] duration-150 ease-brand ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
    >
      {children}
    </Link>
  )
}
