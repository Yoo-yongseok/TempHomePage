import { useEffect, useRef } from 'react'

/**
 * 화면에 12% 보이면 1회 `.in` 클래스를 붙인다 (2번 사이트 RevealOnScroll).
 * 대상 요소에 `reveal` 또는 `reveal-stagger` 클래스를 함께 지정한다.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in')
          io.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return ref
}
