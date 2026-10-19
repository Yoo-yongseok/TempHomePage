import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { MENUS } from '../../content/menu'
import { useMediaQuery, useScrolledPast } from '../../lib/hooks'
import { lockScroll } from '../../lib/lenis'
import { ArrowUpRight, ChevronDown } from '../ui/icons'
import { Logo } from './Logo'

const ExternalIcon = () => <ArrowUpRight className="ml-1 size-3.5" />

function Chip({ children }: { children: string }) {
  return (
    <span className="ml-1.5 rounded-full bg-primary/10 px-1.5 py-1 text-[10px] leading-[1.2] font-semibold text-primary">
      {children}
    </span>
  )
}

export function Gnb() {
  const { pathname } = useLocation()
  const scrolled = useScrolledPast(8)
  const canHover = useMediaQuery('(hover: hover)')

  const [open, setOpen] = useState<number | null>(null)
  // 닫히는 동안에도 내용을 유지하기 위해 마지막으로 연 메뉴를 기억
  const [shown, setShown] = useState<number | null>(null)
  const [panelHeight, setPanelHeight] = useState(0)
  const [panelPadLeft, setPanelPadLeft] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<number | null>(null)

  const buttonRefs = useRef<(HTMLElement | null)[]>([])
  const panelInnerRef = useRef<HTMLDivElement>(null)

  const transparent = pathname === '/' && !scrolled && open === null && !mobileOpen

  const openMenu = (i: number) => {
    setShown(i)
    setOpen(i)
  }

  useLayoutEffect(() => {
    if (open === null) return
    const btn = buttonRefs.current[open]
    if (btn) setPanelPadLeft(btn.getBoundingClientRect().left + 12)
    setPanelHeight(panelInnerRef.current?.offsetHeight ?? 0)
  }, [open])

  // 페이지 이동 시 메뉴 닫기
  const [prevPath, setPrevPath] = useState(pathname)
  if (prevPath !== pathname) {
    setPrevPath(pathname)
    setOpen(null)
    setMobileOpen(false)
  }

  useEffect(() => {
    const onResize = () => setOpen(null)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    lockScroll(mobileOpen)
    return () => lockScroll(false)
  }, [mobileOpen])

  const textColor = transparent ? '#ffffff' : '#3c3f47'
  const shownItems = shown !== null ? (MENUS[shown].items ?? []) : []

  return (
    <>
      {/* 메가메뉴 열림 시 화면 dim */}
      <div
        aria-hidden
        className={`fixed inset-0 z-40 hidden transition-opacity duration-300 ease-out md:block ${open !== null ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        onMouseEnter={() => setOpen(null)}
        onClick={() => setOpen(null)}
      />

      <nav
        className={`fixed top-0 right-0 left-0 z-50 transition-[background-color,box-shadow] duration-200 ease-out ${transparent ? '' : 'backdrop-blur-md'}`}
        style={{
          backgroundColor: transparent ? 'transparent' : '#ffffff',
          boxShadow: scrolled ? '0 2px 12px rgba(22,23,27,0.06)' : 'none',
        }}
        onMouseLeave={() => canHover && setOpen(null)}
      >
        <div className="relative mx-auto flex h-[60px] w-full max-w-[1200px] items-center justify-between px-5 md:px-4 lg:px-10 xl:px-0">
          <Link to="/" aria-label="바로잡 홈" onMouseEnter={() => canHover && setOpen(null)}>
            <Logo light={transparent} />
          </Link>

          {/* 카테고리 — 헤더 정중앙 */}
          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex lg:gap-3 xl:gap-5">
            {MENUS.map((menu, i) => {
              const cls =
                'flex items-center gap-1 whitespace-nowrap rounded-full px-1.5 py-1 text-[16px] leading-[1.5] tracking-[-0.16px] transition-colors xl:px-3'
              const style = { color: textColor, backgroundColor: open === i ? '#f6f7f9' : 'transparent' }

              if (!menu.items) {
                return (
                  <Link
                    key={menu.label}
                    ref={(el) => {
                      buttonRefs.current[i] = el
                    }}
                    to={menu.to!}
                    className={cls}
                    style={style}
                    onMouseEnter={() => canHover && setOpen(null)}
                  >
                    {menu.label}
                  </Link>
                )
              }
              return (
                <button
                  key={menu.label}
                  ref={(el) => {
                    buttonRefs.current[i] = el
                  }}
                  type="button"
                  className={cls}
                  style={style}
                  aria-expanded={open === i}
                  onMouseEnter={() => canHover && openMenu(i)}
                  onFocus={() => canHover && openMenu(i)}
                  onClick={() => (open === i ? setOpen(null) : openMenu(i))}
                >
                  {menu.label}
                </button>
              )
            })}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              to="/documents"
              className={`hidden h-10 items-center justify-center rounded-full border px-2.5 text-[14px] font-semibold transition-colors md:flex xl:px-5 ${
                transparent
                  ? 'border-white/40 text-white hover:bg-white/10'
                  : 'border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              소개자료 받기
            </Link>
            <Link
              to="/contact"
              className="hidden h-10 items-center justify-center rounded-full bg-primary px-4 text-[14px] font-semibold text-white transition-colors hover:bg-primary-hover md:flex xl:px-5"
            >
              문의하기
            </Link>

            {/* 모바일 햄버거 */}
            <button
              type="button"
              aria-label={mobileOpen ? '메뉴 닫기' : '메뉴 열기'}
              className="flex size-11 items-center justify-center md:hidden"
              style={{ color: transparent ? '#ffffff' : '#16171b' }}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span className="relative block size-6">
                <span
                  className="absolute right-[3.5px] left-[3.5px] h-[1.5px] rounded-full bg-current transition-transform duration-200 ease-out"
                  style={{ top: 6.75, transform: mobileOpen ? 'translateY(4.5px) rotate(45deg)' : 'none' }}
                />
                <span
                  className="absolute right-[3.5px] left-[3.5px] h-[1.5px] rounded-full bg-current transition-transform duration-200 ease-out"
                  style={{ top: 15.75, transform: mobileOpen ? 'translateY(-4.5px) rotate(-45deg)' : 'none' }}
                />
              </span>
            </button>
          </div>
        </div>

        {/* 데스크톱 메가메뉴 패널 */}
        <div
          className="absolute top-full right-0 left-0 hidden overflow-hidden bg-white transition-[height,opacity] duration-300 ease-out md:block"
          style={{
            height: open !== null ? panelHeight : 0,
            opacity: open !== null ? 1 : 0,
            borderBottom: open !== null ? '1px solid rgba(82,82,91,0.08)' : 'none',
          }}
        >
          <div ref={panelInnerRef} className="py-5" style={{ paddingLeft: panelPadLeft }}>
            <div className="flex w-[180px] flex-col items-start gap-2">
              {shownItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center py-2 text-[16px] leading-[1.5] font-medium tracking-[-0.16px] text-gray-900 transition-opacity hover:opacity-70"
                >
                  {item.label}
                  {item.external && <ExternalIcon />}
                  {item.chip && <Chip>{item.chip}</Chip>}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* 모바일 메뉴 패널 */}
      <div
        className={`fixed inset-x-0 top-[60px] bottom-0 z-40 flex-col overflow-y-auto bg-white md:hidden ${mobileOpen ? 'flex' : 'hidden'}`}
        data-lenis-prevent
      >
        <div className="flex-1">
          {MENUS.map((menu, i) => {
            const rowCls =
              'flex w-full items-center gap-[10px] px-6 py-5 text-[16px] font-semibold leading-[1.5] tracking-[-0.16px] text-gray-900'
            if (!menu.items) {
              return (
                <Link key={menu.label} to={menu.to!} className={rowCls}>
                  {menu.label}
                </Link>
              )
            }
            const expanded = mobileExpanded === i
            return (
              <div key={menu.label}>
                <button type="button" className={rowCls} onClick={() => setMobileExpanded(expanded ? null : i)}>
                  {menu.label}
                  <ChevronDown
                    className={`size-[18px] transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
                  />
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <div className="flex flex-col bg-gray-50 px-6 py-2">
                      {menu.items.map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          className="flex h-12 items-center py-3 text-[16px] text-gray-700"
                        >
                          {item.label}
                          {item.external && <ExternalIcon />}
                          {item.chip && <Chip>{item.chip}</Chip>}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="flex flex-col gap-3 p-5">
          <Link
            to="/documents"
            className="flex h-12 items-center justify-center rounded-full border border-gray-200 text-[16px] font-semibold text-gray-700"
          >
            소개자료 받기
          </Link>
          <Link
            to="/contact"
            className="flex h-12 items-center justify-center rounded-full bg-primary text-[16px] font-semibold text-white"
          >
            문의하기
          </Link>
        </div>
      </div>
    </>
  )
}
