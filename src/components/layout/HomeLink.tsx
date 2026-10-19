import type { ComponentProps } from 'react'
import { Link, useLocation } from 'react-router'
import { COMPANY } from '../../content/site'
import { scrollToY } from '../../lib/lenis'

type Props = Omit<ComponentProps<typeof Link>, 'to'> & {
  /** false면 스크롤을 직접 하지 않음 (부모가 스크롤 잠금을 푼 뒤 처리할 때) */
  scrollOnHome?: boolean
}

/** 로고 링크 — 다른 페이지에선 홈으로 이동, 홈에선 맨 위로 부드럽게 스크롤 */
export function HomeLink({ onClick, scrollOnHome = true, ...props }: Props) {
  const { pathname } = useLocation()

  return (
    <Link
      to="/"
      aria-label={`${COMPANY.name} 홈`}
      onClick={(e) => {
        onClick?.(e)
        if (pathname === '/') {
          e.preventDefault()
          if (scrollOnHome) scrollToY(0)
        }
      }}
      {...props}
    />
  )
}
