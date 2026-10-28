import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { Footer } from '../components/layout/Footer'
import { Gnb } from '../components/layout/Gnb'
import { destroyLenis, initLenis } from '../lib/lenis'
import { useScrollRestoration } from '../lib/useScrollRestoration'

export function Layout() {
  const { pathname } = useLocation()
  // 홈은 히어로가 투명 헤더 아래로 깔리고, 나머지 페이지는 헤더 높이만큼 내린다
  const isHome = pathname === '/'

  useEffect(() => {
    initLenis()
    return destroyLenis
  }, [])

  // 새 페이지는 맨 위에서, 뒤로가기로 돌아오면 보던 위치에서 시작
  useScrollRestoration()

  return (
    <>
      <Gnb />
      {/* key: 경로가 바뀔 때마다 본문+푸터를 다시 마운트해 부드럽게 떠오르며 전환 (헤더는 고정) */}
      <div key={pathname} className="animate-page-in motion-reduce:animate-none">
        <main className={isHome ? '' : 'pt-[60px]'}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  )
}
