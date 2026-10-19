import { DEMO_RESUME as R } from '../../../content/landing/groupB'

const LABEL = 'mb-[9px] text-[11px] font-extrabold tracking-[.04em] text-[#7a818e]'

/** 2주차 데모 — 이력서 + 코치 첨삭 (730×456 캔버스, 도트 그리드 배경) */
export function ResumeScreen() {
  return (
    <div
      className="flex h-full w-full gap-[22px] bg-[#f4f6f9] px-[26px] py-6 text-[#3b414c]"
      style={{ backgroundImage: 'radial-gradient(#e2e6ee 1px, transparent 1px)', backgroundSize: '16px 16px' }}
    >
      <div className="flex min-w-0 flex-[1.25] flex-col">
        <p className={LABEL}>직무 맞춤 이력서 · 수정본</p>
        <div className="flex-1 rounded-xl border-[1.5px] border-[#e6e9ef] bg-white px-4 py-[15px]">
          <div className="flex items-center gap-3 border-b border-[#eef0f4] pb-3">
            <span className="flex size-10 items-center justify-center rounded-full bg-[#dfe4ec] text-[13px] font-extrabold text-[#8992a0]">
              김
            </span>
            <div>
              <p className="text-[15px] font-extrabold text-[#14151a]">{R.name}</p>
              <p className="text-[11px] font-semibold text-[#9096a1]">{R.role}</p>
            </div>
            <span className="ml-auto rounded-full border-[1.4px] border-[#9dbcff] bg-[#eaf1ff] px-[9px] py-0.5 text-[10.5px] font-extrabold text-[#2f6bff]">
              첨삭 완료
            </span>
          </div>
          {R.sections.map((s, i) => (
            <div key={s.head} className="py-[9px]">
              <p className="text-[11.5px] font-extrabold text-[#2f6bff]">{s.head}</p>
              <p className="mt-1 text-[12.5px] leading-[1.5] font-semibold text-[#4b515c]">
                {/* 첨삭으로 고친 문장 하이라이트 */}
                {i === 1 ? <mark className="rounded bg-[#fff3c4] px-0.5 text-inherit">{s.body}</mark> : s.body}
              </p>
            </div>
          ))}
          <div className="mt-1 space-y-1.5">
            <div className="h-[9px] w-[70%] rounded-[5px] bg-[#dfe4ec]" />
            <div className="h-[9px] w-[90%] rounded-[5px] bg-[#dfe4ec]" />
            <div className="h-[9px] w-[55%] rounded-[5px] bg-[#dfe4ec]" />
          </div>
        </div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <p className={LABEL}>코치 첨삭 코멘트</p>
        <div className="flex flex-1 flex-col gap-2.5">
          {R.comments.map((c, i) => (
            <div key={c.tag} className="rounded-xl border-[1.5px] border-[#e6e9ef] bg-white px-3.5 py-3">
              <div className="flex items-center gap-2">
                <span className="flex size-[18px] items-center justify-center rounded-md bg-[#2f6bff] text-[10px] font-extrabold text-white">
                  {i + 1}
                </span>
                <span className="text-[11.5px] font-extrabold text-[#2f6bff]">{c.tag}</span>
              </div>
              <p className="mt-1.5 text-[12px] leading-[1.5] font-semibold text-[#4b515c]">{c.text}</p>
            </div>
          ))}
          <div className="mt-auto rounded-lg bg-[#eaf1ff] px-[11px] py-[9px] text-center text-[11.5px] font-extrabold text-[#2f6bff]">
            → 3주차: 이 이력서로 채용관 지원
          </div>
        </div>
      </div>
    </div>
  )
}
