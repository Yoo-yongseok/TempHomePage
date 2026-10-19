import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { MENUS } from '../../content/menu'
import { COMPANY } from '../../content/site'
import { InstagramIcon, LinkedinIcon, MailIcon, PinIcon, YoutubeIcon } from '../ui/icons'
import { Logo } from './Logo'

// 메뉴 구조 그대로 푸터 컬럼 생성 (하위 메뉴가 없는 카테고리는 자기 자신을 링크로)
const COLUMNS = MENUS.map((menu) => ({
  title: menu.label,
  links: menu.items ?? [{ label: menu.label, to: menu.to! }],
}))

const SOCIALS = [
  { label: '유튜브', icon: <YoutubeIcon /> },
  { label: '인스타그램', icon: <InstagramIcon /> },
  { label: '링크드인', icon: <LinkedinIcon /> },
]

const linkText = 'text-[14px] font-medium leading-[1.5] tracking-[-0.14px]'
const circleBtn =
  'flex size-11 items-center justify-center rounded-full bg-gray-200 text-gray-700 transition-colors hover:bg-gray-300'

/** hover 시 위쪽에 말풍선 툴팁 */
function Tooltip({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="group relative">
      {children}
      <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 w-max max-w-[260px] -translate-x-1/2 rounded-lg bg-gray-900 px-3 py-2 text-center text-[13px] leading-[1.4] font-medium text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100">
        {label}
        <span className="absolute top-full left-1/2 size-0 -translate-x-1/2 border-[5px] border-transparent border-t-gray-900" />
      </span>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="w-full bg-gray-50 px-6 py-[60px] md:px-10 xl:px-0">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-[60px] md:gap-[100px]">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <Link to="/" aria-label="바로잡 홈" className="w-fit">
            <Logo size="lg" />
          </Link>
          <nav className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 lg:flex lg:gap-3">
            {COLUMNS.map((col) => (
              <div key={col.title} className="flex flex-col gap-4 md:w-[100px]">
                <span className={`${linkText} text-gray-400`}>{col.title}</span>
                {col.links.map((link) => (
                  <Link key={link.to} to={link.to} className={`${linkText} whitespace-nowrap text-gray-900`}>
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-6 border-t border-[rgba(82,82,91,0.08)] py-6 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-1.5 text-[12px] leading-[1.6] tracking-[-0.12px] text-gray-400">
            <p>© 2026 {COMPANY.legalName}. All rights reserved.</p>
            <div className="flex flex-wrap gap-x-5 gap-y-1">
              <p>대표자 : {COMPANY.representative}</p>
              <p>사업자등록번호 : {COMPANY.businessNumber}</p>
              <p>통신판매업신고번호 : {COMPANY.commerceNumber}</p>
            </div>
            <p>주소 : {COMPANY.address}</p>
            <div className="flex flex-wrap gap-x-5 gap-y-1">
              <p>전화 : {COMPANY.phone}</p>
              <p>이메일 : {COMPANY.email}</p>
              <p>호스팅서비스 제공 : {COMPANY.hosting}</p>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1">
              <Link to="/terms" className="w-fit text-gray-700 underline-offset-2 hover:underline">
                이용약관
              </Link>
              <Link to="/privacy" className="w-fit font-semibold text-gray-700 underline-offset-2 hover:underline">
                개인정보처리방침
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <Tooltip label={COMPANY.email}>
              <button type="button" aria-label="이메일" className={circleBtn}>
                <MailIcon />
              </button>
            </Tooltip>
            <Tooltip label={COMPANY.address}>
              <button type="button" aria-label="주소" className={circleBtn}>
                <PinIcon />
              </button>
            </Tooltip>
            {SOCIALS.map((s) => (
              <a key={s.label} href="#" aria-label={s.label} className={circleBtn}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
