import { DEMO_INTERVIEW as D } from '../../../content/landing/groupB'

/** 3주차 데모 — 모의 면접 피드백 (730×456 캔버스, 브라우저 크롬 목업) */
export function InterviewScreen() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-white text-[#14151a]">
      <div className="flex items-end gap-2 bg-[#dee1e6] pt-2.5 pr-3 pl-4">
        <div className="flex gap-1.5 pb-3">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex max-w-[240px] items-center gap-2 rounded-t-[10px] bg-white px-3 py-2.5 text-[12px] font-semibold">
          <span className="flex size-4 items-center justify-center rounded-[4px] bg-[#2563EB] text-[6px] font-extrabold text-white">
            바로
          </span>
          한국AX협회 모의 면접
          <span className="ml-3 text-[#8b909b]">×</span>
        </div>
      </div>
      <div className="flex min-h-0 flex-1 gap-4 bg-[#fbfbfc] px-5 py-4">
        <div className="flex min-w-0 flex-[1.3] flex-col gap-3">
          <div className="rounded-xl border border-black/[0.07] bg-white p-3.5">
            <p className="text-[13px] font-extrabold">{D.question}</p>
            <div className="mt-2.5 flex items-start gap-2.5">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-[9px] bg-[#DCE8FF] text-[#2f6bff]">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden
                  className="size-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM19 11a7 7 0 0 1-14 0M12 18v3" />
                </svg>
              </span>
              <p className="rounded-2xl rounded-tl-md border border-black/[0.06] bg-[#f6f7f9] px-3.5 py-2.5 text-[12px] leading-[1.55] text-[#4b515c]">
                {D.answer}
              </p>
            </div>
          </div>
          <div className="rounded-xl border border-black/[0.07] bg-white p-3.5">
            <p className="mb-2 text-[11px] font-extrabold tracking-[.03em] text-[#6b7280]">코치 피드백</p>
            {D.feedback.map((f, i) => (
              <div key={f} className="my-1.5 flex items-center gap-2 text-[12.5px] font-semibold">
                <span
                  className={`flex size-[18px] items-center justify-center rounded-full text-[11px] font-extrabold ${i === 0 ? 'bg-[#e6f0ff] text-[#2f6bff]' : 'bg-[#FDE7ED] text-[#E11D48]'}`}
                >
                  {i === 0 ? (
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden
                      className="size-3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m5 12 4.5 4.5L19 7" />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden
                      className="size-3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 7v6M12 17h.01" />
                    </svg>
                  )}
                </span>
                {f}
              </div>
            ))}
          </div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col rounded-xl border border-black/[0.07] bg-white p-3.5">
          <p className="text-[11px] font-extrabold tracking-[.03em] text-[#6b7280]">답변 분석</p>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-[34px] leading-none font-extrabold text-[#2f6bff]">{D.total}</span>
            <span className="text-[13px] font-bold text-[#8b909b]">/ 100</span>
          </div>
          <div className="mt-3 space-y-3">
            {D.scores.map((s) => (
              <div key={s.name}>
                <div className="mb-1.5 flex justify-between text-[12.5px] font-semibold">
                  <span>{s.name}</span>
                  <span>{s.value}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-[5px] bg-[#eceef2]">
                  <div
                    className="h-full rounded-[5px] bg-linear-to-r from-[#2f6bff] to-[#5b8bff]"
                    style={{ width: `${s.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <span className="mt-auto rounded-lg bg-[#e9f0ff] px-[11px] py-1.5 text-center text-[11.5px] font-bold text-[#2f6bff]">
            다음 연습: 전달력 집중 질문 5개
          </span>
        </div>
      </div>
    </div>
  )
}
