import { useEffect, useLayoutEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router'
import { scrollToY } from './lenis'

// 히스토리 항목(location.key)별 스크롤 위치 — 새로고침 후 뒤로가기에도 남도록 sessionStorage에 보관
const STORAGE_KEY = 'scroll-positions'
const positions = new Map<string, number>(readStored())
/** 지금 화면에 보이는 히스토리 항목 — 페이지가 그려지는 순간(layout effect) 바로 바뀐다 */
let activeKey = ''

function readStored(): [string, number][] {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? '[]')
  } catch {
    return []
  }
}

function store() {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify([...positions].slice(-50)))
  } catch {
    // 저장소를 못 쓰는 환경(시크릿 모드 등)에서는 메모리에만 둔다
  }
}

/**
 * 새 페이지로 이동하면 맨 위에서 시작하고,
 * 뒤로가기·앞으로가기(POP)로 돌아오면 그 페이지에서 보던 위치로 되돌린다.
 */
export function useScrollRestoration() {
  const { key } = useLocation()
  const navType = useNavigationType()

  // 브라우저 기본 복원은 끈다 (Lenis·페이지 전환과 충돌)
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
  }, [])

  // 현재 항목의 스크롤 위치를 계속 기록.
  // 페이지가 바뀐 직후(새 페이지 높이로 잘리거나 맨 위로 이동할 때) 나오는 스크롤 이벤트가
  // 이전 항목의 위치를 덮어쓰지 않도록, 지금 보고 있는 항목일 때만 기록한다.
  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        if (activeKey === key) positions.set(key, window.scrollY)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
      store()
    }
  }, [key])

  // 화면을 그리기 전에 위치를 맞춰 맨 위가 잠깐 보이는 깜빡임을 막는다
  useLayoutEffect(() => {
    activeKey = key
    scrollToY(navType === 'POP' ? (positions.get(key) ?? 0) : 0, true)
  }, [key, navType])
}
