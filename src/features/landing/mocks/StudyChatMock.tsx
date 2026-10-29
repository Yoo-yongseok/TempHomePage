import { LogoMark } from '../../../components/layout/Logo'
import { BENEFIT_CHAT as C } from '../../../content/landing/groupB'

/** 혜택 1 — 한국AX협회 앱 스터디 라운지 채팅 카드 */
export function StudyChatMock() {
  return (
    <div className="w-full max-w-[440px] overflow-hidden rounded-[20px] border border-[#e6e8ee] bg-white text-left shadow-[0_1px_2px_#1018280a,0_28px_60px_-30px_#10182847]">
      {/* 앱 헤더 */}
      <div className="flex items-center gap-3 border-b border-[#eef0f3] px-4 py-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-[11px] bg-gray-50 ring-1 ring-[#e6e8ee]">
          <LogoMark className="h-3.5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[14px] leading-tight font-bold text-ink">{C.lounge}</p>
          <p className="mt-0.5 truncate text-[12px] text-mute">
            {C.room} · {C.members}
          </p>
        </div>
        <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-700">
          <span aria-hidden className="size-1.5 rounded-full bg-emerald-500" />
          {C.status}
        </span>
      </div>

      <div className="flex flex-col gap-3 bg-linear-to-b from-white to-gray-50/70 px-4 pt-3 pb-4">
        <span className="self-center rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-medium text-gray-500">
          {C.date}
        </span>

        {/* 매니저 메시지 + 영상 첨부 */}
        <div className="flex gap-2.5">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-signal/10 text-[12px] font-bold text-signal-text">
            {C.manager.avatar}
          </span>
          <div className="flex min-w-0 flex-col gap-1.5">
            <div className="flex items-baseline gap-1.5">
              <span className="text-[12.5px] font-semibold text-ink">{C.manager.name}</span>
              <span className="text-[11px] text-gray-400">{C.manager.time}</span>
            </div>
            <p className="max-w-[300px] rounded-[16px] rounded-tl-[6px] bg-gray-50 px-3.5 py-2.5 text-[14px] leading-[1.5] text-ink ring-1 ring-[#eef0f3]">
              {C.manager.text}
            </p>
            <div className="flex max-w-[300px] items-center gap-3 rounded-[14px] border border-[#e6e8ee] bg-white p-2 pr-3.5 shadow-[0_1px_2px_#1018280a]">
              <span className="relative flex aspect-video w-[84px] shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-linear-to-br from-[#1f3b8f] via-signal to-[#5b8cff]">
                <span className="flex size-7 items-center justify-center rounded-full bg-white/95 shadow-[0_4px_10px_#0f172a40]">
                  <svg aria-hidden viewBox="0 0 24 24" className="ml-0.5 size-3 text-signal" fill="currentColor">
                    <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
                  </svg>
                </span>
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[13px] font-semibold text-ink">{C.video.title}</span>
                <span className="mt-0.5 block text-[11px] text-mute tabular-nums">{C.video.duration}</span>
              </span>
            </div>
          </div>
        </div>

        {/* 수강생 답장 */}
        <div className="flex flex-col items-end gap-1">
          <p className="max-w-[260px] rounded-[16px] rounded-tr-[6px] bg-signal px-3.5 py-2.5 text-[14px] leading-[1.5] text-white shadow-[0_8px_18px_-10px_#2563eb99]">
            {C.reply.text}
          </p>
          <span className="text-[11px] text-gray-400">
            {C.reply.read} · {C.reply.time}
          </span>
        </div>

        {/* 입력창 */}
        <div
          aria-hidden
          className="mt-1 flex items-center gap-2 rounded-full border border-[#e6e8ee] bg-white py-1.5 pr-1.5 pl-4"
        >
          <span className="flex-1 text-[13px] text-gray-400">{C.input}</span>
          <span className="flex size-7 items-center justify-center rounded-full bg-signal text-white">
            <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  )
}
