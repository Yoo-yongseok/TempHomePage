import { NEWS_BOARDS } from './news'
import { SERVICES } from './services'

export type MenuItem = { label: string; to: string; external?: boolean; chip?: string }
export type Menu = { label: string; to?: string; items?: MenuItem[] }

export const servicePath = (slug: string) => `/service/${slug}`
export const newsPath = (slug: string) => `/news/${slug}`

// 메뉴는 콘텐츠 데이터에서 만든다 — 서비스·게시판을 추가하면 메뉴·라우트·푸터에 자동 반영
export const MENUS: Menu[] = [
  { label: '서비스', items: SERVICES.map((s) => ({ label: s.name, to: servicePath(s.slug) })) },
  { label: '자격증', to: '/certificate' },
  { label: '소식', items: NEWS_BOARDS.map((b) => ({ label: b.name, to: newsPath(b.slug), chip: b.chip })) },
  { label: '소개', to: '/about' },
]
