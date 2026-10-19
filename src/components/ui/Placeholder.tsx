import type { CSSProperties } from 'react'
import { ImageIcon } from './icons'

const PALETTES = {
  // 갤러리·모달용 차분한 톤
  light: [
    ['#e3e8f2', '#cdd6e6'],
    ['#e6e3ef', '#d3cde3'],
    ['#dfeae7', '#c8dcd6'],
    ['#eee7de', '#e0d4c4'],
    ['#e4e7eb', '#cfd4da'],
    ['#efe2e4', '#e1ccd0'],
  ],
  // 흑백→컬러 전환이 보이도록 채도 있는 톤 (솔루션 섹션)
  vivid: [
    ['#a9c1f5', '#6f93e6'],
    ['#9fd9e6', '#5fb2cc'],
    ['#a7d8cf', '#6fb5a8'],
  ],
  // 히어로 배경용 어두운 톤
  dark: [
    ['#3b465e', '#1d2230'],
    ['#4a4258', '#221d2b'],
    ['#33504f', '#1a2626'],
    ['#55493c', '#28221b'],
    ['#3d4a63', '#191d27'],
  ],
}

type Props = {
  label?: string
  tone?: number
  palette?: keyof typeof PALETTES
  hideLabel?: boolean
  hideIcon?: boolean
  compact?: boolean
  className?: string
  style?: CSSProperties
}

/** 실제 사진이 들어갈 자리 */
export function Placeholder({
  label = '사진 영역',
  tone = 0,
  palette = 'light',
  hideLabel = false,
  hideIcon = false,
  compact = false,
  className = '',
  style,
}: Props) {
  const colors = PALETTES[palette]
  const [from, to] = colors[tone % colors.length]
  const fg = palette === 'light' ? 'rgba(22,23,27,0.34)' : 'rgba(255,255,255,0.6)'

  return (
    <div
      className={`relative flex size-full items-center justify-center overflow-hidden select-none ${className}`}
      style={{ background: `linear-gradient(135deg, ${from}, ${to})`, color: fg, ...style }}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        {!hideIcon && <ImageIcon className={compact ? 'size-6' : 'size-9'} />}
        {label && (
          <span
            className={`font-semibold whitespace-nowrap transition-opacity duration-300 ${compact ? 'text-[11px]' : 'text-[13px]'} ${hideLabel ? 'opacity-0' : 'opacity-100'}`}
          >
            {label}
          </span>
        )}
      </div>
    </div>
  )
}
