const SIZES = {
  md: { mark: 'h-[18px]', text: 'text-[21px]', box: 'h-7' },
  lg: { mark: 'h-6', text: 'text-[26px] md:text-[31px]', box: 'h-10' },
}

/** 임시 로고 심볼 */
export function LogoMark({ className = 'h-[18px]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 20" className={`${className} w-auto shrink-0`} aria-hidden>
      <path d="M2 18 10 2h6L8 18z" fill="#2d64fa" />
      <path d="M14 18 22 2h4l-8 16z" fill="#f6c205" />
    </svg>
  )
}

/** 임시 로고 — 정식 로고가 나오면 SVG로 교체 */
export function Logo({ light = false, size = 'md' }: { light?: boolean; size?: keyof typeof SIZES }) {
  const s = SIZES[size]
  return (
    <span className={`flex items-center gap-2 ${s.box}`}>
      <LogoMark className={s.mark} />
      <span
        className={`${s.text} leading-none font-extrabold tracking-[-0.04em] transition-colors duration-200`}
        style={{ color: light ? '#ffffff' : '#16171b' }}
      >
        바로잡
      </span>
    </span>
  )
}
