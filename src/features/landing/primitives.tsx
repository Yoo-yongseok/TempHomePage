// 랜딩 하단 섹션(2번 사이트 UI) 공용 빌딩 블록

import type { ElementType, ReactNode } from 'react'
import { useReveal } from '../../lib/useReveal'

const TONES = {
  white: 'bg-white text-ink',
  /** .section-gray */
  gray: 'bg-gray-50 text-ink',
  /** .section-dark */
  dark: 'bg-ink text-white',
  /** .offer-pre — 상단 블루 radial + 연한 블루 */
  offer: 'bg-[#eef2fb] bg-[radial-gradient(120%_80%_at_50%_0%,rgba(37,99,235,0.1)_0%,transparent_55%)] text-ink',
}

export type SectionTone = keyof typeof TONES

type SectionProps = {
  id?: string
  tone?: SectionTone
  className?: string
  /** 기본 .wrap(최대 1280px + 반응형 좌우 패딩)을 쓰지 않을 때 */
  bare?: boolean
  children: ReactNode
}

/** .section — 상하 여백 clamp(7rem,15vh,13rem) */
export function Section({ id, tone = 'white', className = '', bare = false, children }: SectionProps) {
  return (
    <section id={id} className={`relative overflow-x-clip py-[clamp(7rem,15vh,13rem)] ${TONES[tone]} ${className}`}>
      {bare ? children : <Wrap>{children}</Wrap>}
    </section>
  )
}

/** .wrap — max-width 1280px, 좌우 clamp(1.25rem,5vw,5rem) */
export function Wrap({ className = '', children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto max-w-[1280px] px-[clamp(1.25rem,5vw,5rem)] ${className}`}>{children}</div>
}

type RevealProps = {
  as?: ElementType
  /** true면 자식들이 80ms 간격으로 차례로 등장 (.reveal-stagger) */
  stagger?: boolean
  className?: string
  children: ReactNode
}

/** 스크롤 진입 시 페이드업 (.reveal / .reveal-stagger) */
export function Reveal({ as: Tag = 'div', stagger = false, className = '', children }: RevealProps) {
  const ref = useReveal<HTMLElement>()
  return (
    <Tag ref={ref} className={`${stagger ? 'reveal-stagger' : 'reveal'} ${className}`}>
      {children}
    </Tag>
  )
}

type SectionHeadProps = { title: ReactNode; sub?: ReactNode; dark?: boolean; className?: string }

/** 섹션 제목 — 가운데 정렬 h2 + 서브카피 (등장 효과는 본문 콘텐츠에만 둔다) */
export function SectionHead({ title, sub, dark = false, className = '' }: SectionHeadProps) {
  return (
    <div
      className={`mx-auto mb-[clamp(2.5rem,6vh,4rem)] flex max-w-[820px] flex-col items-center gap-4 text-center ${className}`}
    >
      <h2
        className={`text-[clamp(2rem,4.4vw,3.1rem)] leading-[1.28] font-bold tracking-[-0.025em] text-balance ${dark ? 'text-white' : 'text-ink'}`}
      >
        {title}
      </h2>
      {sub && (
        <p className={`text-[clamp(1rem,1.5vw,1.2rem)] leading-[1.6] ${dark ? 'text-white/60' : 'text-mute'}`}>{sub}</p>
      )}
    </div>
  )
}

/** 강조 텍스트 (.sig) — 밝은 배경은 signal, 어두운 배경은 #5b9bff */
export function Sig({ dark = false, children }: { dark?: boolean; children: ReactNode }) {
  return <span className={dark ? 'text-signal-light' : 'text-signal'}>{children}</span>
}

/** .card — 흰 카드 + hover 시 살짝 떠오르며 블루 보더 */
export const cardClass =
  'rounded-[18px] border border-[#eceef2] bg-white p-[clamp(1.5rem,2.8vw,2rem)] shadow-[0_1px_2px_#1018280a,0_16px_32px_-20px_#10182824] transition-[box-shadow,transform,border-color] duration-200 ease-brand hover:-translate-y-0.5 hover:border-[#c0d0f5] hover:shadow-[0_1px_2px_#1018280a,0_22px_40px_-22px_#2563eb38]'

/** 모노 라벨 (번호·태그) — 앞에 6px 점 옵션 */
export function MonoLabel({
  dot = false,
  className = '',
  children,
}: {
  dot?: boolean
  className?: string
  children: ReactNode
}) {
  return (
    <span className={`inline-flex items-center gap-2 text-sm font-semibold text-signal-text tabular-nums ${className}`}>
      {dot && <span aria-hidden className="size-1.5 rounded-full bg-signal" />}
      {children}
    </span>
  )
}
