import { Route, Routes } from 'react-router'
import { ContactPage } from '../pages/ContactPage'
import { HomePage } from '../pages/HomePage'
import { NewsPage } from '../pages/NewsPage'
import { PlaceholderPage } from '../pages/PlaceholderPage'
import { ServicePage } from '../pages/ServicePage'
import { Layout } from './Layout'

// 아직 기획되지 않은 페이지들 — 내용이 정해지면 전용 페이지로 교체
const PLACEHOLDERS = [
  { path: 'about', title: '소개' },
  { path: 'documents', title: '소개서 받기' },
  { path: 'terms', title: '이용약관' },
  { path: 'privacy', title: '개인정보처리방침' },
]

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="service/:slug" element={<ServicePage />} />
        <Route path="news/:slug" element={<NewsPage />} />
        <Route path="contact" element={<ContactPage />} />
        {PLACEHOLDERS.map((p) => (
          <Route key={p.path} path={p.path} element={<PlaceholderPage title={p.title} />} />
        ))}
        <Route path="*" element={<PlaceholderPage title="페이지를 찾을 수 없습니다" />} />
      </Route>
    </Routes>
  )
}
