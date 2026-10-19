import { ChevronLeft, ChevronRight } from '../../components/ui/icons'

const btn =
  'flex h-8 items-center justify-center gap-1 rounded-[8px] px-3.5 text-[14px] font-medium tracking-[-0.14px] transition-colors'
const idle = 'text-[#18181b] hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50'

type Props = { page: number; total: number; onChange: (page: number) => void }

export function Pagination({ page, total, onChange }: Props) {
  if (total <= 1) return null

  return (
    <nav aria-label="페이지" className="flex items-center justify-center gap-2">
      <button type="button" className={`${btn} ${idle}`} disabled={page === 1} onClick={() => onChange(page - 1)}>
        <ChevronLeft />
        이전
      </button>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            type="button"
            aria-current={n === page ? 'page' : undefined}
            className={`${btn} ${n === page ? 'bg-[#1571f3] text-white' : idle}`}
            onClick={() => onChange(n)}
          >
            {n}
          </button>
        ))}
      </div>
      <button type="button" className={`${btn} ${idle}`} disabled={page === total} onClick={() => onChange(page + 1)}>
        다음
        <ChevronRight className="size-4" />
      </button>
    </nav>
  )
}
