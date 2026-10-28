import { DEMO_REPORT as R } from '../../../content/landing/groupB'

const LABEL = 'mb-3 text-[12px] font-extrabold tracking-[.03em] text-[#6b7280]'

/** 1단계 데모 — 조직 AI 활용도 진단 리포트 (730×456 캔버스) */
export function ReportScreen() {
  return (
    <div className="flex h-full w-full flex-col bg-[#fbfcfe] px-[30px] py-[26px] text-[#14151a]">
      <div className="flex items-baseline justify-between border-b-[1.5px] border-[#eceef2] pb-3.5">
        <h3 className="text-[21px] font-extrabold tracking-[-.01em]">{R.title}</h3>
        <span className="text-[12.5px] font-semibold text-[#8b909b]">{R.meta}</span>
      </div>
      <div className="mt-5 grid flex-1 grid-cols-2 gap-x-[26px] gap-y-[22px]">
        <div>
          <p className={LABEL}>{R.labels.overall}</p>
          <div className="flex items-center gap-[22px]">
            <div
              className="flex size-[104px] shrink-0 items-center justify-center rounded-full"
              style={{ background: `conic-gradient(#2f6bff 0 ${R.score}%, #f2647c ${R.score}% 100%)` }}
            >
              <div className="flex size-[70px] items-center justify-center rounded-full bg-[#fbfcfe] text-[20px] font-extrabold text-[#2f6bff]">
                {R.score}%
              </div>
            </div>
            <div className="text-[13.5px] font-semibold">
              <div className="my-[7px] flex items-center gap-2">
                <span className="size-[11px] rounded-[3px] bg-[#2f6bff]" />
                {R.labels.done} {R.score}%
              </div>
              <div className="my-[7px] flex items-center gap-2">
                <span className="size-[11px] rounded-[3px] bg-[#f2647c]" />
                {R.labels.gap} {100 - R.score}%
              </div>
            </div>
          </div>
        </div>
        <div>
          <p className={LABEL}>{R.labels.skills}</p>
          {R.skills.map((s, i) => (
            <div key={s.name} className="my-[11px]">
              <div className="mb-1.5 flex justify-between text-[13px] font-semibold">
                <span>
                  <span className="mr-[7px] font-extrabold text-[#2f6bff]">{i + 1}</span>
                  {s.name}
                </span>
                <span>
                  {s.value}
                  {R.labels.unit}
                </span>
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
        <div className="col-span-2 flex items-center gap-3.5 border-t-[1.5px] border-[#eceef2] pt-4">
          {R.actions.map((a) => (
            <div key={a} className="flex items-center gap-2 text-[13.5px] font-semibold">
              <span className="flex size-[19px] items-center justify-center rounded-full bg-[#e6f0ff] text-[12px] font-extrabold text-[#2f6bff]">
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
              </span>
              {a}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex gap-2.5">
        <span className="rounded-lg bg-[#e9f0ff] px-[11px] py-1.5 text-[12px] font-bold text-[#2f6bff]">
          {R.chips[0]}
        </span>
        <span className="rounded-lg bg-[#f0f2f5] px-[11px] py-1.5 text-[12px] font-bold text-[#6b7280]">
          {R.chips[1]}
        </span>
      </div>
    </div>
  )
}
