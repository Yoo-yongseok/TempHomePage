import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { Footer } from '../components/layout/Footer'
import { Gnb } from '../components/layout/Gnb'
import { destroyLenis, initLenis, scrollToY } from '../lib/lenis'

export function Layout() {
  const { pathname } = useLocation()
  // 홈은 히어로가 투명 헤더 아래로 깔리고, 나머지 페이지는 헤더 높이만큼 내린다
  const isHome = pathname === '/'

  useEffect(() => {
    initLenis()
    return destroyLenis
  }, [])

  useEffect(() => {
    scrollToY(0, true)
  }, [pathname])

  return (
    <>
      <Gnb />
      <main className={isHome ? '' : 'pt-[60px]'}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
