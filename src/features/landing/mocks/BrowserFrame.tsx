import { useCallback, type ReactNode } from 'react'
import '../groupB.css'

type Props = {
  /** 바뀔 때마다 화면 내용을 다시 마운트해 전환 애니메이션 재생 */
  screenKey: string
  url: string
  caption: string
  className?: string
  children: ReactNode
}

/** 브라우저 창 목업 — 730×456.25 고정 캔버스를 창 폭에 맞춰 scale */
export function BrowserFrame({ screenKey, url, caption, className = '', children }: Props) {
  const viewportRef = useCallback((el: HTMLDivElement | null) => {
    if (!el) return
    const update = () => el.style.setProperty('--demo-scale', String(el.clientWidth / 730))
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <figure className={`m-0 mx-auto flex w-full max-w-[1480px] flex-col ${className}`}>
      <div className="w-full overflow-hidden rounded-[16px] border border-[#e3e6ec] bg-white shadow-[0_1px_2px_#1018280a,0_30px_60px_-30px_#1018283d,0_12px_24px_-16px_#2563eb1f]">
        <div className="flex h-10 items-center gap-3 border-b border-[#eceef2] bg-gray-50 px-3.5">
          <div aria-hidden className="flex w-12 shrink-0 gap-1.5">
            <span className="size-2.5 rounded-full bg-gray-300" />
            <span className="size-2.5 rounded-full bg-gray-300" />
            <span className="size-2.5 rounded-full bg-gray-300" />
          </div>
          <div className="mx-auto flex min-w-0 items-center gap-1.5 rounded-full border border-[#e3e6ec] bg-white px-3 py-1 text-[11px] text-mute tabular-nums sm:min-w-[220px] sm:justify-center">
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="size-3 shrink-0 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
            >
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d="M8 11V8a4 4 0 0 1 8 0v3" />
            </svg>
            <span key={screenKey} className="curriculum-panel-in truncate">
              {url}
            </span>
          </div>
          <span aria-hidden className="w-12 shrink-0" />
        </div>
        <div
          ref={viewportRef}
          className="curriculum-viewport relative aspect-[16/10] w-full overflow-hidden bg-[#fbfcfe]"
        >
          <div aria-hidden>
            <div key={screenKey} className="curriculum-panel-in h-full w-full">
              {children}
            </div>
          </div>
        </div>
      </div>
      <figcaption
        key={screenKey}
        className="curriculum-panel-in mt-4 flex items-center justify-center gap-2 text-center text-[14px] font-semibold text-signal-text"
      >
        <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-signal" />
        {caption}
      </figcaption>
    </figure>
  )
}
