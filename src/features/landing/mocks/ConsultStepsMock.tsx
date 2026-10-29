import { BENEFIT_STEPS as S, type ConsultStepStatus } from '../../../content/landing/groupB'

const DOT: Record<ConsultStepStatus, string> = {
  done: 'bg-signal text-white',
  current: 'border-2 border-signal bg-white',
  upcoming: 'border-2 border-dashed border-gray-300 bg-white',
}

/** 혜택 3 — 1:1 컨설팅 진행 체크리스트 */
export function ConsultStepsMock() {
  const done = S.steps.filter((s) => s.status === 'done').length
  const total = S.steps.length

  return (
    <div className="w-full max-w-[440px] rounded-[20px] border border-[#e6e8ee] bg-white p-5 text-left shadow-[0_1px_2px_#1018280a,0_28px_60px_-30px_#10182847] sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-[15px] font-bold text-ink">{S.label}</span>
          <span className="rounded-full bg-signal/10 px-2 py-0.5 text-[11px] font-semibold text-signal-text">
            {S.chip}
          </span>
        </div>
        <span className="text-[12px] font-semibold text-ink tabular-nums">
          {done}/{total} <span className="font-sans font-medium text-mute">{S.progressSuffix}</span>
        </span>
      </div>

      {/* 진행 바 */}
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={done}
        aria-label={S.label}
        className="mt-3 h-1.5 overflow-hidden rounded-full bg-gray-100"
      >
        <div
          className="h-full rounded-full bg-linear-to-r from-signal to-signal-light"
          style={{ width: `${(done / total) * 100}%` }}
        />
      </div>

      <ol className="mt-5 flex flex-col">
        {S.steps.map((step, i) => {
          const last = i === total - 1
          return (
            <li key={step.title} className="relative flex gap-3.5 pb-4 last:pb-0">
              {/* 단계 사이 연결선 */}
              {!last && (
                <span
                  aria-hidden
                  className={`absolute top-7 bottom-1 left-[11px] w-0.5 rounded-full ${step.status === 'done' ? 'bg-signal/40' : 'bg-gray-200'}`}
                />
              )}
              <span
                aria-hidden
                className={`relative flex size-6 shrink-0 items-center justify-center rounded-full ${DOT[step.status]}`}
              >
                {step.status === 'done' && (
                  <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="m5 12.5 4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                {step.status === 'current' && <span className="size-2 rounded-full bg-signal" />}
              </span>
              <div
                className={`-mt-0.5 flex min-w-0 flex-1 items-center justify-between gap-3 rounded-xl px-3 py-2 ${
                  step.status === 'current' ? 'bg-signal/[0.06] ring-1 ring-signal/20' : ''
                }`}
              >
                <span
                  className={`text-[14px] font-semibold ${step.status === 'upcoming' ? 'text-gray-400' : 'text-ink'}`}
                >
                  {step.title}
                </span>
                <span
                  className={`shrink-0 text-[11.5px] ${step.status === 'current' ? 'font-semibold text-signal-text' : 'text-gray-400'}`}
                >
                  {step.meta}
                </span>
              </div>
            </li>
          )
        })}
      </ol>

      <p className="mt-4 border-t border-[#eef0f3] pt-3.5 text-[12px] font-medium text-mute">{S.note}</p>
    </div>
  )
}
