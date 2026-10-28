import Lenis from 'lenis'

let instance: Lenis | null = null

export function initLenis() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null
  instance = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
    smoothWheel: true,
    autoRaf: true,
  })
  return instance
}

export function destroyLenis() {
  instance?.destroy()
  instance = null
}

export function scrollToY(top: number, immediate = false) {
  if (instance) {
    // 페이지가 막 바뀐 직후엔 Lenis가 이전 페이지 높이를 기억하고 있어 아래쪽 위치가 잘린다 → 먼저 다시 잰다
    if (immediate) instance.resize()
    instance.scrollTo(top, { immediate, force: true })
  } else {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top, behavior: immediate || reduced ? 'instant' : 'smooth' })
  }
}

/** 메뉴·모달이 열려 있는 동안 페이지 스크롤을 막는다. */
export function lockScroll(locked: boolean) {
  document.documentElement.style.overflow = locked ? 'hidden' : ''
  if (locked) instance?.stop()
  else instance?.start()
}
