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
  if (instance) instance.scrollTo(top, { immediate })
  else window.scrollTo({ top, behavior: immediate ? 'instant' : 'smooth' })
}

/** 메뉴·모달이 열려 있는 동안 페이지 스크롤을 막는다. */
export function lockScroll(locked: boolean) {
  document.documentElement.style.overflow = locked ? 'hidden' : ''
  if (locked) instance?.stop()
  else instance?.start()
}
